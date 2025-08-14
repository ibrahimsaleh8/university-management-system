import { TeacherAuthGuard } from "@/lib/AuthGuard/TeacherAuthGuard";
import prisma from "@/variables/PrismaVar";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  params: { params: Promise<{ id: string }> }
) {
  try {
    // Start Check Teacher Authorize
    const authVerify = await TeacherAuthGuard(req);
    if (!authVerify.isAuthorized) return authVerify.response;
    // End Check Teacher Authorize

    const { id } = await params.params;

    const examSubmissons = await prisma.studentExam.findMany({
      where: {
        examId: id,
      },
      select: {
        student: {
          select: {
            student_id: true,
            image: true,
            first_name: true,
            last_name: true,
          },
        },
        score: true,
        isSubmitted: true,
        isMarked: true,
        exam: {
          select: {
            totalMark: true,
          },
        },
      },
    });

    return NextResponse.json(examSubmissons, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Server Error =>  " + error },
      { status: 500 }
    );
  }
}
