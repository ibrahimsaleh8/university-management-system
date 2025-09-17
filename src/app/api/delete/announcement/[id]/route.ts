import { TeacherAuthGuard } from "@/lib/AuthGuard/TeacherAuthGuard";
import prisma from "@/variables/PrismaVar";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
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

    await prisma.announcementReply.deleteMany({
      where: { announcementId: id },
    });
    await prisma.announcementLike.deleteMany({
      where: { announcementId: id },
    });
    await prisma.announcementDisLike.deleteMany({
      where: { announcementId: id },
    });
    await prisma.attachment.deleteMany({
      where: { announcementId: id },
    });

    await prisma.announcement.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Announcement has been deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
