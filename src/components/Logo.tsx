import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";
import type { Locale } from "@/lib/i18n";

// Lockups oficiales del brandbook (X morada + wordmark XENTRIS).
export function Logo({
  locale,
  invert = false,
}: {
  locale: Locale;
  invert?: boolean;
}) {
  return (
    <Link
      href={`/${locale}`}
      className="group inline-flex items-center"
      aria-label={`${site.name} — ${locale === "en" ? "home" : "inicio"}`}
    >
      <Image
        src={invert ? "/brand/logo-on-dark.png" : "/brand/logo-on-light.png"}
        alt="Xentris"
        width={900}
        height={163}
        priority
        className="h-7 w-auto transition-transform duration-300 group-hover:scale-[1.03]"
      />
    </Link>
  );
}
