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
    const { className, examId } = (await req.json()) as {
      className: string;
      examId: string;
    };
    if (!className || !examId) {
      return NextResponse.json(
        { message: "className and examId are required" },
        { status: 400 }
      );
    }

    const studentClass = await prisma.class.findUnique({
      where: {
        name: className,
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
        { message: "Student doesn't exist in class" },
        { status: 400 }
      );
    }

    const exam = await prisma.exam.findUnique({
      where: {
        id: examId,
      },
      select: {
        status: true,
        endDate: true,
        startDate: true,
        students: {
          where: {
            studentId: authVerify.user.data.id,
          },
        },
      },
    });
    if (!exam) {
      return NextResponse.json(
        { message: "Exam Not Found" },
        {
          status: 404,
        }
      );
    }
    const examStatus = ExamStatusCalc(
      exam.startDate,
      exam.endDate,
      exam.status
    );
    if (examStatus != "ONGOING") {
      return NextResponse.json(
        { message: "You can't enroll to exam" },
        { status: 400 }
      );
    }
    if (exam.students.length > 0) {
      return NextResponse.json(
        { message: "You are already in the exam" },
        { status: 400 }
      );
    }
    await prisma.studentExam.create({
      data: {
        examId,
        studentId: authVerify.user.data.id,
      },
    });

    return NextResponse.json(
      { message: "You are enrolled to exam success" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error => " + error },
      { status: 500 }
    );
  }
}
