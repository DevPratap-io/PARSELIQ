"use client";

import {
  FilePlus2,
  FileUp,
  FolderOpen,
  LayoutGrid,
  List,
  Search,
  SearchX,
  Sparkles,
  X,
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useUser } from "@/components/app/auth-gate";
import { DocCard, DocCardSkeleton } from "@/components/app/doc-card";
import { Sidebar } from "@/components/app/sidebar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { activity, documents, folders, typeLabel, type FileType } from "@/lib/mock-data";

const types: FileType[] = ["pdf", "docx", "md", "txt"];
type Sort = "modified" | "name" | "size";

const viewTitles: Record<string, string> = {
  all: "All documents",
  recent: "Recent",
  favorites: "Favorites",
  shared: "Shared with me",
  trash: "Trash",
};

const chip = (on: boolean) =>
  cn(
    "h-8 rounded-full border px-3 text-[13px] font-medium",
    on ? "border-brand bg-brand/10 text-brand-deep" : "border-line bg-surface text-ink-muted hover:bg-surface-2",
  );

function toggle(set: Set<string>, id: string) {
  const n = new Set(set);
  if (n.has(id)) n.delete(id);
  else n.add(id);
  return n;
}

export function DashboardView() {
  const params = useSearchParams();
  const view = params.get("view") ?? undefined;
  const folderId = params.get("folder") ?? undefined;
  const forceEmpty = params.get("empty") === "1";
  const user = useUser();

  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<FileType | null>(null);
  const [onlyStarred, setOnlyStarred] = useState(false);
  const [sort, setSort] = useState<Sort>("modified");
  const [layout, setLayout] = useState<"grid" | "list">("grid");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [starred, setStarred] = useState<Set<string>>(
    () => new Set(documents.filter((d) => d.starred).map((d) => d.id)),
  );

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  const folder = folders.find((f) => f.id === folderId);
  const isHome = !view && !folder;

  const results = useMemo(() => {
    if (forceEmpty || view === "trash" || view === "shared") return [];
    let list = documents.filter((d) => {
      if (folder && d.folderId !== folder.id) return false;
      if (view === "favorites" && !starred.has(d.id)) return false;
      if (typeFilter && d.type !== typeFilter) return false;
      if (onlyStarred && !starred.has(d.id)) return false;
      const q = query.trim().toLowerCase();
      if (!q) return true;
      return [d.title, d.excerpt, ...d.tags].join(" ").toLowerCase().includes(q);
    });
    if (view === "recent") list = list.slice(0, 6);
    if (sort === "name") list = [...list].sort((a, b) => a.title.localeCompare(b.title));
    if (sort === "size") list = [...list].sort((a, b) => b.words - a.words);
    return list;
  }, [folder, view, starred, typeFilter, onlyStarred, query, sort, forceEmpty]);

  const filtersActive = Boolean(typeFilter || onlyStarred || query);
  const title = folder?.name ?? (view ? viewTitles[view] : `Welcome back, ${user.name.split(" ")[0]}`);
  const showHome = isHome && !query && !loading && !forceEmpty;
  const gridClass = layout === "grid" ? "grid grid-cols-4 gap-4" : "flex flex-col gap-2";

  const card = (d: (typeof documents)[number], l: "grid" | "list") => (
    <DocCard
      key={d.id}
      doc={d}
      layout={l}
      selected={selected.has(d.id)}
      starred={starred.has(d.id)}
      onSelect={() => setSelected((s) => toggle(s, d.id))}
      onStar={() => setStarred((s) => toggle(s, d.id))}
    />
  );

  return (
    <div className="flex min-h-screen">
      <Sidebar view={view} folder={folderId} />
      <main className="min-w-0 flex-1 px-10 py-8">
        <div className="flex items-start justify-between gap-6">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
            <p className="mt-1 text-sm text-ink-muted">
              {isHome
                ? "Everything your team knows, organized and searchable."
                : `${results.length} ${results.length === 1 ? "document" : "documents"}`}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <FileUp className="size-4" />
              Upload
            </Button>
            <Link href="/editor/product-strategy-2026">
              <Button>
                <FilePlus2 className="size-4" />
                New document
              </Button>
            </Link>
          </div>
        </div>

        <label className="relative mt-6 block">
          <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-ink-muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search titles, content and tags…"
            aria-label="Search documents"
            className="h-12 w-full rounded-2xl border border-line bg-surface pl-11 pr-4 text-sm shadow-card placeholder:text-ink-muted focus:border-brand focus:outline-2 focus:outline-brand/20"
          />
        </label>

        {showHome && (
          <>
            <section className="mt-8 grid grid-cols-[1fr_320px] gap-6">
              <div className="rounded-card border border-line bg-accent-light/60 p-5">
                <Badge tone="ai">
                  <Sparkles className="mr-1 size-3" />
                  AI insight
                </Badge>
                <p className="mt-3 text-sm leading-6">
                  <strong>Product Strategy 2026</strong> was updated today. Three action items are due
                  before Dec 12, and the pricing section changed since you last read it.
                </p>
                <Link href="/documents/product-strategy-2026" className="mt-3 inline-block text-sm font-medium text-brand-deep">
                  Review summary →
                </Link>
              </div>
              <div className="rounded-card border border-line bg-surface p-5">
                <h2 className="text-sm font-semibold">Team activity</h2>
                <ul className="mt-3 flex flex-col gap-2.5 text-[13px] text-ink-muted">
                  {activity.map((a) => (
                    <li key={a.doc}>
                      <span className="font-medium text-ink">{a.who}</span> {a.what} {a.doc}
                      <span className="block text-xs">{a.when}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
            <section className="mt-8">
              <h2 className="text-lg font-semibold">Recent documents</h2>
              <div className="mt-3 grid grid-cols-4 gap-4">{documents.slice(0, 4).map((d) => card(d, "grid"))}</div>
            </section>
          </>
        )}

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-semibold">
            {query ? `Search results for “${query}”` : isHome ? "All documents" : title}
          </h2>
          <div className="flex items-center gap-2">
            {types.map((t) => (
              <button key={t} aria-pressed={typeFilter === t} onClick={() => setTypeFilter(typeFilter === t ? null : t)} className={chip(typeFilter === t)}>
                {typeLabel[t]}
              </button>
            ))}
            <button aria-pressed={onlyStarred} onClick={() => setOnlyStarred(!onlyStarred)} className={chip(onlyStarred)}>
              Starred
            </button>
            <select
              aria-label="Sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="h-8 rounded-lg border border-line bg-surface px-2 text-[13px]"
            >
              <option value="modified">Last modified</option>
              <option value="name">Name</option>
              <option value="size">Size</option>
            </select>
            <div className="flex rounded-lg border border-line bg-surface p-0.5">
              {(["grid", "list"] as const).map((l) => (
                <button
                  key={l}
                  aria-label={`${l} view`}
                  aria-pressed={layout === l}
                  onClick={() => setLayout(l)}
                  className={cn("rounded-md p-1.5", layout === l ? "bg-surface-2 text-ink" : "text-ink-muted")}
                >
                  {l === "grid" ? <LayoutGrid className="size-4" /> : <List className="size-4" />}
                </button>
              ))}
            </div>
          </div>
        </div>

        {filtersActive && (
          <div className="mt-3 flex flex-wrap items-center gap-2 text-[13px]">
            <span className="text-ink-muted">Active filters:</span>
            {typeFilter && <Badge tone="brand">{typeLabel[typeFilter]}</Badge>}
            {onlyStarred && <Badge tone="brand">Starred</Badge>}
            {query && <Badge tone="brand">“{query}”</Badge>}
            <button
              onClick={() => {
                setTypeFilter(null);
                setOnlyStarred(false);
                setQuery("");
              }}
              className="inline-flex items-center gap-1 font-medium text-brand-deep"
            >
              <X className="size-3" />
              Clear all
            </button>
          </div>
        )}

        {selected.size > 0 && (
          <div className="mt-4 flex items-center justify-between rounded-xl bg-ink px-4 py-2.5 text-sm text-white">
            <span>{selected.size} selected</span>
            <span className="flex gap-2">
              <button className="rounded-lg px-3 py-1 hover:bg-white/10">Move</button>
              <button className="rounded-lg px-3 py-1 hover:bg-white/10">Download</button>
              <button className="rounded-lg px-3 py-1 text-[#FF9B94] hover:bg-white/10">Delete</button>
              <button onClick={() => setSelected(new Set())} className="rounded-lg px-3 py-1 hover:bg-white/10">
                Cancel
              </button>
            </span>
          </div>
        )}

        <div className="mt-4">
          {loading ? (
            <div className={gridClass}>
              {Array.from({ length: 8 }, (_, i) => (
                <DocCardSkeleton key={i} layout={layout} />
              ))}
            </div>
          ) : results.length === 0 ? (
            <EmptyState query={query} filtersActive={filtersActive} view={view} forceEmpty={forceEmpty} />
          ) : (
            <div className={gridClass}>{results.map((d) => card(d, layout))}</div>
          )}
        </div>
      </main>
    </div>
  );
}

function EmptyState({
  query,
  filtersActive,
  view,
  forceEmpty,
}: {
  query: string;
  filtersActive: boolean;
  view?: string;
  forceEmpty: boolean;
}) {
  const noResults = filtersActive && !forceEmpty;
  const Icon = noResults ? SearchX : FolderOpen;
  const heading = noResults
    ? query
      ? `No results for “${query}”`
      : "No documents match these filters"
    : view === "trash"
      ? "Trash is empty"
      : view === "shared"
        ? "Nothing shared with you yet"
        : "Your workspace is empty";
  const text = noResults
    ? "Try a different keyword or clear the filters."
    : view === "trash" || view === "shared"
      ? "Deleted or shared documents will appear here."
      : "Upload a PDF, Word or Markdown file to get started, or create a blank document.";
  return (
    <div className="flex flex-col items-center rounded-card border border-dashed border-line bg-surface px-6 py-16 text-center">
      <span className="grid size-14 place-items-center rounded-2xl bg-accent-light text-[#B07300]">
        <Icon className="size-6" />
      </span>
      <h3 className="mt-4 text-lg font-semibold">{heading}</h3>
      <p className="mt-1 max-w-sm text-sm text-ink-muted">{text}</p>
      {!noResults && !view && (
        <div className="mt-5 flex gap-2">
          <Button>
            <FileUp className="size-4" />
            Upload document
          </Button>
          <Button variant="outline">
            <FilePlus2 className="size-4" />
            New document
          </Button>
        </div>
      )}
    </div>
  );
}
