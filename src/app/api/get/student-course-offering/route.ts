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
        id: true,
        academicYearId: true,
        departmentId: true,
        courses: {
          select: {
            courseOffering: {
              select: {
                course: {
                  select: {
                    credit_hours: true,
                  },
                },
              },
            },
          },
          where: {
            courseOffering: {
              semester: {
                isActive: true,
              },
            },
            status: "ACTIVE",
          },
        },
      },
    });
    if (!student || !student.academicYearId) {
      return NextResponse.json(
        { message: "Student Not Found" },
        { status: 404 }
      );
    }
    const courseOffering = await prisma.courseOffering.findMany({
      where: {
        academicYearId: student.academicYearId,
        semester: {
          isActive: true,
          canEnroll: true,
        },
        course: {
          departmentId: student.departmentId,
        },
      },
      select: {
        id: true,
        maxCapacity: true,
        requiredCourses: {
          select: {
            requiredCourse: {
              select: {
                name: true,
              },
            },
          },
        },
        semester: {
          select: {
            name: true,
            registerBegin: true,
            registerDeadline: true,
          },
        },
        course: {
          select: {
            name: true,
            isElective: true,
            credit_hours: true,
            code: true,
            department: {
              select: {
                code: true,
                name: true,
              },
            },
          },
        },
        students: {
          where: {
            studentId: student.id,
          },
        },
        _count: {
          select: {
            students: true,
          },
        },
        teacher: {
          select: {
            first_name: true,
            last_name: true,
            email: true,
            gender: true,
            image: true,
          },
        },
        hall: true,
      },
    });

    const coursesRes = courseOffering.map((course) => ({
      id: course.id,
      maxCapacity: course.maxCapacity,
      requiredCourses: course.requiredCourses.map((re) => ({
        name: re.requiredCourse.name,
      })),
      semester: course.semester,
      course_name: course.course.name,
      course_code: course.course.code,
      course_isElective: course.course.isElective,
      course_hours: course.course.credit_hours,
      course_department: course.course.department,
      registerd: course._count.students,
      isEnrolled: course.students.length > 0,
      hall: course.hall,
      teacher: course.teacher,
    }));
    const studentTotalHours = student.courses
      .map((c) => c.courseOffering.course.credit_hours)
      .reduce((f, s) => f + s, 0);
    return NextResponse.json(
      { courses: coursesRes, totalRegisterdHours: studentTotalHours },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error => " + error },
      { status: 500 }
    );
  }
}
