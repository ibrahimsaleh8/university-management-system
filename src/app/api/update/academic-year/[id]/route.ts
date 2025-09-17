import { AdminAuthGuard } from "@/lib/AuthGuard/AdminAuthGuard";
import {
  academicYearDataType,
  academicYearValidation,
} from "@/validation/AddAcademicYearValidation";
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

    const yearData = (await req.json()) as academicYearDataType;

    const validation = academicYearValidation.safeParse(yearData);

    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    const academicYear = await prisma.academicYear.findUnique({
      where: {
        id: +id,
      },
    });

    if (!academicYear) {
      return NextResponse.json({ message: "Year not found" }, { status: 404 });
    }

    const isDuplicate = await prisma.academicYear.findFirst({
      where: {
        OR: [
          { year_label: yearData.year_label },
          { level_number: yearData.level_number },
        ],
        NOT: { id: academicYear.id },
      },
    });

    if (isDuplicate) {
      const message =
        isDuplicate.level_number == yearData.level_number
          ? "Level number"
          : "Year label";
      return NextResponse.json(
        { message: `${message} already exists in another academic year` },
        { status: 400 }
      );
    }

    await prisma.academicYear.update({
      where: {
        id: +id,
      },
      data: {
        level_number: yearData.level_number,
        year_label: yearData.year_label,
      },
    });

    return NextResponse.json(
      {
        message: "Academic year has been updated successfully",
      },
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
