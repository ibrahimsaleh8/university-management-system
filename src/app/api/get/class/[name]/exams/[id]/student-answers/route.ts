import { TeacherAuthGuard } from "@/lib/AuthGuard/TeacherAuthGuard";
import prisma from "@/variables/PrismaVar";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  params: { params: Promise<{ id: string }> }
) {
  try {
    // Start Check Teacher Authorize
    const authVerify = await TeacherAuthGuard(req);
    if (!authVerify.isAuthorized || !authVerify.user)
      return authVerify.response;
    // End Check Teacher Authorize

    const { id } = await params.params;

    const examQuestions = await prisma.examQuestion.findMany({
      where: {
        examId: id,
      },
      select: {
        id: true,
        question: true,
        rightAnswer: true,
        mark: true,
        answers: {
          where: {
            studentId: authVerify.user.data?.id,
          },
          select: {
            id: true,
            score: true,
            answer: true,
          },
        },
      },
    });

    return NextResponse.json(examQuestions, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Server Error =>  " + error },
      { status: 500 }
    );
  }
}
