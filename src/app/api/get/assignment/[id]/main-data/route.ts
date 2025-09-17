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
        title: true,
        description: true,
        deadline: true,
        external_url: true,
        teacher: {
          select: {
            first_name: true,
            last_name: true,
            email: true,
            image: true,
          },
        },
        class: {
          select: {
            name: true,
            _count: {
              select: {
                students: true,
              },
            },
          },
        },
        _count: {
          select: {
            assignmentSubmission: true,
          },
        },
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

    const assignmentRes = {
      title: assignment.title,
      description: assignment.description,
      deadline: assignment.deadline,
      external_url: assignment.external_url,
      teacher: assignment.teacher,
      className: assignment.class.name,
      classStudents: assignment.class._count.students,
      submission: assignment._count.assignmentSubmission,
    };
    return NextResponse.json(assignmentRes, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
