import { defineArrayMember, defineField, defineType } from "sanity"

/** Texto con formato (negrita, cursiva, enlaces, títulos, citas y fotos). */
export const textoRico = defineType({
  name: "textoRico",
  title: "Texto",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "Subtítulo", value: "h3" },
        { title: "Cita", value: "blockquote" },
      ],
      lists: [
        { title: "Lista con puntos", value: "bullet" },
        { title: "Lista numerada", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Negrita", value: "strong" },
          { title: "Cursiva", value: "em" },
        ],
        annotations: [
          defineArrayMember({
            name: "link",
            title: "Enlace",
            type: "object",
            fields: [defineField({ name: "href", title: "Dirección (URL)", type: "url", validation: (r) => r.uri({ scheme: ["http", "https", "mailto"] }) })],
          }),
        ],
      },
    }),
    defineArrayMember({
      type: "image",
      title: "Foto",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", title: "Descripción breve (para accesibilidad)", type: "string" }),
        defineField({ name: "pie", title: "Pie de foto", type: "string" }),
      ],
    }),
  ],
})

/** Foto principal con descripción. */
export const fotoConTexto = defineType({
  name: "fotoConTexto",
  title: "Foto",
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      title: "Descripción breve",
      description: "Qué se ve en la foto. Lo leen los buscadores y las personas ciegas.",
      type: "string",
    }),
    defineField({ name: "pie", title: "Pie de foto / autor", type: "string" }),
  ],
})

/** Crea el campo «slug» (dirección de la página) a partir del título. */
export const campoSlug = (origen: string) =>
  defineField({
    name: "slug",
    title: "Dirección en la web",
    description: "Se genera sola a partir del título: pulsa «Generate».",
    type: "slug",
    options: { source: origen, maxLength: 90 },
    validation: (r) => r.required(),
  })
