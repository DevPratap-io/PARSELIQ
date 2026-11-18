import Link from "next/link";
import { AuthShell, GoogleButton, OrDivider } from "@/components/auth/auth-shell";
import { RegisterForm } from "@/components/auth/register-form";

export const metadata = { title: "Create account — ParseIQ" };

export default function RegisterPage() {
  return (
    <AuthShell
      title="Create your account"
      subtitle="Your documents. Decoded intelligently."
      footer={
        <>
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-brand hover:text-brand-deep">
            Sign in
          </Link>
        </>
      }
    >
      <GoogleButton label="Sign up with Google" />
      <OrDivider />
      <RegisterForm />
    </AuthShell>
  );
}
