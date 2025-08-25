import { AdminAuthGuard } from "@/lib/AuthGuard/AdminAuthGuard";
import {
  departmentDataSchema,
  departmentDataType,
} from "@/validation/DepartmentDataSchema";
import prisma from "@/variables/PrismaVar";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  params: { params: Promise<{ id: string }> }
) {
  try {
    // Start Check Admin Authorize
    const authVerify = await AdminAuthGuard(req);
    if (!authVerify.isAuthorized) return authVerify.response;
    // End Check Admin Authorize
    const { id } = await params.params;

    const departmentData = (await req.json()) as departmentDataType;

    const validation = departmentDataSchema.safeParse(departmentData);

    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    const department = await prisma.department.findUnique({
      where: {
        id: +id,
      },
    });

    if (!department) {
      return NextResponse.json(
        { message: "Department not found" },
        { status: 404 }
      );
    }

    const isDuplicate = await prisma.department.findFirst({
      where: {
        OR: [{ name: departmentData.name }, { code: departmentData.code }],
        NOT: { id: department.id },
      },
    });

    if (isDuplicate) {
      const message = isDuplicate.code == departmentData.code ? "Code" : "Name";
      return NextResponse.json(
        { message: `${message} already exists in another Department` },
        { status: 400 }
      );
    }

    await prisma.department.update({
      where: {
        id: department.id,
      },
      data: {
        code: departmentData.code,
        name: departmentData.name,
      },
    });

    return NextResponse.json(
      {
        message: "Department has been updated successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Update Department Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
