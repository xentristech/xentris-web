import Link from "next/link";
import type { ReactNode } from "react";
import { IconArrow } from "./icons";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`container-x ${className}`}>{children}</div>;
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand-600">
      <span className="h-px w-6 bg-gold-500" />
      {children}
    </span>
  );
}

export function Button({
  children,
  href,
  variant = "primary",
  className = "",
}: {
  children: ReactNode;
  href: string;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
}) {
  const styles: Record<string, string> = {
    primary:
      "bg-brand-500 text-white hover:bg-brand-600 shadow-[0_10px_30px_-10px_rgba(139,59,192,0.6)]",
    secondary:
      "bg-white text-navy-900 ring-1 ring-ink-200 hover:ring-brand-400 hover:text-brand-600",
    ghost:
      "text-white/90 ring-1 ring-white/20 hover:bg-white/10 hover:ring-white/40",
  };
  return (
    <Link
      href={href}
      className={`group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-200 ${styles[variant]} ${className}`}
    >
      {children}
      <IconArrow className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
    </Link>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  invert = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  invert?: boolean;
}) {
  return (
    <div
      className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}
    >
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2
        className={`mt-4 font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl ${
          invert ? "text-white" : "text-navy-900"
        }`}
      >
        {title}
      </h2>
      {intro ? (
        <p
          className={`mt-4 text-lg leading-relaxed ${
            invert ? "text-ink-300" : "text-ink-500"
          }`}
        >
          {intro}
        </p>
      ) : null}
    </div>
  );
}
