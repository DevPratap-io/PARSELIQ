"use client";

import {
  CheckSquare,
  ChevronLeft,
  ChevronRight,
  Download,
  Lightbulb,
  Pencil,
  Share2,
  Sparkles,
  Star,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Avatar } from "@/components/app/avatar";
import { Sidebar } from "@/components/app/sidebar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { aiSummary, docSections, folders, typeLabel, type Doc } from "@/lib/mock-data";
import { cn } from "@/lib/cn";

export function PreviewView({ doc }: { doc: Doc }) {
  const [starred, setStarred] = useState(doc.starred);
  const [page, setPage] = useState(1);
  const [copied, setCopied] = useState(false);
  const folder = folders.find((f) => f.id === doc.folderId);
  const section = docSections.reduce((a, s) => (s.page <= page ? s : a), docSections[0]);

  const meta: [string, string][] = [
    ["Type", `${typeLabel[doc.type]} · ${doc.size}`],
    ["Pages", String(doc.pages)],
    ["Words", doc.words.toLocaleString()],
    ["Uploaded", doc.uploaded],
    ["Modified", doc.modified],
  ];

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="min-w-0 flex-1 px-10 py-8">
        <nav aria-label="Breadcrumb" className="text-[13px] text-ink-muted">
          <Link href="/dashboard" className="hover:text-ink">Documents</Link>
          {folder && (
            <>
              <span className="mx-1.5">/</span>
              <Link href={`/dashboard?folder=${folder.id}`} className="hover:text-ink">{folder.name}</Link>
            </>
          )}
          <span className="mx-1.5">/</span>
          <span className="text-ink">{doc.title}</span>
        </nav>

        <div className="mt-4 flex items-start justify-between gap-6">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">{doc.title}</h1>
            <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-ink-muted">
              <Badge>{typeLabel[doc.type]}</Badge>
              <span className="flex items-center gap-2">
                <Avatar initials={doc.owner.initials} size="sm" />
                {doc.owner.name}
              </span>
              <span>Modified {doc.modified}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" aria-pressed={starred} onClick={() => setStarred(!starred)}>
              <Star className={cn("size-4", starred && "fill-accent text-accent")} />
              {starred ? "Favorited" : "Favorite"}
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 1800);
              }}
            >
              <Share2 className="size-4" />
              {copied ? "Link copied" : "Share"}
            </Button>
            <Button variant="outline"><Download className="size-4" />Download</Button>
            <Link href={`/editor/${doc.id}`}>
              <Button><Pencil className="size-4" />Edit</Button>
            </Link>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-[1fr_340px] gap-6">
          <div className="min-w-0">
            <section className="rounded-card border border-accent/50 bg-accent-light/60 p-5">
              <div className="flex items-center justify-between">
                <Badge tone="ai"><Sparkles className="mr-1 size-3" />AI summary</Badge>
                <button className="text-[13px] font-medium text-brand-deep">Regenerate</button>
              </div>
              <p className="mt-3 text-sm leading-6">{aiSummary.summary}</p>
            </section>

            <section className="mt-6 rounded-card border border-line bg-surface shadow-card">
              <div className="flex items-center justify-between border-b border-line px-5 py-3">
                <span className="text-sm font-medium">Page {page} of {doc.pages}</span>
                <div className="flex items-center gap-1">
                  <button aria-label="Previous page" disabled={page <= 1} onClick={() => setPage(page - 1)} className="rounded-lg p-1.5 hover:bg-surface-2 disabled:opacity-40">
                    <ChevronLeft className="size-4" />
                  </button>
                  <button aria-label="Next page" disabled={page >= doc.pages} onClick={() => setPage(page + 1)} className="rounded-lg p-1.5 hover:bg-surface-2 disabled:opacity-40">
                    <ChevronRight className="size-4" />
                  </button>
                </div>
              </div>
              <article className="mx-auto max-w-170 px-12 py-12">
                <h2 className="text-xl font-semibold">{section.heading}</h2>
                <p className="mt-4 text-[15px] leading-7">{section.body}</p>
                <p className="mt-4 text-[15px] leading-7 text-ink-muted">{doc.excerpt}</p>
                <p className="mt-10 text-center font-mono text-xs text-ink-muted">— {page} —</p>
              </article>
            </section>
          </div>

          <aside className="flex flex-col gap-4">
            <section className="rounded-card border border-line bg-surface p-5">
              <h2 className="text-sm font-semibold">Details</h2>
              <dl className="mt-3 flex flex-col gap-2 text-[13px]">
                {meta.map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4">
                    <dt className="text-ink-muted">{k}</dt>
                    <dd className="font-mono">{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {doc.tags.map((t) => <Badge key={t}>{t}</Badge>)}
              </div>
            </section>

            <section className="rounded-card border border-line bg-surface p-5">
              <h2 className="flex items-center gap-2 text-sm font-semibold">
                <Lightbulb className="size-4 text-accent" />Key insights
              </h2>
              <ul className="mt-3 flex flex-col gap-2 text-[13px] leading-5">
                {aiSummary.insights.map((i) => (
                  <li key={i} className="rounded-lg bg-accent-light/60 px-3 py-2">{i}</li>
                ))}
              </ul>
            </section>

            <section className="rounded-card border border-line bg-surface p-5">
              <h2 className="flex items-center gap-2 text-sm font-semibold">
                <CheckSquare className="size-4 text-brand" />Action items
              </h2>
              <ul className="mt-3 flex flex-col gap-3 text-[13px]">
                {aiSummary.actionItems.map((a) => (
                  <li key={a.text}>
                    <p>{a.text}</p>
                    <p className="mt-0.5 text-xs text-ink-muted">{a.owner} · due {a.due}</p>
                  </li>
                ))}
              </ul>
              <Link href="/assistant" className="mt-4 inline-block text-[13px] font-medium text-brand-deep">
                Ask about this document →
              </Link>
            </section>
          </aside>
        </div>
      </main>
    </div>
  );
}
