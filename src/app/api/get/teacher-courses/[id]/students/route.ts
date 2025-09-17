import { TeacherAuthGuard } from "@/lib/AuthGuard/TeacherAuthGuard";
import prisma from "@/variables/PrismaVar";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  params: { params: Promise<{ id: string }> }
) {
  try {
    // Start Check Teacher Authorize
    const authVerify = await TeacherAuthGuard(req);
    if (!authVerify.isAuthorized) return authVerify.response;
    // End Check Teacher Authorize
    const { id } = await params.params;
    const course = await prisma.courseOffering.findUnique({
      where: { id },
      select: {
        students: {
          select: {
            id: true,
            finalGrade: true,
            status: true,
            enrollmentDate: true,
            student: {
              select: {
                id: true,
                first_name: true,
                last_name: true,
                email: true,
                image: true,
              },
            },
          },
          orderBy: [
            { student: { first_name: "asc" } },
            { student: { last_name: "asc" } },
          ],
        },
      },
    });
    if (!course) {
      return NextResponse.json(
        { message: "Course not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(course.students);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
