import type { Locale } from "./locales";

/** Datos invariantes de la empresa (no cambian entre idiomas). */
export const site = {
  name: "Xentris Tech",
  legalName: "Xentris LLC",
  shortName: "Xentris",
  url: "https://xentris.tech",
  email: "info@xentris.tech",
  phone: "+1 (917) 764-5565",
  phoneHref: "+19177645565",
  phone2: "+1 (516) 779-0204",
  phone2Href: "+15167790204",
  address: {
    street: "1501 N Meadow Rd",
    city: "Merrick",
    region: "NY",
    postalCode: "11566",
    country: "Estados Unidos",
    countryCode: "US",
  },
  founded: "2025",
  formationState: "Delaware",
  social: {
    linkedin: "https://www.linkedin.com/company/xentris-tech",
    x: "https://x.com/xentristech",
    github: "https://github.com/xentristech",
  },
} as const;

/** Rutas de navegación (las etiquetas vienen del diccionario por idioma). */
export const navRoutes = [
  { key: "inicio", href: "/" },
  { key: "servicios", href: "/servicios" },
  { key: "proyectos", href: "/proyectos" },
  { key: "nosotros", href: "/nosotros" },
  { key: "blog", href: "/blog" },
  { key: "contacto", href: "/contacto" },
] as const;

export type NavKey = (typeof navRoutes)[number]["key"];

/** URL absoluta con prefijo de idioma (para canonical, sitemap, schema). */
export function absUrl(locale: Locale, path = "/"): string {
  const clean = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  return `${site.url}/${locale}${clean}`;
}
