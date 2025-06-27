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

    const isExist = await prisma.student.findFirst({
      where: {
        OR: [
          { email: studentData.email },
          {
            student_id: studentData.student_id,
          },
        ],
      },
    });

    if (isExist) {
      const msg = `${
        isExist.email == studentData.email ? "Student Email" : "Student Id"
      } is is Already exist`;
      return NextResponse.json(
        {
          message: msg,
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
        academicYearId: studentData.academicYearId,
        departmentId: studentData.departmentId,
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
