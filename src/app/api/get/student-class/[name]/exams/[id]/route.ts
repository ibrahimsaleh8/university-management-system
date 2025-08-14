import { StudentAuthGuard } from "@/lib/AuthGuard/StudentAuthGard";
import { ExamStatusCalc } from "@/lib/ExamStatusCalc";
import prisma from "@/variables/PrismaVar";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ name: string; id: string }> }
) {
  try {
    // Start Check Student Authorize
    const authVerify = await StudentAuthGuard(req);
    if (!authVerify.isAuthorized) return authVerify.response;
    if (!authVerify.user || !authVerify.user.data) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    // End Check Student Authorize

    const { name, id: examId } = await context.params;
    const studentClass = await prisma.class.findUnique({
      where: {
        name,
      },
      select: {
        id: true,
        students: {
          where: {
            studentId: authVerify.user.data.id,
          },
        },
      },
    });

    if (!studentClass) {
      return NextResponse.json({ message: "Class not found" }, { status: 404 });
    }
    if (studentClass.students.length == 0) {
      return NextResponse.json(
        { message: "Student Doesn't Exist in class" },
        { status: 400 }
      );
    }

    const exam = await prisma.exam.findUnique({
      where: {
        id: examId,
      },
      select: {
        title: true,
        duration: true,
        endDate: true,
        totalMark: true,
        startDate: true,
        status: true,
        _count: {
          select: {
            questions: true,
          },
        },
        classId: true,
        students: {
          where: {
            studentId: authVerify.user.data.id,
          },
          select: {
            enrolled_at: true,
            isSubmitted: true,
            score: true,
            isMarked: true,
          },
        },
      },
    });

    if (!exam) {
      return NextResponse.json({ message: "Exam Not Found" }, { status: 404 });
    }

    if (exam.classId != studentClass.id) {
      return NextResponse.json(
        { message: `This Exam Not In ${name} Class` },
        { status: 400 }
      );
    }

    const examRes = {
      title: exam.title,
      duration: exam.duration,
      endDate: exam.endDate,
      totalMark: exam.totalMark,
      questionsNumber: exam._count.questions,
      status: ExamStatusCalc(exam.startDate, exam.endDate, exam.status),
      isEnrolled: exam.students.length > 0,
      enrollDate:
        exam.students.length > 0 ? exam.students[0].enrolled_at : null,
      isSubmitted:
        exam.students.length > 0 ? exam.students[0].isSubmitted : null,
      studentScore: exam.students.length > 0 ? exam.students[0].score : null,
      isMarked: exam.students.length > 0 ? exam.students[0].isMarked : null,
    };

    return NextResponse.json(examRes, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error => " + error },
      { status: 500 }
    );
  }
}
