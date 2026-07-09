import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container, Eyebrow } from "@/components/ui";
import { CTASection } from "@/components/sections";
import { JsonLd } from "@/components/JsonLd";
import { IconArrow, IconGitHub } from "@/components/icons";
import { breadcrumbSchema, altLanguages } from "@/lib/seo";
import { absUrl, site } from "@/lib/site";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { getProjects } from "@/lib/projects";

const accentGradient: Record<string, string> = {
  brand: "from-brand-500 to-navy-800",
  xentris: "from-xentris-400 to-xentris-900",
  gold: "from-gold-400 to-navy-800",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return {
    title: dict.meta.proyectos.title,
    description: dict.meta.proyectos.description,
    alternates: {
      canonical: `/${locale}/proyectos`,
      ...altLanguages("/proyectos"),
    },
  };
}

export default async function ProyectosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const dict = getDictionary(l);
  const pp = dict.projectsPage;
  const projects = getProjects(l);

  const isGitHub = (url: string) => url.includes("github.com");

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: dict.nav.inicio, url: absUrl(l, "/") },
          { name: dict.nav.proyectos, url: absUrl(l, "/proyectos") },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: projects.map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: p.name,
            url: p.url,
          })),
        }}
      />

      <section className="gradient-navy relative overflow-hidden">
        <div className="grid-lines absolute inset-0 opacity-70" aria-hidden />
        <Container className="relative py-20 sm:py-28">
          <div className="max-w-3xl">
            <Eyebrow>{pp.heroEyebrow}</Eyebrow>
            <h1 className="mt-6 font-display text-4xl font-bold tracking-tight text-white text-balance sm:text-5xl">
              {pp.heroTitle}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-300">
              {pp.heroP}
            </p>
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <div className="grid gap-8 lg:grid-cols-3">
            {projects.map((p) => (
              <a
                key={p.slug}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:border-brand-400/60"
              >
                <div
                  className={`gradient-navy relative h-40 overflow-hidden bg-gradient-to-br ${accentGradient[p.accent]}`}
                >
                  <div
                    className="grid-lines absolute inset-0 opacity-50"
                    aria-hidden
                  />
                  <span className="absolute left-5 top-5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white ring-1 ring-white/25 backdrop-blur-sm">
                    {p.year}
                  </span>
                  <span className="absolute bottom-5 left-5 font-display text-2xl font-bold text-white">
                    {p.name}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-brand-600">
                    {p.category}
                  </p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-500">
                    {p.description}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-ink-100 px-2.5 py-1 text-xs font-medium text-ink-600"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-600">
                    {isGitHub(p.url) ? (
                      <>
                        <IconGitHub className="h-4 w-4" />
                        {pp.viewCode}
                      </>
                    ) : (
                      <>
                        {pp.visitSite}
                        <IconArrow className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </Container>
      </section>

      <CTASection locale={l} dict={dict} />
    </>
  );
}
