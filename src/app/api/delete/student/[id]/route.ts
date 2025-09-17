import { AdminAuthGuard } from "@/lib/AuthGuard/AdminAuthGuard";
import prisma from "@/variables/PrismaVar";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  params: { params: Promise<{ id: string }> }
) {
  try {
    // Start Check Teacher Authorize
    const authVerify = await AdminAuthGuard(req);
    if (!authVerify.isAuthorized) return authVerify.response;
    // End Check Teacher Authorize

    const { id } = await params.params;
    const student = await prisma.student.findUnique({
      where: {
        student_id: id,
      },
    });
    if (!student) {
      return NextResponse.json(
        { message: "Student Not Found" },
        { status: 404 }
      );
    }

    // Start deleting related data
    await prisma.studentExam.deleteMany({ where: { studentId: student.id } });
    await prisma.studentAnswer.deleteMany({ where: { studentId: student.id } });
    await prisma.assignmentSubmission.deleteMany({
      where: { studentId: student.id },
    });
    await prisma.announcementReply.deleteMany({
      where: { studentId: student.id },
    });
    await prisma.studentEnrollment.deleteMany({
      where: { studentId: student.id },
    });
    await prisma.studentClass.deleteMany({ where: { studentId: student.id } });

    await prisma.student.delete({
      where: { student_id: id },
    });

    return NextResponse.json(
      { message: "Student Deleted Success" },
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
