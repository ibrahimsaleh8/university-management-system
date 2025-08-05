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
    });
    if (!studentClass) {
      return NextResponse.json({ message: "Class not found" }, { status: 404 });
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
      },
    });
    return NextResponse.json(assignments, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error => " + error },
      { status: 500 }
    );
  }
}
