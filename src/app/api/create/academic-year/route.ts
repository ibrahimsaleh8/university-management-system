import { AdminAuthGuard } from "@/lib/AuthGuard/AdminAuthGuard";
import {
  academicYearDataType,
  academicYearValidation,
} from "@/validation/AddAcademicYearValidation";
import prisma from "@/variables/PrismaVar";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Start Check Admin Authorize
    const authVerify = await AdminAuthGuard(req);
    if (!authVerify.isAuthorized) return authVerify.response;
    // End Check Admin Authorize

    const academicYearData = (await req.json()) as academicYearDataType;
    const validation = academicYearValidation.safeParse(academicYearData);

    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    const isExist = await prisma.academicYear.findFirst({
      where: {
        OR: [
          { year_label: academicYearData.year_label },
          { level_number: academicYearData.level_number },
        ],
      },
    });

    if (isExist) {
      const msg =
        isExist.year_label === academicYearData.year_label
          ? "Academic Year label already exists"
          : "Academic Year level number already exists";

      return NextResponse.json({ message: msg }, { status: 400 });
    }

    await prisma.academicYear.create({
      data: {
        year_label: academicYearData.year_label,
        level_number: academicYearData.level_number,
      },
    });

    return NextResponse.json(
      { message: "Academic Year has been created successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Server Error => " + error },
      { status: 500 }
    );
  }
}
