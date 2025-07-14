import { TeacherAuthGuard } from "@/lib/AuthGuard/TeacherAuthGuard";
import prisma from "@/variables/PrismaVar";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  params: { params: { id: string } }
) {
  try {
    // Start Check Teacher Authorize
    const authVerify = await TeacherAuthGuard(req);
    if (!authVerify.isAuthorized) return authVerify.response;
    // End Check Teacher Authorize

    const { id } = await params.params;

    const examData = await prisma.exam.findUnique({
      where: {
        id,
      },
      select: {
        title: true,
        class: {
          select: {
            teacher: {
              select: { first_name: true, last_name: true, image: true },
            },
            name: true,
          },
        },
        course: {
          select: {
            course: {
              select: {
                name: true,
              },
            },
          },
        },
        created_at: true,
        duration: true,
        endDate: true,
        startDate: true,
        status: true,
        totalMark: true,
        questions: {
          select: {
            id: true,
            question: true,
            mark: true,
            chooses: true,
            type: true,
            rightAnswer: true,
          },
        },
      },
    });

    if (!examData) {
      return NextResponse.json({ message: "Invalid Exam ID" }, { status: 404 });
    }

    return NextResponse.json(examData, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Server Error =>  " + error },
      { status: 500 }
    );
  }
}
