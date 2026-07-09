import Link from "next/link";
import { serviceIcons, IconArrow, IconCheck } from "./icons";
import { Button, Container, SectionHeading } from "./ui";
import type { Dictionary, Locale, Service } from "@/lib/i18n";

export function ServicesGrid({
  locale,
  services,
  viewLabel,
}: {
  locale: Locale;
  services: Service[];
  viewLabel: string;
}) {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {services.map((s) => {
        const Icon = serviceIcons[s.icon];
        return (
          <Link
            key={s.slug}
            href={`/${locale}/servicios/${s.slug}`}
            className="group relative flex flex-col rounded-2xl border border-ink-200 bg-white p-7 shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:border-brand-400/60"
          >
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-navy-900 text-brand-400 transition-colors group-hover:bg-brand-500 group-hover:text-white">
              {Icon ? <Icon className="h-6 w-6" /> : null}
            </span>
            <h3 className="mt-5 font-display text-lg font-semibold text-navy-900">
              {s.name}
            </h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-500">
              {s.short}
            </p>
            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600">
              {viewLabel}
              <IconArrow className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        );
      })}
    </div>
  );
}

export function ValueList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-500/10 text-brand-600">
            <IconCheck className="h-3.5 w-3.5" />
          </span>
          <span className="text-ink-600">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function CTASection({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <section className="py-20">
      <Container>
        <div className="gradient-navy relative overflow-hidden rounded-3xl px-8 py-16 text-center shadow-[var(--shadow-premium)] sm:px-16">
          <div className="grid-lines absolute inset-0 opacity-60" aria-hidden />
          <div className="relative mx-auto max-w-2xl">
            <SectionHeading
              align="center"
              invert
              eyebrow={dict.common.ctaEyebrow}
              title={dict.common.ctaTitle}
              intro={dict.common.ctaIntro}
            />
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button href={`/${locale}/contacto`} variant="primary">
                {dict.common.scheduleCall}
              </Button>
              <Button href={`/${locale}/servicios`} variant="ghost">
                {dict.common.viewServices}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
