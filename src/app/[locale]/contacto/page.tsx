import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container, Eyebrow } from "@/components/ui";
import { ContactForm } from "@/components/ContactForm";
import { JsonLd } from "@/components/JsonLd";
import { IconCheck, IconMail, IconPhone, IconPin } from "@/components/icons";
import { breadcrumbSchema, altLanguages } from "@/lib/seo";
import { absUrl, site } from "@/lib/site";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return {
    title: dict.meta.contacto.title,
    description: dict.meta.contacto.description,
    alternates: {
      canonical: `/${locale}/contacto`,
      ...altLanguages("/contacto"),
    },
  };
}

export default async function ContactoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const dict = getDictionary(l);
  const c = dict.contact;

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: dict.nav.inicio, url: absUrl(l, "/") },
          { name: dict.nav.contacto, url: absUrl(l, "/contacto") },
        ])}
      />

      <section className="gradient-navy relative overflow-hidden">
        <div className="grid-lines absolute inset-0 opacity-70" aria-hidden />
        <Container className="relative py-20 sm:py-24">
          <div className="max-w-3xl">
            <Eyebrow>{c.heroEyebrow}</Eyebrow>
            <h1 className="mt-6 font-display text-4xl font-bold tracking-tight text-white text-balance sm:text-5xl">
              {c.heroTitle}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-ink-300">{c.heroP}</p>
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
            <div>
              <h2 className="font-display text-2xl font-bold text-navy-900">
                {c.dataTitle}
              </h2>
              <p className="mt-3 leading-relaxed text-ink-500">{c.dataIntro}</p>

              <div className="mt-8 space-y-4">
                <a
                  href={`mailto:${site.email}`}
                  className="flex items-center gap-4 rounded-2xl border border-ink-200 bg-white p-5 shadow-[var(--shadow-card)] transition-colors hover:border-brand-400"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-500/10 text-brand-600">
                    <IconMail className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-xs font-semibold uppercase tracking-wider text-ink-400">
                      {c.labelEmail}
                    </span>
                    <span className="font-medium text-navy-900">
                      {site.email}
                    </span>
                  </span>
                </a>

                <a
                  href={`tel:${site.phoneHref}`}
                  className="flex items-center gap-4 rounded-2xl border border-ink-200 bg-white p-5 shadow-[var(--shadow-card)] transition-colors hover:border-brand-400"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-500/10 text-brand-600">
                    <IconPhone className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-xs font-semibold uppercase tracking-wider text-ink-400">
                      {c.labelPhone}
                    </span>
                    <span className="font-medium text-navy-900">
                      {site.phone}
                    </span>
                  </span>
                </a>

                <a
                  href={`tel:${site.phone2Href}`}
                  className="flex items-center gap-4 rounded-2xl border border-ink-200 bg-white p-5 shadow-[var(--shadow-card)] transition-colors hover:border-brand-400"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-500/10 text-brand-600">
                    <IconPhone className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-xs font-semibold uppercase tracking-wider text-ink-400">
                      {c.labelPhone2}
                    </span>
                    <span className="font-medium text-navy-900">
                      {site.phone2}
                    </span>
                  </span>
                </a>

                <div className="flex items-center gap-4 rounded-2xl border border-ink-200 bg-white p-5 shadow-[var(--shadow-card)]">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-500/10 text-brand-600">
                    <IconPin className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-xs font-semibold uppercase tracking-wider text-ink-400">
                      {c.labelOffice}
                    </span>
                    <span className="font-medium text-navy-900">
                      {site.address.street}, {site.address.city},{" "}
                      {site.address.region} {site.address.postalCode}
                    </span>
                  </span>
                </div>
              </div>

              <ul className="mt-8 space-y-3">
                {c.promises.map((p) => (
                  <li key={p} className="flex items-center gap-3 text-ink-600">
                    <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-500/10 text-brand-600">
                      <IconCheck className="h-3.5 w-3.5" />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-ink-200 bg-white p-8 shadow-[var(--shadow-premium)]">
              <h2 className="font-display text-xl font-bold text-navy-900">
                {c.formTitle}
              </h2>
              <p className="mt-1 text-sm text-ink-500">{c.formSubtitle}</p>
              <div className="mt-6">
                <ContactForm t={c} />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
