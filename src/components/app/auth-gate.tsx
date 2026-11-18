"use client";

import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { auth, type User } from "@/lib/api";

const UserContext = createContext<User | null>(null);
export const useUser = () => {
  const u = useContext(UserContext);
  if (!u) throw new Error("useUser must be used inside AuthGate");
  return u;
};

// Restores the session from the refresh cookie; sends signed-out visitors to /login.
export function AuthGate({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    auth.refresh().then(setUser).catch(() => router.replace("/login"));
  }, [router]);

  if (!user) {
    return (
      <div className="grid flex-1 place-items-center text-sm text-ink-muted">Loading…</div>
    );
  }
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
