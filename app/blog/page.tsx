import type { Metadata } from "next"
import { Suspense } from "react"
import { PageHeader } from "@/components/site/headings"
import { BlogTabs } from "./blog-tabs"
import { blogActual } from "@/lib/content"
import { archivoResumen } from "@/lib/archivo"

export const metadata: Metadata = {
  title: "Blog",
  description: "Opinión, artículos y crónicas de la nueva etapa, y el archivo histórico del blog de la Asociación Daffari.",
}

export default function Blog() {
  return (
    <>
      <PageHeader
        eyebrow="Blog"
        title="Tribuna y Hemeroteca"
        intro="Dos etapas, un mismo varal: la voz de hoy y la memoria escrita de quienes nos precedieron."
        image="/images/historia/hombres-de-trono-retrato.jpg"
      />
      {/* La pestaña activa se lee de ?etapa= en el cliente; el resto es estático. */}
      <Suspense fallback={<div className="min-h-[60svh] bg-pergamino" />}>
        <BlogTabs actual={blogActual} archivo={archivoResumen} />
      </Suspense>
    </>
  )
}
