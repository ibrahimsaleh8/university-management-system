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
        teacher: {
          select: {
            first_name: true,
            last_name: true,
          },
        },
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
    console.error(error);
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
