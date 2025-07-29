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
        academicYearId: true,
        departmentId: true,
      },
    });
    if (!student || !student.academicYearId) {
      return NextResponse.json(
        { message: "Student Not Found" },
        { status: 404 }
      );
    }
    console.log("Student Department Id => " + student.departmentId);
    console.log("Student Yeaer Id => " + student.academicYearId);
    const courseOffering = await prisma.courseOffering.findMany({
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
              },
            },
          },
        },
        _count: {
          select: {
            students: true,
          },
        },
      },
    });

    const coursesRes = courseOffering.map((course) => ({
      id: course.id,
      maxCapacity: course.maxCapacity,
      requiredCourses: course.requiredCourses.map((re) => ({
        name: re.requiredCourse.name,
      })),
      semester: course.semester.name,
      course_name: course.course.name,
      course_code: course.course.code,
      course_isElective: course.course.isElective,
      course_hours: course.course.credit_hours,
      course_department: course.course.department?.code,
      registerd: course._count.students,
    }));
    return NextResponse.json(coursesRes, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error => " + error },
      { status: 500 }
    );
  }
}
