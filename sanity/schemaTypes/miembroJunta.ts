import { defineField, defineType } from "sanity"

export const CARGOS = ["Presidente", "Vicepresidente", "Secretario", "Tesorero", "Fiscal", "Vocal", "Consejero"]

export const miembroJunta = defineType({
  name: "miembroJunta",
  title: "Miembro de la Junta",
  type: "document",
  icon: () => "👤",
  fields: [
    defineField({ name: "nombre", title: "Nombre y apellidos", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "cargo",
      title: "Cargo",
      type: "string",
      options: { list: CARGOS },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "orden",
      title: "Orden",
      description: "Posición en la lista (1 = primero). Los consejeros se ordenan entre sí.",
      type: "number",
      initialValue: 10,
    }),
    defineField({
      name: "nota",
      title: "Nota (opcional)",
      description: "Solo para la presidencia: frase que aparece en su tarjeta.",
      type: "text",
      rows: 2,
    }),
  ],
  orderings: [{ title: "Por orden", name: "ordenAsc", by: [{ field: "orden", direction: "asc" }] }],
  preview: { select: { title: "nombre", subtitle: "cargo" } },
})
