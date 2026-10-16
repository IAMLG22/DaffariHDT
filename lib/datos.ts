/**
 * Punto único de acceso al contenido editable (blog, noticias, capataces y
 * junta). Si la web está conectada a Sanity, lo lee del panel de
 * administración; si no, usa el contenido incluido en el código.
 */
import type { PortableTextBlock } from "next-sanity"
import { sanityConfigurado } from "@/sanity/env"
import { consultar as consultarSanity } from "@/sanity/live"
import { urlImagen } from "@/sanity/imagen"
import {
  blogActual,
  junta as juntaLocal,
  noticias as noticiasLocales,
  ordenarNoticias,
  type Entrada,
  type Junta,
  type Noticia,
} from "@/lib/content"
import { homenajeados as homenajeadosLocales, type Homenajeado } from "@/lib/capataces"

const consultar = consultarSanity

/**
 * Lee de Sanity si está configurado; si no, devuelve el contenido incluido en
 * el código. Si Sanity está configurado pero falla, el error se propaga a
 * propósito: mejor que Vercel avise a que publique contenido desactualizado.
 */
async function desdeSanity<T>(leer: () => Promise<T>, respaldo: T): Promise<T> {
  return sanityConfigurado ? leer() : respaldo
}

type ImagenSanity = { asset?: { _ref: string }; alt?: string; pie?: string } | null

/** Minutos de lectura aproximados (200 palabras por minuto). */
function minutosLectura(bloques?: PortableTextBlock[]) {
  if (!bloques) return undefined
  const palabras = bloques
    .flatMap((b) => ("children" in b && Array.isArray(b.children) ? b.children : []))
    .map((c) => ("text" in c ? String(c.text) : ""))
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length
  return Math.max(1, Math.round(palabras / 200))
}

// ---------------------------------------------------------------- Noticias
const CAMPOS_NOTICIA = `"slug": slug.current, titular, categoria, fecha, fechaTexto, extracto, imagen, cuerpo`

type NoticiaSanity = Omit<Noticia, "imagen" | "cuerpo" | "cuerpoRico" | "creditoImagen"> & {
  imagen: ImagenSanity
  cuerpo: PortableTextBlock[] | null
}

const aNoticia = (n: NoticiaSanity): Noticia => ({
  ...n,
  imagen: urlImagen(n.imagen),
  creditoImagen: n.imagen?.pie,
  cuerpo: [],
  cuerpoRico: n.cuerpo ?? [],
})

export async function getNoticias(): Promise<Noticia[]> {
  return desdeSanity(async () => {
    const lista = await consultar<NoticiaSanity[]>(`*[_type == "noticia" && defined(slug.current)]{${CAMPOS_NOTICIA}}`)
    return ordenarNoticias(lista.map(aNoticia))
  }, ordenarNoticias(noticiasLocales))
}

export async function getNoticia(slug: string): Promise<Noticia | undefined> {
  return desdeSanity(async () => {
    const n = await consultar<NoticiaSanity | null>(`*[_type == "noticia" && slug.current == $slug][0]{${CAMPOS_NOTICIA}}`, { slug })
    return n ? aNoticia(n) : undefined
  }, noticiasLocales.find((n) => n.slug === slug))
}

// ---------------------------------------------------------------- Blog actual
const CAMPOS_ENTRADA = `"slug": slug.current, titulo, fecha, autor, seccion, extracto, imagen, cuerpo`

type EntradaSanity = Omit<Entrada, "imagen" | "cuerpo" | "cuerpoRico" | "lectura"> & {
  imagen: ImagenSanity
  cuerpo: PortableTextBlock[] | null
}

const aEntrada = (e: EntradaSanity): Entrada => ({
  ...e,
  autor: e.autor || "Redacción Daffari",
  imagen: urlImagen(e.imagen),
  cuerpo: [],
  cuerpoRico: e.cuerpo ?? [],
  lectura: minutosLectura(e.cuerpo ?? undefined),
})

export async function getEntradas(): Promise<Entrada[]> {
  return desdeSanity(async () => {
    const lista = await consultar<EntradaSanity[]>(
      `*[_type == "entradaBlog" && defined(slug.current)] | order(fecha desc){${CAMPOS_ENTRADA}}`,
    )
    return lista.map(aEntrada)
  }, blogActual)
}

export async function getEntrada(slug: string): Promise<Entrada | undefined> {
  return desdeSanity(async () => {
    const e = await consultar<EntradaSanity | null>(`*[_type == "entradaBlog" && slug.current == $slug][0]{${CAMPOS_ENTRADA}}`, { slug })
    return e ? aEntrada(e) : undefined
  }, blogActual.find((e) => e.slug === slug))
}

// ---------------------------------------------------------------- Capataces Ilustres
type HomenajeadoSanity = {
  slug: string
  anio: number | null
  nombre: string
  lema: string | null
  foto: ImagenSanity
  texto: PortableTextBlock[] | null
  cita: { texto?: string; autor?: string } | null
  imagen: ImagenSanity
  imagenVertical: boolean | null
  fuentes: { texto: string; url: string }[] | null
}

const aHomenajeado = (h: HomenajeadoSanity): Homenajeado => ({
  slug: h.slug,
  anio: h.anio ?? null,
  nombre: h.nombre,
  lema: h.lema ?? "",
  parrafos: [],
  texto: h.texto ?? [],
  cita: h.cita?.texto ? { texto: h.cita.texto, autor: h.cita.autor ?? "" } : undefined,
  imagen: h.imagen?.asset
    ? { src: urlImagen(h.imagen, 1200)!, alt: h.imagen.alt ?? "", pie: h.imagen.pie, vertical: !!h.imagenVertical }
    : undefined,
  foto: h.foto?.asset ? { src: urlImagen(h.foto, 900)! } : undefined,
  fuentes: (h.fuentes ?? []).map((f) => ({ texto: f.texto, href: f.url })),
})

export async function getHomenajeados(): Promise<Homenajeado[]> {
  return desdeSanity(async () => {
    const lista = await consultar<HomenajeadoSanity[]>(
      `*[_type == "homenajeado" && defined(slug.current)]{"slug": slug.current, anio, nombre, lema, foto, texto, cita, imagen, imagenVertical, fuentes}`,
    )
    // Por año; los que aún no tienen año, al final.
    return lista.map(aHomenajeado).sort((a, b) => (a.anio ?? 9999) - (b.anio ?? 9999))
  }, homenajeadosLocales)
}

// ---------------------------------------------------------------- Junta de Gobierno
export async function getJunta(): Promise<Junta> {
  return desdeSanity(async () => {
    const miembros = await consultar<{ nombre: string; cargo: string; nota?: string }[]>(
      `*[_type == "miembroJunta"] | order(orden asc, nombre asc){nombre, cargo, nota}`,
    )
    if (miembros.length === 0) return juntaLocal
    return {
      cargos: miembros
        .filter((m) => m.cargo !== "Consejero")
        .map((m) => ({ cargo: m.cargo, nombre: m.nombre, nota: m.nota, destacado: m.cargo === "Presidente" })),
      consejeros: miembros.filter((m) => m.cargo === "Consejero").map((m) => m.nombre),
    }
  }, juntaLocal)
}
