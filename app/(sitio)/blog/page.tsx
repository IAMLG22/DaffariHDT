import type { Metadata } from "next"
import { Suspense } from "react"
import { PageHeader } from "@/components/site/headings"
import { BlogTabs } from "./blog-tabs"
import { getEntradas } from "@/lib/datos"
import { archivoResumen } from "@/lib/archivo"

export const metadata: Metadata = {
  title: "Blog",
  description: "Opinión, artículos y crónicas de la nueva etapa, y el archivo histórico del blog de la Asociación Daffari.",
}

export default async function Blog() {
  const blogActual = await getEntradas()
  return (
    <>
      <PageHeader
        eyebrow="Blog"
        title="Tribuna y Hemeroteca"
        intro="Dos etapas, un mismo varal: la voz de hoy y la memoria escrita de quienes nos precedieron."
        image="/images/fotos/tronos-noche.jpg"
        imageMobile="/images/historia/hombres-de-trono-retrato.jpg"
        imageClassName="object-[center_20%] sm:object-[center_40%]"
      />
      {/* La pestaña activa se lee de ?etapa= en el cliente; el resto es estático. */}
      <Suspense fallback={<div className="min-h-[60svh] bg-pergamino" />}>
        <BlogTabs actual={blogActual} archivo={archivoResumen} />
      </Suspense>
    </>
  )
}
