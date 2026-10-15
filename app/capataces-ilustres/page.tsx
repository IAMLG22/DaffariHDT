import type { Metadata } from "next"
import { PageHeader } from "@/components/site/headings"

export const metadata: Metadata = {
  title: "Capataces Ilustres",
  description: "Reconocimiento anual de la Asociación Daffari a los capataces de Málaga.",
}

export default function CapatacesIlustres() {
  return (
    <>
      <PageHeader
        eyebrow="Reconocimientos"
        title="Capataces Ilustres"
        image="/images/historia/capataces.jpg"
        imageMobile="/images/historia/capataces-malagueta.jpg"
        imageClassName="object-[center_8%] sm:object-[center_30%]"
      />
      {/* PENDIENTE: contenido de la sección */}
      <section className="min-h-[40svh] bg-pergamino" aria-label="Contenido pendiente" />
    </>
  )
}
