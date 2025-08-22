import { searchMethod } from "@/app/dashboard/admin/teachers/_components/SearchInTeacherTable";
import prisma from "@/variables/PrismaVar";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchMethod = (await request.nextUrl.searchParams.get(
      "method"
    )) as searchMethod;
    const searchTxt = (await request.nextUrl.searchParams.get(
      "text"
    )) as string;
    if (!searchMethod) {
      return NextResponse.json(
        { message: "Please input search method" },
        { status: 400 }
      );
    }
    if (!searchTxt) {
      return NextResponse.json(
        { message: "Please input search Text" },
        { status: 400 }
      );
    }
    let students;

    if (searchMethod == "id") {
      students = await prisma.student.findMany({
        where: {
          student_id: { contains: searchTxt, mode: "insensitive" },
        },
        select: {
          id: true,
          student_id: true,
          first_name: true,
          last_name: true,
          email: true,
          academicYear: { select: { year_label: true } },
          image: true,
        },
      });
    } else if (searchMethod == "email") {
      students = await prisma.student.findMany({
        where: {
          email: { contains: searchTxt, mode: "insensitive" },
        },
        select: {
          id: true,
          student_id: true,
          first_name: true,
          last_name: true,
          email: true,
          image: true,
          academicYear: { select: { year_label: true } },
        },
      });
    } else if (searchMethod == "name") {
      students = await prisma.student.findMany({
        where: {
          first_name: { contains: searchTxt, mode: "insensitive" },
        },
        select: {
          id: true,
          student_id: true,
          first_name: true,
          image: true,
          last_name: true,
          email: true,
          academicYear: { select: { year_label: true } },
        },
      });
    }
    return NextResponse.json(students, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Server Error =>  " + error });
  }
}
// /api/search/teachers
