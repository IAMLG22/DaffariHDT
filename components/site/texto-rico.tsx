import { PortableText, type PortableTextBlock, type PortableTextComponents } from "next-sanity"
import { urlImagen } from "@/sanity/imagen"

const componentes: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      const src = urlImagen(value, 1400)
      if (!src) return null
      return (
        <figure className="my-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={value.alt ?? ""} loading="lazy" decoding="async" className="mx-auto h-auto w-full" />
          {value.pie && <figcaption className="mt-2 font-sans text-xs text-muted-foreground">{value.pie}</figcaption>}
        </figure>
      )
    },
  },
  block: {
    h3: ({ children }) => <h3>{children}</h3>,
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-2 border-oro pl-5 text-burdeos italic">{children}</blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="my-4 list-disc space-y-1 pl-6">{children}</ul>,
    number: ({ children }) => <ol className="my-4 list-decimal space-y-1 pl-6">{children}</ol>,
  },
  marks: {
    link: ({ value, children }) => {
      const href: string = value?.href ?? "#"
      const externo = /^https?:/.test(href)
      return (
        <a
          href={href}
          {...(externo ? { target: "_blank", rel: "noreferrer" } : {})}
          className="text-burdeos underline decoration-oro/60 underline-offset-4 hover:text-oro"
        >
          {children}
        </a>
      )
    },
  },
}

/**
 * Cuerpo de un texto: el formato del panel (Sanity) o, si el contenido aún
 * está en el código, una lista de párrafos.
 */
export function Cuerpo({
  rico,
  parrafos = [],
  capitular = false,
}: {
  rico?: PortableTextBlock[]
  parrafos?: string[]
  capitular?: boolean
}) {
  if (rico && rico.length > 0) {
    return (
      <div className={capitular ? "capitular-primera" : undefined}>
        <PortableText value={rico} components={componentes} />
      </div>
    )
  }
  return (
    <>
      {parrafos.map((p, i) => (
        <p key={i} className={capitular && i === 0 ? "capitular" : undefined}>
          {p}
        </p>
      ))}
    </>
  )
}
