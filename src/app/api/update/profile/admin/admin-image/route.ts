import { AdminAuthGuard } from "@/lib/AuthGuard/AdminAuthGuard";
import prisma from "@/variables/PrismaVar";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  try {
    // Start Check Admin Authorize
    const authVerify = await AdminAuthGuard(req);
    if (!authVerify.isAuthorized || !authVerify.user?.data)
      return authVerify.response;
    // End Check Admin Authorize

    const { imageUrl } = (await req.json()) as {
      imageUrl: string;
    };

    if (!imageUrl) {
      return NextResponse.json(
        { message: "image url is required" },
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

    await prisma.admin.update({
      where: {
        id: admin.id,
      },
      data: {
        image: imageUrl,
      },
    });

    revalidateTag("user_data");
    revalidateTag("admin_data");

    return NextResponse.json({ imageUrl }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
