import "next-auth";
import "@auth/core/jwt";

declare module "next-auth" {
  interface Session {
    accessToken: string;
    idToken?: string;
    error?: string;
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    idToken?: string;
    expiresAt?: number;
    error?: string;
  }
}
