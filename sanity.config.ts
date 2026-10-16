"use client"

/**
 * Panel de administración (Sanity Studio), servido en /admin.
 */
import { defineConfig } from "sanity"
import { structureTool, type StructureResolver } from "sanity/structure"
import { esESLocale } from "@sanity/locale-es-es"
import { dataset, projectId } from "./sanity/env"
import { schemaTypes } from "./sanity/schemaTypes"

const estructura: StructureResolver = (S) =>
  S.list()
    .title("Contenido de la web")
    .items([
      S.documentTypeListItem("entradaBlog").title("Blog"),
      S.documentTypeListItem("noticia").title("Noticias"),
      S.divider(),
      S.documentTypeListItem("homenajeado").title("Capataces Ilustres"),
      S.listItem()
        .title("Junta de Gobierno")
        .child(S.documentTypeList("miembroJunta").title("Junta de Gobierno").defaultOrdering([{ field: "orden", direction: "asc" }])),
    ])

export default defineConfig({
  name: "daffari",
  title: "Daffari · Administración",
  basePath: "/admin",
  projectId: projectId || "sin-configurar",
  dataset,
  schema: { types: schemaTypes },
  plugins: [structureTool({ structure: estructura, title: "Contenido" }), esESLocale()],
  document: {
    // Sin «Duplicar» para que no se cuelen copias por error.
    actions: (anteriores) => anteriores.filter((a) => a.action !== "duplicate"),
  },
})
