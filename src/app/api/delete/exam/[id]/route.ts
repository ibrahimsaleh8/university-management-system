import { TeacherAuthGuard } from "@/lib/AuthGuard/TeacherAuthGuard";
import prisma from "@/variables/PrismaVar";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const authVerify = await TeacherAuthGuard(req);
    if (!authVerify.isAuthorized) return authVerify.response;

    const { id } = context.params;

    const isExist = await prisma.exam.findUnique({ where: { id } });
    if (!isExist) {
      return NextResponse.json(
        { message: "Exam doesn't exist" },
        { status: 404 }
      );
    }

    if (isExist.teacherId !== authVerify.user?.data?.id) {
      return NextResponse.json(
        { message: "You can't delete this exam" },
        { status: 403 }
      );
    }

    // Manually delete related records (unless using cascade)
    await prisma.examQuestion.deleteMany({ where: { examId: id } });
    await prisma.studentExam.deleteMany({ where: { examId: id } });

    await prisma.exam.delete({ where: { id } });

    return NextResponse.json(
      { message: "Exam has been deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE exam error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
