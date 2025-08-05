import prisma from "@/variables/PrismaVar";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const classes = await prisma.class.findMany({
      select: {
        id: true,
        name: true,
      },
    });
    return NextResponse.json(classes);
  } catch (error) {
    return NextResponse.json({ message: "Server Error =>  " + error });
  }
}
