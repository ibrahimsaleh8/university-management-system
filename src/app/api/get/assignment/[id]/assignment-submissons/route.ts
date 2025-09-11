import { TeacherAuthGuard } from "@/lib/AuthGuard/TeacherAuthGuard";
import prisma from "@/variables/PrismaVar";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // Start Check Teacher Authorize
    const authVerify = await TeacherAuthGuard(req);
    if (!authVerify.isAuthorized || !authVerify.user)
      return authVerify.response;
    // End Check Teacher Authorize

    const { id } = await context.params;
    const assignment = await prisma.assignment.findUnique({
      where: {
        id,
      },
      select: {
        teacher: {
          select: {
            email: true,
          },
        },
        assignmentSubmission: {
          select: {
            id: true,
            external_url: true,
            attachment: {
              select: {
                id: true,
                name: true,
                type: true,
                url: true,
              },
            },
            grade: true,
            status: true,
            submited_at: true,
            student: {
              select: {
                id: true,
                first_name: true,
                last_name: true,
                student_id: true,
                image: true,
              },
            },
          },
        },
        classId: true,
      },
    });
    if (!assignment) {
      return NextResponse.json(
        { message: "Assignment not found" },
        { status: 404 }
      );
    }
    if (assignment.teacher.email != authVerify.user.data?.email) {
      return NextResponse.json(
        { message: "Forbidden access" },
        { status: 403 }
      );
    }
    const studentsClass = await prisma.class.findUnique({
      where: {
        id: assignment.classId,
      },
      select: {
        students: {
          select: {
            student: {
              select: {
                id: true,
                first_name: true,
                last_name: true,
                student_id: true,
                image: true,
              },
            },
          },
        },
      },
    });
    if (!studentsClass) {
      return NextResponse.json(
        { message: "Assignment class not found" },
        { status: 404 }
      );
    }

    const submissionsResponse = studentsClass.students.map((std) => ({
      student: std.student,
      isSubmitted:
        assignment.assignmentSubmission.findIndex(
          (sub) => sub.student.id == std.student.id
        ) != -1,
      submissionData:
        assignment.assignmentSubmission.filter(
          (sub) => sub.student.id == std.student.id
        ).length > 0
          ? assignment.assignmentSubmission.filter(
              (sub) => sub.student.id == std.student.id
            )[0]
          : null,
    }));

    return NextResponse.json(
      submissionsResponse.sort(
        (a, b) => Number(b.isSubmitted) - Number(a.isSubmitted)
      ),
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error => " + error },
      { status: 500 }
    );
  }
}
