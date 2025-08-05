import { AdminAuthGuard } from "@/lib/AuthGuard/AdminAuthGuard";
import {
  courseTimeDataType,
  courseTimeSchema,
} from "@/validation/AddCourseTimeSchema";
import prisma from "@/variables/PrismaVar";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Admin authorization
    const authVerify = await AdminAuthGuard(req);
    if (!authVerify.isAuthorized) return authVerify.response;

    const courseTimeData = (await req.json()) as courseTimeDataType;

    const validation = courseTimeSchema.safeParse(courseTimeData);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    // Fetch academic year & schedules in a single query
    const courseOffering = await prisma.courseOffering.findUnique({
      where: { id: courseTimeData.courseOfferingId },
      select: {
        academicYear: {
          select: {
            id: true,
            CourseSchedule: { select: { dayOfWeek: true, startTime: true } },
          },
        },
        teacherId: true,
      },
    });

    if (!courseOffering || !courseOffering.academicYear) {
      return NextResponse.json(
        { message: "Course Offering not linked to a valid Academic Year" },
        { status: 400 }
      );
    }

    const academicYearIdValue = courseOffering.academicYear.id;
    const timesInAcademicYear = courseOffering.academicYear.CourseSchedule;

    // Check if course already scheduled
    const isExist = await prisma.courseSchedule.findFirst({
      where: { courseOfferingId: courseTimeData.courseOfferingId },
    });
    if (isExist) {
      return NextResponse.json(
        { message: "Course is already scheduled" },
        { status: 409 }
      );
    }

    // Check for time conflict in the same academic year
    if (
      timesInAcademicYear.find(
        (c) =>
          c.dayOfWeek === courseTimeData.dayOfWeek &&
          c.startTime === courseTimeData.startTime
      )
    ) {
      return NextResponse.json(
        { message: "This time is already taken, choose another one" },
        { status: 409 }
      );
    }

    await prisma.courseSchedule.create({
      data: {
        dayOfWeek: courseTimeData.dayOfWeek,
        startTime: courseTimeData.startTime,
        courseOfferingId: courseTimeData.courseOfferingId,
        teacherId: courseOffering.teacherId,
        academicYearId: academicYearIdValue,
      },
    });

    return NextResponse.json(
      { message: "Course has been scheduled successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
