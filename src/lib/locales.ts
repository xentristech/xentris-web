// Constantes de idioma SIN dependencias de diccionarios (seguro para el cliente).
export const locales = ["es", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "es";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export const localeNames: Record<Locale, string> = {
  es: "Español",
  en: "English",
};

export const localeShort: Record<Locale, string> = {
  es: "ES",
  en: "EN",
};

export const ogLocale: Record<Locale, string> = {
  es: "es_ES",
  en: "en_US",
};

/** Construye un href con prefijo de idioma. */
export function localePath(locale: Locale, path: string): string {
  if (path === "/") return `/${locale}`;
  return `/${locale}${path.startsWith("/") ? path : `/${path}`}`;
}
