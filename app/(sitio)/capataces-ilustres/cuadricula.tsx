"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, X } from "lucide-react"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import type { Homenajeado } from "@/lib/capataces"

const anioTexto = (h: Homenajeado) => (h.anio ? String(h.anio) : "S. f.")

/** Un bloque por homenajeado; al pulsarlo se abre su homenaje. */
export function Cuadricula({
  homenajeados,
  estatuilla,
  textos,
}: {
  homenajeados: Homenajeado[]
  estatuilla: string
  /** Texto de cada homenaje, ya preparado en el servidor (por slug). */
  textos: Record<string, React.ReactNode>
}) {
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
      {homenajeados.map((h) => {
        const foto = h.foto ?? { src: estatuilla, posicion: "50% 35%" }
        return (
          <li key={h.slug} id={h.slug} className="scroll-mt-24">
            <Dialog>
              <DialogTrigger
                className="group relative block aspect-[4/5] w-full overflow-hidden bg-incienso text-left outline-none focus-visible:ring-2 focus-visible:ring-oro focus-visible:ring-offset-2 focus-visible:ring-offset-pergamino"
                aria-label={`Ver el homenaje a ${h.nombre}`}
              >
                <Image
                  src={foto.src}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  style={{ objectPosition: foto.posicion }}
                  className="object-cover [filter:grayscale(0.9)_contrast(1.05)] transition-[filter,transform] duration-700 ease-out group-hover:scale-[1.04] group-hover:[filter:grayscale(0.15)_contrast(1.05)]"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-incienso via-incienso/40 to-transparent transition-opacity duration-500 group-hover:opacity-85"
                />
                <span aria-hidden="true" className="pointer-events-none absolute inset-3 border border-oro/0 transition-colors duration-500 group-hover:border-oro/60" />

                <span className="absolute inset-x-0 bottom-0 flex flex-col p-6 sm:p-7">
                  <span className="font-display text-sm tracking-[0.3em] text-oro">{anioTexto(h)}</span>
                  <span className="mt-2 font-serif text-[1.9rem] leading-[1.05] text-pergamino text-balance">{h.nombre}</span>
                  <span className="mt-3 inline-flex items-center gap-2 text-[0.65rem] font-semibold tracking-[0.24em] text-pergamino/70 uppercase transition-colors group-hover:text-oro">
                    Ver homenaje <ArrowUpRight className="size-3.5" aria-hidden="true" />
                  </span>
                </span>
              </DialogTrigger>

              <DialogContent
                showCloseButton={false}
                className="max-h-[92svh] w-full gap-0 overflow-y-auto rounded-none border border-oro/30 bg-pergamino p-0 ring-0 sm:max-w-4xl"
              >
                <Homenaje h={h} texto={textos[h.slug]} />
              </DialogContent>
            </Dialog>
          </li>
        )
      })}
    </ul>
  )
}

function Homenaje({ h, texto }: { h: Homenajeado; texto: React.ReactNode }) {
  return (
    <article>
      <header className="relative bg-incienso px-6 pt-8 pb-7 text-pergamino sm:px-10 sm:pt-10">
        <DialogClose
          className="absolute top-4 right-4 flex size-10 items-center justify-center border border-oro/40 text-oro transition-colors hover:bg-oro hover:text-incienso"
          aria-label="Cerrar"
        >
          <X className="size-4" />
        </DialogClose>
        <p className="font-display text-sm tracking-[0.3em] text-oro">
          {h.anio ? `Homenajeado ${h.anio}` : "Homenajeado · año por confirmar"}
        </p>
        <DialogTitle className="mt-3 pr-12 font-serif text-[2.2rem] leading-[1.05] font-normal sm:text-5xl">{h.nombre}</DialogTitle>
        <DialogDescription className="mt-3 font-serif text-lg text-oro-claro italic">{h.lema}</DialogDescription>
      </header>

      <div className="grid gap-8 px-6 py-8 sm:px-10 sm:py-10 md:grid-cols-12">
        <div className={h.imagen?.vertical ? "md:col-span-7" : "md:col-span-12"}>
          <div className="space-y-4 font-serif text-[1.12rem] leading-[1.75] text-tinta">
            {texto}
          </div>

          {h.cita && (
            <figure className="my-7 border-l-2 border-oro pl-5">
              <blockquote className="font-serif text-xl leading-snug text-burdeos italic sm:text-2xl">«{h.cita.texto}»</blockquote>
              <figcaption className="mt-2 text-xs tracking-[0.18em] text-muted-foreground uppercase">{h.cita.autor}</figcaption>
            </figure>
          )}

          {h.imagen && !h.imagen.vertical && (
            <figure className="mt-7">
              <div className="relative aspect-[4/3] overflow-hidden bg-incienso">
                <Image src={h.imagen.src} alt={h.imagen.alt} fill sizes="(min-width: 896px) 800px, 100vw" className="object-cover" />
              </div>
              {h.imagen.pie && <figcaption className="mt-2 text-xs leading-relaxed text-muted-foreground">{h.imagen.pie}</figcaption>}
            </figure>
          )}

          <div className="mt-8 border-t border-border pt-5">
            <h3 className="text-[0.65rem] font-semibold tracking-[0.28em] text-oro uppercase">Fuentes</h3>
            <ul className="mt-3 space-y-1.5 text-sm">
              {h.fuentes.map((f) => {
                const clase =
                  "inline-flex items-start gap-1.5 text-tinta/80 underline decoration-oro/40 underline-offset-4 transition-colors hover:text-burdeos"
                return (
                  <li key={f.href + f.texto}>
                    {f.href.startsWith("http") ? (
                      <a href={f.href} target="_blank" rel="noreferrer" className={clase}>
                        {f.texto}
                        <ArrowUpRight className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
                      </a>
                    ) : (
                      <Link href={f.href} className={clase}>
                        {f.texto}
                      </Link>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        {h.imagen?.vertical && (
          <figure className="md:col-span-5">
            <Image
              src={h.imagen.src}
              alt={h.imagen.alt}
              width={600}
              height={800}
              sizes="(min-width: 768px) 320px, 100vw"
              className="mx-auto h-auto w-full max-w-xs border border-incienso/10 shadow-[0_18px_40px_-24px_rgba(20,20,19,0.7)]"
            />
            {h.imagen.pie && <figcaption className="mx-auto mt-2 max-w-xs text-xs text-muted-foreground">{h.imagen.pie}</figcaption>}
          </figure>
        )}
      </div>
    </article>
  )
}
