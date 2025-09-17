import { AdminAuthGuard } from "@/lib/AuthGuard/AdminAuthGuard";
import {
  addSemesterDataType,
  addSemesterValidation,
} from "@/validation/AddSemesterValidation";
import prisma from "@/variables/PrismaVar";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Start Check Admin Authorize
    const authVerify = await AdminAuthGuard(req);
    if (!authVerify.isAuthorized) return authVerify.response;
    // End Check Admin Authorize

    const semesterData = (await req.json()) as addSemesterDataType;

    const validation = addSemesterValidation.safeParse(semesterData);

    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    const semester = await prisma.semester.findFirst({
      where: {
        name: semesterData.name,
      },
    });

    if (semester) {
      return NextResponse.json(
        { message: "Semester name is already exist" },
        { status: 400 }
      );
    }

    if (semesterData.isActive) {
      const checkAnotherSemester = await prisma.semester.findFirst({
        where: {
          isActive: true,
        },
        select: {
          name: true,
        },
      });

      if (checkAnotherSemester) {
        return NextResponse.json(
          {
            message: `${checkAnotherSemester.name} is current active please update it to be not active or new semester not active`,
          },
          { status: 400 }
        );
      }
    }

    // Create New Semester
    await prisma.semester.create({
      data: {
        name: semesterData.name,
        startDate: semesterData.startDate,
        endDate: semesterData.endDate,
        registerBegin: semesterData.registerBegin,
        registerDeadline: semesterData.registerDeadline,
        isActive: semesterData.isActive,
      },
    });

    return NextResponse.json(
      {
        message: "Semester has been created successfully",
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
