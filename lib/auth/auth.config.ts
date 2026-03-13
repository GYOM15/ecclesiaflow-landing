import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Keycloak from "next-auth/providers/keycloak";
import "@/lib/auth/types";

async function refreshAccessToken(token: any) {
  try {
    const url = `${process.env.AUTH_KEYCLOAK_ISSUER}/protocol/openid-connect/token`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: process.env.AUTH_KEYCLOAK_ID!,
        client_secret: process.env.AUTH_KEYCLOAK_SECRET!,
        grant_type: "refresh_token",
        refresh_token: token.refreshToken as string,
      }),
    });

    const refreshed = await response.json();

    if (!response.ok) throw refreshed;

    return {
      ...token,
      accessToken: refreshed.access_token,
      refreshToken: refreshed.refresh_token ?? token.refreshToken,
      idToken: refreshed.id_token ?? token.idToken,
      expiresAt: Math.floor(Date.now() / 1000) + refreshed.expires_in,
    };
  } catch {
    return { ...token, error: "RefreshAccessTokenError" };
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Keycloak({
      clientId: process.env.AUTH_KEYCLOAK_ID!,
      clientSecret: process.env.AUTH_KEYCLOAK_SECRET!,
      issuer: process.env.AUTH_KEYCLOAK_ISSUER!,
    }),
    Credentials({
      id: "credentials",
      name: "Token Login",
      credentials: {
        accessToken: { type: "text" },
        refreshToken: { type: "text" },
        expiresIn: { type: "text" },
      },
      async authorize(credentials) {
        const accessToken = credentials?.accessToken as string;
        const refreshToken = credentials?.refreshToken as string;
        const expiresIn = credentials?.expiresIn as string;

        if (!accessToken || !refreshToken) return null;

        // Return a user object — NextAuth requires at least { id }
        return {
          id: "direct-grant",
          accessToken,
          refreshToken,
          expiresIn: parseInt(expiresIn, 10),
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        if (account.provider === "credentials" && user) {
          // Direct Grant: tokens come from the user object returned by authorize()
          const u = user as any;
          token.accessToken = u.accessToken;
          token.refreshToken = u.refreshToken;
          token.expiresAt = Math.floor(Date.now() / 1000) + u.expiresIn;
        } else {
          // Keycloak OIDC: tokens come from the account object
          token.accessToken = account.access_token;
          token.refreshToken = account.refresh_token;
          token.idToken = account.id_token ?? undefined;
          token.expiresAt = account.expires_at;
        }
      }
      // First login: expiresAt not yet set, return token as-is
      if (!token.expiresAt) return token;
      // Not expired yet
      if (Date.now() < (token.expiresAt as number) * 1000) return token;
      return await refreshAccessToken(token);
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.idToken = token.idToken as string | undefined;
      if (token.error === "RefreshAccessTokenError") {
        session.error = "RefreshAccessTokenError";
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  pages: {
    signIn: "/connexion",
    error: "/connexion",
  },
});
