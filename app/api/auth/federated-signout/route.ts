import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth.config";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const issuer = process.env.AUTH_KEYCLOAK_ISSUER!;
  const clientId = process.env.AUTH_KEYCLOAK_ID!;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  // Try to get id_token from session (available when cookies still exist)
  const session = await auth();
  let idToken = session?.idToken;

  // Fallback: read from temporary cookie set by client before signOut()
  if (!idToken) {
    const hint = request.cookies.get("ef_logout_hint")?.value;
    if (hint) idToken = decodeURIComponent(hint);
  }

  const params = new URLSearchParams({
    client_id: clientId,
    post_logout_redirect_uri: appUrl,
  });

  if (idToken) {
    params.set("id_token_hint", idToken);
  }

  const logoutUrl = `${issuer}/protocol/openid-connect/logout?${params.toString()}`;

  const response = NextResponse.redirect(logoutUrl);

  // Clear all auth cookies with explicit path matching
  const clearOpts = { path: "/", maxAge: 0 };
  response.cookies.set("authjs.session-token", "", clearOpts);
  response.cookies.set("__Secure-authjs.session-token", "", { ...clearOpts, secure: true });
  response.cookies.set("authjs.callback-url", "", clearOpts);
  response.cookies.set("__Secure-authjs.callback-url", "", { ...clearOpts, secure: true });
  response.cookies.set("authjs.csrf-token", "", clearOpts);
  response.cookies.set("__Secure-authjs.csrf-token", "", { ...clearOpts, secure: true });
  response.cookies.set("ef_logout_hint", "", clearOpts);

  return response;
}
