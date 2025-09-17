import { TeacherAuthGuard } from "@/lib/AuthGuard/TeacherAuthGuard";
import prisma from "@/variables/PrismaVar";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  params: { params: Promise<{ id: string; name: string }> }
) {
  try {
    // Start Check Teacher Authorize
    const authVerify = await TeacherAuthGuard(req);
    if (!authVerify.isAuthorized) return authVerify.response;
    // End Check Teacher Authorize

    const { id, name } = await params.params;

    const examData = await prisma.exam.findUnique({
      where: {
        id,
        class: {
          name,
        },
      },
      select: {
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

    return NextResponse.json(examData.questions, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
