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

    const student = await prisma.student.findUnique({
      where: {
        id: authVerify.user.data.id,
      },
      include: {
        courses: {
          where: {
            courseOffering: {
              semester: {
                isActive: true,
              },
            },
          },
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
        },
      },
    });
    if (!student || !student.academicYearId) {
      return NextResponse.json(
        { message: "Student not found" },
        { status: 404 }
      );
    }
    const courses = await prisma.courseOffering.findMany({
      where: {
        academicYearId: student.academicYearId,
        semester: {
          isActive: true,
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
            code: true,
            isElective: true,
            credit_hours: true,
            department: {
              select: { code: true, name: true },
            },
          },
        },
        _count: {
          select: {
            students: true,
          },
        },
        hall: true,
        teacher: {
          select: {
            first_name: true,
            last_name: true,
            email: true,
            gender: true,
            image: true,
          },
        },
        students: {
          where: {
            studentId: student.id,
          },
        },
      },
    });

    const totalRegisterdHours = student.courses
      .map((course) => course.courseOffering.course.credit_hours)
      .reduce((f, s) => f + s, 0);

    const coursesRes = courses.map((course) => ({
      id: course.id,
      maxCapacity: course.maxCapacity,
      requiredCourses: course.requiredCourses.map((rc) => ({
        name: rc.requiredCourse.name,
      })),
      semester: {
        name: course.semester.name,
        registerBegin: course.semester.registerBegin,
        registerDeadline: course.semester.registerDeadline,
      },
      course_name: course.course.name,
      course_code: course.course.code,
      course_isElective: course.course.isElective,
      course_hours: course.course.credit_hours,
      registerd: course._count.students,
      course_department: {
        code: course.course.department?.code,
        name: course.course.department?.name,
      },
      isEnrolled: course.students.length > 0,
      hall: course.hall,
      teacher: {
        first_name: course.teacher.first_name,
        last_name: course.teacher.last_name,
        email: course.teacher.email,
        gender: course.teacher.gender,
        image: course.teacher.image,
      },
    }));

    return NextResponse.json(
      { courses: coursesRes, totalRegisterdHours },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error => " + error },
      { status: 500 }
    );
  }
}
