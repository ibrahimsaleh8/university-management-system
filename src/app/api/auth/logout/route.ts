import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    (await cookies()).delete("token");

    return NextResponse.json(
      { message: "Logged out success" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Server Error =>  " + error });
  }
}
