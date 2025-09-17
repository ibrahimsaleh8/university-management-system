import { StudentCoursesResponse } from "@/app/dashboard/student/grades/page";
import { StudentAuthGuard } from "@/lib/AuthGuard/StudentAuthGard";
import { GpaCalc } from "@/lib/GpaCalc";
import prisma from "@/variables/PrismaVar";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // Start Check Student Authorize
    const authVerify = await StudentAuthGuard(req);
    if (!authVerify.isAuthorized) return authVerify.response;
    if (!authVerify.user?.data) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    // End Check Student Authorize

    const studentId = authVerify.user.data.id;

    const courses = await prisma.studentEnrollment.findMany({
      where: { studentId },
      select: {
        id: true,
        finalGrade: true,
        status: true,
        courseOffering: {
          select: {
            semester: { select: { name: true, isActive: true } },
            course: { select: { name: true, code: true, credit_hours: true } },
          },
        },
      },
    });

    const coursesRes = courses.map((course) => ({
      id: course.id,
      grade: course.finalGrade,
      status: course.status,
      name: course.courseOffering.course.name,
      code: course.courseOffering.course.code,
      hours: course.courseOffering.course.credit_hours,
      semester: course.courseOffering.semester,
    }));

    const grouped = coursesRes.reduce((acc, course) => {
      const semName = course.semester.name;
      let semesterGroup = acc.find((g) => g.semester.name === semName);

      if (!semesterGroup) {
        semesterGroup = {
          semester: course.semester,
          courses: [],
          totalHours: 0,
          cumulativeGpa: 0,
        };
        acc.push(semesterGroup);
      }

      const { gpa, letter } = GpaCalc(course.grade ?? 0);

      semesterGroup.courses.push({
        id: course.id,
        status: course.status,
        name: course.name,
        code: course.code,
        hours: course.hours,
        grade: course.grade,
        gpa,
        letter,
      });

      semesterGroup.totalHours += course.hours;
      semesterGroup.cumulativeGpa += gpa * course.hours;

      return acc;
    }, [] as StudentCoursesResponse[]);

    grouped.forEach((g) => {
      g.cumulativeGpa = g.totalHours > 0 ? g.cumulativeGpa / g.totalHours : 0;
    });

    return NextResponse.json(grouped, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
