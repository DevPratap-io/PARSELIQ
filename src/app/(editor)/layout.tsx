import type { ReactNode } from "react";
import { AuthGate } from "@/components/app/auth-gate";

export default function EditorLayout({ children }: { children: ReactNode }) {
  return <AuthGate>{children}</AuthGate>;
}
