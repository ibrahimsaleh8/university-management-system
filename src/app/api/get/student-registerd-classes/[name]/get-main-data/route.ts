import { StudentAuthGuard } from "@/lib/AuthGuard/StudentAuthGard";
import prisma from "@/variables/PrismaVar";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  params: { params: Promise<{ name: string }> }
) {
  try {
    // Start Check Student Authorize
    const authVerify = await StudentAuthGuard(req);
    if (!authVerify.isAuthorized) return authVerify.response;
    if (!authVerify.user?.data) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    // End Check Student Authorize

    const { name } = await params.params;
    const studentClass = await prisma.class.findUnique({
      where: {
        name,
      },
      select: {
        id: true,
        name: true,
        teacher: {
          select: {
            first_name: true,
            last_name: true,
            gender: true,
            email: true,
            image: true,
          },
        },
        course: {
          select: {
            course: {
              select: {
                name: true,
                code: true,
              },
            },
          },
        },
        _count: {
          select: {
            announcements: true,
            assignments: true,
            exams: true,
            students: true,
          },
        },
        department: {
          select: {
            name: true,
            code: true,
          },
        },
      },
    });
    if (!studentClass) {
      return NextResponse.json({ message: "Class Not Found" }, { status: 404 });
    }
    const resData = {
      id: studentClass.id,
      name: studentClass.name,
      teacher: studentClass.teacher,
      course: studentClass.course.course,
      department: studentClass.department,
      count: {
        announcements: studentClass._count.announcements,
        assignments: studentClass._count.assignments,
        exams: studentClass._count.exams,
        students: studentClass._count.students,
      },
    };
    return NextResponse.json(resData, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error => " + error },
      { status: 500 }
    );
  }
}
