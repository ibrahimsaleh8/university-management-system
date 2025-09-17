import { AdminAuthGuard } from "@/lib/AuthGuard/AdminAuthGuard";
import { UniversityEventDataType } from "@/validation/AddEventSchema";
import { EditEventSchema } from "@/validation/EditEventSchema";
import prisma from "@/variables/PrismaVar";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  params: { params: Promise<{ id: string }> }
) {
  try {
    // Start Check Teacher Authorize
    const authVerify = await AdminAuthGuard(req);
    if (!authVerify.isAuthorized) return authVerify.response;
    // End Check Teacher Authorize

    const { id } = await params.params;

    if (!id) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }
    const eventData = (await req.json()) as UniversityEventDataType;

    const validation = EditEventSchema.safeParse(eventData);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    const isExist = await prisma.event.findUnique({
      where: {
        id,
      },
    });
    if (!isExist) {
      return NextResponse.json(
        { message: "Event doesn't exist" },
        { status: 404 }
      );
    }

    await prisma.event.update({
      where: {
        id,
      },
      data: {
        title: eventData.title,
        description: eventData.description,
        time: eventData.time,
        location: eventData.location,
      },
    });

    return NextResponse.json(
      {
        message: "Event has been updated successfully",
      },
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
