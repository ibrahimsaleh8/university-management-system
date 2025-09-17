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
    console.error(error);
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
