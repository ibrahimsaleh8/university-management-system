import { NumberOfStudents } from "@/variables/Pagination";
import prisma from "@/variables/PrismaVar";
import { NextRequest, NextResponse } from "next/server";

// Get all students
export async function GET(request: NextRequest) {
  try {
    const pageNumber = (await request.nextUrl.searchParams.get("page")) || "1";

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
      take: NumberOfStudents,
      skip: NumberOfStudents * (parseInt(pageNumber) - 1),
    });

    return NextResponse.json(students, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server Error =>  " + error });
  }
}
