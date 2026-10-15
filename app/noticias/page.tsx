import type { Metadata } from "next"
import { PageHeader } from "@/components/site/headings"
import { NoticiaCard } from "@/components/site/noticia-card"
import { Reveal } from "@/components/site/ui"
import { noticiasOrdenadas } from "@/lib/content"

export const metadata: Metadata = {
  title: "Noticias",
  description: "Actualidad, comunicados oficiales, mesas redondas y actos de la Asociación Daffari.",
}

export default function Noticias() {
  const [ultima, ...resto] = noticiasOrdenadas
  return (
    <>
      <PageHeader
        eyebrow="Actualidad"
        title="Noticias"
        intro="Comunicados oficiales, mesas redondas, coloquios, actos culturales y la agenda de la asociación."
        image="/images/historia/cuadrilla.jpg"
      />
      <section className="bg-pergamino py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <Reveal>
            <NoticiaCard noticia={ultima} destacada />
          </Reveal>
          <div className="mt-16 mb-10 flex items-center gap-4 text-oro" aria-hidden="true">
            <span className="font-display text-xs tracking-[0.4em]">Más noticias</span>
            <span className="h-px flex-1 bg-current opacity-40" />
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {resto.map((n, i) => (
              <Reveal key={n.slug} delay={(i % 3) * 90}>
                <NoticiaCard noticia={n} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
