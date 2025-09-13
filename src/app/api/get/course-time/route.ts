import prisma from "@/variables/PrismaVar";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const times = await prisma.courseSchedule.findMany({
      select: {
        id: true,
        dayOfWeek: true,
        startTime: true,
        course: {
          select: {
            course: {
              select: {
                name: true,
              },
            },
            teacher: { select: { first_name: true, last_name: true } },
          },
        },
        academicYear: {
          select: {
            year_label: true,
          },
        },
      },
      where: {
        course: {
          semester: {
            isActive: true,
          },
        },
      },
    });

    const scheduledTimes = times.map((t) => ({
      id: t.id,
      title: t.course.course.name,
      day: t.dayOfWeek.toLowerCase(),
      time: t.startTime,
      teacher: `${t.course.teacher.first_name} ${t.course.teacher.last_name}`,
      academicYear: t.academicYear.year_label,
    }));
    return NextResponse.json(scheduledTimes, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
