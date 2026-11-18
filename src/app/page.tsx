import {
  Check,
  FolderTree,
  Lock,
  MessageSquareText,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/cn";

const features: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: FolderTree, title: "Organize everything", text: "Upload PDFs, Word files and Markdown. Group them into folders and workspaces that match how your team thinks." },
  { icon: Search, title: "Smart search", text: "Search across titles, tags and the full text of every document, with filters for type, folder and favorites." },
  { icon: Sparkles, title: "AI summaries", text: "Turn a 40-page report into a clear summary, key insights and action items in seconds." },
  { icon: MessageSquareText, title: "Ask your documents", text: "Ask questions in plain language and get answers with references to the exact pages." },
  { icon: Users, title: "Collaborate", text: "Edit together, leave comments, mention teammates and restore any earlier version." },
  { icon: ShieldCheck, title: "Private by design", text: "Your files are encrypted and every query is scoped to your workspace." },
];

const plans = [
  { name: "Free", price: "$0", note: "For individuals getting started", items: ["50 documents", "20 AI summaries / month", "Smart search"], cta: "Start free", featured: false },
  { name: "Pro", price: "$12", note: "per user / month", items: ["Unlimited documents", "Unlimited AI summaries", "Ask your documents", "Version history"], cta: "Start Pro trial", featured: true },
  { name: "Team", price: "$24", note: "per user / month", items: ["Everything in Pro", "Real-time collaboration", "Admin controls", "Priority support"], cta: "Contact sales", featured: false },
];

const faqs = [
  ["What file types can I upload?", "PDF, DOCX, TXT and Markdown. We extract the text automatically so every file is searchable."],
  ["Is my data used to train AI models?", "No. Your documents are never used to train models, and you can delete them at any time."],
  ["Can I collaborate with my team?", "Yes. Team plans include shared workspaces, comments, mentions and version history."],
  ["Is there a free plan?", "Yes. The Free plan includes 50 documents and 20 AI summaries every month."],
];

function Section({ id, className, children }: { id?: string; className?: string; children: React.ReactNode }) {
  return (
    <section id={id} className={cn("mx-auto w-full max-w-290 px-8 py-20", className)}>
      {children}
    </section>
  );
}

function Heading({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="text-sm font-semibold text-brand">{eyebrow}</p>
      <h2 className="mt-2 text-4xl font-semibold tracking-tight">{title}</h2>
      {text && <p className="mt-3 text-ink-muted">{text}</p>}
    </div>
  );
}

