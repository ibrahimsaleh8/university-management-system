import { StudentAuthGuard } from "@/lib/AuthGuard/StudentAuthGard";
import prisma from "@/variables/PrismaVar";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ name: string }> }
) {
  try {
    // Start Check Student Authorize
    const authVerify = await StudentAuthGuard(req);
    if (!authVerify.isAuthorized) return authVerify.response;
    if (!authVerify.user || !authVerify.user.data) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    // End Check Student Authorize
    const { name } = await context.params;
    const studentsClass = await prisma.class.findUnique({
      where: {
        name,
      },
      select: {
        students: {
          select: {
            student: {
              select: {
                id: true,
                email: true,
                first_name: true,
                last_name: true,
                image: true,
              },
            },
          },
        },
      },
    });

    if (!studentsClass) {
      return NextResponse.json({ message: "class not found" }, { status: 404 });
    }
    if (
      !studentsClass.students.find(
        (std) => std.student.id == authVerify.user.data?.id
      )
    ) {
      return NextResponse.json(
        { message: "You are not exist in this class" },
        { status: 403 }
      );
    }

    const studentsRes = studentsClass.students.map((std) => ({
      id: std.student.id,
      email: std.student.email,
      name: `${std.student.first_name} ${std.student.last_name}`,
      image: std.student.image,
    }));

    return NextResponse.json(studentsRes, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
