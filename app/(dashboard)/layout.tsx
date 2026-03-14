"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/dashboard/sidebar";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { Spinner } from "@/components/ui/spinner";
import { MemberProvider } from "@/contexts/member-context";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Spinner size="lg" />
      </div>
    );
  }

  if (status === "unauthenticated" || session?.error === "RefreshAccessTokenError") {
    router.push("/connexion");
    return null;
  }

  return (
    <MemberProvider>
      <div className="min-h-screen bg-slate-50">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="lg:ml-64">
          <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />
          <main className="p-6">{children}</main>
        </div>
      </div>
    </MemberProvider>
  );
}
