import { FileText } from "lucide-react";
import type { FileType } from "@/lib/mock-data";
import { cn } from "@/lib/cn";

const tone: Record<FileType, string> = {
  pdf: "bg-danger/10 text-danger",
  docx: "bg-[#2B6CB0]/10 text-[#2B6CB0]",
  md: "bg-accent-light text-[#B07300]",
  txt: "bg-muted text-ink-muted",
};

export function FileIcon({ type, className }: { type: FileType; className?: string }) {
  return (
    <span className={cn("grid size-10 place-items-center rounded-xl", tone[type], className)}>
      <FileText className="size-5" />
    </span>
  );
}
