"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowRight, Archive, Feather, Search, X } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { formatearFecha, type Entrada } from "@/lib/content"
import type { ArchivoResumen } from "@/lib/archivo"
import { cn } from "@/lib/utils"
import { AvisoArchivo } from "@/components/site/aviso-archivo"

type Etapa = "actual" | "archivo"

export function BlogTabs({ actual, archivo }: { actual: Entrada[]; archivo: ArchivoResumen[] }) {
  const router = useRouter()
  // La URL manda: así el desplegable del menú y el conmutador quedan sincronizados.
  const etapa: Etapa = useSearchParams().get("etapa") === "archivo" ? "archivo" : "actual"

  const cambiar = (v: Etapa) => {
    router.replace(v === "archivo" ? "/blog?etapa=archivo" : "/blog", { scroll: false })
  }

  return (
    <Tabs value={etapa} onValueChange={(v) => cambiar(v as Etapa)} className="gap-0">
      {/* Conmutador de etapas */}
      <div className="sticky top-[59px] z-30 border-b border-oro/20 bg-incienso/95 backdrop-blur-xl sm:top-[69px]">
        <div className="mx-auto max-w-7xl px-2 sm:px-8">
          <TabsList
            variant="line"
            className="grid !h-auto w-full grid-cols-2 gap-0 rounded-none bg-transparent p-0 sm:w-auto sm:min-w-[560px]"
          >
            {(
              [
                { v: "actual", t: "Blog", s: "Nueva etapa", Icon: Feather },
                { v: "archivo", t: "Archivo Histórico", s: "Blog antiguo", Icon: Archive },
              ] as const
            ).map(({ v, t, s, Icon }) => (
              <TabsTrigger
                key={v}
                value={v}
                className={cn(
                  "!h-auto min-w-0 justify-center gap-3 rounded-none border-0 px-3 py-4 text-center text-pergamino/55 sm:justify-start sm:px-6 sm:py-5 sm:text-left",
                  "after:!bottom-0 after:!h-[2px] after:!bg-oro hover:text-pergamino data-active:!bg-transparent data-active:!text-pergamino",
                )}
              >
                <Icon className="size-5 shrink-0 text-oro max-sm:hidden" />
                <span className="flex min-w-0 flex-col">
                  <span className="font-serif text-[1.3rem] leading-none whitespace-nowrap sm:text-2xl">{t}</span>
                  <span className="mt-1.5 font-display text-[0.55rem] font-semibold tracking-[0.2em] text-oro/80 uppercase sm:mt-1 sm:text-[0.62rem] sm:tracking-[0.22em]">{s}</span>
                </span>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
      </div>

      <TabsContent value="actual" className="bg-pergamino">
        <BlogActual entradas={actual} />
      </TabsContent>
      <TabsContent value="archivo" className="bg-[#efe8da]">
        <ArchivoHistorico entradas={archivo} />
      </TabsContent>
    </Tabs>
  )
}

// ------------------------------------------------------------ Blog actual
function BlogActual({ entradas }: { entradas: Entrada[] }) {
  if (entradas.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-2xl border border-dashed border-oro/50 px-6 py-12 text-center sm:px-8 sm:py-16">
          <Feather className="mx-auto size-8 text-oro" />
          <p className="eyebrow mt-6">Nueva etapa</p>
          <h2 className="mt-4 font-serif text-[2rem] leading-tight text-incienso text-balance sm:text-4xl">Todavía no hay publicaciones</h2>
          <p className="mx-auto mt-4 max-w-md text-[0.97rem] leading-relaxed text-muted-foreground sm:text-base">
            Aquí aparecerán los artículos de opinión y las crónicas de la nueva etapa del blog.
            Mientras tanto, puedes consultar el Archivo Histórico.
          </p>
          <Link
            href="/blog?etapa=archivo"
            className="mt-8 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.22em] text-burdeos uppercase hover:text-oro"
          >
            Ir al Archivo Histórico <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    )
  }

  const [primera, ...resto] = entradas
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-8 sm:py-24">
      <article className="group relative grid items-center gap-10 lg:grid-cols-12">
        {primera.imagen && (
          <div className="relative aspect-[16/10] overflow-hidden lg:col-span-7">
            <Image src={primera.imagen} alt="" fill sizes="(min-width:1024px) 58vw, 100vw" className="foto-antigua object-cover group-hover:scale-[1.02]" />
          </div>
        )}
        <div className="lg:col-span-5">
          <p className="eyebrow">{primera.seccion}{primera.lectura ? ` · ${primera.lectura} min de lectura` : ""}</p>
          <h2 className="mt-5 font-serif text-4xl leading-[1.05] text-balance text-incienso sm:text-5xl">
            <Link href={`/blog/${primera.slug}`} className="after:absolute after:inset-0">
              {primera.titulo}
            </Link>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{primera.extracto}</p>
          <p className="mt-8 text-xs tracking-[0.18em] text-tinta uppercase">
            {primera.autor} · <time dateTime={primera.fecha}>{formatearFecha(primera.fecha)}</time>
          </p>
        </div>
      </article>

      <div className="mt-20 grid gap-x-10 gap-y-14 md:grid-cols-2">
        {resto.map((e) => (
          <article key={e.slug} className="group relative grid grid-cols-[1fr_auto] gap-6 border-t border-incienso pt-8">
            <div>
              <p className="eyebrow">{e.seccion}</p>
              <h3 className="mt-3 font-serif text-3xl leading-[1.1] text-incienso transition-colors group-hover:text-burdeos">
                <Link href={`/blog/${e.slug}`} className="after:absolute after:inset-0">
                  {e.titulo}
                </Link>
              </h3>
              <p className="mt-4 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{e.extracto}</p>
              <p className="mt-5 text-[0.7rem] tracking-[0.18em] text-tinta uppercase">
                {e.autor} · {formatearFecha(e.fecha)}
              </p>
            </div>
            {e.imagen && (
              <div className="relative hidden size-32 overflow-hidden sm:block">
                <Image src={e.imagen} alt="" fill sizes="128px" className="foto-antigua object-cover" />
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  )
}

// ------------------------------------------------------------ Archivo histórico
const POR_PAGINA = 40

function ArchivoHistorico({ entradas }: { entradas: ArchivoResumen[] }) {
  const [q, setQ] = React.useState("")
  const [filtro, setFiltro] = React.useState<string | null>(null) // año o "paginas"
  const [limite, setLimite] = React.useState(POR_PAGINA)

  const anios = React.useMemo(
    () => [...new Set(entradas.filter((e) => e.tipo === "entrada").map((e) => e.fecha.slice(0, 4)))].sort((a, b) => b.localeCompare(a)),
    [entradas],
  )
  const hayPaginas = entradas.some((e) => e.tipo === "pagina")

  const norm = (s: string) => s.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase()
  const filtradas = entradas
    .filter((e) =>
      filtro === "paginas" ? e.tipo === "pagina" : e.tipo === "entrada" && (!filtro || e.fecha.startsWith(filtro)),
    )
    .filter((e) => !q || norm(`${e.titulo} ${e.extracto} ${e.etiquetas.join(" ")}`).includes(norm(q)))

  const grupoDe = (e: ArchivoResumen) => (filtro === "paginas" ? "Páginas" : e.fecha.slice(0, 4))
  const visibles = filtradas.slice(0, limite)
  // Map y no objeto: un objeto ordena las claves numéricas ("2010"…"2014") de
  // menor a mayor y los años saldrían al revés que las entradas.
  const porAnio = new Map<string, ArchivoResumen[]>()
  for (const e of visibles) {
    const k = grupoDe(e)
    porAnio.set(k, [...(porAnio.get(k) ?? []), e])
  }
  // Total del año con la búsqueda aplicada, aunque aún no estén todas cargadas.
  const totalPorGrupo = filtradas.reduce<Record<string, number>>((acc, e) => {
    acc[grupoDe(e)] = (acc[grupoDe(e)] ?? 0) + 1
    return acc
  }, {})

  const filtrosRef = React.useRef<HTMLDivElement>(null)
  const elegir = (f: string | null, boton?: HTMLElement) => {
    setFiltro(f)
    setLimite(POR_PAGINA)
    // En móvil la píldora elegida se centra en su carril.
    boton?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" })
    // Si se filtra desde muy abajo, la lista se acorta: volver a los filtros.
    const barra = filtrosRef.current
    if (barra && barra.getBoundingClientRect().top < 0) barra.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-0 opacity-[0.18] mix-blend-multiply grano" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-24">
        <header className="border-y-4 border-double border-incienso/70 py-6 text-center">
          <p className="font-display text-[0.6rem] leading-relaxed tracking-[0.32em] text-tinta uppercase sm:text-xs sm:tracking-[0.5em]">Hemeroteca · Daffari Hombres de Trono</p>
          <h2 className="mt-3 font-serif text-[2.6rem] leading-tight text-incienso italic sm:text-6xl">Archivo Histórico</h2>
          <p className="mx-auto mt-3 max-w-xl text-[0.85rem] leading-relaxed text-tinta/80 sm:text-sm">
            Todas las entradas del blog antiguo de la asociación ({anios.at(-1)}–{anios[0]}), conservadas con su fecha
            original de publicación.
          </p>
        </header>

        <AvisoArchivo className="mt-6" />

        {/* Buscador y filtro por año */}
        <div ref={filtrosRef} className="mt-8 flex scroll-mt-36 flex-col gap-5 sm:mt-10 lg:flex-row lg:items-center lg:justify-between">
          <label className="relative block lg:w-96">
            <span className="sr-only">Buscar en el archivo</span>
            <Search className="pointer-events-none absolute top-1/2 left-0 size-4 -translate-y-1/2 text-tinta/60" />
            <input
              type="search"
              value={q}
              onChange={(e) => {
                setQ(e.target.value)
                setLimite(POR_PAGINA)
              }}
              placeholder="Buscar en la hemeroteca…"
              className="w-full border-0 border-b border-incienso/40 bg-transparent py-3 pr-8 pl-7 font-serif text-xl text-incienso outline-none placeholder:text-tinta/45 focus:border-burdeos"
            />
            {q && (
              <button type="button" onClick={() => setQ("")} aria-label="Limpiar búsqueda" className="absolute top-1/2 right-0 -translate-y-1/2 text-tinta/60 hover:text-burdeos">
                <X className="size-4" />
              </button>
            )}
          </label>

          {/* Carril de píldoras: en móvil una sola fila con scroll horizontal que sangra hasta los bordes */}
          <div className="relative -mx-5 sm:mx-0">
            <div
              role="group"
              aria-label="Filtrar por año"
              className="scrollbar-none flex snap-x snap-proximity gap-2 overflow-x-auto scroll-smooth px-5 py-1 sm:flex-wrap sm:overflow-visible sm:px-0"
            >
              {[null, ...anios, ...(hayPaginas ? ["paginas"] : [])].map((a) => {
                const activo = filtro === a
                return (
                  <button
                    key={a ?? "todos"}
                    type="button"
                    aria-pressed={activo}
                    onClick={(e) => elegir(a, e.currentTarget)}
                    className={cn(
                      "shrink-0 snap-start rounded-full border px-5 py-2.5 font-display text-[0.7rem] leading-none font-semibold tracking-[0.18em] whitespace-nowrap uppercase",
                      "transition-[background-color,border-color,color,box-shadow] duration-300 [-webkit-tap-highlight-color:transparent] active:scale-[0.97]",
                      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-oro",
                      activo
                        ? "border-burdeos bg-burdeos text-oro-claro shadow-[0_6px_18px_-10px_rgba(90,24,39,0.8),inset_0_0_0_1px_rgba(197,160,89,0.35)]"
                        : "border-incienso/15 bg-pergamino/60 text-tinta/80 hover:border-oro/60 hover:text-burdeos",
                    )}
                  >
                    {a === null ? "Todos" : a === "paginas" ? "Páginas" : a}
                  </button>
                )
              })}
            </div>
            {/* Desvanecidos laterales que insinúan que el carril continúa */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 w-5 bg-gradient-to-r from-[#efe8da] to-transparent sm:hidden" />
            <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-[#efe8da] to-transparent sm:hidden" />
          </div>
        </div>

        <p className="mt-6 text-xs tracking-[0.18em] text-tinta/70 uppercase" aria-live="polite">
          {filtradas.length} {filtradas.length === 1 ? "publicación" : "publicaciones"}
        </p>

        {filtradas.length === 0 ? (
          <p className="mt-16 text-center font-serif text-2xl text-tinta/70 italic">
            No hay entradas que coincidan con la búsqueda.
          </p>
        ) : (
          <div className="mt-8 space-y-12 sm:space-y-14">
            {[...porAnio].map(([grupo, lista]) => (
              <section key={grupo} className="grid min-w-0 gap-4 sm:gap-6 md:grid-cols-[10rem_minmax(0,1fr)]">
                {/* Móvil: franja fija bajo las pestañas (59px de menú + 72px de pestañas) que
                    acompaña todo el año y cede su sitio al siguiente al terminar la sección.
                    Escritorio: el número grande queda fijo en la columna lateral. */}
                <h3
                  className={cn(
                    "sticky top-[131px] z-20 -mx-5 flex items-center gap-4 self-start px-5 py-2.5",
                    "border-b border-oro/25 bg-[#efe8da]/90 font-display text-2xl leading-none text-burdeos backdrop-blur-md",
                    "sm:text-3xl md:top-48 md:mx-0 md:block md:border-0 md:bg-transparent md:p-0 md:text-6xl md:text-burdeos/80 md:backdrop-blur-none",
                  )}
                >
                  {grupo}
                  <span aria-hidden="true" className="h-px flex-1 bg-gradient-to-r from-oro/50 to-transparent md:hidden" />
                  <span className="font-sans text-[0.62rem] tracking-[0.18em] text-tinta/60 uppercase md:hidden">
                    {totalPorGrupo[grupo]} {grupo === "Páginas" ? "" : totalPorGrupo[grupo] === 1 ? "entrada" : "entradas"}
                  </span>
                </h3>
                <ol className="min-w-0 divide-y divide-dashed divide-incienso/25 border-y border-incienso/25">
                  {lista.map((e) => (
                    <li key={e.slug} className="group relative grid min-w-0 gap-4 py-5 sm:grid-cols-[minmax(0,1fr)_6.5rem] sm:gap-8 sm:py-6">
                      <div className="grid min-w-0 gap-1.5 sm:grid-cols-[8.5rem_minmax(0,1fr)] sm:gap-6">
                        <div className="text-[0.64rem] tracking-[0.18em] text-tinta/70 uppercase sm:text-[0.7rem]">
                          <time dateTime={e.fecha}>{formatearFecha(e.fecha)}</time>
                          {e.etiquetas[0] && <span className="mt-1 block text-burdeos">{e.etiquetas[0]}</span>}
                        </div>
                        {/* Algunas entradas antiguas traen URLs larguísimas sin espacios: se parten donde haga falta */}
                        <div className="min-w-0 [overflow-wrap:anywhere]">
                          <h4 className="font-serif text-[1.4rem] leading-snug text-incienso transition-colors group-hover:text-burdeos sm:text-2xl">
                            <Link href={`/blog/archivo/${e.slug}`} className="after:absolute after:inset-0">
                              {e.titulo}
                            </Link>
                          </h4>
                          {e.extracto && (
                            <p className="mt-1.5 line-clamp-2 font-serif text-[1.05rem] leading-relaxed text-tinta/80 italic sm:mt-2 sm:text-lg">{e.extracto}</p>
                          )}
                        </div>
                      </div>
                      {e.portada && (
                        <div className="relative hidden aspect-square overflow-hidden bg-incienso/10 sm:block">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={e.portada}
                            alt=""
                            loading="lazy"
                            decoding="async"
                            className="foto-antigua absolute inset-0 h-full w-full object-cover"
                          />
                        </div>
                      )}
                    </li>
                  ))}
                </ol>
              </section>
            ))}

            {filtradas.length > limite && (
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setLimite((l) => l + POR_PAGINA)}
                  className="rounded-full border border-burdeos px-8 py-3.5 font-display text-[0.7rem] font-semibold tracking-[0.2em] text-burdeos uppercase transition-colors hover:bg-burdeos hover:text-oro-claro"
                >
                  Mostrar más ({filtradas.length - limite} restantes)
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
