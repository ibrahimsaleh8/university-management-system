import { StudentAuthGuard } from "@/lib/AuthGuard/StudentAuthGard";
import prisma from "@/variables/PrismaVar";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // Start Check Student Authorize
    const authVerify = await StudentAuthGuard(req);
    if (!authVerify.isAuthorized) return authVerify.response;
    if (!authVerify.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    // End Check Student Authorize
    const { id } = await context.params;
    const courseOffering = await prisma.courseOffering.findUnique({
      where: {
        id,
      },
    });
    if (!courseOffering) {
      return NextResponse.json(
        { message: "Course offering Not Found" },
        { status: 404 }
      );
    }
    const enrollment = await prisma.studentEnrollment.findFirst({
      where: {
        courseOfferingId: courseOffering.id,
        studentId: authVerify.user.data?.id,
      },
    });
    if (!enrollment) {
      return NextResponse.json(
        { message: "Enrollment Not Found" },
        { status: 404 }
      );
    }
    await prisma.studentEnrollment.delete({
      where: {
        id: enrollment.id,
      },
    });
    return NextResponse.json(
      { message: "Enrollment Has Been Deleted Success" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error => " + error },
      { status: 500 }
    );
  }
}
