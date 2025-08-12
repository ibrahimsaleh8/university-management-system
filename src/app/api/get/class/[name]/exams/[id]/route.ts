import { TeacherAuthGuard } from "@/lib/AuthGuard/TeacherAuthGuard";
import { ExamStatusCalc } from "@/lib/ExamStatusCalc";
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
      },
    });

    if (!examData) {
      return NextResponse.json({ message: "Invalid Exam ID" }, { status: 404 });
    }
    const calculatedStatus = ExamStatusCalc(
      examData.startDate,
      examData.endDate,
      examData.status
    );
    examData.status = calculatedStatus;
    return NextResponse.json(examData, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Server Error =>  " + error },
      { status: 500 }
    );
  }
}
