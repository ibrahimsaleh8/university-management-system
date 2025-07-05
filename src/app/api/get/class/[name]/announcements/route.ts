import prisma from "@/variables/PrismaVar";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  context: { params: { name: string } }
) {
  try {
    const { name } = await context.params;
    const teacherClass = await prisma.class.findUnique({
      where: {
        name,
      },
    });
    if (!teacherClass) {
      return NextResponse.json(
        { message: "Class Name Not Found" },
        { status: 404 }
      );
    }
    const announcmnets = await prisma.announcement.findMany({
      where: {
        class: { name },
      },
      select: {
        id: true,
        title: true,
        content: true,
        created_at: true,
        _count: { select: { announcementReplies: true } },
      },
    });
    const announcmnetsData = announcmnets.map((ann) => ({
      id: ann.id,
      title: ann.title,
      content: ann.content,
      created_at: ann.created_at,
      replies: ann._count.announcementReplies,
    }));

    return NextResponse.json(announcmnetsData, { status: 200 });
  } catch (error) {
    console.error("Get Class Data Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
