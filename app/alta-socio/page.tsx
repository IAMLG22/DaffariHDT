import type { Metadata } from "next"
import Image from "next/image"
import { Check } from "lucide-react"
import { PageHeader } from "@/components/site/headings"
import { FormularioAlta } from "./formulario-alta"
import { site } from "@/lib/content"

export const metadata: Metadata = {
  title: "Alta de Socio",
  description: "Inscríbete en la Asociación Cultural Daffari — Hombres de Trono de Málaga.",
}

const razones = [
  "Mantener viva la memoria de Don Antonio Daffari y de los capataces de Málaga.",
  "Participar en los encuentros anuales, charlas, coloquios y tertulias formativas.",
  "Acompañar el Vía Crucis de hombres de trono durante la Cuaresma.",
  "Apoyar la creación de una sede física, punto de encuentro de hombres de trono, capataces y mayordomos.",
]

export default function AltaSocio() {
  return (
    <>
      <PageHeader
        eyebrow="Únete a Daffari"
        title="Alta de Socio"
        intro="Hombres de trono, capataces, mayordomos y simpatizantes: este es vuestro sitio."
        image="/images/historia/capataces.jpg"
      />
      <section className="bg-pergamino py-16 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-8 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7 xl:col-span-8">
            <FormularioAlta email={site.email} />
          </div>

          <aside className="lg:col-span-5 xl:col-span-4">
            <div className="lg:sticky lg:top-28">
              <div className="relative overflow-hidden bg-incienso p-8 text-pergamino sm:p-10">
                <div className="pointer-events-none absolute inset-0 opacity-[0.1] grano" aria-hidden="true" />
                <p className="eyebrow">Por qué asociarse</p>
                <h2 className="mt-4 font-serif text-3xl leading-tight">
                  Para que la historia del varal se siga contando
                </h2>
                <ul className="mt-8 space-y-5">
                  {razones.map((r) => (
                    <li key={r} className="flex gap-4 text-sm leading-relaxed text-pergamino/75">
                      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center border border-oro/60 text-oro">
                        <Check className="size-3" />
                      </span>
                      {r}
                    </li>
                  ))}
                </ul>
                <blockquote className="mt-10 border-t border-oro/25 pt-8 font-serif text-xl leading-snug text-oro-claro italic">
                  «Antonio y su gente no acarreaban tronos. Los llevaban.»
                </blockquote>
              </div>
              <figure className="group relative mt-6 hidden overflow-hidden lg:block">
                <Image
                  src="/images/historia/capataces-malagueta.jpg"
                  alt="Dos capataces junto a la barrera de la plaza de toros de La Malagueta"
                  width={1280}
                  height={1898}
                  sizes="30vw"
                  className="foto-antigua aspect-[4/3] w-full object-cover object-top"
                />
              </figure>
              <p className="mt-6 text-sm text-muted-foreground">
                ¿Dudas? Escríbenos a{" "}
                <a href={`mailto:${site.email}`} className="text-burdeos underline underline-offset-4 hover:text-oro">
                  {site.email}
                </a>
                .
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
