import prisma from "@/variables/PrismaVar";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const events = await prisma.event.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        time: true,
        isFinished: true,
      },
    });
    const now = Date.now();

    const resEvents = events.map((ev) => {
      const time = new Date(ev.time).getTime();
      const isFinished = time < now;
      return {
        id: ev.id,
        title: ev.title,
        description: ev.description,
        time: ev.time,
        isFinished,
      };
    });

    return NextResponse.json(resEvents, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Server Error =>  " + error },
      { status: 500 }
    );
  }
}
