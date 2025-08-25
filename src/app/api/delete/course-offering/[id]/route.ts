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

    const isExist = await prisma.courseOffering.findUnique({ where: { id } });
    if (!isExist) {
      return NextResponse.json(
        { message: "Course offering doesn't exist" },
        { status: 404 }
      );
    }
    await prisma.studentEnrollment.deleteMany({
      where: { courseOfferingId: id },
    });
    await prisma.exam.deleteMany({ where: { courseOfferingId: id } });
    await prisma.class.deleteMany({ where: { courseOfferingId: id } });
    await prisma.courseSchedule.deleteMany({ where: { courseOfferingId: id } });
    await prisma.prerequisiteCourse.deleteMany({
      where: { courseOfferingId: id },
    });
    await prisma.courseOffering.delete({ where: { id } });

    return NextResponse.json(
      {
        message: "Course offering has been deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Delete Course Offering Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
