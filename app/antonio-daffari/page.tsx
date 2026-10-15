import type { Metadata } from "next"
import Image from "next/image"
import { Fragment } from "react"
import { daffari } from "@/lib/content"
import { PageHeader } from "@/components/site/headings"
import { Reveal } from "@/components/site/ui"
import { FotoAdaptable } from "@/components/site/foto-adaptable"

export const metadata: Metadata = {
  title: "Antonio Daffari",
  description: "Reportaje histórico y homenaje a Don Antonio Daffari (1883–1960), capataz de tronos de Málaga.",
}

function Cita({ children, grande = false }: { children: React.ReactNode; grande?: boolean }) {
  return (
    <Reveal as="figure" className="my-10 border-y border-oro/40 py-8 text-center sm:my-14 sm:py-10">
      <span aria-hidden="true" className="block font-display text-5xl leading-none text-oro sm:text-6xl">“</span>
      <blockquote
        className={
          "mx-auto max-w-2xl font-serif leading-[1.2] text-burdeos italic text-balance " +
          (grande ? "text-[2rem] sm:text-5xl" : "text-[1.65rem] sm:text-4xl")
        }
      >
        {children}
      </blockquote>
    </Reveal>
  )
}

export default function AntonioDaffari() {
  return (
    <>
      <PageHeader
        eyebrow="Reportaje histórico · Homenaje"
        title="Antonio Daffari"
        intro="Capataz de tronos. El malagueño que enseñó a Málaga a andar sus tronos."
        image="/images/historia/daffari-mando.jpg"
        imageMobile="/images/fotos/daffari-mando-vertical.jpg"
        imageClassName="object-[center_30%] sm:object-center"
      />

      <article className="bg-pergamino">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:gap-12 sm:px-8 sm:py-20 lg:grid-cols-12 lg:gap-16 lg:py-28">
          {/* Columna fija con la fotografía y la ficha */}
          <aside className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <figure className="group relative">
                <div className="relative aspect-[4/5] overflow-hidden bg-incienso sm:aspect-[4/3] lg:aspect-auto lg:h-[52svh]">
                  <FotoAdaptable
                    movil={{ src: "/images/fotos/domingo-ramos-vertical.jpg" }}
                    escritorio={{ src: "/images/fotos/domingo-ramos.jpg" }}
                    alt="El trono de la Pollinica entre palmas y público el Domingo de Ramos"
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="foto-antigua object-cover object-[center_30%] lg:object-[center_40%]"
                  />
                  <div className="pointer-events-none absolute inset-0 opacity-20 mix-blend-overlay grano" aria-hidden="true" />
                </div>
                <div className="pointer-events-none absolute inset-3 border border-oro/40 sm:inset-4 sm:border-oro/50" aria-hidden="true" />
                <figcaption className="mt-3 text-xs tracking-wide text-muted-foreground">
                  La Pollinica, cofradía que Daffari ayudó a reorganizar. Archivo de la Asociación.
                </figcaption>
              </figure>

              <dl className="mt-8 grid grid-cols-2 border-y border-border">
                <div className="flex flex-col-reverse border-r border-border py-5 pr-4">
                  <dt className="mt-1 text-xs tracking-[0.2em] text-muted-foreground uppercase">Nace</dt>
                  <dd className="font-display text-[1.7rem] text-burdeos sm:text-3xl">{daffari.vida.nace}</dd>
                </div>
                <div className="flex flex-col-reverse py-5 pl-5">
                  <dt className="mt-1 text-xs tracking-[0.2em] text-muted-foreground uppercase">Muere en Málaga</dt>
                  <dd className="font-display text-[1.7rem] text-burdeos sm:text-3xl">1960</dd>
                </div>
              </dl>

              <ol className="mt-8 hidden space-y-4 tall:block">
                {daffari.cronologia.map((c) => (
                  <li key={c.anio} className="grid grid-cols-[4.5rem_1fr] gap-4 text-sm">
                    <span className="font-display text-oro">{c.anio}</span>
                    <span className="leading-relaxed text-tinta">{c.texto}</span>
                  </li>
                ))}
              </ol>
            </div>
          </aside>

          {/* Texto biográfico */}
          <div className="lg:col-span-7">
            <div className="prosa">
              {daffari.secciones.map((s, si) => (
                <Fragment key={si}>
                  {s.titulo && (
                    <h3 className="flex items-center gap-4">
                      <span className="text-oro">{["", "I", "II", "III", "IV"][si]}</span>
                      <span className="h-px w-8 bg-oro/60" aria-hidden="true" />
                      {s.titulo}
                    </h3>
                  )}
                  {s.parrafos.map((p, pi) => (
                    <p
                      key={pi}
                      className={
                        pi === 0
                          ? "capitular " + (si === 0 ? "text-[1.3rem] leading-[1.6] text-incienso sm:text-[1.4rem] sm:leading-[1.65]" : "")
                          : p.startsWith("Les hablo")
                            ? "font-display text-xl tracking-wide text-burdeos"
                            : undefined
                      }
                    >
                      {p}
                    </p>
                  ))}
                  {"cita" in s && s.cita && <Cita>{s.cita}</Cita>}
                  {"citaFinal" in s && s.citaFinal && <Cita grande>«{s.citaFinal}»</Cita>}
                  {"parrafosFinal" in s && s.parrafosFinal?.map((p, pi) => <p key={"f" + pi}>{p}</p>)}

                  {si === 2 && (
                    <figure className="group my-14 overflow-hidden">
                      <Image
                        src="/images/historia/pollinica-1920.jpg"
                        alt="El trono de la Pollinica rodeado de público y palmas"
                        width={3202}
                        height={2032}
                        sizes="(min-width: 1024px) 55vw, 100vw"
                        className="foto-antigua w-full"
                      />
                      <figcaption className="mt-3 font-sans text-xs tracking-wide text-muted-foreground">
                        El trono de la Pollinica, cofradía en la que Daffari empezó a mandar en 1912.
                      </figcaption>
                    </figure>
                  )}
                </Fragment>
              ))}
            </div>

            <div className="mt-16 flex items-center gap-4 text-oro" aria-hidden="true">
              <span className="h-px flex-1 bg-current opacity-50" />
              <span className="font-display text-[0.7rem] tracking-[0.3em] whitespace-nowrap sm:text-sm sm:tracking-[0.4em]">R.I.P. · 19 · II · 1960</span>
              <span className="h-px flex-1 bg-current opacity-50" />
            </div>
          </div>
        </div>
      </article>
    </>
  )
}
