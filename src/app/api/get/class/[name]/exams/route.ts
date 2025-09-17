import { ExamStatusCalc } from "@/lib/ExamStatusCalc";
import prisma from "@/variables/PrismaVar";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ name: string }> }
) {
  try {
    const { name } = await context.params;

    const classIsExist = await prisma.class.findUnique({
      where: {
        name,
      },
    });

    if (!classIsExist) {
      return NextResponse.json(
        { message: "Class Doesn't exist" },
        { status: 404 }
      );
    }

    const exams = await prisma.exam.findMany({
      where: {
        classId: classIsExist.id,
      },
      select: {
        id: true,
        duration: true,
        title: true,
        status: true,
        startDate: true,
        endDate: true,
        totalMark: true,
        autoMark: true,
      },
      orderBy: { startDate: "desc" },
    });
    const examsResponse = exams.map((ex) => {
      const calculatedStatus = ExamStatusCalc(
        ex.startDate,
        ex.endDate,
        ex.status
      );
      return {
        id: ex.id,
        title: ex.title,
        status: calculatedStatus,
        startDate: ex.startDate,
        endDate: ex.endDate,
        totalMark: ex.totalMark,
        duration: ex.duration,
        autoMark: ex.autoMark,
      };
    });
    return NextResponse.json(examsResponse, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
