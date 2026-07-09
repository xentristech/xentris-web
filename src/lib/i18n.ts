import { es } from "./content/es";
import { en } from "./content/en";
import type { Dictionary, Post, Service } from "./content/types";
import { type Locale } from "./locales";

export * from "./locales";
export type { Dictionary, Post, Service } from "./content/types";

const dictionaries: Record<Locale, Dictionary> = { es, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export const serviceSlugs = [
  "software-a-medida",
  "cloud-devops",
  "ia-automatizacion",
  "consultoria-transformacion-digital",
] as const;

export const postSlugs = [
  "que-es-la-transformacion-digital",
  "cuando-conviene-software-a-medida",
  "como-usar-ia-en-tu-empresa",
] as const;

export function getService(locale: Locale, slug: string): Service | undefined {
  return getDictionary(locale).services.find((s) => s.slug === slug);
}

export function getPost(locale: Locale, slug: string): Post | undefined {
  return getDictionary(locale).posts.find((p) => p.slug === slug);
}
