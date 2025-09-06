import { TeacherAuthGuard } from "@/lib/AuthGuard/TeacherAuthGuard";
import {
  UpdatePasswordDataType,
  UpdatePasswordSchema,
} from "@/validation/UpdatePasswordSchema";
import prisma from "@/variables/PrismaVar";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  try {
    // Start Check Teacher Authorize
    const authVerify = await TeacherAuthGuard(req);
    if (!authVerify.isAuthorized || !authVerify.user?.data)
      return authVerify.response;
    // End Check Teacher Authorize

    const teacherPassword = (await req.json()) as UpdatePasswordDataType;

    const validation = UpdatePasswordSchema.safeParse(teacherPassword);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    const teacher = await prisma.teacher.findUnique({
      where: {
        email: authVerify.user.data.email,
      },
    });
    if (!teacher) {
      return NextResponse.json(
        { message: "Teacher not found" },
        { status: 404 }
      );
    }

    const isValidPassword = await bcrypt.compare(
      teacherPassword.currentPassword,
      teacher.password
    );

    if (!isValidPassword) {
      return NextResponse.json(
        { message: "Your current password is incorrect" },
        { status: 400 }
      );
    }
    if (await bcrypt.compare(teacherPassword.newPassword, teacher.password)) {
      return NextResponse.json(
        { message: "New password cannot be the same as the current password" },
        { status: 400 }
      );
    }

    const newPassword = await bcrypt.hash(teacherPassword.newPassword, 10);

    await prisma.teacher.update({
      where: {
        email: teacher.email,
      },
      data: { password: newPassword },
    });
    return NextResponse.json(
      {
        message: "Password updated success",
      },
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
