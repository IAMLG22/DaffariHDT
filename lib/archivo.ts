import datos from "./archivo-blog.json"

/**
 * Archivo Histórico: el blog antiguo (daffarihombresdetrono.blogspot.com)
 * migrado con su fecha original. Se regenera con scripts/migrar-blog-antiguo.mjs.
 */
export type ArchivoEntrada = {
  slug: string
  tipo: "entrada" | "pagina"
  titulo: string
  fecha: string // ISO (fecha original de publicación)
  autor: string
  etiquetas: string[]
  extracto: string
  portada: string | null
  urlOriginal: string
  html: string
}

/** Lo que necesita el listado (sin el cuerpo, para no cargarlo en el cliente). */
export type ArchivoResumen = Omit<ArchivoEntrada, "html" | "urlOriginal" | "autor">

export const archivo = datos as ArchivoEntrada[]

export const archivoResumen: ArchivoResumen[] = archivo.map(
  ({ slug, tipo, titulo, fecha, etiquetas, extracto, portada }) => ({ slug, tipo, titulo, fecha, etiquetas, extracto, portada }),
)

export function entradaArchivo(slug: string) {
  const entradas = archivo.filter((e) => e.tipo === "entrada")
  const i = entradas.findIndex((e) => e.slug === slug)
  const entrada = archivo.find((e) => e.slug === slug)
  return {
    entrada,
    // El listado va de más reciente a más antigua
    posterior: i > 0 ? entradas[i - 1] : undefined,
    anterior: i >= 0 && i < entradas.length - 1 ? entradas[i + 1] : undefined,
  }
}
