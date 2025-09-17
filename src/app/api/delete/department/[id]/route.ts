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

    const isExist = await prisma.department.findUnique({ where: { id: +id } });
    if (!isExist) {
      return NextResponse.json(
        { message: "Department doesn't exist" },
        { status: 404 }
      );
    }
    await prisma.class.deleteMany({ where: { departmentId: +id } });
    await prisma.course.deleteMany({ where: { departmentId: +id } });
    await prisma.student.updateMany({
      where: { departmentId: +id },
      data: { departmentId: null },
    });
    await prisma.department.delete({ where: { id: +id } });

    return NextResponse.json(
      {
        message: "Department has been deleted successfully",
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
