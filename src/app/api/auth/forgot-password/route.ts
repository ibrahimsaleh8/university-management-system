import {
  ForgotPasswordDataType,
  ForgotPasswordSchema,
} from "@/validation/ForgotPasswordSchema";
import prisma from "@/variables/PrismaVar";
import { NextRequest, NextResponse } from "next/server";
import Jwt from "jsonwebtoken";
import { transporter } from "@/lib/NodemailerVariabel";
import { MainDomain } from "@/variables/MainDomain";
import { UserRole } from "@prisma/client";

export async function POST(req: NextRequest) {
  try {
    const forgotPasswordData = (await req.json()) as ForgotPasswordDataType;
    const validation = ForgotPasswordSchema.safeParse(forgotPasswordData);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );
    }
    let role;
    const IsTeacher = await prisma.teacher.findUnique({
      where: {
        email: forgotPasswordData.email,
        teacher_id: forgotPasswordData.user_id,
      },
    });
    role = "TEACHER";
    if (!IsTeacher) {
      const isStudent = await prisma.student.findUnique({
        where: {
          email: forgotPasswordData.email,
          student_id: forgotPasswordData.user_id,
        },
      });
      role = "STUDENT";

      if (!isStudent) {
        role = "";
        return NextResponse.json(
          { message: "User not found" },
          { status: 404 }
        );
      }
    }

    const token = Jwt.sign(
      {
        email: forgotPasswordData.email,
        user_id: forgotPasswordData.user_id,
      },
      process.env.jwt_token as string,
      {
        expiresIn: "15m",
      }
    );
    await prisma.forgotPasswords.updateMany({
      where: { email: forgotPasswordData.email, isValid: true },
      data: { isValid: false },
    });

    await prisma.forgotPasswords.create({
      data: {
        email: forgotPasswordData.email,
        token,
        isValid: true,
        userRole: role as UserRole,
      },
    });

    const mailOptions = {
      to: forgotPasswordData.email,
      from: process.env.NODMAILER_EMAIL_USER,
      subject: "Reset your password",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; padding: 20px;">
          <h2 style="color: #121212;">Reset your password</h2>
          <p>Hello ${forgotPasswordData.email} this is reset password link</p>
          <p>if you aren't request reset password please avoid this message</p>
          <a style="color: #ffffff;background-color:#121212;padding:5px 10px;text-decoration:none;border-radius:4px;" href="${MainDomain}/reset-password?token=${token}">Reset Password</a>
          <hr style="margin-top: 20px;">
          <p style="font-size: 14px; color: #777;">This email was sent from the University Managment System.</p>
        </div>
      `,
    };
    await transporter.sendMail(mailOptions);
    return NextResponse.json(
      {
        message: "Reset password has been sent to your email",
      },
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
