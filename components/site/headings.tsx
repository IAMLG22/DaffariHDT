import { cn } from "@/lib/utils"
import { FotoAdaptable } from "@/components/site/foto-adaptable"

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  tone = "light",
  className,
}: {
  eyebrow: string
  title: React.ReactNode
  intro?: React.ReactNode
  align?: "left" | "center"
  tone?: "light" | "dark"
  className?: string
}) {
  return (
    <header className={cn(align === "center" && "mx-auto text-center", "max-w-3xl", className)}>
      <p className={cn("eyebrow", align === "center" && "justify-center")}>{eyebrow}</p>
      <h2
        className={cn(
          "mt-3.5 font-serif text-[2.2rem] leading-[1.08] font-medium text-balance sm:mt-4 sm:text-5xl sm:leading-[1.05] lg:text-6xl",
          tone === "dark" ? "text-pergamino" : "text-incienso",
        )}
      >
        {title}
      </h2>
      <div
        aria-hidden="true"
        className={cn("mt-5 flex items-center gap-3 text-oro sm:mt-6", align === "center" && "justify-center")}
      >
        <span className="h-px w-9 bg-current sm:w-12" />
        <span className="size-1 rotate-45 bg-current sm:size-1.5" />
        <span className="h-px w-9 bg-current sm:w-12" />
      </div>
      {intro && (
        <p
          className={cn(
            "mt-5 text-base leading-relaxed text-pretty sm:mt-6 sm:text-lg",
            tone === "dark" ? "text-pergamino/70" : "text-muted-foreground",
          )}
        >
          {intro}
        </p>
      )}
    </header>
  )
}

/** Cabecera de página interior: banda oscura con foto antigua de fondo. */
export function PageHeader({
  eyebrow,
  title,
  intro,
  image,
  imageMobile,
  imageClassName,
}: {
  eyebrow: string
  title: React.ReactNode
  intro?: React.ReactNode
  /** Foto horizontal para escritorio. */
  image?: string
  /** Foto vertical para el teléfono; si falta se usa `image`. */
  imageMobile?: string
  /** Para encuadrar el motivo (p. ej. `object-[66%_center]`). */
  imageClassName?: string
}) {
  return (
    <section className="relative isolate overflow-hidden bg-incienso pt-32 pb-14 text-pergamino sm:pt-48 sm:pb-28">
      {image && (
        // En móvil la foto arranca bajo el menú (56px): así las caras y tronos,
        // que en las fotos verticales están arriba, no quedan tapados por él.
        <div className="absolute inset-x-0 top-14 bottom-0 -z-10 sm:top-0" aria-hidden="true">
          <FotoAdaptable
            movil={{ src: imageMobile ?? image }}
            escritorio={{ src: image }}
            alt=""
            sizes="100vw"
            prioridad
            className={cn("object-cover opacity-30 [filter:sepia(0.5)_grayscale(0.4)] max-sm:opacity-50", imageClassName)}
          />
        </div>
      )}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-incienso via-incienso/60 to-incienso/30 sm:via-incienso/70 sm:to-incienso/40" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.12] grano" aria-hidden="true" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-4 max-w-4xl font-display text-[2.3rem] leading-[1.08] tracking-wide text-balance sm:mt-5 sm:text-6xl sm:leading-[1.05] lg:text-7xl">
          {title}
        </h1>
        {intro && <p className="mt-5 max-w-2xl font-serif text-[1.2rem] leading-[1.5] text-pergamino/75 italic text-pretty sm:mt-8 sm:text-2xl sm:leading-relaxed">{intro}</p>}
      </div>
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-oro/60 to-transparent" aria-hidden="true" />
    </section>
  )
}
