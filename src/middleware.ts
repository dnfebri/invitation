import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "./lib/token";
import { GetErrorResponse } from "./lib/helpers";

interface AuthenticatedRequest extends NextRequest {
  admin: {
    username: string;
  };
}

let redirectToLogin = false;
export async function middleware(req: NextRequest) {
  let token: string | undefined;

  if (req.cookies.has("token")) {
    token = req.cookies.get("token")?.value;
  } else if (req.headers.get("Authorization")?.startsWith("Bearer ")) {
    token = req.headers.get("Authorization")?.replace("Bearer ", "");
  }

  if (req.nextUrl.pathname.startsWith("/login") && (!token || redirectToLogin))
    return;

  if (!req.nextUrl.pathname.startsWith("/login") && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  if (!token) {
    return GetErrorResponse(
      401,
      "You are not logged in. Please provide a token to gain access."
    );
  }

  const response = NextResponse.next();

  try {
    if (token) {
      const { sub } = await verifyJWT<{ sub: string }>(token);
      response.headers.set("X-USER-ID", sub);
      (req as AuthenticatedRequest).admin = { username: sub };
    }
  } catch (error) {
    redirectToLogin = true;
    if (req.nextUrl.pathname.startsWith("/api")) {
      return GetErrorResponse(401, "Token is invalid or user doesn't exists");
    }

    return NextResponse.redirect(
      new URL(`/login?${new URLSearchParams({ error: "badauth" })}`, req.url)
    );
  }

  const authUser = (req as AuthenticatedRequest).admin;

  if (!authUser) {
    return NextResponse.redirect(
      new URL(
        `/login?${new URLSearchParams({
          error: "badauth",
          forceLogin: "true",
        })}`,
        req.url
      )
    );
  }

  if (req.url.includes("/login") && authUser) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/profile",
    "/login",
    "/admin/:path*",
    "/api/auth/me/:path*",
    "/api/auth/logout",
    "/api/admin/:path*",
  ],
};
