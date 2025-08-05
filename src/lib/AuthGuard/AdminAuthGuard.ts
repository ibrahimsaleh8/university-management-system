import { NextRequest, NextResponse } from "next/server";
import { adminVerification } from "../jwtVerifications/AdminVerification";

export async function AdminAuthGuard(req: NextRequest) {
  const authHeader = req.headers.get("Authorization") as string;
  if (!authHeader) {
    return {
      isAuth: false,
      response: NextResponse.json({ message: "Unauthorized" }, { status: 401 }),
    };
  }
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : null;

  if (!token) {
    return {
      isAuth: false,
      response: NextResponse.json({ message: "Unauthorized" }, { status: 401 }),
    };
  }
  try {
    const verifyUser = await adminVerification(token);

    if (!verifyUser.isAdmin) {
      return {
        isAuth: false,
        response: NextResponse.json(
          { message: "Invalid or unauthorized token" },
          { status: 400 }
        ),
      };
    }

    return { isAuthorized: true, user: verifyUser };
  } catch {
    return {
      isAuthorized: false,
      response: NextResponse.json(
        { message: "Invalid token" },
        { status: 401 }
      ),
    };
  }
}
