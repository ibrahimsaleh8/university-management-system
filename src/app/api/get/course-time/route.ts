import prisma from "@/variables/PrismaVar";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const grade = (await req.nextUrl.searchParams.get("academicYear")) || 1;
    const times = await prisma.courseSchedule.findMany({
      where: {
        academicYear: { level_number: +grade },
      },
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
          },
        },
        teacher: { select: { first_name: true, last_name: true } },
      },
    });

    const scheduledTimes = times.map((t) => ({
      id: t.id,
      title: t.course.course.name,
      day: t.dayOfWeek.toLowerCase(),
      time: t.startTime,
      teacher: `${t.teacher.first_name} ${t.teacher.last_name}`,
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
