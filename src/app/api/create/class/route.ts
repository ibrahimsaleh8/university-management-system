import { AdminAuthGuard } from "@/lib/AuthGuard/AdminAuthGuard";
import {
  classCreationDataType,
  classCreationSchema,
} from "@/validation/serverValidations/ClassCreationSchema";
import prisma from "@/variables/PrismaVar";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Start Check Admin Authorize
    const authVerify = await AdminAuthGuard(req);
    if (!authVerify.isAuthorized) return authVerify.response;
    // End Check Admin Authorize

    // Start Parameters Validation
    const classData = (await req.json()) as classCreationDataType;
    const validation = classCreationSchema.safeParse(classData);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 422 }
      );
    }
    // End Parameters Validation

    const isClassExist = await prisma.class.findFirst({
      where: {
        name: { equals: classData.name },
      },
    });

    if (isClassExist) {
      return NextResponse.json(
        { message: "Class is already exist" },
        { status: 400 }
      );
    }

    const isDepartmentExist = await prisma.department.findFirst({
      where: {
        id: classData.departmentId,
      },
    });

    if (!isDepartmentExist) {
      return NextResponse.json(
        { message: "Department not found" },
        { status: 400 }
      );
    }

    // Create New Class
    await prisma.class.create({
      data: {
        name: classData.name,
        departmentId: classData.departmentId,
      },
    });

    return NextResponse.json(
      {
        message: `Class ${classData.name} has been created successfully`,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Server Error =>  " + error });
  }
}
