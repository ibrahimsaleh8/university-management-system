import { AdminAuthGuard } from "@/lib/AuthGuard/AdminAuthGuard";
import {
  addStudentDataType,
  addStudentSchema,
} from "@/validation/AddStudentSchema";
import prisma from "@/variables/PrismaVar";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Start Check Admin Authorize
    const authVerify = await AdminAuthGuard(req);
    if (!authVerify.isAuthorized) return authVerify.response;
    // End Check Admin Authorize

    const studentData = (await req.json()) as addStudentDataType;

    const validation = addStudentSchema.safeParse(studentData);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    const HashedPassword = await bcrypt.hash(studentData.password, 10);

    const isEmailExist = await prisma.student.findFirst({
      where: {
        email: studentData.email,
      },
    });

    if (isEmailExist) {
      return NextResponse.json(
        {
          message: "Email is Already exist",
        },
        { status: 400 }
      );
    }

    const isIdExist = await prisma.student.findFirst({
      where: {
        student_id: studentData.student_id,
      },
    });
    if (isIdExist) {
      return NextResponse.json(
        {
          message: "Studnet ID is Already exist",
        },
        { status: 400 }
      );
    }

    // Create Student
    await prisma.student.create({
      data: {
        student_id: studentData.student_id,
        first_name: studentData.first_name,
        last_name: studentData.last_name,
        email: studentData.email,
        date_of_birth: studentData.date_of_birth,
        password: HashedPassword,
        address: studentData.address,
        gender: studentData.gender,
        phone: studentData.phone,
        classId: studentData.classId,
      },
    });
    return NextResponse.json(
      { message: "Student added success" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Server Error =>  " + error });
  }
}
