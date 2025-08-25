import prisma from "@/variables/PrismaVar";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const courses = await prisma.course.findMany({
      select: {
        id: true,
        code: true,
        name: true,
        credit_hours: true,
        department: { select: { name: true } },
        isElective: true,
      },
      orderBy: {
        name: "asc",
      },
    });
    return NextResponse.json(courses, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Server Error =>  " + error });
  }
}
