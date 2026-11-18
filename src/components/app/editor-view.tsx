"use client";

import {
  ArrowLeft,
  Bold,
  Check,
  CheckSquare,
  History,
  Image as ImageIcon,
  Italic,
  Link2,
  List,
  ListOrdered,
  Loader2,
  Send,
  Sparkles,
  Table,
  Underline,
  Wand2,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Avatar } from "@/components/app/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/cn";
import { aiSummary, docSections, documents, folders, type Doc } from "@/lib/mock-data";

const aiActions: { label: string; icon: LucideIcon; result: string }[] = [
  { label: "Summarize", icon: Sparkles, result: aiSummary.summary },
  {
    label: "Rewrite",
    icon: Wand2,
    result:
      "Rewritten: ParseIQ aims to be the default workspace for anyone who handles many documents, making each one searchable, understandable and easy to share.",
  },
  {
    label: "Explain",
    icon: Sparkles,
    result:
      "In plain words: the plan is to ship search and summaries first, add live collaboration next, then meet enterprise security needs.",
  },
  {
    label: "Improve writing",
    icon: Wand2,
    result: "Suggestion: shorten the second paragraph and replace “focus on making” with “make”. Tone is clear and consistent.",
  },
  {
    label: "Action items",
    icon: CheckSquare,
    result: aiSummary.actionItems.map((a) => `• ${a.text} (${a.owner}, ${a.due})`).join("\n"),
  },
];

const versions = [
  { when: "Today, 9:42 AM", who: "You" },
  { when: "Yesterday, 4:10 PM", who: "Maya Chen" },
  { when: "Nov 14, 11:02 AM", who: "You" },
];

function cmd(command: string, value?: string) {
  document.execCommand(command, false, value);
}

