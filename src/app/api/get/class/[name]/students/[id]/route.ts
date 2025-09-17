import { TeacherAuthGuard } from "@/lib/AuthGuard/TeacherAuthGuard";
import prisma from "@/variables/PrismaVar";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string; name: string }> }
) {
  try {
    // Start Check Teacher Authorize
    const authVerify = await TeacherAuthGuard(req);
    if (!authVerify.isAuthorized || !authVerify.user)
      return authVerify.response;
    // End Check Teacher Authorize

    const { id, name } = await context.params;
    const classRoom = await prisma.class.findUnique({
      where: {
        name,
      },
    });
    if (!classRoom) {
      return NextResponse.json(
        { message: "invalid class name" },
        { status: 404 }
      );
    }
    const student = await prisma.studentClass.findUnique({
      where: {
        classId_studentId: {
          classId: classRoom.id,
          studentId: +id,
        },
      },
    });
    if (!student) {
      return NextResponse.json(
        { message: "Invalid class or student" },
        { status: 404 }
      );
    }

    const exams = await prisma.exam.findMany({
      where: { classId: classRoom.id },
      select: {
        id: true,
        title: true,
        students: {
          where: {
            studentId: student.studentId,
          },
          select: {
            score: true,
          },
        },
        totalMark: true,
      },
    });

    const assignments = await prisma.assignment.findMany({
      where: {
        classId: classRoom.id,
      },
      select: {
        id: true,
        title: true,
        assignmentSubmission: {
          where: {
            studentId: student.studentId,
          },
          select: {
            grade: true,
          },
        },
      },
    });

    const studentExams = exams.map((ex) => ({
      id: ex.id,
      title: ex.title,
      totalMark: ex.totalMark,
      studentDegree: ex.students.length > 0 ? ex.students[0].score : 0,
    }));

    const studentAssignments = assignments.map((assign) => ({
      id: assign.id,
      title: assign.title,
      studentDegree:
        assign.assignmentSubmission.length > 0
          ? assign.assignmentSubmission[0].grade
          : 0,
    }));

    return NextResponse.json({
      exams: studentExams,
      assignments: studentAssignments,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
