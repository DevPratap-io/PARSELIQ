import Link from "next/link";
import { AuthShell, GoogleButton, OrDivider } from "@/components/auth/auth-shell";
import { LoginForm } from "@/components/auth/login-form";

export const metadata = { title: "Sign in — ParseIQ" };

export default function LoginPage() {
  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to your ParseIQ workspace."
      footer={
        <>
          New to ParseIQ?{" "}
          <Link href="/register" className="font-medium text-brand hover:text-brand-deep">
            Create an account
          </Link>
        </>
      }
    >
      <GoogleButton label="Continue with Google" />
      <OrDivider />
      <LoginForm />
    </AuthShell>
  );
}
