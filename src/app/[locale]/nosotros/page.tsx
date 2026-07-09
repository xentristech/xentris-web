import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container, Eyebrow, SectionHeading } from "@/components/ui";
import { CTASection } from "@/components/sections";
import { JsonLd } from "@/components/JsonLd";
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
    title: dict.meta.nosotros.title,
    description: dict.meta.nosotros.description,
    alternates: {
      canonical: `/${locale}/nosotros`,
      ...altLanguages("/nosotros"),
    },
  };
}

export default async function NosotrosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const dict = getDictionary(l);
  const a = dict.about;

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: dict.nav.inicio, url: absUrl(l, "/") },
          { name: dict.nav.nosotros, url: absUrl(l, "/nosotros") },
        ])}
      />

      <section className="gradient-navy relative overflow-hidden">
        <div className="grid-lines absolute inset-0 opacity-70" aria-hidden />
        <Container className="relative py-20 sm:py-28">
          <div className="max-w-3xl">
            <Eyebrow>{a.heroEyebrow}</Eyebrow>
            <h1 className="mt-6 font-display text-4xl font-bold tracking-tight text-white text-balance sm:text-5xl">
              {a.heroTitle}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-ink-300">
              {a.heroP}
            </p>
          </div>
        </Container>
      </section>

      {/* MISIÓN / VISIÓN */}
      <section className="py-20">
        <Container>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-3xl border border-ink-200 bg-white p-9 shadow-[var(--shadow-card)]">
              <Eyebrow>{a.missionEyebrow}</Eyebrow>
              <p className="mt-5 text-lg leading-relaxed text-ink-600">
                {a.missionText}
              </p>
            </div>
            <div className="rounded-3xl border border-ink-200 bg-white p-9 shadow-[var(--shadow-card)]">
              <Eyebrow>{a.visionEyebrow}</Eyebrow>
              <p className="mt-5 text-lg leading-relaxed text-ink-600">
                {a.visionText}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* VALORES */}
      <section className="bg-ink-50 py-20">
        <Container>
          <SectionHeading
            eyebrow={a.valuesEyebrow}
            title={a.valuesTitle}
            intro={a.valuesIntro}
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {a.values.map((v) => (
              <div
                key={v.title}
                className="rounded-2xl border border-ink-200 bg-white p-7 shadow-[var(--shadow-card)]"
              >
                <h3 className="font-display text-lg font-semibold text-navy-900">
                  {v.title}
                </h3>
                <p className="mt-2 leading-relaxed text-ink-500">{v.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CONTACTO RESUMEN */}
      <section className="py-20">
        <Container>
          <div className="grid gap-10 rounded-3xl border border-ink-200 bg-white p-9 shadow-[var(--shadow-card)] sm:grid-cols-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">
                {a.location}
              </p>
              <p className="mt-2 text-ink-600">
                {site.address.city}, {site.address.region}
                <br />
                {site.address.country}
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">
                {a.email}
              </p>
              <a
                href={`mailto:${site.email}`}
                className="mt-2 block text-ink-600 hover:text-brand-600"
              >
                {site.email}
              </a>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">
                {a.phone}
              </p>
              <a
                href={`tel:${site.phoneHref}`}
                className="mt-2 block text-ink-600 hover:text-brand-600"
              >
                {site.phone}
              </a>
            </div>
          </div>
        </Container>
      </section>

      <CTASection locale={l} dict={dict} />
    </>
  );
}
