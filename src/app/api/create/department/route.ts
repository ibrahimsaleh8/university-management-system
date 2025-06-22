import { AdminAuthGuard } from "@/lib/AuthGuard/AdminAuthGuard";
import prisma from "@/variables/PrismaVar";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  try {
    const depratmentName = (await req.json()) as {
      name: string;
    };

    // Start Check Admin Authorize
    const authVerify = await AdminAuthGuard(req);
    if (!authVerify.isAuthorized) return authVerify.response;
    // End Check Admin Authorize

    if (!depratmentName.name) {
      return NextResponse.json(
        { message: "Department Name is required" },
        { status: 400 }
      );
    }

    const isExist = await prisma.department.findFirst({
      where: {
        name: { equals: depratmentName.name },
      },
    });

    if (isExist) {
      return NextResponse.json(
        { message: "Department is already exist" },
        { status: 400 }
      );
    }

    await prisma.department.create({
      data: {
        name: depratmentName.name,
      },
    });

    return NextResponse.json(
      {
        message: `Department ${depratmentName.name} has been created successfully`,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Server Error =>  " + error });
  }
}
