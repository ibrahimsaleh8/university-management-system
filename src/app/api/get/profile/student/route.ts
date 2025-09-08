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

    const studentData = await prisma.student.findUnique({
      where: {
        email: authVerify.user.data.email,
      },
      select: {
        first_name: true,
        last_name: true,
        email: true,
        image: true,
        department: {
          select: {
            name: true,
            code: true,
          },
        },
        address: true,
        created_at: true,
        date_of_birth: true,
        gender: true,
        phone: true,
        student_id: true,
        courses: {
          select: {
            id: true,
            status: true,
            courseOffering: {
              select: {
                course: {
                  select: {
                    name: true,
                    code: true,
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
          },
        },
        _count: {
          select: {
            courses: true,
            classes: true,
          },
        },
        academicYear: {
          select: {
            year_label: true,
          },
        },
      },
    });
    if (!studentData) {
      return NextResponse.json(
        { message: "Student not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(studentData, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
