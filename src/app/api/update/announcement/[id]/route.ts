import { TeacherAuthGuard } from "@/lib/AuthGuard/TeacherAuthGuard";
import {
  AnnouncementUpdateSchema,
  annUpdateDataType,
} from "@/validation/EditAnnouncementSchema";
import prisma from "@/variables/PrismaVar";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  params: { params: Promise<{ id: string }> }
) {
  try {
    // Start Check Teacher Authorize
    const authVerify = await TeacherAuthGuard(req);
    if (!authVerify.isAuthorized) return authVerify.response;
    // End Check Teacher Authorize
    const { id } = await params.params;
    const annData = (await req.json()) as annUpdateDataType;

    const validation = AnnouncementUpdateSchema.safeParse(annData);

    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    const isExist = await prisma.announcement.findUnique({
      where: {
        id,
      },
    });
    if (!isExist) {
      return NextResponse.json(
        { message: "Announcement doesn't exist" },
        { status: 404 }
      );
    }

    await prisma.announcement.update({
      where: {
        id,
      },
      data: {
        title: annData.title,
        content: annData.content,
      },
    });

    return NextResponse.json(
      {
        message: "Announcement has been updated successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error => " + error },
      { status: 500 }
    );
  }
}
