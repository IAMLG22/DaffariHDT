import type { Metadata } from "next"
import { PageHeader } from "@/components/site/headings"
import { estatuilla } from "@/lib/capataces"
import { getHomenajeados } from "@/lib/datos"
import { Cuerpo } from "@/components/site/texto-rico"
import { legal } from "@/lib/content"
import { Cuadricula } from "./cuadricula"

export const metadata: Metadata = {
  title: "Capataces Ilustres",
  description:
    "Homenajeados con la estatuilla de la Asociación Cultural Daffari Hombres de Trono: reconocimiento a toda una vida bajo un varal.",
}

export default async function CapatacesIlustres() {
  const homenajeados = await getHomenajeados()
  const textos = Object.fromEntries(homenajeados.map((h) => [h.slug, <Cuerpo key={h.slug} rico={h.texto} parrafos={h.parrafos} />]))
  return (
    <>
      <PageHeader
        eyebrow="Reconocimientos"
        title="Capataces Ilustres"
        intro="Una estatuilla de barro, cada año, para toda una vida bajo un varal."
        image="/images/historia/capataces.jpg"
        imageMobile="/images/historia/capataces-malagueta.jpg"
        imageClassName="object-[center_8%] sm:object-[center_30%]"
      />

      <section className="bg-pergamino py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <p className="mx-auto mb-10 max-w-3xl text-center text-base leading-relaxed text-tinta sm:mb-14 sm:text-lg">
            {estatuilla.parrafos[0]}
          </p>

          <Cuadricula homenajeados={homenajeados} estatuilla={estatuilla.imagen} textos={textos} />

          <p className="mt-12 text-center text-sm leading-relaxed text-muted-foreground">
            Relación en elaboración: estamos recopilando los homenajeados de 2015 a 2025. Si conservas datos o
            fotografías, escríbenos a{" "}
            <a href={`mailto:${legal.email}`} className="text-burdeos underline underline-offset-4 hover:text-oro">
              {legal.email}
            </a>
            .
          </p>
        </div>
      </section>
    </>
  )
}
