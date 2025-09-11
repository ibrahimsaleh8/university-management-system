import { TeacherAuthGuard } from "@/lib/AuthGuard/TeacherAuthGuard";
import {
  assignmentDataType,
  assignmentSchema,
} from "@/validation/AddAssignmentSchema";
import { AnnouncementAttachmentDataType } from "@/validation/CreateAttachmentSchema";
import prisma from "@/variables/PrismaVar";
import { NextRequest, NextResponse } from "next/server";
export type CreateAssignmentAPiDataType = {
  assignmentData: assignmentDataType;
  attachments: AnnouncementAttachmentDataType[];
};
export async function POST(req: NextRequest) {
  try {
    // Start Check Teacher Authorize
    const authVerify = await TeacherAuthGuard(req);
    if (!authVerify.isAuthorized) return authVerify.response;
    // End Check Teacher Authorize
    const { assignmentData, attachments } =
      (await req.json()) as CreateAssignmentAPiDataType;
    const validation = assignmentSchema.safeParse(assignmentData);

    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );
    }
    if (!authVerify.user?.data) {
      return NextResponse.json(
        { message: "Unauthorized: teacher data missing" },
        { status: 401 }
      );
    }
    const assignment = await prisma.assignment.create({
      data: {
        title: assignmentData.title,
        description: assignmentData.description,
        deadline: new Date(assignmentData.deadline),
        external_url: assignmentData.external_url || undefined,
        teacherId: authVerify.user.data.id,
        classId: assignmentData.classId,
      },
    });

    if (attachments.length > 0) {
      const attachmentsData = attachments.map((att) => ({
        name: att.name,
        type: att.type,
        url: att.url,
        assignmentId: assignment.id,
      }));
      await prisma.attachment.createMany({ data: attachmentsData });
    }

    return NextResponse.json(
      { message: "Assignment has been created successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Server Error =>  " + error });
  }
}
