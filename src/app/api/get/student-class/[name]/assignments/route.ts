import { StudentAuthGuard } from "@/lib/AuthGuard/StudentAuthGard";
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

    const assignments = await prisma.assignment.findMany({
      where: {
        classId: studentClass.id,
      },
      select: {
        id: true,
        created_at: true,
        deadline: true,
        description: true,
        title: true,
        external_url: true,
        assignmentSubmission: {
          where: {
            studentId: authVerify.user.data.id,
          },
          select: {
            id: true,
            submited_at: true,
            grade: true,
            status: true,
          },
        },
        attachment: {
          select: {
            id: true,
            name: true,
            type: true,
            url: true,
          },
        },
      },
      orderBy: {
        created_at: "desc",
      },
    });
    const assignmentRes = assignments.map((assig) => ({
      id: assig.id,
      title: assig.title,
      description: assig.description,
      deadline: assig.deadline,
      external_url: assig.external_url,
      created_at: assig.created_at,
      attachments: assig.attachment,
      isSubmited: assig.assignmentSubmission.length > 0,
      isFinished: new Date() > assig.deadline,
      submissionDetails:
        assig.assignmentSubmission.length > 0
          ? {
              id: assig.assignmentSubmission[0].id,
              status: assig.assignmentSubmission[0].status,
              grade: assig.assignmentSubmission[0].grade,
              submited_at: assig.assignmentSubmission[0].submited_at,
            }
          : null,
    }));
    return NextResponse.json(assignmentRes, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
