import { TeacherAuthGuard } from "@/lib/AuthGuard/TeacherAuthGuard";
import {
  classCreationDataType,
  classCreationSchema,
} from "@/validation/serverValidations/ClassCreationSchema";
import prisma from "@/variables/PrismaVar";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Start Check Teacher Authorize
    const authVerify = await TeacherAuthGuard(req);
    if (!authVerify.isAuthorized) return authVerify.response;
    // End Check Teacher Authorize

    // Start Parameters Validation
    const classData = (await req.json()) as classCreationDataType & {
      imageUrl: string;
    };
    const validation = classCreationSchema.safeParse(classData);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 422 }
      );
    }
    // End Parameters Validation

    const isClassExist = await prisma.class.findFirst({
      where: {
        OR: [
          { name: { equals: classData.name } },
          { courseOfferingId: classData.courseOfferingId },
        ],
      },
    });

    if (isClassExist) {
      return NextResponse.json(
        { message: "Class is already exist" },
        { status: 400 }
      );
    }
    const isCourseExist = await prisma.courseOffering.findUnique({
      where: {
        id: classData.courseOfferingId,
      },
      select: {
        id: true,
        course: {
          select: {
            departmentId: true,
          },
        },
      },
    });
    if (!isCourseExist || !isCourseExist.course.departmentId) {
      return NextResponse.json(
        { message: "Course not found" },
        { status: 404 }
      );
    }

    // Create New Class
    await prisma.class.create({
      data: {
        name: classData.name,
        departmentId: isCourseExist.course.departmentId,
        teacherId: classData.teacherId,
        courseOfferingId: classData.courseOfferingId,
        wide_image: classData.imageUrl,
      },
    });

    return NextResponse.json(
      {
        message: `Class ${classData.name} has been created successfully`,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Server Error =>  " + error });
  }
}
