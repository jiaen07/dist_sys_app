"use client";

import { useAuth } from "@/app/auth/auth-provider";
import { Landing } from "@/app/auth/landing";
import { Dashboard } from "@/components/dashboard";

export default function Home() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-3 px-4 py-24">
        <div
          className="h-9 w-9 animate-spin rounded-full border-2 border-zinc-200 border-t-sky-600 dark:border-zinc-700 dark:border-t-sky-400"
          aria-hidden
        />
        <p className="text-sm text-zinc-500 dark:text-zinc-400">Loading…</p>
      </div>
    );
  }

  if (!user) {
    return <Landing />;
  }

  return <Dashboard />;
}
