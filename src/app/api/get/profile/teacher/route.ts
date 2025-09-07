import { TeacherAuthGuard } from "@/lib/AuthGuard/TeacherAuthGuard";
import prisma from "@/variables/PrismaVar";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // Start Check Teacher Authorize
    const authVerify = await TeacherAuthGuard(req);
    if (!authVerify.isAuthorized || !authVerify.user?.data)
      return authVerify.response;
    // End Check Teacher Authorize

    const teacherData = await prisma.teacher.findUnique({
      where: {
        email: authVerify.user.data.email,
      },
      select: {
        first_name: true,
        last_name: true,
        email: true,
        image: true,
        address: true,
        date_of_birth: true,
        gender: true,
        phone: true,
        _count: {
          select: {
            courses: true,
            classes: true,
          },
        },
        hire_date: true,
        qualification: true,
        teacher_id: true,
        department: {
          select: {
            name: true,
          },
        },
        created_at: true,
        biography: true,
      },
    });
    if (!teacherData) {
      return NextResponse.json(
        { message: "Teacher not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(teacherData, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
