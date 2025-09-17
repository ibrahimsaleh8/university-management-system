import { TeacherAuthGuard } from "@/lib/AuthGuard/TeacherAuthGuard";
import prisma from "@/variables/PrismaVar";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // Start Check Teacher Authorize
    const authVerify = await TeacherAuthGuard(req);
    if (!authVerify.isAuthorized) return authVerify.response;
    // End Check Teacher Authorize
    if (!authVerify.user?.data) {
      return NextResponse.json({ message: "unauthorized" }, { status: 401 });
    }

    const teacherScheduals = await prisma.courseSchedule.findMany({
      where: {
        teacherId: +authVerify.user.data.id,
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
    console.error(error);
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
