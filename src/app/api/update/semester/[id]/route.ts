import { AdminAuthGuard } from "@/lib/AuthGuard/AdminAuthGuard";
import { addSemesterDataType } from "@/validation/AddSemesterValidation";
import { editSemesterValidation } from "@/validation/EditSemesetrSchema";
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

    const semesterData = (await req.json()) as addSemesterDataType;

    const validation = editSemesterValidation.safeParse(semesterData);

    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    const semester = await prisma.semester.findUnique({
      where: {
        id,
      },
    });

    if (!semester) {
      return NextResponse.json(
        { message: "Semester not found" },
        { status: 404 }
      );
    }

    const isNewNameUnique = await prisma.semester.findFirst({
      where: {
        name: semesterData.name,
        NOT: { id: id },
      },
    });
    if (isNewNameUnique) {
      return NextResponse.json(
        {
          message: "Name is already exist in another semester",
        },
        { status: 400 }
      );
    }

    if (semesterData.isActive) {
      const checkAnotherSemester = await prisma.semester.findFirst({
        where: {
          isActive: true,
          NOT: { id: id },
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

    await prisma.semester.update({
      where: {
        id,
      },
      data: {
        name: semesterData.name,
        startDate: new Date(semesterData.startDate),
        endDate: new Date(semesterData.endDate),
        registerBegin: new Date(semesterData.registerBegin),
        registerDeadline: new Date(semesterData.registerDeadline),
        isActive: semesterData.isActive,
      },
    });

    return NextResponse.json(
      {
        message: "Semester has been updated successfully",
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
