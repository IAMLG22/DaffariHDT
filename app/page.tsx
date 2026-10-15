import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { Hero } from "@/components/site/hero"
import { Reveal } from "@/components/site/ui"
import { SectionHeading } from "@/components/site/headings"
import { NoticiaCard } from "@/components/site/noticia-card"
import { FotoAdaptable } from "@/components/site/foto-adaptable"
import { asociacion, junta, noticiasOrdenadas, instagramPosts, site } from "@/lib/content"

export default function Inicio() {
  return (
    <>
      <Hero />

      {/* ---------------------------------------------------- La Asociación */}
      <section id="asociacion" className="relative scroll-mt-20 bg-pergamino py-20 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:gap-16 sm:px-8 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-5">
            <SectionHeading eyebrow="Orígenes & Memoria" title="La Asociación" />
            <figure className="group mt-10 sm:mt-12">
              <div className="relative overflow-hidden">
                <FotoAdaptable
                  movil={{ src: "/images/historia/trono-palio.jpg", width: 1280, height: 1736 }}
                  escritorio={{ src: "/images/fotos/cuadrilla-varal.jpg", width: 2000, height: 1527 }}
                  alt="Hombres de trono y nazarenos junto a su trono"
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="foto-antigua aspect-[4/5] w-full object-cover object-[center_25%] sm:aspect-[16/10] sm:object-[center_30%]"
                />
                <div className="pointer-events-none absolute inset-2.5 border border-oro/40 sm:inset-3 sm:border-oro/50" aria-hidden="true" />
              </div>
              <figcaption className="mt-3 text-[0.72rem] tracking-wide text-muted-foreground sm:text-xs">
                Hombres de trono bajo el varal. Archivo de la Asociación.
              </figcaption>
            </figure>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-6 lg:col-start-7 lg:pt-24">
            <p className="font-serif text-[1.32rem] leading-[1.55] text-incienso sm:text-[1.7rem] sm:leading-[1.5] capitular">
              {asociacion.intro}
            </p>
            <div className="mt-7 space-y-5 text-[0.97rem] leading-[1.85] text-tinta sm:mt-8 sm:text-base sm:leading-[1.8]">
              {asociacion.parrafos.map((p) => (
                <p key={p.slice(0, 20)}>{p}</p>
              ))}
            </div>
            <blockquote className="mt-10 border-l border-oro pl-5 font-serif text-[1.45rem] leading-snug text-burdeos italic sm:border-l-2 sm:pl-6 sm:text-2xl">
              {asociacion.cita}
            </blockquote>

            <dl className="mt-12 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-border border-y border-border">
              {asociacion.hitos.map((h) => (
                <div key={h.etiqueta} className="flex flex-col-reverse justify-end py-4 sm:py-6 sm:px-5 first:pt-4 sm:first:pl-0">
                  <dt className="mt-1.5 sm:mt-2 text-xs sm:text-[0.75rem] leading-snug tracking-wide text-muted-foreground">{h.etiqueta}</dt>
                  <dd className="font-display text-2xl text-burdeos sm:text-3xl">{h.valor}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        {/* Valores */}
        <div className="mx-auto mt-16 max-w-7xl px-5 sm:mt-24 sm:px-8">
          <ul className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {asociacion.valores.map((v, i) => (
              <Reveal
                as="li"
                key={v.titulo}
                delay={i * 90}
                className="group relative bg-pergamino px-6 py-7 transition-colors duration-500 hover:bg-incienso sm:p-8"
              >
                <span className="font-display text-sm tracking-[0.3em] text-oro">{v.numeral}</span>
                <h3 className="mt-3 font-serif text-[1.7rem] leading-tight text-incienso transition-colors duration-500 group-hover:text-pergamino sm:mt-6 sm:text-3xl">
                  {v.titulo}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground transition-colors duration-500 group-hover:text-pergamino/70 sm:mt-4">
                  {v.texto}
                </p>
                <span className="absolute inset-x-8 bottom-0 h-px origin-left scale-x-0 bg-oro transition-transform duration-700 group-hover:scale-x-100" aria-hidden="true" />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------------------------------------------- Junta de Gobierno */}
      <section id="junta" className="relative scroll-mt-20 overflow-hidden border-t border-border bg-pergamino-2 py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Junta de Gobierno"
              title="Quienes custodian el legado"
              intro="Según sus estatutos, la asociación cuenta con una Junta Directiva compuesta por los siguientes socios."
              align="center"
            />
          </Reveal>

          <ul className="mt-12 grid gap-px border border-oro/25 bg-oro/25 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
            {junta.cargos.map((c, i) => (
              <Reveal
                as="li"
                key={c.cargo}
                delay={i * 70}
                className={
                  "group relative flex flex-col justify-between bg-pergamino px-6 py-6 transition-colors duration-500 hover:bg-white sm:min-h-48 sm:p-8 " +
                  (c.destacado ? "sm:col-span-2 lg:col-span-1 lg:row-span-2 lg:min-h-0 lg:bg-incienso lg:hover:bg-incienso-2" : "")
                }
              >
                <p className="text-[0.7rem] font-semibold tracking-[0.32em] text-oro uppercase">{c.cargo}</p>
                <p
                  className={
                    "mt-3 font-serif leading-[1.1] sm:mt-8 sm:leading-[1.05] " +
                    (c.destacado ? "text-[2rem] text-burdeos sm:text-4xl sm:text-incienso lg:text-5xl lg:text-pergamino" : "text-[1.55rem] text-incienso sm:text-3xl")
                  }
                >
                  {c.nombre}
                </p>
                {c.destacado && (
                  <p className="mt-6 hidden text-sm leading-relaxed text-pergamino/60 lg:block">
                    Elegido en asamblea general extraordinaria el 6 de diciembre de 2022, abre una nueva etapa de
                    renovación de la asociación.
                  </p>
                )}
              </Reveal>
            ))}
            <Reveal
              as="li"
              delay={420}
              className="flex flex-col justify-between bg-[#f6f2ea] px-6 py-7 sm:p-8 lg:col-span-2"
            >
              <p className="text-[0.7rem] font-semibold tracking-[0.32em] text-oro uppercase">Consejeros</p>
              <ul className="mt-5 grid gap-x-8 gap-y-2 font-serif text-lg text-tinta sm:mt-8 sm:gap-y-2.5 sm:text-xl lg:grid-cols-2">
                {junta.consejeros.map((n) => (
                  <li key={n} className="flex items-center gap-3">
                    <span className="size-1 shrink-0 rotate-45 bg-oro" aria-hidden="true" />
                    {n}
                  </li>
                ))}
              </ul>
            </Reveal>
          </ul>
        </div>
      </section>

      {/* ---------------------------------------------------- Antonio Daffari (avance) */}
      <section className="relative isolate overflow-hidden bg-incienso py-20 text-pergamino sm:py-32">
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.1] grano" aria-hidden="true" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:gap-14 sm:px-8 lg:grid-cols-2">
          <Reveal className="group relative">
            <FotoAdaptable
              movil={{ src: "/images/fotos/daffari-mando-vertical.jpg", width: 888, height: 1110 }}
              escritorio={{ src: "/images/fotos/domingo-ramos.jpg", width: 1410, height: 1014 }}
              alt="Domingo de Ramos: un capataz manda a su cuadrilla de hombres de trono entre palmas"
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="foto-antigua aspect-[4/5] w-full object-cover object-[center_30%] sm:aspect-[4/3] sm:object-[center_35%]"
            />
            <div className="absolute -right-2 -bottom-2 -z-10 h-full w-full border border-oro/35 sm:-right-3 sm:-bottom-3 sm:border-oro/40" aria-hidden="true" />
          </Reveal>
          <Reveal delay={120}>
            <p className="eyebrow">1883 — 1960</p>
            <h2 className="mt-4 font-display text-[2.5rem] leading-[1.05] sm:mt-5 sm:text-6xl sm:leading-[1]">Antonio Daffari</h2>
            <p className="mt-2 font-serif text-[1.35rem] text-oro-claro italic sm:mt-3 sm:text-2xl">Capataz de tronos</p>
            <p className="mt-6 max-w-lg text-[0.97rem] leading-[1.85] text-pergamino/70 sm:mt-8 sm:text-base sm:leading-[1.8]">
              Maestro guarnicionero de La Malagueta, reorganizador de la Pollinica y padre del paso malagueño. Un
              capataz que salía a mandar con traje y corbata negra y cuyas cuadrillas no acarreaban tronos: los
              llevaban.
            </p>
            <blockquote className="mt-8 border-l border-oro/50 pl-5 font-serif text-[1.55rem] leading-snug text-pergamino italic sm:mt-10 sm:border-0 sm:pl-0 sm:text-3xl">
              «Con Antonio Daffari fueron siempre los mejores.»
            </blockquote>
            <Link
              href="/antonio-daffari"
              className="group/link mt-10 inline-flex items-center gap-3 border-b border-oro pb-1 text-xs font-semibold tracking-[0.22em] text-oro uppercase"
            >
              Leer el reportaje
              <ArrowRight className="size-4 transition-transform duration-300 group-hover/link:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------- Instagram oficial */}
      <section id="comunidad" className="border-t border-border bg-pergamino-2 py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <Reveal>
              <SectionHeading
                eyebrow="Comunidad & Archivo"
                title="Síguenos en Instagram"
                intro="Fotografías de archivo, convocatorias y la memoria gráfica de los hombres de trono en nuestro perfil oficial."
              />
            </Reveal>
            <Reveal delay={100}>
              <a
                href={site.redes.instagram}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2.5 rounded-full border border-oro/60 bg-incienso px-6 py-3 font-display text-xs font-semibold tracking-[0.2em] text-oro uppercase transition-all duration-300 hover:border-oro hover:bg-burdeos hover:text-pergamino"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-4" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.3" cy="6.7" r="0.9" fill="currentColor" stroke="none" />
                </svg>
                <span>Ver perfil oficial</span>
                <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </Reveal>
          </div>

          <div className="mt-10 sm:mt-14 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">
            {instagramPosts.map((post, i) => (
              <Reveal key={post.id} delay={i * 80}>
                <a
                  href={site.redes.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative block overflow-hidden border border-border bg-incienso transition-all duration-500 hover:border-oro/60 hover:shadow-xl"
                >
                  <div className="relative aspect-[4/5] w-full overflow-hidden sm:aspect-square">
                    <Image
                      src={post.imagen}
                      alt={post.pie}
                      fill
                      sizes="(min-width: 1024px) 33vw, 50vw"
                      className={"foto-antigua object-cover transition-transform duration-700 group-hover:scale-105 " + (post.encuadre ?? "")}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-incienso/95 via-incienso/30 to-transparent opacity-0 transition-opacity duration-300 max-sm:hidden group-hover:opacity-100" />
                    {/* Móvil: sin hover, un rótulo discreto siempre visible */}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-incienso/85 to-transparent px-3 pt-10 pb-2.5 sm:hidden">
                      <span className="font-display text-[0.55rem] font-semibold tracking-[0.2em] text-oro-claro uppercase">{post.fecha}</span>
                    </div>
                    <div className="absolute inset-0 flex flex-col justify-end p-6 text-pergamino opacity-0 transition-opacity duration-300 max-sm:hidden group-hover:opacity-100">
                      <div className="mb-1.5 sm:mb-2 flex items-center gap-1.5 sm:gap-2 text-oro">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-3.5 sm:size-4" aria-hidden="true">
                          <rect x="3" y="3" width="18" height="18" rx="5" />
                          <circle cx="12" cy="12" r="4" />
                          <circle cx="17.3" cy="6.7" r="0.9" fill="currentColor" stroke="none" />
                        </svg>
                        <span className="font-display text-[0.62rem] sm:text-[0.68rem] tracking-[0.18em] uppercase font-semibold">{post.fecha}</span>
                      </div>
                      <p className="line-clamp-2 sm:line-clamp-none font-serif text-xs sm:text-sm leading-snug text-pergamino/90">
                        {post.pie}
                      </p>
                    </div>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>

          <p className="mt-8 text-center font-serif text-sm tracking-wide text-muted-foreground italic">
            Espacio preparado para la vinculación del perfil de Instagram oficial de la Asociación.
          </p>
        </div>
      </section>

      {/* ---------------------------------------------------- Noticias (avance) */}
      <section className="bg-pergamino py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="Actualidad" title="Noticias de la Asociación" />
            <Link
              href="/noticias"
              className="group inline-flex items-center gap-2 text-xs font-semibold tracking-[0.22em] text-burdeos uppercase hover:text-oro"
            >
              Todas las noticias <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
          <div className="mt-10 grid gap-12 sm:mt-14 md:grid-cols-3 md:gap-8">
            {noticiasOrdenadas.slice(0, 3).map((n, i) => (
              <Reveal key={n.slug} delay={i * 90}>
                <NoticiaCard noticia={n} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
