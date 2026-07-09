import type { Locale } from "./locales";

export type Project = {
  slug: string;
  name: string;
  url: string;
  external: boolean;
  year: string;
  category: string;
  description: string;
  tags: string[];
  accent: "brand" | "xentris" | "gold";
};

const es: Project[] = [
  {
    slug: "yota-montacargas",
    name: "YOTA Montacargas",
    url: "https://yotamontacargas.com",
    external: true,
    year: "2023",
    category: "Sitio corporativo + Asistente de IA",
    description:
      "Sitio corporativo para una empresa de montacargas con más de 30 años en Barranquilla. Incluye un asistente de inteligencia artificial que recomienda equipos y ayuda con diagnósticos, reduciendo el tiempo de atención.",
    tags: ["Next.js", "IA", "Web corporativa"],
    accent: "brand",
  },
  {
    slug: "platim",
    name: "PLATIM",
    url: "https://platim.co",
    external: true,
    year: "2025",
    category: "Plataforma B2B / e-commerce",
    description:
      "Plataforma web B2B para una empresa de seguridad industrial y dotaciones corporativas en Colombia, con catálogo de productos y solicitudes de cotización.",
    tags: ["Web", "E-commerce", "B2B"],
    accent: "xentris",
  },
  {
    slug: "alexa-ia-openai",
    name: "Alexa IA + OpenAI",
    url: "https://github.com/xentristech/alexa-ia-openai",
    external: true,
    year: "2024",
    category: "Voz + Inteligencia Artificial",
    description:
      "Skill de voz para Amazon Alexa integrada con la API de OpenAI, sobre Python y AWS Lambda, para responder por voz con IA generativa.",
    tags: ["Python", "OpenAI", "AWS Lambda", "Alexa"],
    accent: "gold",
  },
];

const en: Project[] = [
  {
    slug: "yota-montacargas",
    name: "YOTA Montacargas",
    url: "https://yotamontacargas.com",
    external: true,
    year: "2023",
    category: "Corporate site + AI assistant",
    description:
      "Corporate website for a forklift company with over 30 years in Barranquilla, Colombia. Includes an AI assistant that recommends equipment and helps with diagnostics, cutting response time.",
    tags: ["Next.js", "AI", "Corporate web"],
    accent: "brand",
  },
  {
    slug: "platim",
    name: "PLATIM",
    url: "https://platim.co",
    external: true,
    year: "2025",
    category: "B2B platform / e-commerce",
    description:
      "B2B web platform for an industrial safety and corporate workwear company in Colombia, with a product catalog and quotation requests.",
    tags: ["Web", "E-commerce", "B2B"],
    accent: "xentris",
  },
  {
    slug: "alexa-ia-openai",
    name: "Alexa AI + OpenAI",
    url: "https://github.com/xentristech/alexa-ia-openai",
    external: true,
    year: "2024",
    category: "Voice + Artificial Intelligence",
    description:
      "A voice skill for Amazon Alexa integrated with the OpenAI API, built on Python and AWS Lambda, to answer by voice with generative AI.",
    tags: ["Python", "OpenAI", "AWS Lambda", "Alexa"],
    accent: "gold",
  },
];

const byLocale: Record<Locale, Project[]> = { es, en };

export function getProjects(locale: Locale): Project[] {
  return byLocale[locale];
}