function ProductPreview() {
  const rows = ["Product Strategy 2026.pdf", "Research Paper - AI Systems.pdf", "Project Requirements.docx", "System Architecture.pdf"];
  return (
    <div className="mx-auto mt-14 max-w-250 rounded-3xl border border-line bg-surface p-3 shadow-[0_30px_80px_-20px_rgb(41_37_31/0.25)]">
      <div className="grid grid-cols-[180px_1fr] overflow-hidden rounded-2xl border border-line bg-bg">
        <div className="hidden border-r border-line bg-surface p-4 sm:block">
          <div className="h-6 w-24 rounded bg-muted" />
          <div className="mt-5 flex flex-col gap-2">
            {["Home", "All documents", "Favorites", "AI Assistant"].map((t, i) => (
              <div key={t} className={cn("rounded-lg px-3 py-2 text-xs", i === 0 ? "bg-brand/10 font-medium text-brand-deep" : "text-ink-muted")}>{t}</div>
            ))}
          </div>
        </div>
        <div className="col-span-2 p-6 sm:col-span-1">
          <p className="text-lg font-semibold">Welcome back, Maya</p>
          <div className="mt-3 h-9 rounded-xl border border-line bg-surface px-3 text-left text-xs leading-9 text-ink-muted">Search titles, content and tags…</div>
          <div className="mt-4 rounded-xl border border-accent/50 bg-accent-light/60 p-3 text-left text-xs leading-5">
            <span className="font-semibold">AI insight · </span>Three action items in Product Strategy 2026 are due before Dec 12.
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {rows.map((r) => (
              <div key={r} className="rounded-xl border border-line bg-surface p-3 text-left">
                <div className="size-6 rounded-md bg-brand/15" />
                <p className="mt-2 line-clamp-2 text-[11px] font-medium leading-4">{r}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <header className="sticky top-0 z-30 border-b border-line/70 bg-bg/85 backdrop-blur">
        <div className="mx-auto flex max-w-290 items-center justify-between px-8 py-3.5">
          <Logo />
          <nav className="hidden items-center gap-7 text-sm font-medium text-ink-muted md:flex">
            <a href="#product" className="hover:text-ink">Product</a>
            <a href="#features" className="hover:text-ink">Features</a>
            <a href="#pricing" className="hover:text-ink">Pricing</a>
            <a href="#faq" className="hover:text-ink">Resources</a>
          </nav>
          <div className="flex items-center gap-2 text-sm font-medium">
            <Link href="/login" className="rounded-xl border border-line bg-surface px-4 py-2 hover:bg-surface-2">Sign in</Link>
            <Link href="/register" className="rounded-xl bg-brand px-4 py-2 text-white hover:bg-brand-deep">Get started</Link>
          </div>
        </div>
      </header>

      <main>
        <section id="product" className="relative overflow-hidden px-8 pb-20 pt-20 text-center">
          <div aria-hidden className="absolute left-1/2 top-0 -z-10 h-120 w-225 -translate-x-1/2 rounded-full bg-accent-light/70 blur-3xl" />
          <Badge tone="ai" className="gap-1.5 px-3 py-1"><Sparkles className="size-3" />AI-powered document workspace</Badge>
          <h1 className="mx-auto mt-6 max-w-3xl text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
            Your documents. <span className="text-brand">Decoded intelligently.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-7 text-ink-muted">
            One intelligent workspace to organize, understand, and collaborate on all your documents. Let AI handle the reading while you focus on what matters.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Link href="/register" className="rounded-xl bg-brand px-6 py-3 text-sm font-medium text-white hover:bg-brand-deep">Get started free</Link>
            <Link href="/login" className="rounded-xl border border-line bg-surface px-6 py-3 text-sm font-medium hover:bg-surface-2">Explore the workspace</Link>
          </div>
          <ProductPreview />
        </section>

        <Section id="features">
          <Heading eyebrow="Features" title="Everything you need to work with documents" text="From the first upload to the final answer, ParseIQ keeps your knowledge organized and understandable." />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div key={f.title} className="rounded-card border border-line bg-surface p-6 shadow-card">
                <span className="grid size-10 place-items-center rounded-xl bg-accent-light text-[#B07300]"><f.icon className="size-5" /></span>
                <h3 className="mt-4 font-semibold">{f.title}</h3>
                <p className="mt-1.5 text-sm leading-6 text-ink-muted">{f.text}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold text-brand">AI summarization</p>
              <h2 className="mt-2 text-4xl font-semibold tracking-tight">Read less. Understand more.</h2>
              <p className="mt-3 leading-7 text-ink-muted">Get a clear summary, key insights and action items for any document. Every point links back to the page it came from.</p>
              <ul className="mt-6 flex flex-col gap-2.5 text-sm">
                {["Summaries in seconds, even for 100-page reports", "Action items with owners and due dates", "Rewrite, explain and improve your writing"].map((t) => (
                  <li key={t} className="flex items-center gap-2"><Check className="size-4 text-success" />{t}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-card border border-accent/50 bg-accent-light/60 p-6">
              <Badge tone="ai"><Sparkles className="mr-1 size-3" />AI summary</Badge>
              <p className="mt-3 text-sm leading-6">This document sets the product direction for 2026. It prioritizes three bets: intelligent search, collaboration and enterprise security.</p>
              <div className="mt-4 rounded-xl bg-surface p-4 text-sm">
                <p className="font-medium">Action items</p>
                <p className="mt-2 text-ink-muted">Finalize Q1 roadmap · Arjun · Nov 28</p>
                <p className="mt-1 text-ink-muted">Draft pricing tiers · Maya · Dec 5</p>
              </div>
            </div>
          </div>
        </Section>

        <Section>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="order-2 rounded-card border border-line bg-surface p-6 shadow-card lg:order-1">
              <div className="ml-auto w-fit rounded-2xl rounded-br-md bg-brand px-4 py-2 text-sm text-white">What are the key risks?</div>
              <div className="mt-4 rounded-xl border border-line p-4 text-sm leading-6">
                Three risks are called out: security certification could delay enterprise deals, real-time collaboration is not built yet, and team pricing is unvalidated.
                <div className="mt-3 flex gap-2 text-xs"><span className="rounded-full bg-muted px-2.5 py-0.5">Success metrics · p.7</span><span className="rounded-full bg-muted px-2.5 py-0.5">Rollout plan · p.11</span></div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <p className="text-sm font-semibold text-brand">Ask your documents</p>
              <h2 className="mt-2 text-4xl font-semibold tracking-tight">Get answers, not search results.</h2>
              <p className="mt-3 leading-7 text-ink-muted">Ask a question about one document or a whole folder. ParseIQ answers in plain language and shows exactly where it found the information.</p>
            </div>
          </div>
        </Section>

        <Section className="pt-0">
          <div className="grid gap-5 md:grid-cols-2">
            <div className="rounded-card border border-line bg-surface p-8 shadow-card">
              <Search className="size-6 text-brand" />
              <h3 className="mt-4 text-xl font-semibold">Smart search</h3>
              <p className="mt-2 text-sm leading-6 text-ink-muted">Find a document by what is inside it, not only its name. Filter by type, folder, tag or favorites.</p>
            </div>
            <div className="rounded-card border border-line bg-surface p-8 shadow-card">
              <Users className="size-6 text-brand" />
              <h3 className="mt-4 text-xl font-semibold">Collaboration</h3>
              <p className="mt-2 text-sm leading-6 text-ink-muted">Edit together, comment, mention teammates and roll back to any previous version.</p>
            </div>
          </div>
        </Section>

        <Section className="pt-0">
          <div className="rounded-3xl bg-ink px-10 py-14 text-center text-white">
            <Lock className="mx-auto size-8 text-accent" />
            <h2 className="mt-4 text-3xl font-semibold tracking-tight">Security and privacy, built in</h2>
            <p className="mx-auto mt-3 max-w-xl text-white/70">Files are encrypted in transit and at rest, access is scoped to your workspace, and your documents are never used to train AI models.</p>
          </div>
        </Section>

        <Section id="pricing">
          <Heading eyebrow="Pricing" title="Simple plans that grow with you" />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {plans.map((p) => (
              <div key={p.name} className={cn("flex flex-col rounded-card border bg-surface p-7 shadow-card", p.featured ? "border-brand ring-2 ring-brand/15" : "border-line")}>
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{p.name}</h3>
                  {p.featured && <Badge tone="brand">Most popular</Badge>}
                </div>
                <p className="mt-4 text-4xl font-semibold tracking-tight">{p.price}</p>
                <p className="text-sm text-ink-muted">{p.note}</p>
                <ul className="mt-6 flex flex-1 flex-col gap-2.5 text-sm">
                  {p.items.map((i) => <li key={i} className="flex items-center gap-2"><Check className="size-4 text-success" />{i}</li>)}
                </ul>
                <Link href="/register" className={cn("mt-7 rounded-xl px-4 py-2.5 text-center text-sm font-medium", p.featured ? "bg-brand text-white hover:bg-brand-deep" : "border border-line hover:bg-surface-2")}>{p.cta}</Link>
              </div>
            ))}
          </div>
        </Section>

        <Section id="faq" className="max-w-190">
          <Heading eyebrow="FAQ" title="Questions, answered" />
          <div className="mt-10 flex flex-col gap-3">
            {faqs.map(([q, a]) => (
              <details key={q} className="group rounded-xl border border-line bg-surface px-5 py-4">
                <summary className="cursor-pointer list-none font-medium after:float-right after:text-ink-muted after:content-['+'] group-open:after:content-['–']">{q}</summary>
                <p className="mt-2 text-sm leading-6 text-ink-muted">{a}</p>
              </details>
            ))}
          </div>
        </Section>
      </main>

      <footer className="border-t border-line bg-surface">
        <div className="mx-auto flex max-w-290 flex-wrap items-center justify-between gap-4 px-8 py-8 text-sm text-ink-muted">
          <Logo />
          <p>© 2026 ParseIQ. Your documents. Decoded intelligently.</p>
          <div className="flex gap-5"><a href="#">Privacy</a><a href="#">Terms</a><a href="#">Contact</a></div>
        </div>
      </footer>
    </>
  );
}
