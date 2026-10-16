/**
 * Pasa al panel (Sanity) el contenido que hoy está en el código:
 * noticias, Capataces Ilustres (con sus fotos) y Junta de Gobierno.
 *
 * Se puede ejecutar varias veces: usa identificadores fijos, así que
 * actualiza en lugar de duplicar. OJO: sobrescribe los cambios que se hayan
 * hecho en el panel a esos mismos documentos.
 *
 * Necesita en .env.local:
 *   NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET
 *   SANITY_API_WRITE_TOKEN  (token con permiso «Editor», solo para este script)
 *
 * Ejecutar:  node scripts/migrar-a-sanity.mts
 */
import { createClient } from "@sanity/client"
import { createReadStream, existsSync } from "node:fs"
import { basename, join } from "node:path"
import { junta, noticias } from "../lib/content.ts"
import { homenajeados } from "../lib/capataces.ts"

try {
  process.loadEnvFile(".env.local")
} catch {
  // También vale con las variables ya definidas en el entorno.
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production"
const token = process.env.SANITY_API_WRITE_TOKEN
if (!projectId || !token) {
  console.error("Faltan NEXT_PUBLIC_SANITY_PROJECT_ID o SANITY_API_WRITE_TOKEN en .env.local")
  process.exit(1)
}

const cliente = createClient({ projectId, dataset, token, apiVersion: "2026-10-01", useCdn: false })

let n = 0
const clave = () => `k${(n++).toString(36)}${Math.random().toString(36).slice(2, 7)}`

/** Párrafos de texto → bloques de texto con formato de Sanity. */
const aBloques = (parrafos: string[]) =>
  parrafos.map((texto) => ({
    _type: "block",
    _key: clave(),
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", _key: clave(), text: texto, marks: [] }],
  }))

/** Sube una imagen de /public y devuelve la referencia (con caché para no repetir). */
const subidas = new Map<string, string>()
async function imagen(ruta: string | undefined, extra: Record<string, unknown> = {}) {
  if (!ruta || /^https?:/.test(ruta)) return undefined
  const archivo = join("public", ruta)
  if (!existsSync(archivo)) {
    console.warn("  · no encuentro", archivo)
    return undefined
  }
  let id = subidas.get(archivo)
  if (!id) {
    const asset = await cliente.assets.upload("image", createReadStream(archivo), { filename: basename(archivo) })
    id = asset._id
    subidas.set(archivo, id)
  }
  return { _type: "image", asset: { _type: "reference", _ref: id }, ...extra }
}

async function main() {
  const tx = cliente.transaction()

  console.log("Noticias…")
  for (const no of noticias) {
    tx.createOrReplace({
      _id: `noticia-${no.slug}`,
      _type: "noticia",
      titular: no.titular,
      slug: { _type: "slug", current: no.slug },
      categoria: no.categoria,
      fecha: no.fecha,
      fechaTexto: no.fechaTexto,
      extracto: no.extracto,
      imagen: await imagen(no.imagen, { alt: "", pie: no.creditoImagen }),
      cuerpo: aBloques(no.cuerpo),
    })
  }

  console.log("Capataces Ilustres…")
  for (const h of homenajeados) {
    tx.createOrReplace({
      _id: `homenajeado-${h.slug}`,
      _type: "homenajeado",
      nombre: h.nombre,
      slug: { _type: "slug", current: h.slug },
      anio: h.anio ?? undefined,
      lema: h.lema,
      foto: await imagen(h.foto?.src),
      texto: aBloques(h.parrafos),
      cita: h.cita ? { texto: h.cita.texto, autor: h.cita.autor } : undefined,
      imagen: await imagen(h.imagen?.src, { alt: h.imagen?.alt, pie: h.imagen?.pie }),
      imagenVertical: !!h.imagen?.vertical,
      fuentes: h.fuentes.map((f) => ({ _type: "fuente", _key: clave(), texto: f.texto, url: f.href })),
    })
  }

  console.log("Junta de Gobierno…")
  junta.cargos.forEach((c, i) => {
    tx.createOrReplace({
      _id: `junta-${i + 1}`,
      _type: "miembroJunta",
      nombre: c.nombre,
      cargo: c.cargo,
      orden: i + 1,
      nota: c.destacado
        ? "Elegido en asamblea general extraordinaria el 6 de diciembre de 2022, abre una nueva etapa de renovación de la asociación."
        : undefined,
    })
  })
  junta.consejeros.forEach((nombre, i) => {
    tx.createOrReplace({ _id: `junta-consejero-${i + 1}`, _type: "miembroJunta", nombre, cargo: "Consejero", orden: 100 + i })
  })

  await tx.commit()
  console.log(`Listo: ${noticias.length} noticias, ${homenajeados.length} homenajeados, ${junta.cargos.length + junta.consejeros.length} miembros de la junta, ${subidas.size} imágenes.`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
