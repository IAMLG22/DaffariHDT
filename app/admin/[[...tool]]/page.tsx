import type { Metadata } from "next"
import { NextStudio, metadata as metadataStudio } from "next-sanity/studio"
import config from "@/sanity.config"
import { sanityConfigurado } from "@/sanity/env"

export { viewport } from "next-sanity/studio"

export const metadata: Metadata = { ...metadataStudio, title: "Panel de administración" }

/** Panel de administración: aquí el admin publica sin tocar código. */
export default function Admin() {
  if (!sanityConfigurado) {
    return (
      <main className="mx-auto flex min-h-svh max-w-xl flex-col justify-center gap-4 px-6 text-center">
        <h1 className="font-serif text-4xl">Panel de administración</h1>
        <p className="text-muted-foreground">
          El panel aún no está conectado. Falta configurar la variable <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code>{" "}
          (consulta <code>docs/ADMIN.md</code>).
        </p>
      </main>
    )
  }
  return <NextStudio config={config} />
}
