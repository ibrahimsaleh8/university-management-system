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

    const isExist = await prisma.academicYear.findUnique({
      where: { id: +id },
    });
    if (!isExist) {
      return NextResponse.json(
        { message: "Academic year doesn't exist" },
        { status: 404 }
      );
    }

    await prisma.student.updateMany({
      where: { academicYearId: +id },
      data: { academicYearId: null },
    });
    await prisma.courseOffering.deleteMany({ where: { academicYearId: +id } });
    await prisma.courseSchedule.deleteMany({ where: { academicYearId: +id } });

    await prisma.academicYear.delete({ where: { id: +id } });

    return NextResponse.json(
      {
        message: "Academic Year has been deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Delete AcademicYear Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
