// Mock data used until the real API (documents, folders, AI) is built.

export type FileType = "pdf" | "docx" | "md" | "txt";

export interface Person {
  name: string;
  initials: string;
}

export interface Doc {
  id: string;
  title: string;
  type: FileType;
  size: string;
  pages: number;
  words: number;
  modified: string;
  uploaded: string;
  owner: Person;
  folderId: string | null;
  starred: boolean;
  tags: string[];
  excerpt: string;
}

export interface Folder {
  id: string;
  name: string;
  color: string;
}

const you: Person = { name: "You", initials: "YO" };
const maya: Person = { name: "Maya Chen", initials: "MC" };
const arjun: Person = { name: "Arjun Rao", initials: "AR" };
const lena: Person = { name: "Lena Fischer", initials: "LF" };

export const folders: Folder[] = [
  { id: "strategy", name: "Strategy", color: "#F26A32" },
  { id: "research", name: "Research", color: "#FFB52E" },
  { id: "engineering", name: "Engineering", color: "#27966B" },
  { id: "marketing", name: "Marketing", color: "#D94A42" },
  { id: "meetings", name: "Meetings", color: "#81796F" },
];

export const documents: Doc[] = [
  {
    id: "product-strategy-2026",
    title: "Product Strategy 2026",
    type: "pdf",
    size: "2.4 MB",
    pages: 24,
    words: 8420,
    modified: "Today, 9:42 AM",
    uploaded: "Nov 12, 2026",
    owner: you,
    folderId: "strategy",
    starred: true,
    tags: ["strategy", "roadmap"],
    excerpt:
      "Our 2026 strategy focuses on three bets: intelligent search, team collaboration and enterprise-grade security.",
  },
  {
    id: "research-paper-ai-systems",
    title: "Research Paper - AI Systems",
    type: "pdf",
    size: "5.1 MB",
    pages: 38,
    words: 14200,
    modified: "Yesterday",
    uploaded: "Nov 3, 2026",
    owner: maya,
    folderId: "research",
    starred: true,
    tags: ["ai", "research"],
    excerpt:
      "We study retrieval-augmented systems and show that chunk-level citations improve answer trust by 31%.",
  },
  {
    id: "project-requirements",
    title: "Project Requirements",
    type: "docx",
    size: "184 KB",
    pages: 12,
    words: 3900,
    modified: "Nov 16, 2026",
    uploaded: "Oct 28, 2026",
    owner: you,
    folderId: "engineering",
    starred: false,
    tags: ["requirements"],
    excerpt:
      "Functional requirements for the document workspace: upload, organize, search, summarize and collaborate.",
  },
  {
    id: "marketing-plan",
    title: "Marketing Plan",
    type: "md",
    size: "42 KB",
    pages: 6,
    words: 2100,
    modified: "Nov 15, 2026",
    uploaded: "Nov 1, 2026",
    owner: lena,
    folderId: "marketing",
    starred: false,
    tags: ["launch", "growth"],
    excerpt:
      "Launch plan for Q1: content marketing, product-led growth, and a referral program for teams.",
  },
  {
    id: "meeting-notes",
    title: "Meeting Notes",
    type: "pdf",
    size: "612 KB",
    pages: 4,
    words: 1300,
    modified: "Nov 14, 2026",
    uploaded: "Nov 14, 2026",
    owner: arjun,
    folderId: "meetings",
    starred: false,
    tags: ["weekly", "sync"],
    excerpt:
      "Weekly product sync: roadmap review, design handoff status, and open questions on pricing.",
  },
  {
    id: "system-architecture",
    title: "System Architecture",
    type: "pdf",
    size: "3.2 MB",
    pages: 18,
    words: 5600,
    modified: "Nov 12, 2026",
    uploaded: "Oct 20, 2026",
    owner: arjun,
    folderId: "engineering",
    starred: true,
    tags: ["architecture", "backend"],
    excerpt:
      "Overview of services, data stores and the AI pipeline, including deployment and scaling decisions.",
  },
  {
    id: "customer-interviews",
    title: "Customer Interview Summary",
    type: "docx",
    size: "256 KB",
    pages: 9,
    words: 3100,
    modified: "Nov 10, 2026",
    uploaded: "Nov 10, 2026",
    owner: maya,
    folderId: "research",
    starred: false,
    tags: ["research", "customers"],
    excerpt:
      "Twelve interviews with researchers and analysts reveal that finding the right passage is the top pain point.",
  },
  {
    id: "security-policy",
    title: "Security and Privacy Policy",
    type: "pdf",
    size: "1.1 MB",
    pages: 14,
    words: 4800,
    modified: "Nov 8, 2026",
    uploaded: "Sep 30, 2026",
    owner: you,
    folderId: "engineering",
    starred: false,
    tags: ["security", "compliance"],
    excerpt:
      "How ParseIQ encrypts documents in transit and at rest, and how access is scoped to each workspace.",
  },
  {
    id: "brand-guidelines",
    title: "Brand Guidelines",
    type: "pdf",
    size: "8.7 MB",
    pages: 32,
    words: 2700,
    modified: "Nov 5, 2026",
    uploaded: "Aug 14, 2026",
    owner: lena,
    folderId: "marketing",
    starred: false,
    tags: ["brand", "design"],
    excerpt: "Logo usage, colour palette, typography and tone of voice for ParseIQ.",
  },
  {
    id: "pricing-analysis",
    title: "Pricing Analysis",
    type: "md",
    size: "28 KB",
    pages: 5,
    words: 1700,
    modified: "Nov 2, 2026",
    uploaded: "Oct 25, 2026",
    owner: you,
    folderId: "strategy",
    starred: false,
    tags: ["pricing"],
    excerpt:
      "Comparison of per-seat and usage-based pricing, with a recommendation for three plan tiers.",
  },
  {
    id: "onboarding-checklist",
    title: "Onboarding Checklist",
    type: "txt",
    size: "6 KB",
    pages: 2,
    words: 640,
    modified: "Oct 30, 2026",
    uploaded: "Oct 30, 2026",
    owner: you,
    folderId: null,
    starred: false,
    tags: ["hr"],
    excerpt: "Step-by-step checklist for new hires during their first two weeks.",
  },
  {
    id: "q3-board-report",
    title: "Q3 Board Report",
    type: "docx",
    size: "940 KB",
    pages: 16,
    words: 5200,
    modified: "Oct 18, 2026",
    uploaded: "Oct 18, 2026",
    owner: maya,
    folderId: "strategy",
    starred: false,
    tags: ["board", "finance"],
    excerpt: "Quarterly performance, key metrics and the plan for the next quarter.",
  },
];

