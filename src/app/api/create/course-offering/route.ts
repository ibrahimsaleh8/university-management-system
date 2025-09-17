import { AdminAuthGuard } from "@/lib/AuthGuard/AdminAuthGuard";
import {
  courseOfferingDataType,
  courseOfferingValidationServer,
} from "@/validation/serverValidations/CourseOfferingValidationServer";
import prisma from "@/variables/PrismaVar";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Start Check Admin Authorize
    const authVerify = await AdminAuthGuard(req);
    if (!authVerify.isAuthorized) return authVerify.response;
    // End Check Admin Authorize
    const courseOfferingData = (await req.json()) as courseOfferingDataType;

    const validation =
      courseOfferingValidationServer.safeParse(courseOfferingData);

    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    const isExist = await prisma.courseOffering.findFirst({
      where: {
        semesterId: courseOfferingData.semesterId,
        courseId: courseOfferingData.courseId,
      },
    });

    if (isExist) {
      return NextResponse.json(
        {
          message: "Course offering is already exist",
        },
        { status: 400 }
      );
    }

    if (courseOfferingData.requiredCoursesId) {
      await prisma.courseOffering.create({
        data: {
          courseId: courseOfferingData.courseId,
          academicYearId: courseOfferingData.academicYearId,
          hall: courseOfferingData.hall,
          maxCapacity: courseOfferingData.maxCapacity,
          semesterId: courseOfferingData.semesterId,
          teacherId: courseOfferingData.teacherId,
          requiredCourses: {
            create: {
              courseId: courseOfferingData.requiredCoursesId,
            },
          },
        },
      });
      return NextResponse.json(
        {
          message: "Course offering has been created successfully",
        },
        { status: 201 }
      );
    }

    // Create course offer
    await prisma.courseOffering.create({
      data: {
        courseId: courseOfferingData.courseId,
        academicYearId: courseOfferingData.academicYearId,
        hall: courseOfferingData.hall,
        maxCapacity: courseOfferingData.maxCapacity,
        semesterId: courseOfferingData.semesterId,
        teacherId: courseOfferingData.teacherId,
      },
    });

    return NextResponse.json(
      {
        message: "Course offering has been created successfully",
      },
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
