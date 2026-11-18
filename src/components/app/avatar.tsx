import { cn } from "@/lib/cn";

export function Avatar({
  initials,
  size = "md",
  className,
}: {
  initials: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const sizes = { sm: "size-6 text-[10px]", md: "size-8 text-xs", lg: "size-10 text-sm" };
  return (
    <span
      className={cn(
        "grid shrink-0 place-items-center rounded-full bg-muted font-semibold text-ink",
        sizes[size],
        className,
      )}
    >
      {initials}
    </span>
  );
}