export const getDoc = (id: string) => documents.find((d) => d.id === id);

export const typeLabel: Record<FileType, string> = {
  pdf: "PDF",
  docx: "DOCX",
  md: "Markdown",
  txt: "Text",
};

export const aiSummary = {
  summary:
    "This document sets the product direction for 2026. It prioritizes three bets (intelligent search, collaboration and enterprise security), defines success metrics for each, and outlines a quarterly rollout plan with owners and budget.",
  insights: [
    "Search quality is the strongest driver of retention in customer interviews.",
    "Real-time collaboration is planned for Q2, ahead of the enterprise launch.",
    "Security certification is a hard dependency for the largest accounts.",
  ],
  actionItems: [
    { text: "Finalize Q1 roadmap with engineering leads", owner: "Arjun Rao", due: "Nov 28" },
    { text: "Draft pricing tiers for the team plan", owner: "Maya Chen", due: "Dec 5" },
    { text: "Schedule security audit with external vendor", owner: "You", due: "Dec 12" },
  ],
};

export const docSections = [
  {
    heading: "1. Executive summary",
    body: "ParseIQ will become the default workspace for people who work with large numbers of documents. In 2026 we focus on making every document searchable, understandable and shareable, without adding complexity for the people who just want to read.",
    page: 1,
  },
  {
    heading: "2. Strategic bets",
    body: "Bet one: intelligent search that understands questions, not only keywords. Bet two: collaboration that feels instant, with comments, mentions and version history. Bet three: security and privacy that satisfy enterprise reviews from day one.",
    page: 3,
  },
  {
    heading: "3. Success metrics",
    body: "We will measure weekly active workspaces, documents summarized per user, search-to-open rate and net revenue retention. Targets are reviewed each quarter with the leadership team.",
    page: 7,
  },
  {
    heading: "4. Rollout plan",
    body: "Q1 delivers the core workspace and AI summaries. Q2 adds real-time collaboration. Q3 introduces enterprise controls and audit logs. Q4 focuses on integrations and the public API.",
    page: 11,
  },
];

export interface Conversation {
  id: string;
  title: string;
  when: string;
}

export const conversations: Conversation[] = [
  { id: "c1", title: "Summarize Product Strategy 2026", when: "Today" },
  { id: "c2", title: "Key risks in the AI Systems paper", when: "Today" },
  { id: "c3", title: "Action items from last sync", when: "Yesterday" },
  { id: "c4", title: "Compare pricing options", when: "Nov 14" },
];

export const suggestedPrompts = [
  "Summarize this document in five bullets",
  "What are the key risks mentioned?",
  "List all action items with owners",
  "Explain the rollout plan in simple terms",
];

export const activity = [
  { who: "Maya Chen", what: "commented on", doc: "Product Strategy 2026", when: "12 min ago" },
  { who: "Arjun Rao", what: "uploaded", doc: "System Architecture", when: "2 hours ago" },
  { who: "Lena Fischer", what: "edited", doc: "Marketing Plan", when: "Yesterday" },
];
