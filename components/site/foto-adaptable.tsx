import { getImageProps } from "next/image"

/** Sin `width`/`height` la foto rellena su contenedor (como `<Image fill>`). */
type Fuente = { src: string; width?: number; height?: number }

/** Mismo corte que Tailwind `sm`: por debajo, teléfono. */
export const MEDIA_MOVIL = "(max-width: 639px)"

/**
 * Dirección de arte: una fotografía vertical para el teléfono y otra
 * horizontal para el ordenador. Un único <picture>, así el navegador descarga
 * sólo la que va a mostrar (dos <Image> ocultos con CSS descargarían ambas).
 */
export function FotoAdaptable({
  movil,
  escritorio,
  alt,
  sizes,
  className,
  prioridad = false,
}: {
  movil: Fuente
  escritorio: Fuente
  alt: string
  sizes: string
  className?: string
  /** Para la foto principal de la página: pide la imagen con prioridad alta. */
  prioridad?: boolean
}) {
  const comun = { alt, sizes, loading: prioridad ? ("eager" as const) : undefined }
  const props = (f: Fuente) => getImageProps({ ...comun, ...f, fill: f.width === undefined })
  const {
    props: { srcSet: srcSetEscritorio },
  } = props(escritorio)
  const {
    props: { srcSet: srcSetMovil, ...resto },
  } = props(movil)

  return (
    <picture>
      <source media={MEDIA_MOVIL} srcSet={srcSetMovil} sizes={sizes} />
      <source srcSet={srcSetEscritorio} sizes={sizes} />
      {/* eslint-disable-next-line jsx-a11y/alt-text -- el alt llega en `resto` */}
      <img {...resto} fetchPriority={prioridad ? "high" : undefined} className={className} />
    </picture>
  )
}
