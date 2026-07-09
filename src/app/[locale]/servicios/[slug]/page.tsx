import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button, Container, Eyebrow } from "@/components/ui";
import { CTASection, ValueList } from "@/components/sections";
import { JsonLd } from "@/components/JsonLd";
import { serviceIcons, IconArrow } from "@/components/icons";
import { breadcrumbSchema, faqSchema, altLanguages } from "@/lib/seo";
import { absUrl } from "@/lib/site";
import {
  getDictionary,
  getService,
  isLocale,
  locales,
  serviceSlugs,
  type Locale,
} from "@/lib/i18n";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    serviceSlugs.map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const service = getService(locale, slug);
  if (!service) return {};
  return {
    title: service.name,
    description: service.short,
    alternates: {
      canonical: `/${locale}/servicios/${slug}`,
      ...altLanguages(`/servicios/${slug}`),
    },
    openGraph: {
      title: `${service.name} | Xentris Tech`,
      description: service.short,
      url: absUrl(locale, `/servicios/${slug}`),
    },
  };
}

export default async function ServiceDetail({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const dict = getDictionary(l);
  const service = getService(l, slug);
  if (!service) notFound();

  const Icon = serviceIcons[service.icon];
  const others = dict.services.filter((s) => s.slug !== service.slug);
  const sp = dict.servicesPage;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    url: absUrl(l, `/servicios/${service.slug}`),
    provider: { "@id": `https://xentris.tech/#organization` },
    areaServed: "Global",
    inLanguage: l,
  };

  return (
    <>
      <JsonLd data={serviceSchema} />
      <JsonLd data={faqSchema(service.faqs)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: dict.nav.inicio, url: absUrl(l, "/") },
          { name: dict.nav.servicios, url: absUrl(l, "/servicios") },
          { name: service.name, url: absUrl(l, `/servicios/${service.slug}`) },
        ])}
      />

      {/* HERO */}
      <section className="gradient-navy relative overflow-hidden">
        <div className="grid-lines absolute inset-0 opacity-70" aria-hidden />
        <Container className="relative py-20 sm:py-24">
          <nav className="mb-8 flex items-center gap-2 text-sm text-ink-400">
            <Link href={`/${l}/servicios`} className="hover:text-white">
              {dict.nav.servicios}
            </Link>
            <span aria-hidden>/</span>
            <span className="text-ink-300">{service.name}</span>
          </nav>
          <div className="max-w-3xl">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white/10 text-brand-300 ring-1 ring-white/15">
              {Icon ? <Icon className="h-7 w-7" /> : null}
            </span>
            <h1 className="mt-6 font-display text-4xl font-bold tracking-tight text-white text-balance sm:text-5xl">
              {service.name}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-ink-300">
              {service.description}
            </p>
            <div className="mt-9">
              <Button href={`/${l}/contacto`} variant="primary">
                {dict.common.requestProposal}
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* RESULTADOS + FEATURES */}
      <section className="py-20">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[0.9fr_1.4fr]">
            <div>
              <Eyebrow>{sp.outcomesEyebrow}</Eyebrow>
              <h2 className="mt-4 font-display text-2xl font-bold text-navy-900">
                {sp.outcomesTitle}
              </h2>
              <div className="mt-6">
                <ValueList items={service.outcomes} />
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {service.features.map((f) => (
                <div
                  key={f.title}
                  className="rounded-2xl border border-ink-200 bg-white p-6 shadow-[var(--shadow-card)]"
                >
                  <h3 className="font-display text-base font-semibold text-navy-900">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-500">
                    {f.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="bg-ink-50 py-20">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>{sp.faqEyebrow}</Eyebrow>
            <h2 className="mt-4 font-display text-3xl font-bold text-navy-900">
              {service.name}: {sp.faqTitleSuffix}
            </h2>
            <div className="mt-10 divide-y divide-ink-200 border-y border-ink-200">
              {service.faqs.map((f) => (
                <details key={f.q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-navy-900">
                    {f.q}
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white text-brand-600 ring-1 ring-ink-200 transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-ink-500">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* OTROS SERVICIOS */}
      <section className="py-20">
        <Container>
          <h2 className="font-display text-2xl font-bold text-navy-900">
            {sp.otherServices}
          </h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {others.map((s) => (
              <Link
                key={s.slug}
                href={`/${l}/servicios/${s.slug}`}
                className="group flex items-center justify-between gap-4 rounded-xl border border-ink-200 bg-white p-5 text-sm font-semibold text-navy-900 transition-colors hover:border-brand-400"
              >
                {s.name}
                <IconArrow className="h-4 w-4 text-brand-500 transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <CTASection locale={l} dict={dict} />
    </>
  );
}
