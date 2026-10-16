import { revalidateTag } from "next/cache"
import { type NextRequest, NextResponse } from "next/server"
import { parseBody } from "next-sanity/webhook"
import { ETIQUETA_SANITY } from "@/sanity/live"

/**
 * Webhook de Sanity: cada vez que el admin publica, despublica o borra algo,
 * Sanity llama aquí y la web descarta su copia guardada del contenido.
 * Configuración: docs/CONFIGURAR-SANITY.md, paso 6.
 */
export async function POST(req: NextRequest) {
  const secreto = process.env.SANITY_REVALIDATE_SECRET
  if (!secreto) {
    return NextResponse.json({ error: "Falta SANITY_REVALIDATE_SECRET" }, { status: 500 })
  }

  // Espera a que el contenido esté disponible en la API antes de responder.
  const { isValidSignature, body } = await parseBody<{ _type?: string }>(req, secreto, true)
  if (!isValidSignature) {
    return NextResponse.json({ error: "Firma no válida" }, { status: 401 })
  }

  // expire: 0 → la próxima visita ya ve el contenido nuevo.
  revalidateTag(ETIQUETA_SANITY, { expire: 0 })
  return NextResponse.json({ ok: true, tipo: body?._type ?? null })
}
