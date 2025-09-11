import { TeacherAuthGuard } from "@/lib/AuthGuard/TeacherAuthGuard";
import {
  AnnouncementAttachmentDataType,
  AnnouncementAttachmentSchema,
} from "@/validation/CreateAttachmentSchema";
import prisma from "@/variables/PrismaVar";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";
export type CreateAttachmentDataApi = {
  attachments: AnnouncementAttachmentDataType[];
  annId: string;
};
export async function POST(req: NextRequest) {
  try {
    // Start Check Teacher Authorize
    const authVerify = await TeacherAuthGuard(req);
    if (!authVerify.isAuthorized) return authVerify.response;
    if (!authVerify.user?.data) {
      return NextResponse.json(
        { message: "Unauthorized: teacher data missing" },
        { status: 401 }
      );
    }
    // End Check Teacher Authorize
    const { attachments, annId } =
      (await req.json()) as CreateAttachmentDataApi;
    if (!annId) {
      return NextResponse.json(
        { message: "missing announcment id" },
        { status: 400 }
      );
    }
    const validation = z
      .array(AnnouncementAttachmentSchema)
      .safeParse(attachments);

    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );
    }
    const ann = await prisma.announcement.findUnique({ where: { id: annId } });
    if (!ann) {
      return NextResponse.json(
        { message: "Announcment not found" },
        { status: 404 }
      );
    }
    const attachmentsData = attachments.map((att) => ({
      announcementId: ann.id,
      name: att.name,
      type: att.type,
      url: att.url,
    }));
    await prisma.attachment.createMany({
      data: attachmentsData,
    });

    return NextResponse.json(
      { message: "Attachments has been added successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Server Error =>  " + error });
  }
}
