import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";
import type { Locale } from "@/lib/i18n";

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
      className="group inline-flex items-center gap-2.5"
      aria-label={`${site.name} — ${locale === "en" ? "home" : "inicio"}`}
    >
      <Image
        src={invert ? "/brand/mark-white.png" : "/brand/mark-black.png"}
        alt="Xentris"
        width={34}
        height={34}
        priority
        className="h-8 w-auto transition-transform duration-300 group-hover:scale-105"
      />
      <span
        className={`font-wordmark text-base tracking-[0.16em] ${
          invert ? "text-white" : "text-navy-900"
        }`}
      >
        XENTRIS
      </span>
    </Link>
  );
}
