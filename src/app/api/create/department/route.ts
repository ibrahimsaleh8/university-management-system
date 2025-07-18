import { AdminAuthGuard } from "@/lib/AuthGuard/AdminAuthGuard";
import {
  departmentDataSchema,
  departmentDataType,
} from "@/validation/DepartmentDataSchema";
import prisma from "@/variables/PrismaVar";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  try {
    const depratmentData = (await req.json()) as departmentDataType;

    // Start Check Admin Authorize
    const authVerify = await AdminAuthGuard(req);
    if (!authVerify.isAuthorized) return authVerify.response;
    // End Check Admin Authorize

    const validation = departmentDataSchema.safeParse(depratmentData);

    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    const isNameExist = await prisma.department.findFirst({
      where: {
        name: { equals: depratmentData.name },
      },
    });

    if (isNameExist) {
      return NextResponse.json(
        { message: "Department Name is already exist" },
        { status: 400 }
      );
    }

    const isCodeExist = await prisma.department.findFirst({
      where: {
        code: { equals: depratmentData.code },
      },
    });

    if (isCodeExist) {
      return NextResponse.json(
        { message: "Department Code is already exist" },
        { status: 400 }
      );
    }

    await prisma.department.create({
      data: {
        name: depratmentData.name,
        code: depratmentData.code,
      },
    });

    return NextResponse.json(
      {
        message: `Department ${depratmentData.name} has been created successfully`,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Server Error =>  " + error },
      { status: 500 }
    );
  }
}
