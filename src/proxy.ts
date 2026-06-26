import { auth } from "@/lib/auth/auth";
import { NextResponse } from "next/server";

const protectedRoutes = ["/", "/admin"];
const publicRoutes = ["/register", "/login"];

export const proxy = auth((req) => {
  const pathname = req.nextUrl.pathname; //check pahtname
  const isAuthenticated = !!req.auth; // What is Token ?

  // console.log('dddd',pathname)

  const isProtectedRoute = protectedRoutes.some((el) =>
    el === "/" ? pathname === el : pathname.startsWith(el),
  );

  // check is Token  and Not Token is redirect ==> Login
  if (isProtectedRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  const isPublicRoute = publicRoutes.some((el) =>
    el === "/" ? pathname === el : pathname.startsWith(el),
  );

  if (isPublicRoute && isAuthenticated) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
