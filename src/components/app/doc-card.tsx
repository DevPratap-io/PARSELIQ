"use client";

import { Check, MoreHorizontal, Star } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Avatar } from "@/components/app/avatar";
import { FileIcon } from "@/components/app/file-icon";
import { cn } from "@/lib/cn";
import { typeLabel, type Doc } from "@/lib/mock-data";

interface Props {
  doc: Doc;
  layout: "grid" | "list";
  selected: boolean;
  starred: boolean;
  onSelect: () => void;
  onStar: () => void;
}

function Menu({ id }: { id: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative" onBlur={() => setTimeout(() => setOpen(false), 120)}>
      <button
        aria-label="More actions"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="rounded-lg p-1.5 text-ink-muted hover:bg-surface-2 hover:text-ink"
      >
        <MoreHorizontal className="size-4" />
      </button>
      {open && (
        <div className="absolute right-0 top-9 z-20 w-44 rounded-xl border border-line bg-surface p-1 text-sm shadow-card">
          <Link href={`/documents/${id}`} className="block rounded-lg px-3 py-2 hover:bg-surface-2">Open</Link>
          <Link href={`/editor/${id}`} className="block rounded-lg px-3 py-2 hover:bg-surface-2">Edit</Link>
          {["Rename", "Move to folder", "Download"].map((l) => (
            <button key={l} className="block w-full rounded-lg px-3 py-2 text-left hover:bg-surface-2">{l}</button>
          ))}
          <button className="block w-full rounded-lg px-3 py-2 text-left text-danger hover:bg-danger/10">Delete</button>
        </div>
      )}
    </div>
  );
}

export function DocCard({ doc, layout, selected, starred, onSelect, onStar }: Props) {
  const star = (
    <button
      aria-label={starred ? "Remove from favorites" : "Add to favorites"}
      aria-pressed={starred}
      onClick={onStar}
      className="rounded-lg p-1.5 hover:bg-surface-2"
    >
      <Star className={cn("size-4", starred ? "fill-accent text-accent" : "text-ink-muted")} />
    </button>
  );

  const check = (
    <button
      aria-label={selected ? "Deselect" : "Select"}
      aria-pressed={selected}
      onClick={onSelect}
      className={cn(
        "grid size-5 place-items-center rounded-md border",
        selected ? "border-brand bg-brand text-white" : "border-line bg-surface text-transparent hover:border-brand",
      )}
    >
      <Check className="size-3.5" />
    </button>
  );

  if (layout === "list") {
    return (
      <div
        className={cn(
          "grid grid-cols-[20px_1fr_90px_110px_150px_110px] items-center gap-4 rounded-xl border bg-surface px-4 py-2.5",
          selected ? "border-brand ring-2 ring-brand/15" : "border-line hover:border-ink-muted/40",
        )}
      >
        {check}
        <div className="flex min-w-0 items-center gap-3">
          <FileIcon type={doc.type} className="size-8" />
          <Link href={`/documents/${doc.id}`} className="truncate text-sm font-medium hover:text-brand-deep">
            {doc.title}
          </Link>
        </div>
        <span className="text-xs text-ink-muted">{typeLabel[doc.type]}</span>
        <span className="font-mono text-xs text-ink-muted">{doc.size}</span>
        <span className="text-xs text-ink-muted">{doc.modified}</span>
        <div className="flex items-center justify-end gap-1">
          <Avatar initials={doc.owner.initials} size="sm" />
          {star}
          <Menu id={doc.id} />
        </div>
      </div>
    );
  }

  return (
    <article
      className={cn(
        "flex flex-col gap-3 rounded-card border bg-surface p-4 shadow-card transition-shadow hover:shadow-md",
        selected ? "border-brand ring-2 ring-brand/15" : "border-line",
      )}
    >
      <div className="flex items-start justify-between">
        <FileIcon type={doc.type} />
        <div className="flex items-center gap-0.5">
          {check}
          {star}
          <Menu id={doc.id} />
        </div>
      </div>
      <div className="min-w-0">
        <Link href={`/documents/${doc.id}`} className="line-clamp-1 font-medium hover:text-brand-deep">
          {doc.title}.{doc.type}
        </Link>
        <p className="mt-1 line-clamp-2 text-[13px] leading-5 text-ink-muted">{doc.excerpt}</p>
      </div>
      <div className="mt-auto flex items-center justify-between border-t border-line pt-3 text-xs text-ink-muted">
        <span className="flex items-center gap-2">
          <Avatar initials={doc.owner.initials} size="sm" />
          {doc.modified}
        </span>
        <span className="font-mono">{typeLabel[doc.type]} · {doc.size}</span>
      </div>
    </article>
  );
}

export function DocCardSkeleton({ layout }: { layout: "grid" | "list" }) {
  return (
    <div
      aria-hidden
      className={cn(
        "animate-pulse rounded-card border border-line bg-surface",
        layout === "grid" ? "h-44 p-4" : "h-14",
      )}
    >
      {layout === "grid" && (
        <div className="flex flex-col gap-3">
          <div className="size-10 rounded-xl bg-muted" />
          <div className="h-4 w-2/3 rounded bg-muted" />
          <div className="h-3 w-full rounded bg-muted" />
          <div className="h-3 w-4/5 rounded bg-muted" />
        </div>
      )}
    </div>
  );
}
