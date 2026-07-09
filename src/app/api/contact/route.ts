import { NextResponse } from "next/server";
import { Resend } from "resend";
import { site } from "@/lib/site";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { ok: false, error: "email_not_configured" },
      { status: 503 },
    );
  }

  let data: Record<string, string>;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  const name = (data.name ?? "").trim();
  const email = (data.email ?? "").trim();
  const company = (data.company ?? "").trim();
  const service = (data.service ?? "").trim();
  const message = (data.message ?? "").trim();

  // Validación mínima
  if (!name || !email || !message || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json(
      { ok: false, error: "validation" },
      { status: 422 },
    );
  }

  const to = process.env.CONTACT_TO ?? site.email;
  const from = process.env.CONTACT_FROM ?? "Xentris Web <onboarding@resend.dev>";

  const resend = new Resend(apiKey);
  try {
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `Nuevo mensaje del sitio — ${service || "Contacto"}`,
      text: [
        `Nombre: ${name}`,
        `Correo: ${email}`,
        `Empresa: ${company || "—"}`,
        `Servicio: ${service || "—"}`,
        "",
        "Mensaje:",
        message,
      ].join("\n"),
    });
    if (error) {
      return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
  }
}
