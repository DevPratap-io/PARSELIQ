"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ApiError, auth } from "@/lib/api";

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setError(null);
    setLoading(true);
    try {
      await auth.login({ email: String(f.get("email")), password: String(f.get("password")) });
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not reach the server");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <Input label="Email" name="email" type="email" autoComplete="email" placeholder="you@company.com" required />
      <Input label="Password" name="password" type="password" autoComplete="current-password" required />
      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2 text-ink-muted">
          <input type="checkbox" name="remember" className="size-4 accent-brand" />
          Remember me
        </label>
        <Link href="/forgot-password" className="font-medium text-brand hover:text-brand-deep">
          Forgot password?
        </Link>
      </div>
      {error && (
        <p role="alert" className="rounded-lg bg-danger/10 px-3 py-2 text-sm text-danger">
          {error}
        </p>
      )}
      <Button type="submit" loading={loading}>
        Sign in
      </Button>
    </form>
  );
}
