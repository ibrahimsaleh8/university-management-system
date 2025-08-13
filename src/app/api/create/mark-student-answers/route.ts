import { ExamCorrection } from "@/app/dashboard/teacher/classes/[name]/show-exam/[id]/submissions/_components/ShowStudentAnswers";
import { TeacherAuthGuard } from "@/lib/AuthGuard/TeacherAuthGuard";
import prisma from "@/variables/PrismaVar";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Start Check Teacher Authorize
    const authVerify = await TeacherAuthGuard(req);
    if (!authVerify.isAuthorized || !authVerify.user)
      return authVerify.response;
    // End Check Teacher Authorize
    const { student_id, examCorrection, exam_id } = (await req.json()) as {
      examCorrection: ExamCorrection[];
      student_id: string;
      exam_id: string;
    };
    const student = await prisma.student.findUnique({
      where: {
        student_id,
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
    const exam = await prisma.exam.findUnique({
      where: {
        id: exam_id,
      },
    });
    if (!exam) {
      return NextResponse.json({ message: "Exam not found" }, { status: 404 });
    }

    const answersData = examCorrection.map((c) => ({
      id: c.studentAnswerId,
      studentId: student.id,
      score: c.score,
      isMarked: c.isMarked,
    }));
    await Promise.all(
      answersData.map((answer) =>
        prisma.studentAnswer.update({
          where: { id: answer.id },
          data: {
            score: answer.score,
            isMarked: answer.isMarked,
            studentId: answer.studentId,
          },
        })
      )
    );

    const studentTotalScore = answersData
      .map((a) => a.score)
      .reduce((f, s) => f + s, 0);

    await prisma.studentExam.update({
      where: {
        examId_studentId: {
          examId: exam_id,
          studentId: student.id,
        },
      },
      data: {
        score: studentTotalScore,
      },
    });

    return NextResponse.json(
      { message: "Student questions has been marked" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Server Error =>  " + error },
      { status: 500 }
    );
  }
}
