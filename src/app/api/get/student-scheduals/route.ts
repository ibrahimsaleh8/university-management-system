import { StudentAuthGuard } from "@/lib/AuthGuard/StudentAuthGard";
import prisma from "@/variables/PrismaVar";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // Start Check Student Authorize
    const authVerify = await StudentAuthGuard(req);
    if (!authVerify.isAuthorized) return authVerify.response;
    if (!authVerify.user || !authVerify.user.data) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    // End Check Student Authorize

    const schedules = await prisma.courseSchedule.findMany({
      where: {
        course: {
          students: {
            some: { studentId: authVerify.user.data.id },
          },
          semester: { isActive: true },
        },
      },
      select: {
        id: true,
        course: {
          select: {
            hall: true,
            course: {
              select: {
                name: true,
              },
            },
          },
        },
        academicYear: { select: { year_label: true } },
        dayOfWeek: true,
        startTime: true,
        teacher: { select: { first_name: true, last_name: true } },
      },
    });

    const scheduals = schedules.map((sched) => ({
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
    console.error("Get Student Schedule Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
