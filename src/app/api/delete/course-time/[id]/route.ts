import { AdminAuthGuard } from "@/lib/AuthGuard/AdminAuthGuard";
import prisma from "@/variables/PrismaVar";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    // Start Check Admin Authorize
    const authVerify = await AdminAuthGuard(req);
    if (!authVerify.isAuthorized) return authVerify.response;
    // End Check Admin Authorize

    const { id } = await context.params;

    if (!id) {
      return NextResponse.json({ message: "Id is missing" }, { status: 400 });
    }
    const isExist = await prisma.courseSchedule.findUnique({ where: { id } });
    if (!isExist) {
      return NextResponse.json(
        { message: "This schedule doesn't exist" },
        { status: 404 }
      );
    }

    await prisma.courseSchedule.delete({ where: { id } });

    return NextResponse.json(
      {
        message: "Schedule has been deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Delete Schedule Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
