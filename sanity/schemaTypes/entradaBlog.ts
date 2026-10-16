import { defineField, defineType } from "sanity"
import { campoSlug } from "./comunes"

export const SECCIONES_BLOG = ["Opinión", "Crónica", "Memoria", "Entrevista", "Formación"]

export const entradaBlog = defineType({
  name: "entradaBlog",
  title: "Entrada del blog",
  type: "document",
  icon: () => "✒️",
  fields: [
    defineField({ name: "titulo", title: "Título", type: "string", validation: (r) => r.required().max(140) }),
    campoSlug("titulo"),
    defineField({
      name: "fecha",
      title: "Fecha de publicación",
      type: "date",
      options: { dateFormat: "DD/MM/YYYY" },
      initialValue: () => new Date().toISOString().slice(0, 10),
      validation: (r) => r.required(),
    }),
    defineField({ name: "autor", title: "Autor", type: "string", initialValue: "Redacción Daffari" }),
    defineField({
      name: "seccion",
      title: "Sección",
      type: "string",
      options: { list: SECCIONES_BLOG, layout: "radio", direction: "horizontal" },
      initialValue: "Opinión",
      validation: (r) => r.required(),
    }),
    defineField({ name: "imagen", title: "Foto principal", type: "fotoConTexto" }),
    defineField({
      name: "extracto",
      title: "Entradilla",
      description: "Una o dos frases que resumen el artículo. Sale en el listado del blog.",
      type: "text",
      rows: 3,
      validation: (r) => r.required().max(300),
    }),
    defineField({ name: "cuerpo", title: "Artículo", type: "textoRico", validation: (r) => r.required() }),
  ],
  orderings: [{ title: "Más recientes primero", name: "fechaDesc", by: [{ field: "fecha", direction: "desc" }] }],
  preview: {
    select: { title: "titulo", fecha: "fecha", seccion: "seccion", media: "imagen" },
    prepare: ({ title, fecha, seccion, media }) => ({ title, subtitle: [seccion, fecha].filter(Boolean).join(" · "), media }),
  },
})
