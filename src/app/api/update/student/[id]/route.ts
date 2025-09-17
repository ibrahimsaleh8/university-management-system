import { AdminAuthGuard } from "@/lib/AuthGuard/AdminAuthGuard";
import {
  editStudentDataType,
  editStudentSchema,
} from "@/validation/EditStudentSchema";
import prisma from "@/variables/PrismaVar";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  params: { params: Promise<{ id: string }> }
) {
  try {
    // Start Check Teacher Authorize
    const authVerify = await AdminAuthGuard(req);
    if (!authVerify.isAuthorized) return authVerify.response;
    // End Check Teacher Authorize
    const { id } = await params.params;

    const studentData = (await req.json()) as editStudentDataType;
    const validation = editStudentSchema.safeParse(studentData);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    const student = await prisma.student.findUnique({
      where: {
        student_id: id,
      },
    });
    if (!student) {
      return NextResponse.json(
        { message: "Student Not Found" },
        {
          status: 404,
        }
      );
    }
    const {
      address,
      date_of_birth,
      email,
      first_name,
      gender,
      image,
      last_name,
      phone,
      academicYearId,
      departmentId,
      student_id,
    } = studentData;
    await prisma.student.update({
      where: {
        student_id: student_id,
      },
      data: {
        address,
        date_of_birth,
        email,
        first_name,
        gender,
        image,
        last_name,
        phone,
        academicYearId,
        departmentId,
      },
    });
    return NextResponse.json(
      { message: "Student Updated Success" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
