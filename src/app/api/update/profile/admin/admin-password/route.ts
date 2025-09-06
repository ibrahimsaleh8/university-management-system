import { AdminAuthGuard } from "@/lib/AuthGuard/AdminAuthGuard";
import {
  UpdatePasswordDataType,
  UpdatePasswordSchema,
} from "@/validation/UpdatePasswordSchema";
import prisma from "@/variables/PrismaVar";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  try {
    // Start Check Admin Authorize
    const authVerify = await AdminAuthGuard(req);
    if (!authVerify.isAuthorized || !authVerify.user?.data)
      return authVerify.response;
    // End Check Admin Authorize

    const adminPassword = (await req.json()) as UpdatePasswordDataType;

    const validation = UpdatePasswordSchema.safeParse(adminPassword);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    const admin = await prisma.admin.findUnique({
      where: {
        email: authVerify.user.data.email,
      },
    });
    if (!admin) {
      return NextResponse.json({ message: "Admin not found" }, { status: 404 });
    }

    const isValidPassword = await bcrypt.compare(
      adminPassword.currentPassword,
      admin.password
    );

    if (!isValidPassword) {
      return NextResponse.json(
        { message: "Your current password is incorrect" },
        { status: 400 }
      );
    }
    if (await bcrypt.compare(adminPassword.newPassword, admin.password)) {
      return NextResponse.json(
        { message: "New password cannot be the same as the current password" },
        { status: 400 }
      );
    }

    const newPassword = await bcrypt.hash(adminPassword.newPassword, 10);

    await prisma.admin.update({
      where: {
        email: admin.email,
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
