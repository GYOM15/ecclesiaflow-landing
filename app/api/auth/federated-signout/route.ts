import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const issuer = process.env.AUTH_KEYCLOAK_ISSUER!;
  const clientId = process.env.AUTH_KEYCLOAK_ID!;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  // Read id_token from temporary cookie set by sidebar before signOut()
  const hint = request.cookies.get("ef_logout_hint")?.value;
  const idToken = hint ? decodeURIComponent(hint) : undefined;

  const params = new URLSearchParams({
    client_id: clientId,
    post_logout_redirect_uri: appUrl,
  });

  if (idToken) {
    params.set("id_token_hint", idToken);
  }

  const logoutUrl = `${issuer}/protocol/openid-connect/logout?${params.toString()}`;

  const response = NextResponse.redirect(logoutUrl);

  // Clear the hint cookie (auth cookies already cleared by signOut)
  response.cookies.set("ef_logout_hint", "", { path: "/", maxAge: 0 });

  return response;
}
