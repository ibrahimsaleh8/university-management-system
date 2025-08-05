import { AdminAuthGuard } from "@/lib/AuthGuard/AdminAuthGuard";
import { addCourseSchema, courseDataType } from "@/validation/AddCourseSchema";
import prisma from "@/variables/PrismaVar";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Start Check Admin Authorize
    const authVerify = await AdminAuthGuard(req);
    if (!authVerify.isAuthorized) return authVerify.response;
    // End Check Admin Authorize

    const courseData = (await req.json()) as courseDataType;
    console.log("courseData", courseData);
    const validation = addCourseSchema.safeParse(courseData);

    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );
    }
    const isExist = await prisma.course.findFirst({
      where: {
        OR: [
          {
            name: courseData.name,
          },
          {
            code: courseData.code,
          },
        ],
      },
    });

    if (isExist) {
      const conflictField = isExist.name === courseData.name ? "name" : "code";

      return NextResponse.json(
        { message: `Course ${conflictField} already exists` },
        { status: 400 }
      );
    }

    // Create Course
    await prisma.course.create({
      data: {
        code: courseData.code,
        name: courseData.name,
        credit_hours: courseData.credit_hours,
        isElective: courseData.isElective,
        departmentId: courseData.departmentId,
      },
    });
    return NextResponse.json(
      { message: "Course has been created successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Server Error =>  " + error });
  }
}
