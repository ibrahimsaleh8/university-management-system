import { AdminAuthGuard } from "@/lib/AuthGuard/AdminAuthGuard";
import {
  UniversityEventDataType,
  UniversityEventSchema,
} from "@/validation/AddEventSchema";
import prisma from "@/variables/PrismaVar";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Start Check Admin Authorize
    const authVerify = await AdminAuthGuard(req);
    if (!authVerify.isAuthorized) return authVerify.response;
    // End Check Admin Authorize

    const eventData = (await req.json()) as UniversityEventDataType;

    const validation = UniversityEventSchema.safeParse(eventData);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    await prisma.event.create({
      data: {
        title: eventData.title,
        description: eventData.description,
        time: eventData.time,
        location: eventData.location,
      },
    });
    return NextResponse.json(
      { message: "Event has been created successfully" },
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
