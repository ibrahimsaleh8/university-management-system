import { StudentAuthGuard } from "@/lib/AuthGuard/StudentAuthGard";
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
    const student = await prisma.student.findUnique({
      where: {
        email: authVerify.user.data.email,
      },
      select: {
        id: true,
      },
    });

    if (!student) {
      return NextResponse.json(
        { message: "Student not found" },
        { status: 404 }
      );
    }

    const classes = await prisma.studentClass.findMany({
      where: {
        student: {
          id: student.id,
        },
        class: {
          course: {
            semester: {
              isActive: true,
            },
          },
        },
      },
      select: {
        classId: true,
        classGrade: true,
        class: {
          select: {
            name: true,
            teacher: {
              select: {
                first_name: true,
                last_name: true,
                email: true,
                image: true,
                gender: true,
              },
            },
            created_at: true,
            course: {
              select: {
                course: {
                  select: {
                    name: true,
                    department: {
                      select: {
                        name: true,
                        code: true,
                      },
                    },
                  },
                },
              },
            },
            _count: {
              select: {
                students: true,
                assignments: true,
                announcements: true,
              },
            },
            wide_image: true,
          },
        },
      },
    });

    const classesRes = classes.map((cls) => ({
      id: cls.classId,
      name: cls.class.name,
      teacher: cls.class.teacher,
      course: {
        name: cls.class.course.course.name,
        department: cls.class.course.course.department,
      },
      wideImage: cls.class.wide_image,
      studentsNumber: cls.class._count.students,
      assignmentsNumber: cls.class._count.assignments,
      announcementsNumber: cls.class._count.announcements,
      created_at: cls.class.created_at,
    }));
    return NextResponse.json(classesRes, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
