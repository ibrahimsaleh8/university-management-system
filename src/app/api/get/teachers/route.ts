import { NumberOfTeachers } from "@/variables/Pagination";
import prisma from "@/variables/PrismaVar";
import { NextRequest, NextResponse } from "next/server";

// Get all Teachers
export async function GET(request: NextRequest) {
  try {
    const pageNumber = (await request.nextUrl.searchParams.get("page")) || "1";

    let teachers = [];
    if (pageNumber == "0") {
      teachers = await prisma.teacher.findMany({
        select: {
          id: true,
          first_name: true,
          last_name: true,
          email: true,
          teacher_id: true,
          qualification: true,
        },
        orderBy: {
          first_name: "asc",
        },
      });
    } else {
      teachers = await prisma.teacher.findMany({
        select: {
          id: true,
          first_name: true,
          last_name: true,
          email: true,
          teacher_id: true,
          qualification: true,
        },
        orderBy: {
          first_name: "asc",
        },
        take: NumberOfTeachers,
        skip: NumberOfTeachers * (parseInt(pageNumber) - 1),
      });
    }

    return NextResponse.json(teachers, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Server Error =>  " + error });
  }
}
