import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container, Eyebrow, SectionHeading } from "@/components/ui";
import { CTASection, ServicesGrid } from "@/components/sections";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, altLanguages } from "@/lib/seo";
import { absUrl } from "@/lib/site";
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
    title: dict.meta.servicios.title,
    description: dict.meta.servicios.description,
    alternates: {
      canonical: `/${locale}/servicios`,
      ...altLanguages("/servicios"),
    },
  };
}

export default async function ServiciosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const dict = getDictionary(l);
  const sp = dict.servicesPage;

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: dict.nav.inicio, url: absUrl(l, "/") },
          { name: dict.nav.servicios, url: absUrl(l, "/servicios") },
        ])}
      />

      <section className="gradient-navy relative overflow-hidden">
        <div className="grid-lines absolute inset-0 opacity-70" aria-hidden />
        <Container className="relative py-20 sm:py-28">
          <div className="max-w-3xl">
            <Eyebrow>{sp.heroEyebrow}</Eyebrow>
            <h1 className="mt-6 font-display text-4xl font-bold tracking-tight text-white text-balance sm:text-5xl">
              {sp.heroTitle}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-300">
              {sp.heroP}
            </p>
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <SectionHeading
            eyebrow={sp.sectionEyebrow}
            title={sp.sectionTitle}
            intro={sp.sectionIntro}
          />
          <div className="mt-14">
            <ServicesGrid
              locale={l}
              services={dict.services}
              viewLabel={dict.common.viewService}
            />
          </div>
        </Container>
      </section>

      <CTASection locale={l} dict={dict} />
    </>
  );
}
