import { AdminAuthGuard } from "@/lib/AuthGuard/AdminAuthGuard";
import {
  AddTeacherDataType,
  addTeacherSchema,
} from "@/validation/AddTeacherSchema";
import prisma from "@/variables/PrismaVar";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
export type teacherDataTypeServer = AddTeacherDataType & {
  image: string;
};
// Add New Teacher
export async function POST(request: NextRequest) {
  try {
    // Start Check Admin Authorize
    const authVerify = await AdminAuthGuard(request);
    if (!authVerify.isAuthorized) return authVerify.response;
    // End Check Admin Authorize

    const request_body = (await request.json()) as teacherDataTypeServer;

    const validation = addTeacherSchema.safeParse(request_body);

    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );
    }
    const isExistEmail = await prisma.teacher.findUnique({
      where: {
        email: request_body.email,
      },
    });

    const teacherID = request_body.teacher_id.toString();

    if (isExistEmail) {
      return NextResponse.json(
        { message: "Teacher already exist" },
        { status: 400 }
      );
    }

    const isExistId = await prisma.teacher.findUnique({
      where: {
        teacher_id: teacherID,
      },
    });

    if (isExistId) {
      return NextResponse.json(
        { message: "Teacher already exist" },
        { status: 400 }
      );
    }

    const HashedPassword = await bcrypt.hash(request_body.password, 10);

    await prisma.teacher.create({
      data: {
        teacher_id: teacherID,
        email: request_body.email,
        address: request_body.address,
        date_of_birth: request_body.date_of_birth,
        first_name: request_body.first_name,
        gender: request_body.gender,
        hire_date: request_body.hire_date,
        last_name: request_body.last_name,
        password: HashedPassword,
        phone: request_body.phone,
        qualification: request_body.qualification,
        image: request_body.image,
        departmentId: request_body.departmentId,
      },
    });

    return NextResponse.json(
      { message: "Teacher added success" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
