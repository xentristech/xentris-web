import type { Locale } from "./locales";

export type LegalDoc = {
  key: "privacy" | "terms" | "cookies";
  slug: string;
  navLabel: string;
  title: string;
  updated: string;
  intro: string;
  sections: { heading: string; paragraphs: string[]; list?: string[] }[];
};

const UPDATED_ES = "8 de julio de 2026";
const UPDATED_EN = "July 8, 2026";

const es: LegalDoc[] = [
  {
    key: "privacy",
    slug: "privacidad",
    navLabel: "Política de Privacidad",
    title: "Política de Privacidad",
    updated: UPDATED_ES,
    intro:
      "Esta Política de Privacidad describe cómo Xentris LLC (“Xentris Tech”, “nosotros”) recopila, usa y protege la información personal de quienes visitan xentris.tech o usan nuestros servicios. Al usar el sitio aceptas las prácticas aquí descritas.",
    sections: [
      {
        heading: "1. Responsable del tratamiento",
        paragraphs: [
          "El responsable de tus datos es Xentris LLC, con domicilio en 1501 N Meadow Rd, Merrick, NY 11566, Estados Unidos. Para cualquier consulta sobre privacidad puedes escribir a privacy@xentris.tech.",
        ],
      },
      {
        heading: "2. Qué datos recopilamos",
        paragraphs: ["Recopilamos únicamente los datos necesarios para operar el sitio y atender tus solicitudes:"],
        list: [
          "Datos de contacto que nos proporcionas: nombre, correo electrónico, empresa y el contenido de tus mensajes cuando usas el formulario de contacto o nos escribes.",
          "Datos de suscripción: tu correo electrónico si te suscribes a nuestro boletín o comunicaciones.",
          "Datos de cuenta y pagos: si creas una cuenta o contratas un servicio, los datos necesarios para gestionarlo; los pagos se procesan a través de proveedores externos y no almacenamos los datos completos de tu tarjeta.",
          "Datos de conversaciones con asistentes o chatbots de inteligencia artificial (incluidos los publicados en tiendas de terceros como la tienda de GPTs de OpenAI), cuando decidas usarlos.",
          "Datos técnicos y de uso: dirección IP, tipo de navegador, páginas visitadas y datos recopilados mediante cookies y tecnologías similares.",
        ],
      },
      {
        heading: "3. Para qué usamos tus datos",
        paragraphs: ["Usamos la información para:"],
        list: [
          "Responder tus consultas y prestar los servicios que solicitas.",
          "Operar, mantener y mejorar el sitio y nuestros servicios.",
          "Cumplir obligaciones legales y prevenir fraude o abuso.",
          "Con tu consentimiento, enviarte comunicaciones o mostrarte contenido relevante.",
        ],
      },
      {
        heading: "4. Base legal del tratamiento",
        paragraphs: [
          "Tratamos tus datos con base en tu consentimiento, en la ejecución de un contrato o medidas precontractuales (por ejemplo, responder a una solicitud), en nuestro interés legítimo de operar y mejorar el negocio, y en el cumplimiento de obligaciones legales.",
        ],
      },
      {
        heading: "5. Con quién compartimos datos",
        paragraphs: [
          "No vendemos tus datos personales. Podemos compartirlos con proveedores que nos prestan servicios bajo acuerdos de confidencialidad, únicamente para las finalidades descritas:",
        ],
        list: [
          "Proveedores de infraestructura y alojamiento (por ejemplo, Vercel).",
          "Proveedores de inteligencia artificial que procesan las consultas de nuestros asistentes (por ejemplo, OpenAI, Anthropic, Google o Microsoft), conforme a sus propias políticas.",
          "Plataformas de análisis (por ejemplo, Google Analytics) y de publicidad (por ejemplo, Meta, TikTok y Google Ads), cuando estén activas y con tu consentimiento.",
          "Proveedores de email marketing y de procesamiento de pagos, cuando uses esos servicios.",
          "Autoridades competentes cuando la ley lo exija.",
        ],
      },
      {
        heading: "5.1. Asistentes de IA en plataformas de terceros",
        paragraphs: [
          "Si interactúas con nuestros asistentes de inteligencia artificial publicados en plataformas o tiendas de terceros (por ejemplo, la tienda de GPTs de OpenAI), el tratamiento de tus datos en esa plataforma se rige además por las políticas de privacidad de dicho proveedor. Te recomendamos no compartir información sensible con los asistentes y revisar las políticas de la plataforma correspondiente.",
        ],
      },
      {
        heading: "6. Cookies y tecnologías similares",
        paragraphs: [
          "Utilizamos cookies para el funcionamiento del sitio y, con tu consentimiento, para análisis y marketing. Puedes gestionar tus preferencias desde el banner de cookies y en tu navegador. Consulta nuestra Política de Cookies para más detalle.",
        ],
      },
      {
        heading: "7. Conservación de los datos",
        paragraphs: [
          "Conservamos tus datos solo durante el tiempo necesario para las finalidades descritas o el plazo que exija la ley. Cuando dejan de ser necesarios, los eliminamos o anonimizamos.",
        ],
      },
      {
        heading: "8. Tus derechos",
        paragraphs: [
          "Según tu jurisdicción (incluidos el GDPR europeo y la CCPA de California), puedes ejercer los siguientes derechos escribiéndonos a privacy@xentris.tech:",
        ],
        list: [
          "Acceder, rectificar o eliminar tus datos.",
          "Oponerte o limitar su tratamiento y retirar tu consentimiento.",
          "Solicitar la portabilidad de tus datos.",
          "Presentar una reclamación ante la autoridad de protección de datos competente.",
        ],
      },
      {
        heading: "9. Transferencias internacionales",
        paragraphs: [
          "Operamos desde Estados Unidos y podemos tratar datos en servidores ubicados en distintos países. Aplicamos garantías adecuadas para proteger tus datos en cualquier transferencia internacional.",
        ],
      },
      {
        heading: "10. Menores de edad",
        paragraphs: [
          "El sitio no está dirigido a menores de edad y no recopilamos conscientemente datos de menores. Si crees que un menor nos ha proporcionado datos, contáctanos para eliminarlos.",
        ],
      },
      {
        heading: "11. Cambios en esta política",
        paragraphs: [
          "Podemos actualizar esta Política de Privacidad. Publicaremos la versión vigente en esta página con su fecha de actualización.",
        ],
      },
      {
        heading: "12. Contacto",
        paragraphs: [
          "Para cualquier duda sobre esta política o el tratamiento de tus datos, escríbenos a privacy@xentris.tech.",
        ],
      },
    ],
  },
  {
    key: "terms",
    slug: "terminos",
    navLabel: "Términos y Condiciones",
    title: "Términos y Condiciones",
    updated: UPDATED_ES,
    intro:
      "Estos Términos y Condiciones regulan el uso del sitio xentris.tech y de los servicios de Xentris LLC. Al acceder o usar el sitio aceptas estos términos en su totalidad.",
    sections: [
      {
        heading: "1. Aceptación",
        paragraphs: [
          "Al acceder o utilizar el sitio confirmas que has leído, entendido y aceptado estos Términos. Si no estás de acuerdo, no utilices el sitio.",
        ],
      },
      {
        heading: "2. Nuestros servicios",
        paragraphs: [
          "Xentris Tech ofrece desarrollo de software a medida, infraestructura cloud, soluciones de inteligencia artificial y consultoría de transformación digital. La contratación de servicios específicos se regirá por el acuerdo o propuesta correspondiente.",
        ],
      },
      {
        heading: "3. Uso aceptable",
        paragraphs: ["Te comprometes a no utilizar el sitio para:"],
        list: [
          "Actividades ilegales o que infrinjan derechos de terceros.",
          "Introducir malware, intentar acceder sin autorización o interrumpir el servicio.",
          "Copiar, revender o explotar el contenido sin autorización.",
        ],
      },
      {
        heading: "4. Propiedad intelectual",
        paragraphs: [
          "El sitio, la marca Xentris Tech, los textos, gráficos y demás contenidos son propiedad de Xentris LLC o de sus licenciantes y están protegidos por la ley. No se concede ninguna licencia salvo lo expresamente indicado.",
        ],
      },
      {
        heading: "5. Enlaces y servicios de terceros",
        paragraphs: [
          "El sitio puede contener enlaces a servicios de terceros. No controlamos ni respondemos por sus contenidos ni políticas; su uso es bajo tu responsabilidad.",
        ],
      },
      {
        heading: "6. Exención de garantías",
        paragraphs: [
          "El sitio se proporciona “tal cual” y “según disponibilidad”, sin garantías de ningún tipo, expresas o implícitas, en la medida permitida por la ley.",
        ],
      },
      {
        heading: "7. Limitación de responsabilidad",
        paragraphs: [
          "En la máxima medida permitida por la ley, Xentris Tech no será responsable de daños indirectos, incidentales o consecuentes derivados del uso o la imposibilidad de uso del sitio.",
        ],
      },
      {
        heading: "8. Indemnización",
        paragraphs: [
          "Aceptas mantener indemne a Xentris Tech frente a reclamaciones derivadas de tu uso indebido del sitio o del incumplimiento de estos Términos.",
        ],
      },
      {
        heading: "9. Ley aplicable y jurisdicción",
        paragraphs: [
          "Estos Términos se rigen por las leyes del Estado de Delaware, Estados Unidos (estado de constitución de la sociedad), sin dar efecto a sus normas de conflicto de leyes. Cualquier controversia se someterá a los tribunales competentes del Estado de Delaware.",
        ],
      },
      {
        heading: "10. Cambios",
        paragraphs: [
          "Podemos modificar estos Términos en cualquier momento. La versión vigente se publicará en esta página con su fecha de actualización.",
        ],
      },
      {
        heading: "11. Contacto",
        paragraphs: [
          "Para cualquier consulta sobre estos Términos, escríbenos a privacy@xentris.tech.",
        ],
      },
    ],
  },
  {
    key: "cookies",
    slug: "cookies",
    navLabel: "Política de Cookies",
    title: "Política de Cookies",
    updated: UPDATED_ES,
    intro:
      "Esta Política de Cookies explica qué son las cookies, cuáles utilizamos en xentris.tech y cómo puedes gestionarlas.",
    sections: [
      {
        heading: "1. Qué son las cookies",
        paragraphs: [
          "Las cookies son pequeños archivos que se guardan en tu dispositivo cuando visitas un sitio web. Sirven para que el sitio funcione, recordar tus preferencias y, en algunos casos, analizar el uso o mostrar publicidad.",
        ],
      },
      {
        heading: "2. Tipos de cookies que usamos",
        paragraphs: ["Clasificamos las cookies así:"],
        list: [
          "Esenciales/funcionales: necesarias para el funcionamiento del sitio, como recordar tu idioma (por ejemplo, la cookie NEXT_LOCALE) o tu decisión sobre cookies. No requieren consentimiento.",
          "Analíticas: nos ayudan a entender cómo se usa el sitio para mejorarlo, por ejemplo mediante Google Analytics. Se activan solo con tu consentimiento.",
          "Marketing/publicidad: píxeles y etiquetas de plataformas como el píxel de Meta, el píxel de TikTok y Google Ads, para medir campañas y mostrar anuncios relevantes. Se activan solo con tu consentimiento.",
        ],
      },
      {
        heading: "3. Consentimiento y gestión",
        paragraphs: [
          "Al entrar al sitio te mostramos un banner para aceptar o rechazar las cookies no esenciales. Puedes cambiar tu decisión en cualquier momento borrando las cookies del sitio o desde la configuración de tu navegador. Rechazar las cookies no esenciales no afecta el funcionamiento básico del sitio.",
        ],
      },
      {
        heading: "4. Cookies de terceros",
        paragraphs: [
          "Cuando estén activas, algunas cookies son gestionadas por terceros (por ejemplo, proveedores de análisis o publicidad) conforme a sus propias políticas de privacidad. Te recomendamos revisarlas.",
        ],
      },
      {
        heading: "5. Cambios",
        paragraphs: [
          "Podemos actualizar esta Política de Cookies. Publicaremos la versión vigente en esta página con su fecha de actualización.",
        ],
      },
      {
        heading: "6. Contacto",
        paragraphs: [
          "Para dudas sobre esta política, escríbenos a privacy@xentris.tech.",
        ],
      },
    ],
  },
];

