import { createClient } from "next-sanity"
import { defineLive, type StrictDefinedFetchType } from "next-sanity/live"
import { apiVersion, dataset, projectId, sanityConfigurado } from "./env"

/**
 * Lectura del contenido publicado. El dataset es público, así que no hace
 * falta ningún token para leer. `<SanityLive />` escucha los cambios y
 * actualiza la caché en cuanto el admin pulsa «Publicar».
 */
const vivo = sanityConfigurado
  ? defineLive({
      client: createClient({ projectId, dataset, apiVersion, useCdn: true, perspective: "published" }),
      strict: true,
    })
  : null

export const SanityLive: NonNullable<typeof vivo>["SanityLive"] = vivo?.SanityLive ?? (() => null)

/** Única frontera `'use cache'` para las consultas a Sanity. */
export const cachedSanity: StrictDefinedFetchType = async (opciones) => {
  "use cache"
  if (!vivo) throw new Error("Sanity no está configurado (falta NEXT_PUBLIC_SANITY_PROJECT_ID)")
  return vivo.sanityFetch(opciones)
}

/** Atajo: contenido publicado, sin marcas de edición visual. */
export async function consultar<T>(query: string, params: Record<string, unknown> = {}): Promise<T> {
  const { data } = await cachedSanity({ query, params, perspective: "published", stega: false })
  return data as T
}
