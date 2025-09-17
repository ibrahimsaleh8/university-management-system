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

    const courses = await prisma.courseOffering.findMany({
      where: {
        teacherId: authVerify.user.data.id,
      },
      select: {
        id: true,
        academicYear: { select: { year_label: true } },
        course: {
          select: {
            name: true,
            credit_hours: true,
            code: true,
            isElective: true,
          },
        },
        hall: true,
        semester: { select: { name: true, isActive: true } },
        maxCapacity: true,
        _count: { select: { students: true } },
      },
    });

    const resCourses = courses.map((c) => ({
      id: c.id,
      courseName: c.course.name,
      courseHours: c.course.credit_hours,
      courseCode: c.course.code,
      courseIsElective: c.course.isElective,
      hall: c.hall,
      acdemicYear: c.academicYear.year_label,
      semester: c.semester,
      maxCapacity: c.maxCapacity,
      students: c._count.students,
    }));

    const activeSemesterCourses = resCourses.filter((c) => c.semester.isActive);
    const notActiveSemesterCourses = resCourses.filter(
      (c) => !c.semester.isActive
    );

    return NextResponse.json(
      {
        activeSemesterCourses,
        notActiveSemesterCourses,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
