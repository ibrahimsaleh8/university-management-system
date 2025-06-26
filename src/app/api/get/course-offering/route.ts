import prisma from "@/variables/PrismaVar";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const offers = await prisma.courseOffering;
  } catch (error) {
    return NextResponse.json({ message: "Server Error =>  " + error });
  }
}
