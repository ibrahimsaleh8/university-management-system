import prisma from "@/variables/PrismaVar";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { id } = await context.params;
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
    const teacherScheduals = await prisma.courseSchedule.findMany({
      where: {
        teacherId: +id,
      },
      select: {
        id: true,
        course: { select: { course: { select: { name: true } }, hall: true } },
        academicYear: { select: { year_label: true } },
        dayOfWeek: true,
        startTime: true,
        teacher: { select: { first_name: true, last_name: true } },
      },
    });

    const scheduals = teacherScheduals.map((sched) => ({
      id: sched.id,
      day: sched.dayOfWeek.toLowerCase(),
      time: sched.startTime,
      title: sched.course.course.name,
      hall: sched.course.hall,
      academicYear: sched.academicYear.year_label,
      teacher: `${sched.teacher.first_name} ${sched.teacher.last_name}`,
    }));

    return NextResponse.json(scheduals, { status: 200 });
  } catch (error) {
    console.error("Get Teacher Schedule Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
