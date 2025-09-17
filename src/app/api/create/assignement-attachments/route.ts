import { TeacherAuthGuard } from "@/lib/AuthGuard/TeacherAuthGuard";
import {
  AnnouncementAttachmentDataType,
  AnnouncementAttachmentSchema,
} from "@/validation/CreateAttachmentSchema";
import prisma from "@/variables/PrismaVar";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";
export type CreateAssignmentAttachmentDataApi = {
  attachments: AnnouncementAttachmentDataType[];
  assignmentId: string;
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
    const { attachments, assignmentId } =
      (await req.json()) as CreateAssignmentAttachmentDataApi;
    if (!assignmentId) {
      return NextResponse.json(
        { message: "missing assignment id" },
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
    const assignment = await prisma.assignment.findUnique({
      where: { id: assignmentId },
    });
    if (!assignment) {
      return NextResponse.json(
        { message: "assignment not found" },
        { status: 404 }
      );
    }
    const attachmentsData = attachments.map((att) => ({
      assignmentId: assignment.id,
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
    console.error(error);
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
