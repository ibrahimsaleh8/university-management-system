import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function middleware(req: NextRequest) {
  const token = req.cookies.get("token");
  if (token?.value) {
    if (
      ["/login", "/forgot-password", "/reset-password"].includes(
        req.nextUrl.pathname
      )
    ) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  } else if (req.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/login",
    "/forgot-password",
    "/reset-password",
  ],
};
