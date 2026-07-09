export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // El contenido es generado por nosotros (no entrada de usuario).
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
