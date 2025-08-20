import { TeacherAuthGuard } from "@/lib/AuthGuard/TeacherAuthGuard";
import prisma from "@/variables/PrismaVar";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
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
    const { grade } = (await req.json()) as {
      grade: number;
    };
    if (grade === undefined || grade === null) {
      return NextResponse.json(
        { message: "Grade is required" },
        { status: 400 }
      );
    }
    if (grade < 0 || grade > 100) {
      return NextResponse.json(
        { message: "Grade must be between 0 and 100" },
        { status: 400 }
      );
    }
    const sumbission = await prisma.assignmentSubmission.findUnique({
      where: {
        id,
      },
      select: {
        assignment: {
          select: {
            teacher: {
              select: {
                id: true,
              },
            },
          },
        },
      },
    });

    if (!sumbission) {
      return NextResponse.json(
        { message: "Sumbission not found" },
        { status: 404 }
      );
    }
    if (sumbission.assignment.teacher.id != authVerify.user.data?.id) {
      return NextResponse.json(
        { message: "Forbidden access" },
        { status: 403 }
      );
    }

    await prisma.assignmentSubmission.update({
      where: {
        id,
      },
      data: {
        status: "GRADED",
        grade,
      },
    });

    return NextResponse.json(
      { message: "Submission graded successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error => " + error },
      { status: 500 }
    );
  }
}
