import {
  ResetPasswordDataType,
  ResetPasswordSchema,
} from "@/validation/ResetPassword";
import prisma from "@/variables/PrismaVar";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  try {
    const { resetData, token } = (await req.json()) as {
      resetData: ResetPasswordDataType;
      token: string;
    };
    const validation = ResetPasswordSchema.safeParse(resetData);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    const forgotRequest = await prisma.forgotPasswords.findFirst({
      where: { token, isValid: true },
    });
    if (!forgotRequest) {
      return NextResponse.json({ message: "invalid token" }, { status: 400 });
    }
    const now = Date.now();
    const tokenCreatedAt = new Date(forgotRequest.createdAt).getTime();
    const expirationTime = 15 * 60 * 1000;

    await prisma.forgotPasswords.update({
      where: {
        id: forgotRequest.id,
      },
      data: {
        isValid: false,
      },
    });
    if (now - tokenCreatedAt > expirationTime) {
      return NextResponse.json(
        { message: "Reset token is has expired" },
        { status: 400 }
      );
    }

    const newPassword = await bcrypt.hash(resetData.password, 10);

    if (forgotRequest.userRole == "STUDENT") {
      await prisma.student.update({
        where: {
          email: forgotRequest.email,
        },
        data: {
          password: newPassword,
        },
      });
    } else if (forgotRequest.userRole == "TEACHER") {
      await prisma.teacher.update({
        where: {
          email: forgotRequest.email,
        },
        data: {
          password: newPassword,
        },
      });
    }
    return NextResponse.json(
      { message: "Password has been updated success" },
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
