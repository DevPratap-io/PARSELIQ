import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="inline-flex items-center gap-2.5" aria-label="ParseIQ home">
      <Image
        src="/logo-mark.png"
        alt=""
        width={36}
        height={36}
        className="size-9"
        priority
      />
      <span className="text-xl font-semibold tracking-tight">
        Parse<span className="text-brand">IQ</span>
      </span>
    </Link>
  );
}
