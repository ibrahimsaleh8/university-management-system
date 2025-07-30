import { StudentAuthGuard } from "@/lib/AuthGuard/StudentAuthGard";
import prisma from "@/variables/PrismaVar";
import { differenceInHours } from "date-fns";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Start Check Student Authorize
    const authVerify = await StudentAuthGuard(req);
    if (!authVerify.isAuthorized) return authVerify.response;
    if (!authVerify.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    // End Check Student Authorize
    const { courseId } = (await req.json()) as {
      courseId: string;
    };
    if (!courseId || typeof courseId !== "string") {
      return NextResponse.json(
        { message: "Invalid course ID" },
        { status: 400 }
      );
    }

    const student = await prisma.student.findUnique({
      where: {
        email: authVerify.user.data?.email,
      },
    });
    if (!student) {
      return NextResponse.json(
        { message: "Student Not Found" },
        { status: 404 }
      );
    }
    const course = await prisma.courseOffering.findUnique({
      where: {
        id: courseId,
      },
      include: {
        semester: {
          select: {
            registerDeadline: true,
          },
        },
        course: {
          select: {
            name: true,
          },
        },
      },
    });
    if (!course) {
      return NextResponse.json(
        { message: "Course Not Found" },
        { status: 404 }
      );
    }
    const isAfterDeadline =
      differenceInHours(
        new Date(),
        new Date(course.semester.registerDeadline)
      ) > 0;

    if (isAfterDeadline) {
      return NextResponse.json(
        { message: "Register deadline has passed" },
        { status: 400 }
      );
    }
    const alreadyRegistered = await prisma.studentEnrollment.findFirst({
      where: {
        studentId: student.id,
        courseOfferingId: course.id,
      },
    });

    if (alreadyRegistered) {
      return NextResponse.json(
        { message: "Student already registered for this course" },
        { status: 400 }
      );
    }
    await prisma.studentEnrollment.create({
      data: {
        studentId: student.id,
        courseOfferingId: course.id,
      },
    });
    return NextResponse.json({
      message: `Student has been registered to ${course.course.name} course successfully`,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error => " + error },
      { status: 500 }
    );
  }
}