const en: LegalDoc[] = [
  {
    key: "privacy",
    slug: "privacy",
    navLabel: "Privacy Policy",
    title: "Privacy Policy",
    updated: UPDATED_EN,
    intro:
      "This Privacy Policy describes how Xentris LLC (“Xentris Tech”, “we”) collects, uses and protects the personal information of those who visit xentris.tech or use our services. By using the site you accept the practices described here.",
    sections: [
      {
        heading: "1. Data controller",
        paragraphs: [
          "The controller of your data is Xentris LLC, located at 1501 N Meadow Rd, Merrick, NY 11566, United States. For any privacy inquiry, write to privacy@xentris.tech.",
        ],
      },
      {
        heading: "2. Data we collect",
        paragraphs: ["We collect only the data needed to run the site and handle your requests:"],
        list: [
          "Contact data you provide: name, email, company and the content of your messages when you use the contact form or write to us.",
          "Subscription data: your email address if you subscribe to our newsletter or communications.",
          "Account and payment data: if you create an account or engage a service, the data needed to manage it; payments are processed by third-party providers and we do not store your full card details.",
          "Data from conversations with artificial intelligence assistants or chatbots (including those published on third-party stores such as the OpenAI GPT Store), when you choose to use them.",
          "Technical and usage data: IP address, browser type, pages visited and data collected through cookies and similar technologies.",
        ],
      },
      {
        heading: "3. How we use your data",
        paragraphs: ["We use the information to:"],
        list: [
          "Respond to your inquiries and provide the services you request.",
          "Operate, maintain and improve the site and our services.",
          "Comply with legal obligations and prevent fraud or abuse.",
          "With your consent, send you communications or show you relevant content.",
        ],
      },
      {
        heading: "4. Legal basis",
        paragraphs: [
          "We process your data based on your consent, the performance of a contract or pre-contractual steps (for example, responding to a request), our legitimate interest in operating and improving the business, and compliance with legal obligations.",
        ],
      },
      {
        heading: "5. Who we share data with",
        paragraphs: [
          "We do not sell your personal data. We may share it with providers who serve us under confidentiality agreements, solely for the purposes described:",
        ],
        list: [
          "Infrastructure and hosting providers (for example, Vercel).",
          "Artificial intelligence providers that process our assistants' queries (for example, OpenAI, Anthropic, Google or Microsoft), under their own policies.",
          "Analytics platforms (for example, Google Analytics) and advertising platforms (for example, Meta, TikTok and Google Ads), when active and with your consent.",
          "Email marketing and payment processing providers, when you use those services.",
          "Competent authorities when required by law.",
        ],
      },
      {
        heading: "5.1. AI assistants on third-party platforms",
        paragraphs: [
          "If you interact with our artificial intelligence assistants published on third-party platforms or stores (for example, the OpenAI GPT Store), the processing of your data on that platform is also governed by that provider's privacy policies. We recommend not sharing sensitive information with the assistants and reviewing the relevant platform's policies.",
        ],
      },
      {
        heading: "6. Cookies and similar technologies",
        paragraphs: [
          "We use cookies for the site to function and, with your consent, for analytics and marketing. You can manage your preferences from the cookie banner and in your browser. See our Cookie Policy for more detail.",
        ],
      },
      {
        heading: "7. Data retention",
        paragraphs: [
          "We keep your data only for as long as necessary for the described purposes or as required by law. When it is no longer needed, we delete or anonymize it.",
        ],
      },
      {
        heading: "8. Your rights",
        paragraphs: [
          "Depending on your jurisdiction (including the EU GDPR and California's CCPA), you may exercise the following rights by writing to privacy@xentris.tech:",
        ],
        list: [
          "Access, correct or delete your data.",
          "Object to or restrict its processing and withdraw your consent.",
          "Request the portability of your data.",
          "File a complaint with the competent data protection authority.",
        ],
      },
      {
        heading: "9. International transfers",
        paragraphs: [
          "We operate from the United States and may process data on servers located in different countries. We apply appropriate safeguards to protect your data in any international transfer.",
        ],
      },
      {
        heading: "10. Minors",
        paragraphs: [
          "The site is not directed to minors and we do not knowingly collect data from minors. If you believe a minor has provided us data, contact us to delete it.",
        ],
      },
      {
        heading: "11. Changes to this policy",
        paragraphs: [
          "We may update this Privacy Policy. We will publish the current version on this page with its update date.",
        ],
      },
      {
        heading: "12. Contact",
        paragraphs: [
          "For any questions about this policy or the processing of your data, write to privacy@xentris.tech.",
        ],
      },
    ],
  },
  {
    key: "terms",
    slug: "terms",
    navLabel: "Terms & Conditions",
    title: "Terms & Conditions",
    updated: UPDATED_EN,
    intro:
      "These Terms & Conditions govern the use of the xentris.tech site and the services of Xentris LLC. By accessing or using the site you accept these terms in full.",
    sections: [
      {
        heading: "1. Acceptance",
        paragraphs: [
          "By accessing or using the site you confirm that you have read, understood and accepted these Terms. If you do not agree, do not use the site.",
        ],
      },
      {
        heading: "2. Our services",
        paragraphs: [
          "Xentris Tech offers custom software development, cloud infrastructure, artificial intelligence solutions and digital transformation consulting. The engagement of specific services is governed by the corresponding agreement or proposal.",
        ],
      },
      {
        heading: "3. Acceptable use",
        paragraphs: ["You agree not to use the site to:"],
        list: [
          "Carry out illegal activities or infringe third-party rights.",
          "Introduce malware, attempt unauthorized access or disrupt the service.",
          "Copy, resell or exploit the content without authorization.",
        ],
      },
      {
        heading: "4. Intellectual property",
        paragraphs: [
          "The site, the Xentris Tech brand, texts, graphics and other content are owned by Xentris LLC or its licensors and are protected by law. No license is granted except as expressly stated.",
        ],
      },
      {
        heading: "5. Third-party links and services",
        paragraphs: [
          "The site may contain links to third-party services. We do not control or take responsibility for their content or policies; your use of them is at your own risk.",
        ],
      },
      {
        heading: "6. Disclaimer of warranties",
        paragraphs: [
          "The site is provided “as is” and “as available”, without warranties of any kind, express or implied, to the extent permitted by law.",
        ],
      },
      {
        heading: "7. Limitation of liability",
        paragraphs: [
          "To the maximum extent permitted by law, Xentris Tech shall not be liable for any indirect, incidental or consequential damages arising from the use or inability to use the site.",
        ],
      },
      {
        heading: "8. Indemnification",
        paragraphs: [
          "You agree to hold Xentris Tech harmless from claims arising from your misuse of the site or breach of these Terms.",
        ],
      },
      {
        heading: "9. Governing law and jurisdiction",
        paragraphs: [
          "These Terms are governed by the laws of the State of Delaware, United States (the company's state of formation), without giving effect to its conflict-of-law rules. Any dispute shall be submitted to the competent courts of the State of Delaware.",
        ],
      },
      {
        heading: "10. Changes",
        paragraphs: [
          "We may modify these Terms at any time. The current version will be published on this page with its update date.",
        ],
      },
      {
        heading: "11. Contact",
        paragraphs: [
          "For any questions about these Terms, write to privacy@xentris.tech.",
        ],
      },
    ],
  },
  {
    key: "cookies",
    slug: "cookies",
    navLabel: "Cookie Policy",
    title: "Cookie Policy",
    updated: UPDATED_EN,
    intro:
      "This Cookie Policy explains what cookies are, which ones we use on xentris.tech and how you can manage them.",
    sections: [
      {
        heading: "1. What are cookies",
        paragraphs: [
          "Cookies are small files stored on your device when you visit a website. They make the site work, remember your preferences and, in some cases, analyze usage or show advertising.",
        ],
      },
      {
        heading: "2. Types of cookies we use",
        paragraphs: ["We classify cookies as follows:"],
        list: [
          "Essential/functional: needed for the site to work, such as remembering your language (for example, the NEXT_LOCALE cookie) or your cookie choice. They do not require consent.",
          "Analytics: help us understand how the site is used so we can improve it, for example through Google Analytics. Enabled only with your consent.",
          "Marketing/advertising: pixels and tags from platforms such as the Meta pixel, the TikTok pixel and Google Ads, to measure campaigns and show relevant ads. Enabled only with your consent.",
        ],
      },
      {
        heading: "3. Consent and management",
        paragraphs: [
          "When you enter the site we show a banner to accept or reject non-essential cookies. You can change your choice at any time by deleting the site's cookies or from your browser settings. Rejecting non-essential cookies does not affect the basic functioning of the site.",
        ],
      },
      {
        heading: "4. Third-party cookies",
        paragraphs: [
          "When active, some cookies are managed by third parties (for example, analytics or advertising providers) under their own privacy policies. We recommend you review them.",
        ],
      },
      {
        heading: "5. Changes",
        paragraphs: [
          "We may update this Cookie Policy. We will publish the current version on this page with its update date.",
        ],
      },
      {
        heading: "6. Contact",
        paragraphs: ["For questions about this policy, write to privacy@xentris.tech."],
      },
    ],
  },
];

const legalByLocale: Record<Locale, LegalDoc[]> = { es, en };

export function getLegalDocs(locale: Locale): LegalDoc[] {
  return legalByLocale[locale];
}

export function getLegalBySlug(
  locale: Locale,
  slug: string,
): LegalDoc | undefined {
  return legalByLocale[locale].find((d) => d.slug === slug);
}

export function legalSlug(locale: Locale, key: LegalDoc["key"]): string {
  return legalByLocale[locale].find((d) => d.key === key)?.slug ?? "";
}

export const legalSlugs: Record<Locale, string[]> = {
  es: es.map((d) => d.slug),
  en: en.map((d) => d.slug),
};
