import Image from "next/image"
import { cn } from "@/lib/utils"

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
          "mt-4 font-serif text-4xl leading-[1.05] font-medium text-balance sm:text-5xl lg:text-6xl",
          tone === "dark" ? "text-pergamino" : "text-incienso",
        )}
      >
        {title}
      </h2>
      <div
        aria-hidden="true"
        className={cn("mt-6 flex items-center gap-3 text-oro", align === "center" && "justify-center")}
      >
        <span className="h-px w-12 bg-current" />
        <span className="size-1.5 rotate-45 bg-current" />
        <span className="h-px w-12 bg-current" />
      </div>
      {intro && (
        <p
          className={cn(
            "mt-6 text-lg leading-relaxed text-pretty",
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
}: {
  eyebrow: string
  title: React.ReactNode
  intro?: React.ReactNode
  image?: string
}) {
  return (
    <section className="relative isolate overflow-hidden bg-incienso pt-40 pb-20 text-pergamino sm:pt-48 sm:pb-28">
      {image && (
        <Image
          src={image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover opacity-30 [filter:sepia(0.5)_grayscale(0.4)]"
        />
      )}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-incienso via-incienso/70 to-incienso/40" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.12] grano" aria-hidden="true" />
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-5 max-w-4xl font-display text-4xl leading-[1.05] tracking-wide text-balance sm:text-6xl lg:text-7xl">
          {title}
        </h1>
        {intro && <p className="mt-8 max-w-2xl font-serif text-xl leading-relaxed text-pergamino/75 italic sm:text-2xl">{intro}</p>}
      </div>
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-oro/60 to-transparent" aria-hidden="true" />
    </section>
  )
}
