import { TeacherAuthGuard } from "@/lib/AuthGuard/TeacherAuthGuard";
import prisma from "@/variables/PrismaVar";
import { NextRequest, NextResponse } from "next/server";

export type UpdateStudentDegreeDataType = {
  courseId: string;
  studentId: number;
  degree: number;
};

export async function PATCH(req: NextRequest) {
  try {
    // Start Check Teacher Authorize
    const authVerify = await TeacherAuthGuard(req);
    if (!authVerify.isAuthorized) return authVerify.response;
    // End Check Teacher Authorize
    const { courseId, studentId, degree } =
      (await req.json()) as UpdateStudentDegreeDataType;

    if (!courseId || !studentId || typeof degree !== "number") {
      return NextResponse.json(
        { message: "Invalid request body" },
        { status: 400 }
      );
    }

    const course = await prisma.courseOffering.findUnique({
      where: {
        id: courseId,
      },
      select: {
        students: {
          select: {
            studentId: true,
          },
        },
      },
    });
    if (!course) {
      return NextResponse.json(
        { message: "invalid course id" },
        { status: 400 }
      );
    }
    if (!course.students.find((s) => s.studentId == studentId)) {
      return NextResponse.json(
        { message: "student doesn't exist in course" },
        { status: 400 }
      );
    }
    if (degree < 0 || degree > 100) {
      return NextResponse.json(
        { message: "degree should be between 0 and 100" },
        { status: 400 }
      );
    }
    const enrollment = await prisma.studentEnrollment.findFirst({
      where: {
        studentId,
        courseOfferingId: courseId,
      },
    });

    if (!enrollment) {
      return NextResponse.json(
        { message: "enrollment did't exist" },
        {
          status: 400,
        }
      );
    }

    await prisma.studentEnrollment.update({
      where: {
        id: enrollment.id,
      },
      data: {
        finalGrade: degree,
        status: "COMPLETED",
      },
    });

    return NextResponse.json(
      { message: "Student degree updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
