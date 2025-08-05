import prisma from "@/variables/PrismaVar";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const years = await prisma.academicYear.findMany({
      select: {
        id: true,
        year_label: true,
        level_number: true,
        _count: {
          select: {
            students: true,
          },
        },
      },
      orderBy: {
        level_number: "asc",
      },
    });
    return NextResponse.json(years, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Server Error => " + error },
      { status: 500 }
    );
  }
}
