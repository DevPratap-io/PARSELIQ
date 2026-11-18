"use client";

import { CheckSquare, FileText, Lightbulb, Loader2, MessageSquarePlus, Send, Sparkles } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { Sidebar } from "@/components/app/sidebar";
import { Badge } from "@/components/ui/badge";
import { aiSummary, conversations, documents, suggestedPrompts } from "@/lib/mock-data";
import { cn } from "@/lib/cn";

interface Reply {
  text: string;
  insights?: string[];
  actions?: { text: string; owner: string; due: string }[];
  refs: { label: string; page: number }[];
}
type Message = { role: "user"; text: string } | { role: "ai"; reply: Reply };

function mockReply(prompt: string, docTitle: string): Reply {
  const p = prompt.toLowerCase();
  const refs = [
    { label: "Executive summary", page: 1 },
    { label: "Strategic bets", page: 3 },
  ];
  if (p.includes("action"))
    return { text: `Here are the action items I found in ${docTitle}:`, actions: aiSummary.actionItems, refs: [{ label: "Rollout plan", page: 11 }] };
  if (p.includes("risk"))
    return {
      text: "Three risks are called out in the document:",
      insights: [
        "Security certification could delay enterprise deals.",
        "Collaboration depends on a real-time engine that is not built yet.",
        "Pricing for the team plan is still unvalidated.",
      ],
      refs: [{ label: "Success metrics", page: 7 }, { label: "Rollout plan", page: 11 }],
    };
  if (p.includes("summar") || p.includes("bullet"))
    return { text: aiSummary.summary, insights: aiSummary.insights, refs };
  return {
    text: `Based on ${docTitle}, the plan prioritizes intelligent search first, followed by collaboration in Q2 and enterprise controls in Q3.`,
    refs,
  };
}

export function AssistantView() {
  const [docId, setDocId] = useState(documents[0].id);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [active, setActive] = useState("c1");
  const end = useRef<HTMLDivElement>(null);
  const doc = documents.find((d) => d.id === docId)!;

  useEffect(() => end.current?.scrollIntoView({ behavior: "smooth" }), [messages, thinking]);

  function send(text: string) {
    if (!text.trim() || thinking) return;
    setMessages((m) => [...m, { role: "user", text }]);
    setInput("");
    setThinking(true);
    setTimeout(() => {
      setMessages((m) => [...m, { role: "ai", reply: mockReply(text, doc.title) }]);
      setThinking(false);
    }, 900);
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <aside className="flex w-64 shrink-0 flex-col border-r border-line bg-surface-2/50 p-3">
        <button
          onClick={() => { setMessages([]); setActive(""); }}
          className="flex h-10 items-center justify-center gap-2 rounded-xl bg-brand text-sm font-medium text-white hover:bg-brand-deep"
        >
          <MessageSquarePlus className="size-4" />
          New conversation
        </button>
        <p className="mt-5 px-2 text-xs font-medium uppercase tracking-wide text-ink-muted">History</p>
        <div className="mt-1 flex flex-col gap-0.5">
          {conversations.map((c) => (
            <button
              key={c.id}
              onClick={() => setActive(c.id)}
              className={cn(
                "rounded-lg px-3 py-2 text-left text-[13px]",
                active === c.id ? "bg-surface font-medium shadow-card" : "text-ink-muted hover:bg-surface",
              )}
            >
              <span className="line-clamp-1">{c.title}</span>
              <span className="text-xs text-ink-muted">{c.when}</span>
            </button>
          ))}
        </div>
      </aside>

      <main className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-line px-8 py-4">
          <h1 className="flex items-center gap-2 text-lg font-semibold">
            <Sparkles className="size-5 text-accent" />
            AI Assistant
          </h1>
          <label className="flex items-center gap-2 text-[13px] text-ink-muted">
            Context
            <select
              value={docId}
              onChange={(e) => setDocId(e.target.value)}
              className="h-9 rounded-lg border border-line bg-surface px-3 text-sm text-ink"
            >
              {documents.map((d) => (
                <option key={d.id} value={d.id}>{d.title}</option>
              ))}
            </select>
          </label>
        </header>

        <div className="flex-1 overflow-y-auto px-8 py-6">
          <div className="mx-auto flex max-w-180 flex-col gap-5">
            {messages.length === 0 && (
              <div className="mt-10 flex flex-col items-center text-center">
                <span className="grid size-14 place-items-center rounded-2xl bg-accent-light text-[#B07300]">
                  <Sparkles className="size-6" />
                </span>
                <h2 className="mt-4 text-2xl font-semibold tracking-tight">Ask anything about {doc.title}</h2>
                <p className="mt-1 text-sm text-ink-muted">Answers include references to the pages they come from.</p>
                <div className="mt-6 grid w-full grid-cols-2 gap-3">
                  {suggestedPrompts.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="rounded-xl border border-line bg-surface p-4 text-left text-sm hover:border-accent hover:bg-accent-light/50"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((m, i) =>
              m.role === "user" ? (
                <div key={i} className="ml-auto max-w-[80%] rounded-2xl rounded-br-md bg-brand px-4 py-2.5 text-sm text-white">
                  {m.text}
                </div>
              ) : (
                <div key={i} className="rounded-card border border-line bg-surface p-5 shadow-card">
                  <Badge tone="ai"><Sparkles className="mr-1 size-3" />ParseIQ AI</Badge>
                  <p className="mt-3 text-sm leading-6">{m.reply.text}</p>
                  {m.reply.insights && (
                    <ul className="mt-3 flex flex-col gap-2">
                      {m.reply.insights.map((t) => (
                        <li key={t} className="flex gap-2 rounded-lg bg-accent-light/60 px-3 py-2 text-[13px] leading-5">
                          <Lightbulb className="mt-0.5 size-4 shrink-0 text-[#B07300]" />
                          {t}
                        </li>
                      ))}
                    </ul>
                  )}
                  {m.reply.actions && (
                    <ul className="mt-3 flex flex-col gap-2">
                      {m.reply.actions.map((a) => (
                        <li key={a.text} className="flex gap-2 rounded-lg border border-line px-3 py-2 text-[13px]">
                          <CheckSquare className="mt-0.5 size-4 shrink-0 text-brand" />
                          <span>{a.text}<span className="block text-xs text-ink-muted">{a.owner} · due {a.due}</span></span>
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="mt-4 flex flex-wrap gap-2 border-t border-line pt-3">
                    <span className="text-xs text-ink-muted">Sources:</span>
                    {m.reply.refs.map((r) => (
                      <span key={r.label} className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-0.5 text-xs">
                        <FileText className="size-3" />
                        {r.label} · p.{r.page}
                      </span>
                    ))}
                  </div>
                </div>
              ),
            )}

            {thinking && (
              <div className="flex items-center gap-2 text-sm text-ink-muted">
                <Loader2 className="size-4 animate-spin" />
                Reading {doc.title}…
              </div>
            )}
            <div ref={end} />
          </div>
        </div>

        <form
          className="border-t border-line px-8 py-4"
          onSubmit={(e) => { e.preventDefault(); send(input); }}
        >
          <div className="mx-auto flex max-w-180 items-center gap-2 rounded-2xl border border-line bg-surface px-4 shadow-card focus-within:border-brand">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Ask about ${doc.title}…`}
              aria-label="Message"
              className="h-12 min-w-0 flex-1 bg-transparent text-sm placeholder:text-ink-muted focus:outline-none"
            />
            <button aria-label="Send message" disabled={!input.trim() || thinking} className="rounded-xl bg-brand p-2 text-white hover:bg-brand-deep disabled:opacity-50">
              <Send className="size-4" />
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
