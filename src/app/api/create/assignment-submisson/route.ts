import { StudentAuthGuard } from "@/lib/AuthGuard/StudentAuthGard";
import { AnnouncementAttachmentDataType } from "@/validation/CreateAttachmentSchema";
import prisma from "@/variables/PrismaVar";
import { NextRequest, NextResponse } from "next/server";
export type CreateStudentSubmissionApiDataType = {
  assignmentId: string;
  external_url?: string;
  attachments: AnnouncementAttachmentDataType[];
};
export async function POST(req: NextRequest) {
  try {
    // Start Check Student Authorize
    const authVerify = await StudentAuthGuard(req);
    if (!authVerify.isAuthorized) return authVerify.response;
    if (!authVerify.user || !authVerify.user.data) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    // End Check Student Authorize

    const { assignmentId, external_url, attachments } =
      (await req.json()) as CreateStudentSubmissionApiDataType;

    if (!assignmentId) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const assignment = await prisma.assignment.findUnique({
      where: {
        id: assignmentId,
      },
      select: {
        id: true,
        classId: true,
      },
    });

    if (!assignment) {
      return NextResponse.json(
        { message: "Assignment Not Found" },
        { status: 404 }
      );
    }

    const assignmentClass = await prisma.class.findUnique({
      where: {
        id: assignment.classId,
      },
      select: {
        students: {
          select: {
            studentId: true,
          },
        },
      },
    });

    if (!assignmentClass) {
      return NextResponse.json({ message: "Class Not Found" }, { status: 404 });
    }
    if (
      !assignmentClass.students.some(
        (std) => std.studentId == authVerify.user.data?.id
      )
    ) {
      return NextResponse.json(
        { message: "Student doesn't exist in class" },
        { status: 400 }
      );
    }

    const existingSubmission = await prisma.assignmentSubmission.findFirst({
      where: {
        assignmentId: assignment.id,
        studentId: authVerify.user.data.id,
      },
    });

    if (existingSubmission) {
      return NextResponse.json(
        { message: "You already submitted this assignment." },
        { status: 409 }
      );
    }

    const newSubmission = await prisma.assignmentSubmission.create({
      data: {
        external_url: external_url ?? null,
        assignmentId: assignment.id,
        studentId: authVerify.user.data.id,
        status: "SUBMITTED",
      },
    });

    if (attachments.length > 0) {
      const attachmentsData = attachments.map((att) => ({
        assignmentSubmissionId: newSubmission.id,
        name: att.name,
        type: att.type,
        url: att.url,
      }));
      await prisma.attachment.createMany({
        data: attachmentsData,
      });
    }
    return NextResponse.json(
      { message: "Assignment has been submitted successfully" },
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
