import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url"
import { dataset, projectId } from "./env"

const constructor = createImageUrlBuilder({ projectId: projectId || "sin-configurar", dataset })

/** URL de una imagen de Sanity, recortada según el punto de interés que marque el admin. */
export function urlImagen(fuente: SanityImageSource | null | undefined, ancho = 1600) {
  if (!fuente) return undefined
  return constructor.image(fuente).width(ancho).fit("max").auto("format").url()
}
