import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, id, className, ...rest }: InputProps) {
  const inputId = id ?? rest.name;
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-[13px] font-medium text-ink">
          {label}
        </label>
      )}
      <input
        id={inputId}
        aria-invalid={error ? true : undefined}
        className={cn(
          "h-10 rounded-xl border bg-surface px-3 text-sm text-ink placeholder:text-ink-muted",
          "focus:border-brand focus:outline-2 focus:outline-brand/20",
          "disabled:cursor-not-allowed disabled:bg-surface-2 disabled:opacity-60",
          error ? "border-danger" : "border-line",
          className,
        )}
        {...rest}
      />
      {error && <p className="text-xs text-danger">{error}</p>}
    </div>
  );
}
