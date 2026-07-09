import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, Eyebrow } from "@/components/ui";
import { CTASection } from "@/components/sections";
import { JsonLd } from "@/components/JsonLd";
import { IconArrow } from "@/components/icons";
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
    title: dict.meta.blog.title,
    description: dict.meta.blog.description,
    alternates: {
      canonical: `/${locale}/blog`,
      ...altLanguages("/blog"),
    },
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const dict = getDictionary(l);
  const bp = dict.blogPage;
  const [featured, ...rest] = dict.posts;

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: dict.nav.inicio, url: absUrl(l, "/") },
          { name: dict.nav.blog, url: absUrl(l, "/blog") },
        ])}
      />

      <section className="gradient-navy relative overflow-hidden">
        <div className="grid-lines absolute inset-0 opacity-70" aria-hidden />
        <Container className="relative py-20 sm:py-24">
          <div className="max-w-3xl">
            <Eyebrow>{bp.heroEyebrow}</Eyebrow>
            <h1 className="mt-6 font-display text-4xl font-bold tracking-tight text-white text-balance sm:text-5xl">
              {bp.heroTitle}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-ink-300">{bp.heroP}</p>
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <Link
            href={`/${l}/blog/${featured.slug}`}
            className="group grid gap-8 rounded-3xl border border-ink-200 bg-white p-8 shadow-[var(--shadow-card)] transition-colors hover:border-brand-400 lg:grid-cols-2 lg:p-10"
          >
            <div className="gradient-navy relative hidden overflow-hidden rounded-2xl lg:block">
              <div className="grid-lines absolute inset-0 opacity-60" aria-hidden />
              <span className="absolute bottom-6 left-6 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white ring-1 ring-white/20">
                {featured.category}
              </span>
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-3 text-xs font-medium text-ink-400">
                <span className="text-brand-600">{featured.category}</span>
                <span aria-hidden>•</span>
                <time dateTime={featured.date}>{featured.dateLabel}</time>
                <span aria-hidden>•</span>
                <span>{featured.readingTime}</span>
              </div>
              <h2 className="mt-4 font-display text-2xl font-bold text-navy-900 text-balance">
                {featured.title}
              </h2>
              <p className="mt-3 leading-relaxed text-ink-500">
                {featured.excerpt}
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-600">
                {dict.common.readArticle}
                <IconArrow className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {rest.map((post) => (
              <Link
                key={post.slug}
                href={`/${l}/blog/${post.slug}`}
                className="group flex flex-col rounded-2xl border border-ink-200 bg-white p-7 shadow-[var(--shadow-card)] transition-all hover:-translate-y-1 hover:border-brand-400"
              >
                <div className="flex items-center gap-3 text-xs font-medium text-ink-400">
                  <span className="text-brand-600">{post.category}</span>
                  <span aria-hidden>•</span>
                  <time dateTime={post.date}>{post.dateLabel}</time>
                </div>
                <h3 className="mt-3 font-display text-lg font-semibold text-navy-900 text-balance">
                  {post.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-500">
                  {post.excerpt}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-600">
                  {dict.common.readArticle}
                  <IconArrow className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <CTASection locale={l} dict={dict} />
    </>
  );
}
