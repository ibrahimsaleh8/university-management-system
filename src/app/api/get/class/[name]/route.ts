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
        id: true,
        course: {
          select: { course: { select: { name: true, code: true } } },
        },
        name: true,
        teacher: {
          select: {
            first_name: true,
            last_name: true,
            image: true,
            email: true,
          },
        },
      },
    });

    if (!teacherClass || !teacherClass.course) {
      return NextResponse.json(
        { message: "Class Name Not Found" },
        { status: 404 }
      );
    }
    const classData = {
      course: teacherClass.course.course,
      name: teacherClass.name,
      teacher: teacherClass.teacher,
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
