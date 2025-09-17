import prisma from "@/variables/PrismaVar";
import { NextResponse } from "next/server";

// Get all students
export async function GET() {
  try {
    const students = await prisma.student.findMany({
      select: {
        id: true,
        student_id: true,
        first_name: true,
        last_name: true,
        email: true,
        academicYear: { select: { year_label: true } },
        image: true,
      },
      orderBy: {
        first_name: "asc",
      },
    });

    return NextResponse.json(students, { status: 200 });
  } catch (error) {
    console.error(error);
    console.error(error);
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
