import prisma from "@/variables/PrismaVar";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ id: number }>;
  }
) {
  try {
    const { id } = await params;
    const teachers = await prisma.teacher.findMany({
      where: {
        departmentId: +id,
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
      orderBy: {
        first_name: "asc",
      },
    });
    return NextResponse.json(teachers, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Server Error =>  " + error });
  }
}
