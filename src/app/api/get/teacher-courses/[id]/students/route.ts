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
        },
      },
    });
    if (!course) {
      return NextResponse.json(
        { message: "Coures not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(course);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
