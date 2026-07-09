import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Button, Container, Eyebrow, SectionHeading } from "@/components/ui";
import { CTASection, ServicesGrid } from "@/components/sections";
import { TechLogos } from "@/components/TechLogos";
import { IconArrow, IconCheck } from "@/components/icons";
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
    title: dict.meta.home.title,
    description: dict.meta.home.description,
  };
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const dict = getDictionary(l);
  const { home } = dict;

  return (
    <>
      {/* HERO */}
      <section className="gradient-navy relative overflow-hidden">
        <div className="grid-lines absolute inset-0 opacity-70" aria-hidden />
        <div
          className="absolute -top-32 right-0 h-96 w-96 rounded-full bg-brand-500/20 blur-3xl"
          aria-hidden
        />
        <Container className="relative py-24 sm:py-32">
          <div className="max-w-3xl animate-fade-up">
            <Eyebrow>{home.heroEyebrow}</Eyebrow>
            <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight text-white text-balance sm:text-6xl">
              {home.heroTitleA}{" "}
              <span className="gradient-text">{home.heroTitleHighlight}</span>{" "}
              {home.heroTitleB}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-300">
              {home.heroP}
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Button href={`/${l}/contacto`} variant="primary">
                {dict.common.scheduleCall}
              </Button>
              <Button href={`/${l}/servicios`} variant="ghost">
                {dict.common.exploreServices}
              </Button>
            </div>
          </div>

          <dl className="mt-20 grid grid-cols-2 gap-8 border-t border-white/10 pt-10 sm:grid-cols-4">
            {home.stats.map((s) => (
              <div key={s.label}>
                <dt className="font-display text-3xl font-bold text-white sm:text-4xl">
                  {s.value}
                </dt>
                <dd className="mt-1 text-sm text-ink-400">{s.label}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* ECOSISTEMA / LOGOS */}
      <TechLogos title={home.ecosystemTitle} />

      {/* SERVICIOS */}
      <section className="py-24">
        <Container>
          <SectionHeading
            eyebrow={home.servicesEyebrow}
            title={home.servicesTitle}
            intro={home.servicesIntro}
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

      {/* CÓMO TRABAJAMOS */}
      <section className="bg-ink-50 py-24">
        <Container>
          <SectionHeading
            eyebrow={home.stepsEyebrow}
            title={home.stepsTitle}
            intro={home.stepsIntro}
          />
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {home.steps.map((step) => (
              <div
                key={step.n}
                className="relative rounded-2xl border border-ink-200 bg-white p-7 shadow-[var(--shadow-card)]"
              >
                <span className="font-display text-4xl font-bold text-brand-500/25">
                  {step.n}
                </span>
                <h3 className="mt-3 font-display text-lg font-semibold text-navy-900">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* POR QUÉ XENTRIS */}
      <section className="py-24">
        <Container>
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <div>
              <SectionHeading
                eyebrow={home.whyEyebrow}
                title={home.whyTitle}
                intro={home.whyIntro}
              />
              <ul className="mt-8 space-y-4">
                {home.reasons.map((r) => (
                  <li key={r} className="flex items-start gap-3">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-500/10 text-brand-600">
                      <IconCheck className="h-4 w-4" />
                    </span>
                    <span className="text-ink-600">{r}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-9">
                <Link
                  href={`/${l}/nosotros`}
                  className="group inline-flex items-center gap-2 text-sm font-semibold text-brand-600"
                >
                  {home.whyLink}
                  <IconArrow className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="gradient-navy relative overflow-hidden rounded-3xl p-10 shadow-[var(--shadow-premium)]">
                <div
                  className="grid-lines absolute inset-0 opacity-60"
                  aria-hidden
                />
                <blockquote className="relative">
                  <p className="font-display text-xl font-medium leading-relaxed text-white text-balance">
                    “{home.quote}”
                  </p>
                  <footer className="mt-6 text-sm text-ink-400">
                    — {home.quoteFooter}
                  </footer>
                </blockquote>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <CTASection locale={l} dict={dict} />
    </>
  );
}
