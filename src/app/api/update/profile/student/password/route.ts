import { StudentAuthGuard } from "@/lib/AuthGuard/StudentAuthGard";
import {
  UpdatePasswordDataType,
  UpdatePasswordSchema,
} from "@/validation/UpdatePasswordSchema";
import prisma from "@/variables/PrismaVar";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  try {
    // Start Check Student Authorize
    const authVerify = await StudentAuthGuard(req);
    if (!authVerify.isAuthorized) return authVerify.response;
    if (!authVerify.user || !authVerify.user.data) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    // End Check Student Authorize

    const studentPassword = (await req.json()) as UpdatePasswordDataType;

    const validation = UpdatePasswordSchema.safeParse(studentPassword);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    const student = await prisma.student.findUnique({
      where: {
        email: authVerify.user.data.email,
      },
    });
    if (!student) {
      return NextResponse.json(
        { message: "Student not found" },
        { status: 404 }
      );
    }

    const isValidPassword = await bcrypt.compare(
      studentPassword.currentPassword,
      student.password
    );

    if (!isValidPassword) {
      return NextResponse.json(
        { message: "Your current password is incorrect" },
        { status: 400 }
      );
    }
    if (await bcrypt.compare(studentPassword.newPassword, student.password)) {
      return NextResponse.json(
        { message: "New password cannot be the same as the current password" },
        { status: 400 }
      );
    }

    const newPassword = await bcrypt.hash(studentPassword.newPassword, 10);

    await prisma.student.update({
      where: {
        email: student.email,
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
