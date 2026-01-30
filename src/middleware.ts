import * as jwtDecode from "jwt-decode";
import * as jwt from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { UserRoles } from "./enum/user-roles.enum";

export async function middleware(req: NextRequest) {
  const token = await jwt.getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const pathname = req.nextUrl.pathname;

  // redirect not logged in users
  if (!token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  const accessToken = token?.accessToken as string;
  const decode = accessToken ? await jwtDecode.jwtDecode(accessToken) : null;

  if (decode) {
    // SUPER_ADMIN: only allow /admin routes
    if (
      // @ts-ignore
      decode.roles === UserRoles.SUPER_ADMIN &&
      !pathname.startsWith("/admin")
    ) {
      return NextResponse.redirect(new URL("/admin", req.nextUrl.origin));
    }

    // USER: redirect /user root to /user/philid, allow /user/:id
    // @ts-ignore
    if (decode.roles === UserRoles.USER) {
      if (pathname === "/user") {
        return NextResponse.redirect(
          new URL("/user/philid", req.nextUrl.origin)
        );
      }
      if (!pathname.startsWith("/user")) {
        return NextResponse.redirect(
          new URL("/user/philid", req.nextUrl.origin)
        );
      }
    }
  }

  return NextResponse.next();
}

// apply middleware to /admin and /user routes
export const config = {
  matcher: ["/admin/:path*", "/user/:path*"],
};
