<p align="center">
  <img src="public/brand/mark-purple.png" alt="Xentris Tech" width="96" />
</p>

<h1 align="center">Xentris Tech — Website</h1>

<p align="center">
  <em>Más que tecnología, soluciones que impulsan tu crecimiento.</em><br />
  Sitio corporativo bilingüe (ES/EN) de <a href="https://xentris.tech">xentris.tech</a>, con asistente de IA y formulario que envía correos de verdad.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Deployed_on-Vercel-000000?logo=vercel&logoColor=white" alt="Vercel" />
</p>

---

Sitio web corporativo de **Xentris Tech**, una empresa de tecnología que ofrece software a medida, infraestructura cloud, inteligencia artificial y consultoría de transformación digital. Construido con Next.js (App Router), totalmente bilingüe y optimizado para SEO tradicional y para motores de respuesta con IA (GEO/AEO).

## Características

- **Bilingüe (ES/EN)** con enrutado por idioma (`/es`, `/en`), detección por país/idioma y `hreflang`.
- **Asistente de IA** flotante (OpenAI, respuestas en streaming y con formato Markdown) que conoce los servicios y guía al contacto.
- **Formulario de contacto real** con backend en Resend — los mensajes llegan a un buzón de la empresa (no depende del `mailto` del visitante).
- **SEO y AI-SEO**: JSON-LD (Organization, Service, FAQPage, BlogPosting, Breadcrumb), `sitemap.xml` con alternates, `robots.txt` y `llms.txt`.
- **Páginas legales** (Privacidad, Términos, Cookies) bilingües + banner de consentimiento de cookies.
- Secciones de **Servicios**, **Proyectos**, **Nosotros** y **Blog**, más un muro de logos del ecosistema de IA.
- Diseño corporativo premium con marca propia y componentes accesibles.

## Stack

- [Next.js 16](https://nextjs.org) (App Router, Turbopack) · [React 19](https://react.dev)
- [TypeScript](https://www.typescriptlang.org) · [Tailwind CSS 4](https://tailwindcss.com)
- [Vercel AI SDK](https://sdk.vercel.ai) + [OpenAI](https://openai.com) (asistente)
- [Resend](https://resend.com) (correo transaccional del formulario)
- Desplegado en [Vercel](https://vercel.com)

## Estructura

```
src/
├─ app/
│  ├─ [locale]/          # Rutas por idioma: home, servicios, proyectos, nosotros, blog, contacto, legal
│  ├─ api/
│  │  ├─ chat/           # Asistente de IA (OpenAI, streaming)
│  │  └─ contact/        # Envío del formulario (Resend)
│  ├─ sitemap.ts · robots.ts · icon.png
├─ components/           # Navbar, Footer, Assistant, ContactForm, CookieBanner, TechLogos…
├─ lib/
│  ├─ content/           # Diccionarios es/en + tipos
│  ├─ i18n.ts · locales.ts · site.ts · seo.ts · legal.ts · projects.ts
└─ middleware.ts         # Redirección por idioma / país
public/
└─ brand/                # Logos e íconos para web
```

## Empezar

Requisitos: Node.js 20+.

```bash
npm install
npm run dev
```

Abre <http://localhost:3000> (o el puerto que indique la consola).

```bash
npm run build   # build de producción
npm run start   # servir el build
```

## Variables de entorno

Créalas en Vercel (Settings → Environment Variables) o en un `.env.local` para desarrollo. El sitio compila y funciona sin ellas; las funciones que dependen de cada clave devuelven `503` hasta configurarla.

| Variable | Requerida | Descripción |
|----------|-----------|-------------|
| `OPENAI_API_KEY` | Asistente de IA | Clave de OpenAI para `/api/chat`. |
| `RESEND_API_KEY` | Formulario | Clave de Resend para enviar el formulario (`/api/contact`). |
| `CONTACT_TO` | Opcional | Buzón destino del formulario (por defecto `info@xentris.tech`). |
| `CONTACT_FROM` | Opcional | Remitente; requiere dominio verificado en Resend. |

> [!IMPORTANT]
> Nunca subas claves al repositorio. `.env*` está ignorado por git. Los documentos confidenciales de la empresa y los assets crudos de marca (`/branding/`) también están fuera del control de versiones.

## Despliegue

Desplegado en Vercel. Cada cambio se publica con:

```bash
vercel deploy --prod
```

El dominio `xentris.tech` apunta a Vercel mediante registros `A`/`CNAME` (el correo permanece en su proveedor original).

---

<p align="center">
  Desarrollado por <a href="https://farid.com.co">Farid Jiménez</a> · © Xentris LLC
</p>
