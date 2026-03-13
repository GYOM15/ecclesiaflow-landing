import { NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth.config";

export async function GET() {
  const issuer = process.env.AUTH_KEYCLOAK_ISSUER!;
  const clientId = process.env.AUTH_KEYCLOAK_ID!;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  // Retrieve the id_token before clearing the session.
  // With id_token_hint, Keycloak logs out silently (no confirmation page).
  const session = await auth();
  const idToken = session?.idToken;

  const params = new URLSearchParams({
    client_id: clientId,
    post_logout_redirect_uri: appUrl,
  });

  if (idToken) {
    params.set("id_token_hint", idToken);
  }

  const logoutUrl = `${issuer}/protocol/openid-connect/logout?${params.toString()}`;

  const response = NextResponse.redirect(logoutUrl);

  // Clear NextAuth session cookies server-side (no need for client signOut)
  response.cookies.delete("authjs.session-token");
  response.cookies.delete("__Secure-authjs.session-token");
  response.cookies.delete("authjs.callback-url");
  response.cookies.delete("__Secure-authjs.callback-url");
  response.cookies.delete("authjs.csrf-token");
  response.cookies.delete("__Secure-authjs.csrf-token");

  return response;
}
