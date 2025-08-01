import { StudentAuthGuard } from "@/lib/AuthGuard/StudentAuthGard";
import prisma from "@/variables/PrismaVar";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // Start Check Student Authorize
    const authVerify = await StudentAuthGuard(req);
    if (!authVerify.isAuthorized) return authVerify.response;
    if (!authVerify.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    // End Check Student Authorize

    const student = await prisma.student.findUnique({
      where: {
        email: authVerify.user.data?.email,
      },
      select: {
        courses: {
          select: {
            id: true,
            status: true,
            courseOffering: {
              select: {
                academicYear: {
                  select: {
                    id: true,
                    year_label: true,
                  },
                },
                semester: {
                  select: {
                    name: true,
                    isActive: true,
                  },
                },
                course: {
                  select: {
                    name: true,
                    code: true,
                    department: {
                      select: {
                        name: true,
                        code: true,
                        id: true,
                      },
                    },
                    isElective: true,
                    credit_hours: true,
                  },
                },
                hall: true,
                courseSchedule: {
                  select: {
                    dayOfWeek: true,
                    startTime: true,
                  },
                },
                teacher: {
                  select: {
                    first_name: true,
                    last_name: true,
                    gender: true,
                    image: true,
                    email: true,
                  },
                },
              },
            },
          },
        },
        departmentId: true,
        academicYearId: true,
      },
    });
    if (!student) {
      return NextResponse.json(
        { message: "Student Not Found" },
        { status: 404 }
      );
    }
    const filterdCourses = student.courses.filter(
      (course) =>
        course.courseOffering.semester.isActive &&
        course.courseOffering.course.department?.id == student.departmentId &&
        course.courseOffering.academicYear.id == student.academicYearId
    );
    const coursesRes = filterdCourses.map((course) => ({
      id: course.id,
      status: course.status,
      courseName: course.courseOffering.course.name,
      courseDepartment: course.courseOffering.course.department,
      courseCode: course.courseOffering.course.code,
      courseIsElective: course.courseOffering.course.isElective,
      courseHours: course.courseOffering.course.credit_hours,
      semester: course.courseOffering.semester.name,
      hall: course.courseOffering.hall,
      courseSchedual: course.courseOffering.courseSchedule[0],
      teacher: course.courseOffering.teacher,
    }));
    return NextResponse.json(coursesRes, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error => " + error },
      { status: 500 }
    );
  }
}
