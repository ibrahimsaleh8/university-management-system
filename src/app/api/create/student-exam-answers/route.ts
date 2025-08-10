import { StudentAnswersDataType } from "@/app/dashboard/student/classes/[name]/show-exam/[id]/_components/ShowQuestions";
import { StudentAuthGuard } from "@/lib/AuthGuard/StudentAuthGard";
import { ExamStatusCalc } from "@/lib/ExamStatusCalc";
import prisma from "@/variables/PrismaVar";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Start Check Student Authorize
    const authVerify = await StudentAuthGuard(req);
    if (!authVerify.isAuthorized) return authVerify.response;
    if (!authVerify.user || !authVerify.user.data) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    // End Check Student Authorize
    const { examId, studentAnswers } = (await req.json()) as {
      examId: string;
      studentAnswers: StudentAnswersDataType[];
    };
    if (!examId) {
      return NextResponse.json(
        { message: "Exam id is required" },
        { status: 400 }
      );
    }

    const exam = await prisma.exam.findUnique({
      where: {
        id: examId,
      },
      select: {
        id: true,
        students: {
          select: {
            studentId: true,
          },
          where: {
            studentId: authVerify.user.data.id,
          },
        },
        startDate: true,
        endDate: true,
        status: true,
        autoMark: true,
      },
    });
    if (!exam) {
      return NextResponse.json({ message: "Exam not found" }, { status: 404 });
    }
    if (exam.students.length == 0) {
      return NextResponse.json(
        { message: "Student did't enroll to exam" },
        { status: 400 }
      );
    }

    const examStatus = ExamStatusCalc(
      exam.startDate,
      exam.endDate,
      exam.status
    );

    if (["CANCELLED", "GRADED", "SCHEDULED"].includes(examStatus)) {
      return NextResponse.json(
        { message: "Student can't submit answers" },
        { status: 400 }
      );
    }
    let submissionData = [];
    let score = 0;
    if (exam.autoMark && studentAnswers.length > 0) {
      const answers = await prisma.examQuestion.findMany({
        where: {
          id: {
            in: studentAnswers.map((ans) => ans.questionId),
          },
        },
        select: {
          rightAnswer: true,
          id: true,
          mark: true,
        },
      });
      const answerMap = new Map(answers.map((a) => [a.id, a]));

      submissionData = studentAnswers.map((ans) => {
        const correct = answerMap.get(ans.questionId);
        return {
          answer: ans.answer,
          examQuestionId: ans.questionId,
          score:
            correct && correct.rightAnswer === ans.answer ? correct.mark : 0,
          studentId: exam.students[0].studentId,
        };
      });
      score = submissionData.reduce((sum, ans) => sum + ans.score, 0);
    } else {
      submissionData = studentAnswers.map((ans) => ({
        answer: ans.answer,
        examQuestionId: ans.questionId,
        score: 0,
        studentId: exam.students[0].studentId,
      }));
    }
    await prisma.studentExam.update({
      where: {
        examId_studentId: {
          examId: exam.id,
          studentId: exam.students[0].studentId,
        },
      },
      data: {
        isSubmitted: true,
        score,
      },
    });

    await prisma.$transaction(async (tx) => {
      if (submissionData.length > 0) {
        await tx.studentAnswer.createMany({ data: submissionData });
      } else {
        await tx.studentAnswer.create({
          data: {
            empty: true,
            score: 0,
            studentId: exam.students[0].studentId,
          },
        });
      }
    });

    return NextResponse.json(
      { message: "Answers has been submitted success" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
