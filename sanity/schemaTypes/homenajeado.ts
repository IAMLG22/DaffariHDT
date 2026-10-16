import { defineArrayMember, defineField, defineType } from "sanity"
import { campoSlug } from "./comunes"

export const homenajeado = defineType({
  name: "homenajeado",
  title: "Capataz ilustre (homenajeado)",
  type: "document",
  icon: () => "🏅",
  fields: [
    defineField({ name: "nombre", title: "Nombre", description: "Por ejemplo: D. Julián González", type: "string", validation: (r) => r.required() }),
    campoSlug("nombre"),
    defineField({
      name: "anio",
      title: "Año del homenaje",
      description: "Déjalo vacío si aún no se conoce.",
      type: "number",
      validation: (r) => r.integer().min(2009).max(2100),
    }),
    defineField({ name: "lema", title: "Frase que lo resume", description: "Sale debajo del nombre.", type: "string" }),
    defineField({
      name: "foto",
      title: "Foto del bloque",
      description: "La que se ve en la cuadrícula. Si no hay, se muestra la estatuilla.",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({ name: "texto", title: "Homenaje", type: "textoRico" }),
    defineField({
      name: "cita",
      title: "Cita destacada (opcional)",
      type: "object",
      fields: [
        defineField({ name: "texto", title: "Texto", type: "text", rows: 3 }),
        defineField({ name: "autor", title: "Quién la dice / dónde", type: "string" }),
      ],
    }),
    defineField({
      name: "imagen",
      title: "Imagen dentro del homenaje (opcional)",
      description: "Cartel, foto del acto, etc.",
      type: "fotoConTexto",
    }),
    defineField({
      name: "imagenVertical",
      title: "La imagen es vertical (un cartel)",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "fuentes",
      title: "Fuentes",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "fuente",
          fields: [
            defineField({ name: "texto", title: "Texto del enlace", type: "string", validation: (r) => r.required() }),
            defineField({
              name: "url",
              title: "Enlace",
              description: "Dirección completa (https://…) o una página de esta web (/blog/archivo/…).",
              type: "string",
              validation: (r) => r.required(),
            }),
          ],
        }),
      ],
    }),
  ],
  orderings: [{ title: "Por año", name: "anioAsc", by: [{ field: "anio", direction: "asc" }] }],
  preview: {
    select: { title: "nombre", anio: "anio", media: "foto" },
    prepare: ({ title, anio, media }) => ({ title, subtitle: anio ? `Homenajeado ${anio}` : "Año por confirmar", media }),
  },
})
