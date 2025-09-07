import { TeacherAuthGuard } from "@/lib/AuthGuard/TeacherAuthGuard";
import prisma from "@/variables/PrismaVar";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  try {
    // Start Check Teacher Authorize
    const authVerify = await TeacherAuthGuard(req);
    if (!authVerify.isAuthorized || !authVerify.user?.data)
      return authVerify.response;
    // End Check Teacher Authorize

    const { imageUrl, bio } = (await req.json()) as {
      imageUrl: string;
      bio: string | null;
    };

    if (!imageUrl) {
      return NextResponse.json(
        { message: "image url is required" },
        { status: 400 }
      );
    }

    const teacher = await prisma.teacher.findUnique({
      where: {
        email: authVerify.user.data.email,
      },
    });

    if (!teacher) {
      return NextResponse.json(
        { message: "Teacher not found" },
        { status: 404 }
      );
    }

    await prisma.teacher.update({
      where: {
        id: teacher.id,
      },
      data: {
        image: imageUrl,
        biography: bio,
      },
    });

    revalidateTag("teacher_data");

    return NextResponse.json({ imageUrl }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
