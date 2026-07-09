import { absUrl, site } from "./site";
import { getDictionary, type Locale } from "./i18n";

/** JSON-LD de la organización — ayuda a Google y a los LLM a entender la entidad. */
export function organizationSchema(locale: Locale) {
  const dict = getDictionary(locale);
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${site.url}/#organization`,
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    email: site.email,
    telephone: [site.phone, site.phone2],
    description: dict.description,
    slogan: dict.tagline,
    foundingDate: site.founded,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.countryCode,
    },
    sameAs: [site.social.linkedin, site.social.x, site.social.github],
    makesOffer: dict.services.map((s) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: s.name,
        description: s.short,
        url: absUrl(locale, `/servicios/${s.slug}`),
      },
    })),
  };
}

export function websiteSchema(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    name: site.name,
    url: site.url,
    inLanguage: locale,
    publisher: { "@id": `${site.url}/#organization` },
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}

/** Alternates de idioma (hreflang) para el <head>. */
export function altLanguages(path = "/") {
  return {
    languages: {
      es: absUrl("es", path),
      en: absUrl("en", path),
      "x-default": absUrl("es", path),
    },
  };
}
