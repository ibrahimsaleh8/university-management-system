import { TeacherAuthGuard } from "@/lib/AuthGuard/TeacherAuthGuard";
import prisma from "@/variables/PrismaVar";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  params: { params: Promise<{ id: string; std_id: string }> }
) {
  try {
    // Start Check Teacher Authorize
    const authVerify = await TeacherAuthGuard(req);
    if (!authVerify.isAuthorized || !authVerify.user)
      return authVerify.response;
    // End Check Teacher Authorize

    const { id, std_id } = await params.params;
    console.log("std_id", std_id);
    const student = await prisma.student.findUnique({
      where: {
        student_id: std_id,
      },
      select: {
        id: true,
      },
    });
    if (!student) {
      return NextResponse.json(
        { message: "Student not found" },
        { status: 404 }
      );
    }

    const examQuestions = await prisma.examQuestion.findMany({
      where: {
        examId: id,
      },
      select: {
        id: true,
        question: true,
        rightAnswer: true,
        mark: true,
        type: true,
      },
    });

    const studentAnswers = await prisma.studentAnswer.findMany({
      where: {
        examQuestionId: {
          in: examQuestions.map((q) => q.id),
        },
        studentId: student.id,
      },
      select: {
        id: true,
        examQuestionId: true,
        answer: true,
        empty: true,
        score: true,
        isMarked: true,
      },
    });
    const data = examQuestions.map((question) => ({
      id: question.id,
      mark: question.mark,
      question: question.question,
      rightAnswer: question.rightAnswer,
      type: question.type,
      studentAnswer: studentAnswers.find(
        (ans) => ans.examQuestionId == question.id
      ),
    }));

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Server Error =>  " + error },
      { status: 500 }
    );
  }
}
