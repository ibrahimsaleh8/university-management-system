import { AdminAuthGuard } from "@/lib/AuthGuard/AdminAuthGuard";
import prisma from "@/variables/PrismaVar";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // Start Check Admin Authorize
    const authVerify = await AdminAuthGuard(req);
    if (!authVerify.isAuthorized) return authVerify.response;
    // End Check Admin Authorize

    const { id } = await context.params;

    const isExist = await prisma.course.findUnique({ where: { id: +id } });
    if (!isExist) {
      return NextResponse.json(
        { message: "course doesn't exist" },
        { status: 404 }
      );
    }

    await prisma.course.delete({ where: { id: +id } });

    return NextResponse.json(
      {
        message: "Course has been deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Delete Course Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
