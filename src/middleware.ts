// middleware.js
import * as jwtDecode from 'jwt-decode';
import * as jwt from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { UserRoles } from './enum/user-roles.enum';

export async function middleware(req: NextRequest) {
  const token = await jwt.getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const pathname = req.nextUrl.pathname;
  const accessToken = token?.accessToken as string
  if (!token && (pathname === "/login" || pathname === "/register")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if(accessToken){
    const decode = await jwtDecode.jwtDecode(accessToken)
    // @ts-ignore
  if(token && decode.roles === UserRoles.SUPER_ADMIN &&  (pathname === "/login" || pathname === "/register")){
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  // @ts-ignore
  if(token && decode.roles === UserRoles.USER &&  (pathname === "/login" || pathname === "/register")){
    return NextResponse.redirect(new URL("/user", req.url));
  }

  // redirect logged in users away from login/register
  if (token && (pathname === "/login" || pathname === "/register")) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  }

  // redirect if not logged in
  // @ts-ignore



  return NextResponse.next();
}

// run middleware on all routes except auth, static files, and favicon
export const config = {
  matcher: ["/admin/:path*","/user/:path*"], // Protect these routes
};
