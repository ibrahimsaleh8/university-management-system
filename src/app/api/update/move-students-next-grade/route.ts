import { AdminAuthGuard } from "@/lib/AuthGuard/AdminAuthGuard";
import prisma from "@/variables/PrismaVar";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  try {
    // Start Check Teacher Authorize
    const authVerify = await AdminAuthGuard(req);
    if (!authVerify.isAuthorized) return authVerify.response;
    // End Check Teacher Authorize

    const { gradeLevelNumber } = (await req.json()) as {
      gradeLevelNumber: number;
    };
    console.log("gradeLevelNumber", gradeLevelNumber);
    if (!gradeLevelNumber) {
      return NextResponse.json(
        { message: "Level number is missing" },
        { status: 400 }
      );
    }
    const nextGradeLevel = gradeLevelNumber < 4 ? gradeLevelNumber + 1 : 0;
    const nextGradeYear = await prisma.academicYear.findFirst({
      where: {
        level_number: nextGradeLevel,
      },
    });
    if (!nextGradeYear) {
      return NextResponse.json(
        { message: "Something Wrong in Next Grade Year" },
        { status: 400 }
      );
    }
    const students = await prisma.student.updateMany({
      where: {
        academicYear: {
          level_number: gradeLevelNumber,
        },
      },
      data: {
        academicYearId: nextGradeYear.id,
      },
    });
    return NextResponse.json(
      { message: `You Have Updated ${students.count} Students` },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error => " + error },
      { status: 500 }
    );
  }
}
