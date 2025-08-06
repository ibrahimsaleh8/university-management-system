import { TeacherAuthGuard } from "@/lib/AuthGuard/TeacherAuthGuard";
import {
  examMainDataType,
  examQuestionDataType,
  examQuestionSchema,
  examValidationSchema,
} from "@/validation/AddExamValidation";
import prisma from "@/variables/PrismaVar";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
export type examAllData = {
  examMainData: examMainDataType;
  examQuestionsData: examQuestionDataType[];
};
export async function POST(req: NextRequest) {
  try {
    // Start Check Teacher Authorize
    const authVerify = await TeacherAuthGuard(req);
    if (!authVerify.isAuthorized) return authVerify.response;
    if (!authVerify.user?.data) {
      return NextResponse.json({ message: "unauthorized" }, { status: 401 });
    }
    // End Check Teacher Authorize
    const examData = (await req.json()) as examAllData;

    const validationMainData = examValidationSchema.safeParse(
      examData.examMainData
    );

    if (!validationMainData.success) {
      return NextResponse.json(
        { message: validationMainData.error.errors[0].message },
        { status: 400 }
      );
    }
    const questionValidation = z
      .array(examQuestionSchema)
      .safeParse(examData.examQuestionsData);

    if (!questionValidation.success) {
      return NextResponse.json(
        { message: questionValidation.error.errors[0].message },
        { status: 400 }
      );
    }
    const classData = await prisma.class.findUnique({
      where: { name: examData.examMainData.className.split("%20").join(" ") },
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
        title: examData.examMainData.title,
        startDate: examData.examMainData.startDate,
        status: "SCHEDULED",
        endDate: examData.examMainData.endDate,
        totalMark: examData.examMainData.totalMark,
        classId: classData.id,
        courseOfferingId: classData.courseOfferingId,
        teacherId: authVerify.user.data.id,
        duration: examData.examMainData.duration,
        questions: {
          createMany: { data: examData.examQuestionsData },
        },
      },
    });
    return NextResponse.json(
      { message: "Exam created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.log("Error", error);
    return NextResponse.json(
      { message: `Server Error =>  ${error}` },
      { status: 500 }
    );
  }
}
