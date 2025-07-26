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
    const res = years.filter((y) => y.level_number > 0);
    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Server Error => " + error },
      { status: 500 }
    );
  }
}
