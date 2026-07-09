"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { IconArrow } from "./icons";
import { navRoutes } from "@/lib/site";
import { locales, localeShort, type Locale } from "@/lib/locales";

type NavLabels = Record<string, string>;

export function Navbar({
  locale,
  labels,
  ctaLabel,
}: {
  locale: Locale;
  labels: NavLabels;
  ctaLabel: string;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const items = navRoutes.map((r) => ({
    href: `/${locale}${r.href === "/" ? "" : r.href}`,
    label: labels[r.key] ?? r.key,
    root: r.href === "/",
  }));

  const isActive = (href: string, root: boolean) =>
    root ? pathname === href : pathname.startsWith(href);

  // Cambia el prefijo de idioma manteniendo la ruta actual.
  const swapLocale = (target: Locale) => {
    const rest = pathname.replace(/^\/(es|en)/, "");
    return `/${target}${rest || ""}` || `/${target}`;
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-ink-200/70 bg-white/85 backdrop-blur-md"
          : "border-b border-transparent bg-white/0"
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between">
        <Logo locale={locale} />

        <nav className="hidden items-center gap-1 md:flex">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                isActive(item.href, item.root)
                  ? "text-brand-600"
                  : "text-ink-500 hover:text-navy-900"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <LangSwitcher current={locale} swapLocale={swapLocale} />
          <Link
            href={`/${locale}/contacto`}
            className="group inline-flex items-center gap-2 rounded-full bg-navy-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-600"
          >
            {ctaLabel}
            <IconArrow className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-lg text-navy-900 ring-1 ring-ink-200 md:hidden"
          aria-label="Menu"
          aria-expanded={open}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
            {open ? (
              <path
                d="M6 6l12 12M18 6 6 18"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </div>

      {open ? (
        <div className="border-t border-ink-200 bg-white md:hidden">
          <div className="container-x flex flex-col py-3">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-lg px-3 py-3 text-base font-medium ${
                  isActive(item.href, item.root)
                    ? "bg-ink-50 text-brand-600"
                    : "text-navy-900"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-3 flex items-center gap-2 px-3">
              {locales.map((l) => (
                <Link
                  key={l}
                  href={swapLocale(l)}
                  className={`rounded-full px-3 py-1.5 text-sm font-semibold ring-1 ${
                    l === locale
                      ? "bg-navy-900 text-white ring-navy-900"
                      : "text-ink-500 ring-ink-200"
                  }`}
                >
                  {localeShort[l]}
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}

function LangSwitcher({
  current,
  swapLocale,
}: {
  current: Locale;
  swapLocale: (l: Locale) => string;
}) {
  return (
    <div className="flex items-center rounded-full bg-ink-100 p-0.5">
      {locales.map((l) => (
        <Link
          key={l}
          href={swapLocale(l)}
          aria-label={`Cambiar a ${l.toUpperCase()}`}
          className={`rounded-full px-2.5 py-1 text-xs font-bold transition-colors ${
            l === current
              ? "bg-white text-navy-900 shadow-sm"
              : "text-ink-400 hover:text-navy-900"
          }`}
        >
          {localeShort[l]}
        </Link>
      ))}
    </div>
  );
}
