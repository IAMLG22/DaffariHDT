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
      <div className="sticky top-[60px] z-30 border-b border-oro/20 bg-incienso/95 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <TabsList
            variant="line"
            className="grid !h-auto w-full grid-cols-2 gap-0 rounded-none bg-transparent p-0 sm:w-auto sm:min-w-[560px]"
          >
            {(
              [
                { v: "actual", t: "Blog Actual", s: "Nueva etapa", Icon: Feather },
                { v: "archivo", t: "Archivo Histórico", s: "Blog antiguo", Icon: Archive },
              ] as const
            ).map(({ v, t, s, Icon }) => (
              <TabsTrigger
                key={v}
                value={v}
                className={cn(
                  "!h-auto justify-start gap-3 rounded-none border-0 px-4 py-5 text-left text-pergamino/55 sm:px-6",
                  "after:!bottom-0 after:!h-[2px] after:!bg-oro hover:text-pergamino data-active:!bg-transparent data-active:!text-pergamino",
                )}
              >
                <Icon className="size-5 shrink-0 text-oro" />
                <span className="flex flex-col">
                  <span className="font-serif text-xl leading-none sm:text-2xl">{t}</span>
                  <span className="mt-1 text-[0.62rem] font-semibold tracking-[0.22em] text-oro/80 uppercase">{s}</span>
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
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-2xl border border-dashed border-oro/50 px-8 py-16 text-center">
          <Feather className="mx-auto size-8 text-oro" />
          <p className="eyebrow mt-6">Nueva etapa</p>
          <h2 className="mt-4 font-serif text-4xl text-incienso">Todavía no hay publicaciones</h2>
          <p className="mx-auto mt-4 max-w-md leading-relaxed text-muted-foreground">
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

  const visibles = filtradas.slice(0, limite)
  const porAnio = visibles.reduce<Record<string, ArchivoResumen[]>>((acc, e) => {
    const k = filtro === "paginas" ? "Páginas" : e.fecha.slice(0, 4)
    ;(acc[k] ??= []).push(e)
    return acc
  }, {})

  const elegir = (f: string | null) => {
    setFiltro(f)
    setLimite(POR_PAGINA)
  }

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-0 opacity-[0.18] mix-blend-multiply grano" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-8 sm:py-24">
        <header className="border-y-4 border-double border-incienso/70 py-6 text-center">
          <p className="font-display text-xs tracking-[0.5em] text-tinta uppercase">Hemeroteca · Daffari Hombres de Trono</p>
          <h2 className="mt-3 font-serif text-5xl text-incienso italic sm:text-6xl">Archivo Histórico</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-tinta/80">
            Todas las entradas del blog antiguo de la asociación ({anios.at(-1)}–{anios[0]}), conservadas con su fecha
            original de publicación.
          </p>
        </header>

        {/* Buscador y filtro por año */}
        <div className="mt-10 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
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

          <div role="group" aria-label="Filtrar por año" className="flex flex-wrap gap-2">
            {[null, ...anios, ...(hayPaginas ? ["paginas"] : [])].map((a) => (
              <button
                key={a ?? "todos"}
                type="button"
                aria-pressed={filtro === a}
                onClick={() => elegir(a)}
                className={cn(
                  "border px-4 py-2 font-display text-xs tracking-[0.2em] transition-colors",
                  filtro === a
                    ? "border-burdeos bg-burdeos text-pergamino"
                    : "border-incienso/30 text-tinta hover:border-burdeos hover:text-burdeos",
                )}
              >
                {a === null ? "Todos" : a === "paginas" ? "Páginas" : a}
              </button>
            ))}
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
          <div className="mt-8 space-y-14">
            {Object.entries(porAnio).map(([grupo, lista]) => (
              <section key={grupo} className="grid gap-6 md:grid-cols-[10rem_1fr]">
                <h3 className="font-display text-5xl leading-none text-burdeos/80 md:sticky md:top-48 md:self-start md:text-6xl">
                  {grupo}
                </h3>
                <ol className="divide-y divide-dashed divide-incienso/25 border-y border-incienso/25">
                  {lista.map((e) => (
                    <li key={e.slug} className="group relative grid gap-4 py-6 sm:grid-cols-[1fr_6.5rem] sm:gap-8">
                      <div className="grid gap-2 sm:grid-cols-[8.5rem_1fr] sm:gap-6">
                        <div className="text-[0.7rem] tracking-[0.18em] text-tinta/70 uppercase">
                          <time dateTime={e.fecha}>{formatearFecha(e.fecha)}</time>
                          {e.etiquetas[0] && <span className="mt-1 block text-burdeos">{e.etiquetas[0]}</span>}
                        </div>
                        <div>
                          <h4 className="font-serif text-2xl leading-snug text-incienso transition-colors group-hover:text-burdeos">
                            <Link href={`/blog/archivo/${e.slug}`} className="after:absolute after:inset-0">
                              {e.titulo}
                            </Link>
                          </h4>
                          {e.extracto && (
                            <p className="mt-2 line-clamp-2 font-serif text-lg leading-relaxed text-tinta/80 italic">{e.extracto}</p>
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
                  className="border border-burdeos px-8 py-3.5 text-xs font-semibold tracking-[0.22em] text-burdeos uppercase transition-colors hover:bg-burdeos hover:text-pergamino"
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
