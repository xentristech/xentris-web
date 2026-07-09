import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { site } from "@/lib/site";

export const runtime = "nodejs";
export const maxDuration = 30;

type Msg = { role: "user" | "assistant"; content: string };

export async function POST(req: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return new Response("ai_not_configured", { status: 503 });
  }

  let body: { messages?: Msg[]; locale?: string };
  try {
    body = await req.json();
  } catch {
    return new Response("bad_request", { status: 400 });
  }

  const messages = Array.isArray(body.messages) ? body.messages.slice(-12) : [];
  const l: Locale = isLocale(body.locale ?? "") ? (body.locale as Locale) : "es";
  const dict = getDictionary(l);

  const services = dict.services
    .map((s) => `- ${s.name}: ${s.short}`)
    .join("\n");

  const lang = l === "en" ? "English" : "Spanish";

  const system = `You are the virtual assistant for ${site.name} (${site.url}), a technology company.
Always reply in ${lang}. Be warm, concise and professional — like a helpful expert, not a robot. Use short paragraphs.

About ${site.name}:
${dict.description}

Services:
${services}

How we work: free discovery call → strategy/roadmap → phased build → ongoing support.
Contact: email ${site.email}, phone ${site.phone}. Contact page: ${site.url}/${l}/contacto

Rules:
- Help visitors understand the services and guide them toward booking a free discovery call or using the contact form.
- Do NOT invent specific prices. If asked about cost, explain it depends on scope and offer a free estimate on a call.
- You are an AI assistant, not a human; don't claim otherwise. Don't make legal, financial or guaranteed-result promises.
- If you don't know something specific about the company, say so and suggest contacting the team.
- Keep answers focused and useful; avoid long lists unless asked.`;

  const result = streamText({
    model: openai("gpt-4o-mini"),
    system,
    messages,
    temperature: 0.4,
  });

  return result.toTextStreamResponse();
}
