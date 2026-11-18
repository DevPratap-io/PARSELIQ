import { Suspense } from "react";
import { DashboardView } from "@/components/app/dashboard-view";

export const metadata = { title: "Dashboard — ParseIQ" };

export default function DashboardPage() {
  return (
    <Suspense fallback={null}>
      <DashboardView />
    </Suspense>
  );
}
