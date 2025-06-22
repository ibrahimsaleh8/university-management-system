import prisma from "@/variables/PrismaVar";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const teachersLength = await prisma.teacher.count();
    return NextResponse.json({ numbers: teachersLength }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Server Error =>  " + error });
  }
}
