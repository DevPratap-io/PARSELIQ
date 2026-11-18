"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ApiError, auth } from "@/lib/api";

export function RegisterForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [fields, setFields] = useState<Record<string, string[]>>({});
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setError(null);
    setFields({});
    if (f.get("password") !== f.get("confirm")) {
      setFields({ confirm: ["Passwords do not match"] });
      return;
    }
    setLoading(true);
    try {
      await auth.register({
        name: String(f.get("name")),
        email: String(f.get("email")),
        password: String(f.get("password")),
      });
      router.push("/dashboard");
    } catch (err) {
      if (err instanceof ApiError) {
        setFields(err.fields ?? {});
        if (!err.fields) setError(err.message);
      } else {
        setError("Could not reach the server");
      }
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <Input label="Full name" name="name" autoComplete="name" error={fields.name?.[0]} required />
      <Input label="Email" name="email" type="email" autoComplete="email" placeholder="you@company.com" error={fields.email?.[0]} required />
      <Input label="Password" name="password" type="password" autoComplete="new-password" minLength={8} error={fields.password?.[0]} required />
      <Input label="Confirm password" name="confirm" type="password" autoComplete="new-password" minLength={8} error={fields.confirm?.[0]} required />
      <label className="flex items-start gap-2 text-sm text-ink-muted">
        <input type="checkbox" name="terms" required className="mt-0.5 size-4 accent-brand" />
        <span>I agree to the Terms of Service and Privacy Policy.</span>
      </label>
      {error && (
        <p role="alert" className="rounded-lg bg-danger/10 px-3 py-2 text-sm text-danger">
          {error}
        </p>
      )}
      <Button type="submit" loading={loading}>
        Create account
      </Button>
    </form>
  );
}
