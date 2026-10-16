import { defineField, defineType } from "sanity"
import { campoSlug } from "./comunes"

export const CATEGORIAS_NOTICIA = ["Comunicado oficial", "Mesa redonda", "Actos culturales", "Agenda anual"] as const

export const noticia = defineType({
  name: "noticia",
  title: "Noticia",
  type: "document",
  icon: () => "📰",
  fields: [
    defineField({ name: "titular", title: "Titular", type: "string", validation: (r) => r.required().max(140) }),
    campoSlug("titular"),
    defineField({
      name: "categoria",
      title: "Categoría",
      type: "string",
      options: { list: [...CATEGORIAS_NOTICIA], layout: "radio" },
      initialValue: "Comunicado oficial",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "fecha",
      title: "Fecha",
      type: "date",
      options: { dateFormat: "DD/MM/YYYY" },
      initialValue: () => new Date().toISOString().slice(0, 10),
      validation: (r) => r.required(),
    }),
    defineField({
      name: "fechaTexto",
      title: "Fecha en texto (opcional)",
      description: "Para actos sin día fijo, por ejemplo «Cuaresma» o «Anual». Si lo rellenas, se muestra en lugar de la fecha.",
      type: "string",
    }),
    defineField({ name: "imagen", title: "Foto principal", type: "fotoConTexto" }),
    defineField({
      name: "extracto",
      title: "Entradilla",
      description: "Resumen de una o dos frases. Sale en las tarjetas de noticias.",
      type: "text",
      rows: 3,
      validation: (r) => r.required().max(300),
    }),
    defineField({ name: "cuerpo", title: "Noticia completa", type: "textoRico", validation: (r) => r.required() }),
  ],
  orderings: [{ title: "Más recientes primero", name: "fechaDesc", by: [{ field: "fecha", direction: "desc" }] }],
  preview: {
    select: { title: "titular", fecha: "fecha", categoria: "categoria", media: "imagen" },
    prepare: ({ title, fecha, categoria, media }) => ({ title, subtitle: [categoria, fecha].filter(Boolean).join(" · "), media }),
  },
})
