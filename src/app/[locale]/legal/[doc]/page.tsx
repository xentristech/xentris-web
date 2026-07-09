import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container, Eyebrow } from "@/components/ui";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/seo";
import { absUrl, site } from "@/lib/site";
import { getDictionary, isLocale, locales, type Locale } from "@/lib/i18n";
import {
  getLegalBySlug,
  getLegalDocs,
  legalSlug,
  legalSlugs,
} from "@/lib/legal";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    legalSlugs[locale].map((doc) => ({ locale, doc })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; doc: string }>;
}): Promise<Metadata> {
  const { locale, doc } = await params;
  if (!isLocale(locale)) return {};
  const legal = getLegalBySlug(locale, doc);
  if (!legal) return {};

  // hreflang: el mismo documento tiene slug distinto por idioma.
  const languages: Record<string, string> = {};
  for (const l of locales) {
    languages[l] = absUrl(l, `/legal/${legalSlug(l, legal.key)}`);
  }

  return {
    title: legal.title,
    description: legal.intro.slice(0, 155),
    alternates: {
      canonical: `/${locale}/legal/${doc}`,
      languages: { ...languages, "x-default": languages.es },
    },
    robots: { index: true, follow: true },
  };
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ locale: string; doc: string }>;
}) {
  const { locale, doc } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const dict = getDictionary(l);
  const legal = getLegalBySlug(l, doc);
  if (!legal) notFound();

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: dict.nav.inicio, url: absUrl(l, "/") },
          { name: legal.navLabel, url: absUrl(l, `/legal/${doc}`) },
        ])}
      />

      <section className="gradient-navy relative overflow-hidden">
        <div className="grid-lines absolute inset-0 opacity-70" aria-hidden />
        <Container className="relative py-16 sm:py-20">
          <div className="max-w-3xl">
            <Eyebrow>{dict.common.footerLegal}</Eyebrow>
            <h1 className="mt-6 font-display text-4xl font-bold tracking-tight text-white text-balance sm:text-5xl">
              {legal.title}
            </h1>
            <p className="mt-4 text-sm text-ink-400">
              {dict.common.legalUpdated} {legal.updated}
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="mx-auto max-w-3xl">
            <p className="text-lg leading-relaxed text-ink-600">{legal.intro}</p>

            <div className="mt-10 space-y-10">
              {legal.sections.map((s) => (
                <div key={s.heading}>
                  <h2 className="font-display text-xl font-bold text-navy-900">
                    {s.heading}
                  </h2>
                  {s.paragraphs.map((p, i) => (
                    <p key={i} className="mt-3 leading-relaxed text-ink-600">
                      {p}
                    </p>
                  ))}
                  {s.list ? (
                    <ul className="mt-4 space-y-2">
                      {s.list.map((li) => (
                        <li
                          key={li}
                          className="flex items-start gap-3 text-ink-600"
                        >
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                          <span>{li}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              ))}
            </div>

            <p className="mt-12 border-t border-ink-200 pt-6 text-sm text-ink-400">
              © {new Date().getFullYear()} {site.legalName}.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
