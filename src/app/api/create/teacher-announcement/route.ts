import { TeacherAuthGuard } from "@/lib/AuthGuard/TeacherAuthGuard";
import { AttachmentsFileType } from "@/lib/globalTypes";
import {
  addAnnouncementDataType,
  AddAnnouncementSchema,
} from "@/validation/AddAnnouncementSchema";
import prisma from "@/variables/PrismaVar";
import { NextRequest, NextResponse } from "next/server";
export type CreateTeacherAnnouncmentDataType = addAnnouncementDataType & {
  attachments?: {
    type: AttachmentsFileType;
    name: string;
    url: string;
  }[];
};
export async function POST(req: NextRequest) {
  try {
    // Start Check Teacher Authorize
    const authVerify = await TeacherAuthGuard(req);
    if (!authVerify.isAuthorized) return authVerify.response;
    // End Check Teacher Authorize
    const announcementData =
      (await req.json()) as CreateTeacherAnnouncmentDataType;
    const validation = AddAnnouncementSchema.safeParse(announcementData);

    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );
    }
    const teacherId = authVerify.user?.data?.id;
    if (!teacherId) {
      return NextResponse.json(
        { message: "Unauthorized: Invalid teacher ID" },
        { status: 401 }
      );
    }
    const ann = await prisma.announcement.create({
      data: {
        title: announcementData.title,
        content: announcementData.content,
        classId: announcementData.classId,
        teacherId,
      },
    });

    if (announcementData.attachments) {
      const attachData = announcementData.attachments.map((a) => ({
        announcementId: ann.id,
        type: a.type,
        url: a.url,
        name: a.name,
      }));
      await prisma.announcementAttachment.createMany({
        data: attachData,
      });
    }

    return NextResponse.json(
      {
        message: "Announcement has been published successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Server Error =>  " + error });
  }
}
