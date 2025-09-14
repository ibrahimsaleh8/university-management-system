import prisma from "@/variables/PrismaVar";
import { NextResponse } from "next/server";

// Get all Teachers
export async function GET() {
  try {
    const teachers = await prisma.teacher.findMany({
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        teacher_id: true,
        qualification: true,
        image: true,
      },
      orderBy: {
        first_name: "asc",
      },
    });

    return NextResponse.json(teachers, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Server Error =>  " + error });
  }
}
