"use client";

import {
  ChevronsUpDown,
  Clock,
  FileText,
  FolderPlus,
  Home,
  LogOut,
  Settings,
  Share2,
  Sparkles,
  Star,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Logo } from "@/components/logo";
import { SidebarItem } from "@/components/ui/sidebar-item";
import { Avatar } from "@/components/app/avatar";
import { useUser } from "@/components/app/auth-gate";
import { auth } from "@/lib/api";
import { folders } from "@/lib/mock-data";

const nav = [
  { href: "/dashboard", icon: Home, label: "Home" },
  { href: "/dashboard?view=all", icon: FileText, label: "All documents" },
  { href: "/dashboard?view=recent", icon: Clock, label: "Recent" },
  { href: "/dashboard?view=favorites", icon: Star, label: "Favorites" },
  { href: "/dashboard?view=shared", icon: Share2, label: "Shared with me" },
  { href: "/dashboard?view=trash", icon: Trash2, label: "Trash" },
];

export function Sidebar({ view, folder }: { view?: string; folder?: string }) {
  const user = useUser();
  const pathname = usePathname();
  const router = useRouter();
  const initials = user.name.split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase();

  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-line bg-surface px-3 py-4">
      <div className="px-2">
        <Logo />
      </div>

      <button className="mt-4 flex items-center gap-2 rounded-xl border border-line px-3 py-2 text-left text-sm hover:bg-surface-2">
        <span className="grid size-6 place-items-center rounded-md bg-accent text-xs font-bold">P</span>
        <span className="flex-1 truncate font-medium">ParseIQ Team</span>
        <ChevronsUpDown className="size-4 text-ink-muted" />
      </button>

      <nav className="mt-4 flex flex-col gap-0.5">
        {nav.map((n) => {
          const v = n.href.split("view=")[1];
          const active = pathname === "/dashboard" && !folder && (v ? view === v : !view);
          return <SidebarItem key={n.href} {...n} active={active} />;
        })}
        <SidebarItem href="/assistant" icon={Sparkles} label="AI Assistant" active={pathname === "/assistant"} />
      </nav>

      <div className="mt-6 flex items-center justify-between px-3 text-xs font-medium uppercase tracking-wide text-ink-muted">
        Folders
        <button aria-label="Create folder" className="rounded p-1 hover:bg-surface-2">
          <FolderPlus className="size-4" />
        </button>
      </div>
      <div className="mt-1 flex flex-col gap-0.5 overflow-y-auto">
        {folders.map((f) => (
          <Link
            key={f.id}
            href={`/dashboard?folder=${f.id}`}
            className={`flex h-9 items-center gap-3 rounded-lg px-3 text-sm font-medium ${
              folder === f.id ? "bg-brand/10 text-brand-deep" : "text-ink-muted hover:bg-surface-2 hover:text-ink"
            }`}
          >
            <span className="size-2.5 rounded-full" style={{ background: f.color }} />
            {f.name}
          </Link>
        ))}
      </div>

      <div className="mt-auto flex flex-col gap-1 border-t border-line pt-3">
        <SidebarItem href="#" icon={Settings} label="Settings" />
        <div className="mt-1 flex items-center gap-2 rounded-xl px-2 py-2">
          <Avatar initials={initials} />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">{user.name}</p>
            <p className="truncate text-xs text-ink-muted">{user.email}</p>
          </div>
          <button
            aria-label="Sign out"
            className="rounded p-1.5 text-ink-muted hover:bg-surface-2 hover:text-ink"
            onClick={async () => {
              await auth.logout();
              router.push("/login");
            }}
          >
            <LogOut className="size-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
