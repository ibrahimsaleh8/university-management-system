import { AdminAuthGuard } from "@/lib/AuthGuard/AdminAuthGuard";
import {
  UpdateAdminDataSchema,
  UpdateAdminDataType,
} from "@/validation/UpdateAdminDataSchema";
import prisma from "@/variables/PrismaVar";
import bcrypt from "bcryptjs";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  try {
    // Start Check Admin Authorize
    const authVerify = await AdminAuthGuard(req);
    if (!authVerify.isAuthorized || !authVerify.user?.data)
      return authVerify.response;
    // End Check Admin Authorize

    const adminData = (await req.json()) as UpdateAdminDataType;

    const validation = UpdateAdminDataSchema.safeParse(adminData);
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
      adminData.password,
      admin.password
    );

    if (!isValidPassword) {
      return NextResponse.json(
        { message: "invalid password" },
        { status: 400 }
      );
    }
    const newAdmin = await prisma.admin.update({
      where: {
        email: admin.email,
      },
      data: {
        first_name: adminData.first_name,
        last_name: adminData.last_name,
        email: adminData.email,
      },
    });
    revalidateTag("user_data");
    revalidateTag("admin_data");
    return NextResponse.json({
      data: {
        first_name: newAdmin.first_name,
        email: newAdmin.email,
        last_name: newAdmin.last_name,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
