import { VerifyUserFromToken } from "@/lib/VerifyUserFromToken";
import {
  announcementReplyDataType,
  announcementReplySchema,
} from "@/validation/AnnouncmentReplySchema";
import prisma from "@/variables/PrismaVar";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get("Authorization") as string;
    if (!authHeader) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const verifyUser = VerifyUserFromToken(token);
    if (!verifyUser) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const rplyData = (await req.json()) as announcementReplyDataType;

    const validationMainData = announcementReplySchema.safeParse(rplyData);

    if (!validationMainData.success) {
      return NextResponse.json(
        { message: validationMainData.error.errors[0].message },
        { status: 400 }
      );
    }

    const announcement = await prisma.announcement.findUnique({
      where: {
        id: rplyData.announcementId,
      },
      select: {
        class: {
          select: {
            students: {
              select: {
                studentId: true,
              },
            },
          },
        },
      },
    });
    if (!announcement) {
      return NextResponse.json(
        { message: "Announcment Not Found" },
        { status: 404 }
      );
    }

    const isExistInClassRoom = announcement.class.students.some(
      (std) => std.studentId == verifyUser.userId
    );
    if (!isExistInClassRoom) {
      return NextResponse.json(
        { message: "You are not in the classroom" },
        { status: 400 }
      );
    }
    await prisma.announcementReply.create({
      data: {
        content: rplyData.content,
        announcementId: rplyData.announcementId,
        studentId: verifyUser.userId,
      },
    });
    return NextResponse.json(
      { message: "Reply has been created success" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Server Error =>  " + error },
      { status: 500 }
    );
  }
}
