import { auth } from "@/lib/auth/auth.config";
import { NextResponse } from "next/server";

export const proxy = auth((req) => {
  if (!req.auth && req.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/connexion", req.url));
  }
});

export const config = {
  matcher: ["/onboarding", "/dashboard/:path*"],
};
