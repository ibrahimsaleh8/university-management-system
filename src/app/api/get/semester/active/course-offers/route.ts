import prisma from "@/variables/PrismaVar";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const courses = await prisma.courseOffering.findMany({
      select: {
        id: true,
        course: {
          select: { name: true },
        },
      },
      where: {
        semester: {
          isActive: true,
        },
      },
    });

    const coursesRes = courses.map((c) => ({
      id: c.id,
      name: c.course.name,
    }));
    return NextResponse.json(coursesRes, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Server Error =>  " + error },
      { status: 500 }
    );
  }
}
