import { AdminAuthGuard } from "@/lib/AuthGuard/AdminAuthGuard";
import { addCourseSchema, courseDataType } from "@/validation/AddCourseSchema";
import prisma from "@/variables/PrismaVar";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  params: { params: Promise<{ id: string }> }
) {
  try {
    // Start Check Admin Authorize
    const authVerify = await AdminAuthGuard(req);
    if (!authVerify.isAuthorized) return authVerify.response;
    // End Check Admin Authorize
    const { id } = await params.params;

    const courseData = (await req.json()) as courseDataType;

    const validation = addCourseSchema.safeParse(courseData);

    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    const mainCourse = await prisma.course.findUnique({
      where: {
        id: +id,
      },
    });

    if (!mainCourse) {
      return NextResponse.json(
        { message: "Course not found" },
        { status: 404 }
      );
    }

    const isNewNameUnique = await prisma.course.findFirst({
      where: {
        name: courseData.name,
        NOT: { id: mainCourse.id },
      },
    });

    if (isNewNameUnique) {
      return NextResponse.json(
        {
          message: "Name is already exist in another course",
        },
        { status: 400 }
      );
    }

    const isCodeUnique = await prisma.course.findFirst({
      where: {
        code: courseData.code,
        NOT: { id: mainCourse.id },
      },
    });

    if (isCodeUnique) {
      return NextResponse.json(
        { message: "Code is already exist in another course" },
        { status: 400 }
      );
    }

    await prisma.course.update({
      where: {
        id: mainCourse.id,
      },
      data: {
        code: courseData.code,
        credit_hours: courseData.credit_hours,
        isElective: courseData.isElective,
        departmentId: courseData.departmentId,
        name: courseData.name,
      },
    });

    return NextResponse.json(
      {
        message: "Course has been updated successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error => " + error },
      { status: 500 }
    );
  }
}
