// Migra el blog antiguo (daffarihombresdetrono.blogspot.com) al Archivo Histórico.
// Descarga todas las entradas y páginas, limpia el HTML, guarda las imágenes en
// public/images/archivo y escribe lib/archivo-blog.json.
// Ejecutar: node scripts/migrar-blog-antiguo.mjs
import sanitizeHtml from "sanitize-html"
import { createHash } from "node:crypto"
import { existsSync, mkdirSync, writeFileSync } from "node:fs"

const BLOG = "https://daffarihombresdetrono.blogspot.com"
const IMG_DIR = "public/images/archivo"
mkdirSync(IMG_DIR, { recursive: true })

async function feed(tipo) {
  const out = []
  for (let start = 1; ; start += 150) {
    const r = await fetch(`${BLOG}/feeds/${tipo}/default?alt=json&max-results=150&start-index=${start}`)
    const j = await r.json()
    const e = j.feed.entry ?? []
    out.push(...e)
    if (e.length < 150) break
  }
  return out
}

const isBloggerImg = (u) => /(bp\.blogspot\.com|blogger\.googleusercontent\.com|ggpht\.com)/.test(u)
// Pide una versión grande (los blogs usan /s320/ o =s320 en la URL)
const grande = (u) =>
  u.replace(/^http:/, "https:").replace(/\/s\d+(-[a-z0-9-]+)?\//, "/s1600/").replace(/=s\d+(-[a-z0-9-]+)?$/, "=s1600")

const descargas = new Map() // url remota -> ruta local
async function descargar(url) {
  const remota = grande(url)
  if (descargas.has(remota)) return descargas.get(remota)
  const p = (async () => {
    const hash = createHash("sha1").update(remota).digest("hex").slice(0, 16)
    for (const ext of ["jpg", "png", "gif", "webp"]) {
      if (existsSync(`${IMG_DIR}/${hash}.${ext}`)) return `/images/archivo/${hash}.${ext}`
    }
    for (const intento of [remota, url.replace(/^http:/, "https:")]) {
      try {
        const r = await fetch(intento)
        if (!r.ok) continue
        const tipo = r.headers.get("content-type") ?? ""
        const ext = tipo.includes("png") ? "png" : tipo.includes("gif") ? "gif" : tipo.includes("webp") ? "webp" : "jpg"
        writeFileSync(`${IMG_DIR}/${hash}.${ext}`, Buffer.from(await r.arrayBuffer()))
        return `/images/archivo/${hash}.${ext}`
      } catch {}
    }
    return null
  })()
  descargas.set(remota, p)
  return p
}

function limpiar(html) {
  return sanitizeHtml(html, {
    allowedTags: ["p", "br", "a", "img", "b", "strong", "i", "em", "u", "blockquote", "h3", "h4", "ul", "ol", "li", "iframe", "hr", "table", "tbody", "tr", "td", "th"],
    allowedAttributes: { a: ["href"], img: ["src", "alt"], iframe: ["src", "allowfullscreen"], td: ["colspan"] },
    allowedIframeHostnames: ["www.youtube.com", "youtube.com", "www.youtube-nocookie.com", "player.vimeo.com"],
    allowedSchemes: ["http", "https", "mailto"],
    transformTags: {
      div: "p",
      h1: "h3",
      h2: "h3",
      h5: "h4",
      h6: "h4",
      a: (tag, attribs) => ({ tagName: "a", attribs: { href: attribs.href ?? "" } }),
    },
  })
    .replace(/(<br \/>\s*){3,}/g, "<br /><br />")
    .replace(/<p>\s*(<br \/>\s*)*<\/p>/g, "")
    .replace(/src="http:\/\//g, 'src="https://')
}

function texto(html) {
  return sanitizeHtml(html, { allowedTags: [], allowedAttributes: {} })
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, "\"")
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim()
}

const recortar = (s, n) => (s.length <= n ? s : s.slice(0, s.lastIndexOf(" ", n)) + "…")

async function procesar(e, tipo) {
  const url = e.link.find((l) => l.rel === "alternate")?.href ?? ""
  const ruta = new URL(url).pathname.replace(/\.html$/, "")
  const slug =
    tipo === "pagina"
      ? "pagina-" + ruta.split("/").pop()
      : ruta.replace(/^\//, "").replace(/\//g, "-")
  let html = limpiar(e.content.$t)

  // Imágenes: descargar y reescribir src y enlaces a la imagen grande
  const urls = new Set([...html.matchAll(/(?:src|href)="([^"]+)"/g)].map((m) => m[1]).filter(isBloggerImg))
  const mapa = {}
  await Promise.all([...urls].map(async (u) => (mapa[u] = await descargar(u.replace(/&amp;/g, "&")))))
  html = html.replace(/(src|href)="([^"]+)"/g, (m, attr, u) => {
    if (!isBloggerImg(u)) return m
    return mapa[u] ? `${attr}="${mapa[u]}"` : attr === "src" ? 'src=""' : 'href="#"'
  })
  html = html.replace(/<img src="" [^>]*\/?>/g, "").replace(/<img src=""\s*\/?>/g, "")
  // Enlaces internos del blog -> archivo local
  html = html.replace(/href="https?:\/\/daffarihombresdetrono\.blogspot\.[a-z.]+\/(\d{4})\/(\d{2})\/([^".#?]+)\.html[^"]*"/g, (_, y, m, s) => `href="/blog/archivo/${y}-${m}-${s}"`)

  const plano = texto(html)
  const titulo = e.title.$t.trim().replace(/\s+/g, " ") || recortar(plano, 70) || "Sin título"
  const portada = html.match(/<img src="([^"]+)"/)?.[1] ?? null
  return {
    slug,
    tipo,
    titulo,
    fecha: e.published.$t.slice(0, 10),
    autor: e.author?.[0]?.name?.$t ?? "Daffari Hombres de Trono",
    etiquetas: (e.category ?? []).map((c) => c.term),
    extracto: recortar(plano, 240),
    portada,
    urlOriginal: url,
    html,
  }
}

const [entradas, paginas] = await Promise.all([feed("posts"), feed("pages")])
console.log(`Entradas: ${entradas.length} · Páginas: ${paginas.length}`)

const resultado = []
for (const [lista, tipo] of [[entradas, "entrada"], [paginas, "pagina"]]) {
  for (let i = 0; i < lista.length; i += 8) {
    resultado.push(...(await Promise.all(lista.slice(i, i + 8).map((e) => procesar(e, tipo)))))
    process.stdout.write(`\r${tipo}s: ${Math.min(i + 8, lista.length)}/${lista.length}`)
  }
  console.log()
}

// Slugs únicos
const vistos = new Map()
for (const r of resultado) {
  const n = vistos.get(r.slug) ?? 0
  vistos.set(r.slug, n + 1)
  if (n) r.slug += `-${n + 1}`
}

resultado.sort((a, b) => b.fecha.localeCompare(a.fecha))
writeFileSync("lib/archivo-blog.json", JSON.stringify(resultado, null, 1))
const imgs = (await Promise.all(descargas.values())).filter(Boolean).length
console.log(`Guardadas ${resultado.length} publicaciones y ${imgs} imágenes.`)
