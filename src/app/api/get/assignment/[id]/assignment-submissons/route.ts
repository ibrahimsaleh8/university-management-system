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
            grade: true,
            status: true,
            submited_at: true,
            student: {
              select: {
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

    return NextResponse.json(assignment.assignmentSubmission, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error => " + error },
      { status: 500 }
    );
  }
}
