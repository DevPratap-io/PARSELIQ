import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type Tone = "neutral" | "brand" | "ai" | "success" | "danger";

const tones: Record<Tone, string> = {
  neutral: "bg-muted text-ink-muted",
  brand: "bg-brand/10 text-brand-deep",
  ai: "bg-accent-light text-ink",
  success: "bg-success/10 text-success",
  danger: "bg-danger/10 text-danger",
};

export function Badge({
  tone = "neutral",
  className,
  ...rest
}: HTMLAttributes<HTMLSpanElement> & { tone?: Tone }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        tones[tone],
        className,
      )}
      {...rest}
    />
  );
}
