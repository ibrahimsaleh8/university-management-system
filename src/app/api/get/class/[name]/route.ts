import prisma from "@/variables/PrismaVar";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ name: string }> }
) {
  try {
    const { name } = await context.params;

    const teacherClass = await prisma.class.findUnique({
      where: {
        name,
      },
      select: {
        course: {
          select: { id: true, course: { select: { name: true, code: true } } },
        },
        exams: {
          select: {
            id: true,
            title: true,
            startDate: true,
            endDate: true,
            status: true,
          },
        },
        _count: {
          select: {
            students: true,
          },
        },
        name: true,
        teacher: { select: { first_name: true, last_name: true } },
        id: true,
      },
    });

    if (!teacherClass) {
      return NextResponse.json(
        { message: "Class Name Not Found" },
        { status: 404 }
      );
    }
    const classData = {
      course: {
        id: teacherClass?.course.id,
        name: teacherClass?.course.course.name,
      },

      exams: teacherClass.exams,
      students: teacherClass._count.students,
      name: teacherClass.name,
      teacher: `${teacherClass.teacher.first_name} ${teacherClass.teacher.last_name}`,
      classId: teacherClass.id,
    };

    return NextResponse.json(classData, { status: 200 });
  } catch (error) {
    console.error("Get Class Data Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
