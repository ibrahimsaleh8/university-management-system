import { StudentAuthGuard } from "@/lib/AuthGuard/StudentAuthGard";
import prisma from "@/variables/PrismaVar";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Start Check Student Authorize
    const authVerify = await StudentAuthGuard(req);
    if (!authVerify.isAuthorized) return authVerify.response;
    if (!authVerify.user || !authVerify.user.data) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    // End Check Student Authorize

    const { classId } = (await req.json()) as {
      classId: number;
    };
    if (!classId) {
      return NextResponse.json(
        { message: "class id doesn't exist" },
        { status: 400 }
      );
    }
    const isExistClass = await prisma.class.findUnique({
      where: {
        id: classId,
      },
      select: {
        students: {
          select: {
            studentId: true,
          },
        },
      },
    });
    if (!isExistClass) {
      return NextResponse.json(
        { message: "Class Doesn't Exist" },
        { status: 404 }
      );
    }

    if (
      isExistClass.students.some(
        (s) => s.studentId === authVerify.user.data?.id
      )
    ) {
      return NextResponse.json(
        { message: "User is already exist in class" },
        { status: 400 }
      );
    }

    await prisma.studentClass.create({
      data: {
        classId,
        studentId: authVerify.user.data.id,
      },
    });
    return NextResponse.json(
      { message: "User has been joined to class success" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
