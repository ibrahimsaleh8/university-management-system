import prisma from "@/variables/PrismaVar";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  params: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params.params;
    if (!id) {
      return NextResponse.json({ message: "Id is missing" }, { status: 400 });
    }
    const teacher = await prisma.teacher.findUnique({ where: { id: +id } });
    if (!teacher) {
      return NextResponse.json(
        { message: "Teacher doesn't exist" },
        { status: 404 }
      );
    }
    const teacherClasses = await prisma.class.findMany({
      where: {
        teacherId: +id,
      },
      select: { courseOfferingId: true },
    });
    const teacherCourses = await prisma.courseOffering.findMany({
      where: {
        teacherId: +id,
        semester: {
          isActive: true,
        },
      },
      select: {
        id: true,
        course: { select: { name: true } },
      },
    });
    const courses = teacherCourses
      .filter((c) => !teacherClasses.find((e) => e.courseOfferingId === c.id))
      .map((c) => ({
        id: c.id,
        course: c.course.name,
      }));
    return NextResponse.json(courses, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
