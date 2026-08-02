import { site } from "@/lib/site";

export const runtime = "nodejs";
export const maxDuration = 30;

// Voz por defecto de la API de audio de OpenAI (cálida y neutra).
const VOICE = "alloy";
const MODEL = "gpt-4o-mini-tts";

/** Convierte el texto del asistente (markdown) en audio con la API de OpenAI. */
export async function POST(req: Request) {
  if (!process.env.OPENAI_API_KEY) {
    // El cliente detecta el 503 y usa el TTS del navegador como respaldo.
    return new Response("ai_not_configured", { status: 503 });
  }

  let body: { text?: string; locale?: string };
  try {
    body = await req.json();
  } catch {
    return new Response("bad_request", { status: 400 });
  }

  const text = (body.text ?? "").trim().slice(0, 4000);
  if (!text) return new Response("empty", { status: 400 });

  const res = await fetch("https://api.openai.com/v1/audio/speech", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL,
      voice: VOICE,
      input: text,
      response_format: "mp3",
      instructions: `You are the voice of ${site.name}. Speak in a warm, clear, professional tone.`,
    }),
  });

  if (!res.ok || !res.body) {
    return new Response("tts_failed", { status: 502 });
  }

  return new Response(res.body, {
    headers: {
      "Content-Type": "audio/mpeg",
      "Cache-Control": "no-store",
    },
  });
}
