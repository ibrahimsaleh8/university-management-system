import { TeacherAuthGuard } from "@/lib/AuthGuard/TeacherAuthGuard";
import { AddExamSchema, ExamDataType } from "@/validation/AddExamValidation";

import prisma from "@/variables/PrismaVar";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Start Check Teacher Authorize
    const authVerify = await TeacherAuthGuard(req);
    if (!authVerify.isAuthorized) return authVerify.response;
    if (!authVerify.user?.data) {
      return NextResponse.json({ message: "unauthorized" }, { status: 401 });
    }
    // End Check Teacher Authorize
    const examData = (await req.json()) as ExamDataType;

    const validationMainData = AddExamSchema.safeParse(examData);

    if (!validationMainData.success) {
      return NextResponse.json(
        { message: validationMainData.error.errors[0].message },
        { status: 400 }
      );
    }

    const classData = await prisma.class.findUnique({
      where: { name: examData.className.split("%20").join(" ") },
      select: {
        courseOfferingId: true,
        id: true,
      },
    });
    if (!classData) {
      return NextResponse.json({ message: "No Class Found" }, { status: 404 });
    }

    await prisma.exam.create({
      data: {
        title: examData.title,
        startDate: examData.startDate,
        status: "SCHEDULED",
        endDate: examData.endDate,
        totalMark: examData.totalMark,
        classId: classData.id,
        courseOfferingId: classData.courseOfferingId,
        teacherId: authVerify.user.data.id,
        duration: examData.duration,
        questions: {
          createMany: { data: examData.questions },
        },
        autoMark: examData.autoMark,
      },
    });
    return NextResponse.json(
      { message: "Exam created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
