import { StudentAuthGuard } from "@/lib/AuthGuard/StudentAuthGard";
import {
  AnnouncmentReactionDataType,
  CreateAnnouncmentReactionSchema,
} from "@/validation/CreateAnnouncmentReactionSchema";
import prisma from "@/variables/PrismaVar";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Start Check Student Authorize
    const authVerify = await StudentAuthGuard(req);
    if (!authVerify.isAuthorized) return authVerify.response;
    if (!authVerify.user || !authVerify.user.data) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    // End Check Student Authorize

    const reactionData = (await req.json()) as AnnouncmentReactionDataType;
    const validation = CreateAnnouncmentReactionSchema.safeParse(reactionData);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 422 }
      );
    }

    const isExistInClass = await prisma.announcement.findFirst({
      where: {
        id: reactionData.announcmentId,
        class: {
          students: {
            some: {
              studentId: authVerify.user.data.id,
            },
          },
        },
      },
    });

    if (!isExistInClass) {
      return NextResponse.json(
        { message: "Invalid id or token" },
        { status: 400 }
      );
    }

    if (reactionData.reaction == "LIKE") {
      const isExistLike = await prisma.announcementLike.findFirst({
        where: {
          announcementId: reactionData.announcmentId,
          studentId: authVerify.user.data.id,
        },
      });
      //   ADD LIKE
      if (reactionData.operation == "ADD") {
        if (isExistLike) {
          return NextResponse.json(
            { message: "You already liked this announcmnet" },
            { status: 400 }
          );
        }
        await prisma.announcementDisLike.deleteMany({
          where: {
            announcementId: reactionData.announcmentId,
            studentId: authVerify.user.data.id,
          },
        });

        await prisma.announcementLike.create({
          data: {
            announcementId: reactionData.announcmentId,
            studentId: authVerify.user.data.id,
          },
        });
      }
      //   Remove Like
      else if (reactionData.operation == "REMOVE") {
        if (!isExistLike) {
          return NextResponse.json(
            { message: "You can’t remove a like you haven’t added" },
            { status: 400 }
          );
        }
        await prisma.announcementLike.delete({
          where: {
            announcementId_studentId: {
              announcementId: reactionData.announcmentId,
              studentId: authVerify.user.data.id,
            },
          },
        });
      }
    } else if (reactionData.reaction == "DISLIKE") {
      const isExistDisLike = await prisma.announcementDisLike.findFirst({
        where: {
          announcementId: reactionData.announcmentId,
          studentId: authVerify.user.data.id,
        },
      });

      //   ADD DisLIKE
      if (reactionData.operation == "ADD") {
        if (isExistDisLike) {
          return NextResponse.json(
            { message: "You already disliked this announcmnet" },
            { status: 400 }
          );
        }
        await prisma.announcementLike.deleteMany({
          where: {
            announcementId: reactionData.announcmentId,
            studentId: authVerify.user.data.id,
          },
        });

        await prisma.announcementDisLike.create({
          data: {
            announcementId: reactionData.announcmentId,
            studentId: authVerify.user.data.id,
          },
        });
      }
      //   Remove DisLIKE
      else if (reactionData.operation == "REMOVE") {
        if (!isExistDisLike) {
          return NextResponse.json(
            { message: "You can’t remove a dislike you haven’t added" },
            { status: 400 }
          );
        }
        await prisma.announcementDisLike.delete({
          where: {
            announcementId_studentId: {
              announcementId: reactionData.announcmentId,
              studentId: authVerify.user.data.id,
            },
          },
        });
      }
    }

    return NextResponse.json(
      {
        message: `${reactionData.operation.toLowerCase()}ing ${reactionData.reaction.toLowerCase()} has been created success`,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
