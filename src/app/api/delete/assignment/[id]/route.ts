import { TeacherAuthGuard } from "@/lib/AuthGuard/TeacherAuthGuard";
import prisma from "@/variables/PrismaVar";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // Start Check Teacher Authorize
    const authVerify = await TeacherAuthGuard(req);
    if (!authVerify.isAuthorized) return authVerify.response;
    // End Check Teacher Authorize
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }
    const isExist = await prisma.assignment.findUnique({
      where: {
        id,
      },
    });
    if (!isExist) {
      return NextResponse.json(
        { message: "Assignment doesn't exist" },
        { status: 404 }
      );
    }

    await prisma.assignment.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(
      {
        message: "Assignment has been deleted successfully",
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
