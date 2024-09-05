export { default } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token =
    request.cookies.get("next-auth.session-token") ||
    request.cookies.get("__Secure-next-auth.session-token");
  const path = request.nextUrl.pathname;

  if (path === "/auth" && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!token && path !== "/auth") {
    return NextResponse.redirect(new URL("/auth", request.url));
  }
  return NextResponse.next();
}

export const config = { matcher: ["/auth", "/dashboard"] };
