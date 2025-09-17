import { StudentAuthGuard } from "@/lib/AuthGuard/StudentAuthGard";
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
        classId: true,
        questions: {
          select: {
            id: true,
            question: true,
            mark: true,
            type: true,
            chooses: true,
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

    const questions = exam.questions;
    return NextResponse.json(questions, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
