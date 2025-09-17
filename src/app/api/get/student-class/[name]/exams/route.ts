import { StudentAuthGuard } from "@/lib/AuthGuard/StudentAuthGard";
import { ExamStatusCalc } from "@/lib/ExamStatusCalc";
import prisma from "@/variables/PrismaVar";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ name: string }> }
) {
  try {
    // Start Check Student Authorize
    const authVerify = await StudentAuthGuard(req);
    if (!authVerify.isAuthorized) return authVerify.response;
    if (!authVerify.user || !authVerify.user.data) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    // End Check Student Authorize

    const { name } = await context.params;
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

    const exams = await prisma.exam.findMany({
      where: {
        classId: studentClass.id,
      },
      select: {
        id: true,
        title: true,
        duration: true,
        created_at: true,
        endDate: true,
        totalMark: true,
        startDate: true,
        status: true,
        _count: {
          select: {
            questions: true,
          },
        },
        students: {
          select: {
            isSubmitted: true,
            score: true,
            isMarked: true,
          },
          where: {
            studentId: authVerify.user.data.id,
          },
        },
        autoMark: true,
      },
      orderBy: {
        created_at: "desc",
      },
    });

    const resExams = exams.map((ex) => ({
      id: ex.id,
      title: ex.title,
      duration: ex.duration,
      created_at: ex.created_at,
      endDate: ex.endDate,
      totalMark: ex.totalMark,
      startDate: ex.startDate,
      status: ExamStatusCalc(ex.startDate, ex.endDate, ex.status),
      questions: ex._count.questions,
      isSubmitted: ex.students.length > 0 ? ex.students[0].isSubmitted : false,
      isMarked: ex.students.length > 0 ? ex.students[0].isMarked : false,
      studentScore: ex.students.length > 0 ? ex.students[0].score : null,
      autoMark: ex.autoMark,
    }));

    return NextResponse.json(resExams, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
