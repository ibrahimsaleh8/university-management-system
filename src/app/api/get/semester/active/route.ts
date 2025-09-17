import prisma from "@/variables/PrismaVar";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const semesters = await prisma.semester.findFirst({
      select: {
        id: true,
        name: true,
        startDate: true,
        endDate: true,
        registerBegin: true,
        registerDeadline: true,
        isActive: true,
      },
      where: {
        isActive: true,
      },
    });
    return NextResponse.json(semesters, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
