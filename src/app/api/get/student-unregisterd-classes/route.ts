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
        courses: {
          select: {
            courseOfferingId: true,
          },
          where: {
            courseOffering: {
              semester: {
                isActive: true,
              },
            },
          },
        },

        classes: {
          select: {
            classId: true,
          },
        },
      },
    });
    if (!student) {
      return NextResponse.json(
        { message: "Student Not Found" },
        { status: 404 }
      );
    }

    const notRegisterdClasses = [];

    for (let i = 0; i < student.courses.length; i++) {
      const classe = await prisma.class.findFirst({
        where: {
          courseOfferingId: student.courses[i].courseOfferingId,
          id: {
            notIn: [...student.classes.map((c) => c.classId)],
          },
        },
        select: {
          id: true,
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
      });
      if (classe) {
        notRegisterdClasses.push(classe);
      }
    }

    const classesRes = notRegisterdClasses.map((cls) => ({
      id: cls.id,
      name: cls.name,
      teacher: cls.teacher,
      wideImage: cls.wide_image,
      course: {
        name: cls.course.course.name,
        department: cls.course.course.department,
      },
      studentsNumber: cls._count.students,
      assignmentsNumber: cls._count.assignments,
      announcementsNumber: cls._count.announcements,
      created_at: cls.created_at,
    }));
    return NextResponse.json(classesRes, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error => " + error },
      { status: 500 }
    );
  }
}
