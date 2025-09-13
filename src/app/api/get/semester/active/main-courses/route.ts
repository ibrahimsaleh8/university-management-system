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
        department: { select: { name: true, id: true } },
        isElective: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    const coursesOffering = await prisma.courseOffering.findMany({
      where: {
        semester: {
          isActive: true,
        },
      },
      select: {
        courseId: true,
      },
    });

    const coursesRes = courses.filter(
      (c) => !coursesOffering.find((cf) => cf.courseId == c.id)
    );
    console.log("coursesRes", coursesRes);
    return NextResponse.json(coursesRes, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Server Error =>  " + error });
  }
}
