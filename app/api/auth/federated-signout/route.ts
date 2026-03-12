import { NextResponse } from "next/server";

export function GET() {
  const issuer = process.env.AUTH_KEYCLOAK_ISSUER!;
  const clientId = process.env.AUTH_KEYCLOAK_ID!;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  const logoutUrl = `${issuer}/protocol/openid-connect/logout?client_id=${encodeURIComponent(clientId)}&post_logout_redirect_uri=${encodeURIComponent(appUrl)}`;

  return NextResponse.redirect(logoutUrl);
}
