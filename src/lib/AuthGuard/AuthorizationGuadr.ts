import { NextRequest, NextResponse } from "next/server";
import { VerifyUserFromToken } from "@/lib/VerifyUserFromToken";

export async function authorizeUser(req: NextRequest) {
  const authHeader = req.headers.get("Authorization") as string;

  if (!authHeader) {
    return {
      isAuthorized: false,
      response: NextResponse.json({ message: "Unauthorized" }, { status: 401 }),
    };
  }

  const token = authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : null;

  if (!token) {
    return {
      isAuthorized: false,
      response: NextResponse.json({ message: "Unauthorized" }, { status: 401 }),
    };
  }

  const verifyUser = await VerifyUserFromToken(token);

  if (!verifyUser) {
    return {
      isAuthorized: false,
      response: NextResponse.json({ message: "Unauthorized" }, { status: 401 }),
    };
  }

  return { isAuthorized: true, user: verifyUser };
}
