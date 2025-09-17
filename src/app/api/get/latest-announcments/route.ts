import { TeacherAuthGuard } from "@/lib/AuthGuard/TeacherAuthGuard";
import prisma from "@/variables/PrismaVar";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // Start Check Teacher Authorize
    const authVerify = await TeacherAuthGuard(req);
    if (!authVerify.isAuthorized) return authVerify.response;
    // End Check Teacher Authorize
    if (!authVerify.user?.data) {
      return NextResponse.json({ message: "unauthorized" }, { status: 401 });
    }

    const announcments = await prisma.announcement.findMany({
      where: {
        teacherId: authVerify.user.data.id,
      },
      select: {
        id: true,
        title: true,
        content: true,
        created_at: true,
        class: { select: { name: true } },
      },
      orderBy: {
        created_at: "desc",
      },
      take: 4,
    });
    const announcmentsReply = announcments.map((ann) => ({
      id: ann.id,
      title: ann.title,
      content: ann.content,
      created_at: ann.created_at,
      className: ann.class.name,
    }));
    return NextResponse.json(announcmentsReply, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
