import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui";
import { CTASection } from "@/components/sections";
import { JsonLd } from "@/components/JsonLd";
import { IconArrow } from "@/components/icons";
import { breadcrumbSchema, altLanguages } from "@/lib/seo";
import { absUrl, site } from "@/lib/site";
import {
  getDictionary,
  getPost,
  isLocale,
  locales,
  postSlugs,
  type Locale,
} from "@/lib/i18n";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    postSlugs.map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const post = getPost(locale, slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `/${locale}/blog/${slug}`,
      ...altLanguages(`/blog/${slug}`),
    },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: absUrl(locale, `/blog/${slug}`),
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const dict = getDictionary(l);
  const post = getPost(l, slug);
  if (!post) notFound();
  const bp = dict.blogPost;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: l,
    author: { "@type": "Organization", name: post.author, url: site.url },
    publisher: { "@id": `${site.url}/#organization` },
    mainEntityOfPage: absUrl(l, `/blog/${post.slug}`),
  };

  return (
    <>
      <JsonLd data={articleSchema} />
      <JsonLd
        data={breadcrumbSchema([
          { name: dict.nav.inicio, url: absUrl(l, "/") },
          { name: dict.nav.blog, url: absUrl(l, "/blog") },
          { name: post.title, url: absUrl(l, `/blog/${post.slug}`) },
        ])}
      />

      <article>
        <section className="gradient-navy relative overflow-hidden">
          <div className="grid-lines absolute inset-0 opacity-70" aria-hidden />
          <Container className="relative py-20 sm:py-24">
            <nav className="mb-8 flex items-center gap-2 text-sm text-ink-400">
              <Link href={`/${l}/blog`} className="hover:text-white">
                {dict.nav.blog}
              </Link>
              <span aria-hidden>/</span>
              <span className="text-ink-300">{post.category}</span>
            </nav>
            <div className="max-w-3xl">
              <h1 className="font-display text-4xl font-bold tracking-tight text-white text-balance sm:text-5xl">
                {post.title}
              </h1>
              <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-ink-400">
                <span>{post.author}</span>
                <span aria-hidden>•</span>
                <time dateTime={post.date}>
                  {bp.updatedOn} {post.dateLabel}
                </time>
                <span aria-hidden>•</span>
                <span>
                  {post.readingTime} {bp.readingSuffix}
                </span>
              </div>
            </div>
          </Container>
        </section>

        <section className="py-16">
          <Container>
            <div className="mx-auto max-w-3xl">
              <div className="rounded-2xl border-l-4 border-brand-500 bg-ink-50 p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-brand-600">
                  {bp.summary}
                </p>
                <p className="mt-2 leading-relaxed text-ink-600">{post.tldr}</p>
              </div>

              <div className="mt-12 space-y-12">
                {post.sections.map((section) => (
                  <div key={section.heading}>
                    <h2 className="font-display text-2xl font-bold text-navy-900 text-balance">
                      {section.heading}
                    </h2>
                    {section.paragraphs.map((para, i) => (
                      <p
                        key={i}
                        className="mt-4 text-lg leading-relaxed text-ink-600"
                      >
                        {para}
                      </p>
                    ))}
                    {section.list ? (
                      <ul className="mt-5 space-y-2">
                        {section.list.map((li) => (
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

              <div className="mt-14 border-t border-ink-200 pt-8">
                <Link
                  href={`/${l}/blog`}
                  className="group inline-flex items-center gap-2 text-sm font-semibold text-brand-600"
                >
                  <IconArrow className="h-4 w-4 rotate-180" />
                  {bp.back}
                </Link>
              </div>
            </div>
          </Container>
        </section>
      </article>

      <CTASection locale={l} dict={dict} />
    </>
  );
}
