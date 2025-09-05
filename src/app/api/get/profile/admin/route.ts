import { AdminAuthGuard } from "@/lib/AuthGuard/AdminAuthGuard";
import prisma from "@/variables/PrismaVar";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // Start Check Admin Authorize
    const authVerify = await AdminAuthGuard(req);
    if (!authVerify.isAuthorized || !authVerify.user?.data)
      return authVerify.response;
    // End Check Admin Authorize

    const adminData = await prisma.admin.findUnique({
      where: {
        email: authVerify.user.data.email,
      },
      select: {
        first_name: true,
        last_name: true,
        email: true,
        image: true,
      },
    });
    if (!adminData) {
      return NextResponse.json({ message: "Admin not found" }, { status: 404 });
    }
    return NextResponse.json(adminData, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
