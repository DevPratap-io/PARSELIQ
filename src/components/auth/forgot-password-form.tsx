"use client";

import Link from "next/link";
import { useState } from "react";
import { AuthShell } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function ForgotPasswordForm() {
  const [sentTo, setSentTo] = useState<string | null>(null);

  const back = (
    <Link href="/login" className="font-medium text-brand hover:text-brand-deep">
      Back to sign in
    </Link>
  );

  if (sentTo) {
    return (
      <AuthShell
        title="Check your email"
        subtitle={`If an account exists for ${sentTo}, we sent a link to reset your password.`}
        footer={back}
      >
        <Button variant="outline" onClick={() => setSentTo(null)}>
          Use a different email
        </Button>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      title="Forgot your password?"
      subtitle="Enter your email and we'll send you a reset link."
      footer={back}
    >
      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          setSentTo(String(new FormData(e.currentTarget).get("email")));
        }}
      >
        <Input label="Email" name="email" type="email" autoComplete="email" placeholder="you@company.com" required />
        <Button type="submit">Send reset link</Button>
      </form>
    </AuthShell>
  );
}
