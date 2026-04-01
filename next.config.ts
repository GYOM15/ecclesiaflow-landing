import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  async rewrites() {
    return [
      {
        source: "/api/members/:path*",
        destination: `${process.env.MEMBERS_API_URL || "http://localhost:8080"}/ecclesiaflow/members/:path*`,
      },
      {
        source: "/api/backend-auth/:path*",
        destination: `${process.env.AUTH_API_URL || "http://localhost:8081"}/ecclesiaflow/auth/:path*`,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains; preload" },
          { key: "Content-Security-Policy", value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https:; font-src 'self'; connect-src 'self' https://auth.gyom-tech.com https://accounts.google.com; frame-ancestors 'none'" },
        ],
      },
    ];
  },
};

export default nextConfig;
