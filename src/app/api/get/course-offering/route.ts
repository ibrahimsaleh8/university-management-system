import prisma from "@/variables/PrismaVar";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const offers = await prisma.courseOffering.findMany({
      select: {
        id: true,
        academicYear: {
          select: { year_label: true },
        },
        course: {
          select: { name: true },
        },
        hall: true,
        maxCapacity: true,
        semester: { select: { name: true, isActive: true } },
        _count: {
          select: {
            students: true,
          },
        },
      },
      orderBy: [
        {
          semester: {
            isActive: "desc",
          },
        },
      ],
    });

    return NextResponse.json(offers, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Server Error => " + (error as Error).message },
      { status: 500 }
    );
  }
}