export function EditorView({ doc }: { doc: Doc }) {
  const [title, setTitle] = useState(doc.title);
  const [saveState, setSaveState] = useState<"saved" | "saving">("saved");
  const [showVersions, setShowVersions] = useState(false);
  const [thinking, setThinking] = useState<string | null>(null);
  const [answers, setAnswers] = useState<{ label: string; text: string }[]>([]);
  const [question, setQuestion] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  function markDirty() {
    setSaveState("saving");
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setSaveState("saved"), 900);
  }

  function runAi(label: string, text: string) {
    setThinking(label);
    setTimeout(() => {
      setAnswers((a) => [{ label, text }, ...a]);
      setThinking(null);
    }, 800);
  }

  const tools: { icon: LucideIcon; label: string; run: () => void }[] = [
    { icon: Bold, label: "Bold", run: () => cmd("bold") },
    { icon: Italic, label: "Italic", run: () => cmd("italic") },
    { icon: Underline, label: "Underline", run: () => cmd("underline") },
    { icon: List, label: "Bulleted list", run: () => cmd("insertUnorderedList") },
    { icon: ListOrdered, label: "Numbered list", run: () => cmd("insertOrderedList") },
    { icon: Link2, label: "Link", run: () => cmd("createLink", "https://parseiq.app") },
    {
      icon: Table,
      label: "Table",
      run: () =>
        cmd(
          "insertHTML",
          "<table style='border-collapse:collapse;width:100%'><tr><td style='border:1px solid #EAE3D8;padding:8px'>Metric</td><td style='border:1px solid #EAE3D8;padding:8px'>Target</td></tr><tr><td style='border:1px solid #EAE3D8;padding:8px'>Weekly active workspaces</td><td style='border:1px solid #EAE3D8;padding:8px'>5,000</td></tr></table><p></p>",
        ),
    },
    {
      icon: ImageIcon,
      label: "Image",
      run: () => cmd("insertHTML", "<p style='background:#F3E9D9;padding:32px;border-radius:12px;text-align:center;color:#81796F'>Image placeholder</p><p></p>"),
    },
  ];

  return (
    <div className="grid h-screen grid-cols-[260px_1fr_340px] bg-bg">
      {/* Left panel */}
      <aside className="flex min-h-0 flex-col border-r border-line bg-surface px-3 py-4">
        <Link href={`/documents/${doc.id}`} className="flex items-center gap-2 px-2 text-sm font-medium text-ink-muted hover:text-ink">
          <ArrowLeft className="size-4" />
          Back to document
        </Link>
        <div className="mt-5 overflow-y-auto">
          <p className="px-2 text-xs font-medium uppercase tracking-wide text-ink-muted">Folders</p>
          <div className="mt-1 flex flex-col gap-0.5">
            {folders.slice(0, 3).map((f) => (
              <div key={f.id}>
                <p className="flex items-center gap-2 px-2 py-1.5 text-sm font-medium">
                  <span className="size-2 rounded-full" style={{ background: f.color }} />
                  {f.name}
                </p>
                {documents
                  .filter((d) => d.folderId === f.id)
                  .map((d) => (
                    <Link
                      key={d.id}
                      href={`/editor/${d.id}`}
                      className={cn(
                        "block truncate rounded-lg py-1.5 pl-7 pr-2 text-[13px]",
                        d.id === doc.id ? "bg-brand/10 font-medium text-brand-deep" : "text-ink-muted hover:bg-surface-2",
                      )}
                    >
                      {d.title}
                    </Link>
                  ))}
              </div>
            ))}
          </div>
          <p className="mt-5 px-2 text-xs font-medium uppercase tracking-wide text-ink-muted">Outline</p>
          <ol className="mt-1 flex flex-col">
            {docSections.map((s) => (
              <li key={s.heading} className="rounded-lg px-2 py-1.5 text-[13px] text-ink-muted hover:bg-surface-2 hover:text-ink">
                {s.heading}
              </li>
            ))}
          </ol>
        </div>
      </aside>

      {/* Center panel */}
      <section className="flex min-h-0 min-w-0 flex-col">
        <header className="flex items-center justify-between border-b border-line bg-surface px-6 py-3">
          <input
            value={title}
            onChange={(e) => { setTitle(e.target.value); markDirty(); }}
            aria-label="Document title"
            className="min-w-0 flex-1 bg-transparent text-lg font-semibold focus:outline-none"
          />
          <div className="relative flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-[13px] text-ink-muted" aria-live="polite">
              {saveState === "saving" ? (
                <><Loader2 className="size-3.5 animate-spin" />Saving…</>
              ) : (
                <><Check className="size-3.5 text-success" />Saved</>
              )}
            </span>
            <button
              onClick={() => setShowVersions(!showVersions)}
              aria-expanded={showVersions}
              className="flex items-center gap-1.5 rounded-lg border border-line px-3 py-1.5 text-[13px] font-medium hover:bg-surface-2"
            >
              <History className="size-4" />
              Version history
            </button>
            <div className="flex -space-x-2">
              <Avatar initials="MC" size="sm" className="ring-2 ring-surface" />
              <Avatar initials="AR" size="sm" className="ring-2 ring-surface" />
            </div>
            {showVersions && (
              <div className="absolute right-0 top-11 z-10 w-64 rounded-xl border border-line bg-surface p-2 shadow-card">
                {versions.map((v, i) => (
                  <button key={v.when} className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-[13px] hover:bg-surface-2">
                    <span>{v.when}<span className="block text-xs text-ink-muted">{v.who}</span></span>
                    {i === 0 && <Badge tone="success">Current</Badge>}
                  </button>
                ))}
              </div>
            )}
          </div>
        </header>

        <div role="toolbar" aria-label="Formatting" className="flex items-center gap-1 border-b border-line bg-surface px-6 py-2">
          <select
            aria-label="Text style"
            defaultValue="p"
            onChange={(e) => { cmd("formatBlock", e.target.value); markDirty(); }}
            className="mr-2 h-8 rounded-lg border border-line bg-surface px-2 text-[13px]"
          >
            <option value="p">Paragraph</option>
            <option value="h1">Heading 1</option>
            <option value="h2">Heading 2</option>
            <option value="h3">Heading 3</option>
          </select>
          {tools.map((t) => (
            <button
              key={t.label}
              aria-label={t.label}
              title={t.label}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => { t.run(); markDirty(); }}
              className="rounded-lg p-2 text-ink-muted hover:bg-surface-2 hover:text-ink"
            >
              <t.icon className="size-4" />
            </button>
          ))}
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-10">
          <article
            contentEditable
            suppressContentEditableWarning
            onInput={markDirty}
            aria-label="Document content"
            className="mx-auto min-h-full max-w-195 rounded-card border border-line bg-surface px-16 py-14 text-[15px] leading-7 shadow-card focus:outline-none [&_a]:text-brand-deep [&_a]:underline [&_h1]:mb-3 [&_h1]:text-3xl [&_h1]:font-semibold [&_h2]:mb-2 [&_h2]:mt-6 [&_h2]:text-xl [&_h2]:font-semibold [&_h3]:mt-4 [&_h3]:text-lg [&_h3]:font-semibold [&_ol]:ml-5 [&_ol]:list-decimal [&_p]:mb-3 [&_ul]:ml-5 [&_ul]:list-disc"
          >
            <h1>{doc.title}</h1>
            {docSections.map((s) => (
              <div key={s.heading}>
                <h2>{s.heading}</h2>
                <p>{s.body}</p>
              </div>
            ))}
          </article>
        </div>
      </section>

      {/* Right panel */}
      <aside className="flex min-h-0 flex-col border-l border-line bg-surface">
        <div className="border-b border-line px-5 py-4">
          <h2 className="flex items-center gap-2 text-sm font-semibold">
            <Sparkles className="size-4 text-accent" />
            AI assistant
          </h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {aiActions.map((a) => (
              <button
                key={a.label}
                disabled={thinking !== null}
                onClick={() => runAi(a.label, a.result)}
                className="inline-flex h-8 items-center gap-1.5 rounded-full border border-line px-3 text-[13px] font-medium hover:border-accent hover:bg-accent-light disabled:opacity-50"
              >
                <a.icon className="size-3.5" />
                {a.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-5 py-4">
          {thinking && (
            <div className="flex items-center gap-2 rounded-xl bg-accent-light/60 px-3 py-3 text-[13px]">
              <Loader2 className="size-4 animate-spin" />
              {thinking}…
            </div>
          )}
          {answers.length === 0 && !thinking && (
            <p className="text-[13px] leading-5 text-ink-muted">
              Choose an action above or ask a question about this document.
            </p>
          )}
          {answers.map((a, i) => (
            <div key={i} className="rounded-xl border border-accent/50 bg-accent-light/60 p-3.5">
              <Badge tone="ai">{a.label}</Badge>
              <p className="mt-2 whitespace-pre-line text-[13px] leading-5">{a.text}</p>
              <button className="mt-2 text-xs font-medium text-brand-deep">Insert into document</button>
            </div>
          ))}
        </div>

        <form
          className="border-t border-line p-4"
          onSubmit={(e) => {
            e.preventDefault();
            if (!question.trim()) return;
            runAi("Answer", `Based on section 2, the three strategic bets are intelligent search, collaboration and enterprise security. (Question: “${question}”)`);
            setQuestion("");
          }}
        >
          <div className="flex items-center gap-2 rounded-xl border border-line px-3 focus-within:border-brand">
            <input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask about this document…"
              aria-label="Ask a question"
              className="h-10 min-w-0 flex-1 bg-transparent text-sm placeholder:text-ink-muted focus:outline-none"
            />
            <button aria-label="Send" className="rounded-lg bg-brand p-1.5 text-white hover:bg-brand-deep">
              <Send className="size-4" />
            </button>
          </div>
        </form>
      </aside>
    </div>
  );
}
