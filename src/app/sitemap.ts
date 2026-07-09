import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { locales, serviceSlugs, postSlugs, getPost } from "@/lib/i18n";
import { getLegalDocs, legalSlug } from "@/lib/legal";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const paths = [
    "",
    "/servicios",
    "/proyectos",
    "/nosotros",
    "/blog",
    "/contacto",
  ];

  const entries: MetadataRoute.Sitemap = [];

  // Páginas estáticas por idioma, con alternates hreflang.
  for (const path of paths) {
    for (const locale of locales) {
      entries.push({
        url: `${site.url}/${locale}${path}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: path === "" ? 1 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${site.url}/${l}${path}`]),
          ),
        },
      });
    }
  }

  // Servicios
  for (const slug of serviceSlugs) {
    for (const locale of locales) {
      entries.push({
        url: `${site.url}/${locale}/servicios/${slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${site.url}/${l}/servicios/${slug}`]),
          ),
        },
      });
    }
  }

  // Blog
  for (const slug of postSlugs) {
    for (const locale of locales) {
      const post = getPost(locale, slug);
      entries.push({
        url: `${site.url}/${locale}/blog/${slug}`,
        lastModified: post ? new Date(post.date) : now,
        changeFrequency: "yearly",
        priority: 0.6,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${site.url}/${l}/blog/${slug}`]),
          ),
        },
      });
    }
  }

  // Páginas legales (slug distinto por idioma; alternates por clave).
  for (const locale of locales) {
    for (const legalDoc of getLegalDocs(locale)) {
      entries.push({
        url: `${site.url}/${locale}/legal/${legalDoc.slug}`,
        lastModified: now,
        changeFrequency: "yearly",
        priority: 0.3,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [
              l,
              `${site.url}/${l}/legal/${legalSlug(l, legalDoc.key)}`,
            ]),
          ),
        },
      });
    }
  }

  return entries;
}
