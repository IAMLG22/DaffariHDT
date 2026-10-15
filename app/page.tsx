import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { Hero } from "@/components/site/hero"
import { Reveal } from "@/components/site/ui"
import { SectionHeading } from "@/components/site/headings"
import { NoticiaCard } from "@/components/site/noticia-card"
import { asociacion, junta, noticiasOrdenadas } from "@/lib/content"

export default function Inicio() {
  return (
    <>
      <Hero />

      {/* ---------------------------------------------------- La Asociación */}
      <section id="asociacion" className="relative scroll-mt-20 bg-pergamino py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-16 px-4 sm:px-8 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-5">
            <SectionHeading
              eyebrow="La Asociación"
              title={
                <>
                  Continuar la historia de <em className="text-burdeos">Don Antonio</em>
                </>
              }
            />
            <figure className="group mt-12">
              <div className="relative overflow-hidden">
                <Image
                  src="/images/historia/hombres-de-trono.jpg"
                  alt="Hombres de trono y nazarenos ante un trono procesional"
                  width={1280}
                  height={576}
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="foto-antigua aspect-[4/3] w-full object-cover"
                />
                <div className="pointer-events-none absolute inset-3 border border-oro/50" aria-hidden="true" />
              </div>
              <figcaption className="mt-3 text-xs tracking-wide text-muted-foreground">
                Hombres de trono y nazarenos. Archivo de la Asociación.
              </figcaption>
            </figure>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-6 lg:col-start-7 lg:pt-24">
            <p className="font-serif text-2xl leading-[1.5] text-incienso sm:text-[1.7rem] capitular">
              {asociacion.intro}
            </p>
            <div className="mt-8 space-y-5 text-base leading-[1.8] text-tinta">
              {asociacion.parrafos.map((p) => (
                <p key={p.slice(0, 20)}>{p}</p>
              ))}
            </div>
            <blockquote className="mt-10 border-l-2 border-oro pl-6 font-serif text-2xl leading-snug text-burdeos italic">
              {asociacion.cita}
            </blockquote>

            <dl className="mt-12 grid grid-cols-3 divide-x divide-border border-y border-border">
              {asociacion.hitos.map((h) => (
                <div key={h.etiqueta} className="flex flex-col-reverse justify-end px-3 py-6 first:pl-0 sm:px-5">
                  <dt className="mt-2 text-[0.7rem] leading-snug tracking-wide text-muted-foreground">{h.etiqueta}</dt>
                  <dd className="font-display text-2xl text-burdeos sm:text-3xl">{h.valor}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        {/* Valores */}
        <div className="mx-auto mt-24 max-w-7xl px-4 sm:px-8">
          <ul className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {asociacion.valores.map((v, i) => (
              <Reveal
                as="li"
                key={v.titulo}
                delay={i * 90}
                className="group relative bg-pergamino p-8 transition-colors duration-500 hover:bg-incienso"
              >
                <span className="font-display text-sm tracking-[0.3em] text-oro">{v.numeral}</span>
                <h3 className="mt-6 font-serif text-3xl text-incienso transition-colors duration-500 group-hover:text-pergamino">
                  {v.titulo}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground transition-colors duration-500 group-hover:text-pergamino/70">
                  {v.texto}
                </p>
                <span className="absolute inset-x-8 bottom-0 h-px origin-left scale-x-0 bg-oro transition-transform duration-700 group-hover:scale-x-100" aria-hidden="true" />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------------------------------------------- Junta de Gobierno */}
      <section id="junta" className="relative scroll-mt-20 overflow-hidden border-t border-border bg-pergamino-2 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Junta de Gobierno"
              title="Quienes custodian el legado"
              intro="Según sus estatutos, la asociación cuenta con una Junta Directiva compuesta por los siguientes socios."
              align="center"
            />
          </Reveal>

          <ul className="mt-16 grid gap-px border border-oro/25 bg-oro/25 sm:grid-cols-2 lg:grid-cols-3">
            {junta.cargos.map((c, i) => (
              <Reveal
                as="li"
                key={c.cargo}
                delay={i * 70}
                className={
                  "group relative flex min-h-36 flex-col sm:min-h-48 justify-between bg-pergamino p-8 transition-colors duration-500 hover:bg-white " +
                  (c.destacado ? "sm:col-span-2 lg:col-span-1 lg:row-span-2 lg:min-h-0 lg:bg-incienso lg:hover:bg-incienso-2" : "")
                }
              >
                <p className="text-[0.7rem] font-semibold tracking-[0.32em] text-oro uppercase">{c.cargo}</p>
                <p
                  className={
                    "mt-8 font-serif leading-[1.05] " +
                    (c.destacado ? "text-4xl text-incienso lg:text-5xl lg:text-pergamino" : "text-3xl text-incienso")
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
              className="flex flex-col justify-between bg-[#f6f2ea] p-8 lg:col-span-2"
            >
              <p className="text-[0.7rem] font-semibold tracking-[0.32em] text-oro uppercase">Consejeros</p>
              <ul className="mt-8 grid gap-x-8 gap-y-2.5 font-serif text-xl text-tinta lg:grid-cols-2">
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
      <section className="relative isolate overflow-hidden bg-incienso py-24 text-pergamino sm:py-32">
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.1] grano" aria-hidden="true" />
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-8 lg:grid-cols-2">
          <Reveal className="group relative">
            <Image
              src="/images/historia/procesion-calle.jpg"
              alt="Procesión por una calle del centro de Málaga, mediados del siglo XX"
              width={1280}
              height={1964}
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="foto-antigua aspect-[4/5] w-full object-cover"
            />
            <div className="absolute -right-3 -bottom-3 -z-10 h-full w-full border border-oro/40" aria-hidden="true" />
          </Reveal>
          <Reveal delay={120}>
            <p className="eyebrow">1883 — 1960</p>
            <h2 className="mt-5 font-display text-5xl leading-[1] sm:text-6xl">Antonio Daffari</h2>
            <p className="mt-3 font-serif text-2xl text-oro-claro italic">Capataz de tronos</p>
            <p className="mt-8 max-w-lg text-base leading-[1.8] text-pergamino/70">
              Maestro guarnicionero de La Malagueta, reorganizador de la Pollinica y padre del paso malagueño. Un
              capataz que salía a mandar con traje y corbata negra y cuyas cuadrillas no acarreaban tronos: los
              llevaban.
            </p>
            <blockquote className="mt-10 font-serif text-3xl leading-snug text-pergamino italic">
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

      {/* ---------------------------------------------------- Noticias (avance) */}
      <section className="bg-pergamino py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="Actualidad" title="Noticias de la Asociación" />
            <Link
              href="/noticias"
              className="group inline-flex items-center gap-2 text-xs font-semibold tracking-[0.22em] text-burdeos uppercase hover:text-oro"
            >
              Todas las noticias <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {noticiasOrdenadas.slice(0, 3).map((n, i) => (
              <Reveal key={n.slug} delay={i * 90}>
                <NoticiaCard noticia={n} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- CTA socio */}
      <section className="relative isolate overflow-hidden bg-burdeos py-24 text-pergamino">
        <Image
          src="/images/historia/capataces.jpg"
          alt=""
          fill
          sizes="100vw"
          className="-z-10 object-cover opacity-15 mix-blend-luminosity"
        />
        <div className="mx-auto flex max-w-5xl flex-col items-center px-4 text-center sm:px-8">
          <p className="eyebrow text-oro-claro">Hazte socio</p>
          <h2 className="mt-5 font-serif text-4xl leading-tight text-balance sm:text-6xl">
            Que el nombre de quienes llevaron Málaga sobre sus hombros no caiga en el olvido
          </h2>
          <Link
            href="/alta-socio"
            className="mt-12 border border-oro bg-oro px-9 py-4 text-xs font-semibold tracking-[0.24em] text-incienso uppercase transition-colors hover:border-oro-claro hover:bg-oro-claro"
          >
            Solicitar el Alta de Socio
          </Link>
        </div>
      </section>
    </>
  )
}
