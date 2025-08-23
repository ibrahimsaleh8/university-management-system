import prisma from "@/variables/PrismaVar";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const semesters = await prisma.semester.findMany({
      select: {
        id: true,
        name: true,
        startDate: true,
        endDate: true,
        registerBegin: true,
        registerDeadline: true,
        isActive: true,
      },
      orderBy: {
        isActive: "desc",
      },
    });
    return NextResponse.json(semesters, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Server Error =>  " + error },
      { status: 500 }
    );
  }
}
