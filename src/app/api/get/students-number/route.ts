import prisma from "@/variables/PrismaVar";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const studentsLength = await prisma.student.count();
    return NextResponse.json({ numbers: studentsLength }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Server Error =>  " + error });
  }
}
