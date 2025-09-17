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
    const teacher = await prisma.teacher.findUnique({
      where: { id: authVerify.user.data.id },
    });
    if (!teacher) {
      return NextResponse.json(
        { message: "Teacher not found " },
        { status: 404 }
      );
    }

    const classes = await prisma.class.findMany({
      where: {
        teacherId: teacher.id,
        course: {
          semester: {
            isActive: true,
          },
        },
      },
      select: {
        id: true,
        name: true,
        department: { select: { name: true } },
        wide_image: true,
        _count: { select: { students: true } },
        created_at: true,
      },
    });
    const resClasses = classes.map((cl) => ({
      id: cl.id,
      name: cl.name,
      department: cl.department.name,
      students: cl._count.students,
      wide_image: cl.wide_image,
      created_at: cl.created_at,
    }));
    return NextResponse.json(resClasses, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
