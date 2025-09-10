import { TeacherAuthGuard } from "@/lib/AuthGuard/TeacherAuthGuard";
import prisma from "@/variables/PrismaVar";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // Await the dynamic route param
    const { id } = await context.params;

    // Start Check Teacher Authorize
    const authVerify = await TeacherAuthGuard(req);
    if (!authVerify.isAuthorized) return authVerify.response;
    // End Check Teacher Authorize

    const isExist = await prisma.announcement.findUnique({
      where: { id },
    });

    if (!isExist) {
      return NextResponse.json(
        { message: "Announcement doesn't exist" },
        { status: 404 }
      );
    }
    const { ids } = (await req.json()) as {
      ids: { id: string }[];
    };

    if (!ids || ids.length == 0) {
      return NextResponse.json(
        { message: "No provided attachments ids" },
        { status: 400 }
      );
    }
    await prisma.announcementAttachment.deleteMany({
      where: {
        id: {
          in: ids.map((i) => i.id),
        },
      },
    });

    return NextResponse.json(
      { message: "Attachments has been deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error => " + error },
      { status: 500 }
    );
  }
}
