import Link from "next/link";
import { navRoutes, site } from "@/lib/site";
import { Logo } from "./Logo";
import { IconMail, IconPhone, IconPin, IconGitHub } from "./icons";
import type { Dictionary, Locale } from "@/lib/i18n";
import { getLegalDocs } from "@/lib/legal";

export function Footer({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const year = new Date().getFullYear();
  const p = (path: string) => `/${locale}${path === "/" ? "" : path}`;
  const legalDocs = getLegalDocs(locale);

  return (
    <footer className="mt-24 bg-navy-950 text-ink-300">
      <div className="container-x grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="max-w-sm">
          <Logo locale={locale} invert />
          <p className="mt-4 text-sm leading-relaxed text-ink-400">
            {dict.description}
          </p>
          <div className="mt-6 space-y-3 text-sm">
            <a
              href={`mailto:${site.email}`}
              className="flex items-center gap-3 hover:text-white"
            >
              <IconMail className="h-4 w-4 text-brand-400" />
              {site.email}
            </a>
            <a
              href={`tel:${site.phoneHref}`}
              className="flex items-center gap-3 hover:text-white"
            >
              <IconPhone className="h-4 w-4 text-brand-400" />
              {site.phone}
            </a>
            <a
              href={`tel:${site.phone2Href}`}
              className="flex items-center gap-3 hover:text-white"
            >
              <IconPhone className="h-4 w-4 text-brand-400" />
              {site.phone2}
            </a>
            <p className="flex items-start gap-3">
              <IconPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
              <span>
                {site.address.street}, {site.address.city},{" "}
                {site.address.region} {site.address.postalCode},{" "}
                {site.address.country}
              </span>
            </p>
          </div>
          <div className="mt-6 flex items-center gap-3">
            <a
              href={site.social.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="grid h-10 w-10 place-items-center rounded-xl bg-white/5 text-ink-300 ring-1 ring-white/10 transition-colors hover:bg-white/10 hover:text-white"
            >
              <IconGitHub className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
            {dict.common.footerNav}
          </h3>
          <ul className="mt-4 space-y-3 text-sm">
            {navRoutes.map((r) => (
              <li key={r.key}>
                <Link href={p(r.href)} className="hover:text-white">
                  {dict.nav[r.key]}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
            {dict.common.footerServices}
          </h3>
          <ul className="mt-4 space-y-3 text-sm">
            {dict.services.map((s) => (
              <li key={s.slug}>
                <Link href={p(`/servicios/${s.slug}`)} className="hover:text-white">
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center gap-4 py-6 text-xs text-ink-400 md:flex-row md:justify-between">
          <p className="order-2 md:order-1">
            © {year} {site.legalName}. {dict.common.rights}
            <span className="mx-2 text-white/20">·</span>
            {locale === "en" ? "Developed by " : "Desarrollado por "}
            <a
              href="https://farid.com.co"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-400 transition-colors hover:text-white"
            >
              Farid Jiménez
            </a>
          </p>
          <nav className="order-1 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 md:order-2">
            {legalDocs.map((d) => (
              <Link
                key={d.key}
                href={p(`/legal/${d.slug}`)}
                className="hover:text-white"
              >
                {d.navLabel}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
