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
        { message: "Please input search by" },
        { status: 400 }
      );
    }
    if (!searchTxt) {
      return NextResponse.json(
        { message: "Please input search Text" },
        { status: 400 }
      );
    }
    let teachers;

    if (searchMethod == "id") {
      teachers = await prisma.teacher.findMany({
        where: {
          teacher_id: { contains: searchTxt, mode: "insensitive" },
        },
        select: {
          id: true,
          first_name: true,
          last_name: true,
          email: true,
          teacher_id: true,
          qualification: true,
          image: true,
        },
      });
    } else if (searchMethod == "email") {
      teachers = await prisma.teacher.findMany({
        where: {
          email: { contains: searchTxt, mode: "insensitive" },
        },
        select: {
          id: true,
          first_name: true,
          last_name: true,
          email: true,
          image: true,
          teacher_id: true,
          qualification: true,
        },
      });
    } else if (searchMethod == "name") {
      teachers = await prisma.teacher.findMany({
        where: {
          first_name: { contains: searchTxt, mode: "insensitive" },
        },
        select: {
          id: true,
          first_name: true,
          last_name: true,
          image: true,
          email: true,
          teacher_id: true,
          qualification: true,
        },
      });
    }

    return NextResponse.json(teachers, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
// /api/search/teachers
