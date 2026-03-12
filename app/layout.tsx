import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AuthSessionProvider } from "@/components/providers/session-provider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "EcclesiaFlow — Gestion d'église moderne",
    template: "%s | EcclesiaFlow",
  },
  description:
    "La plateforme tout-en-un qui simplifie la gestion de votre église, connecte vos membres et libère votre temps pour servir votre communauté.",
  keywords: [
    "gestion église",
    "logiciel église",
    "church management",
    "EcclesiaFlow",
    "gestion communauté chrétienne",
  ],
  authors: [{ name: "EcclesiaFlow" }],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "EcclesiaFlow",
    title: "EcclesiaFlow — Gestion d'église moderne",
    description:
      "La plateforme tout-en-un qui simplifie la gestion de votre église et connecte votre communauté.",
  },
  twitter: {
    card: "summary_large_image",
    title: "EcclesiaFlow — Gestion d'église moderne",
    description:
      "La plateforme tout-en-un qui simplifie la gestion de votre église et connecte votre communauté.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={inter.variable}>
      <body className="font-sans antialiased bg-white text-slate-900">
        <AuthSessionProvider>{children}</AuthSessionProvider>
      </body>
    </html>
  );
}
