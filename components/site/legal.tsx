import Link from "next/link"
import { formatearFecha, legal } from "@/lib/content"

/** Maqueta común de las páginas legales. */
export function PaginaLegal({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <article className="bg-pergamino">
      <header className="bg-incienso pt-36 pb-14 text-pergamino sm:pt-44">
        <div className="mx-auto max-w-3xl px-4 sm:px-8">
          <p className="eyebrow">Información legal</p>
          <h1 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">{titulo}</h1>
          <p className="mt-4 text-xs tracking-[0.18em] text-pergamino/60 uppercase">
            Última actualización: {formatearFecha(legal.actualizado)}
          </p>
        </div>
      </header>
      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-8 sm:py-20">
        <div className="texto-legal">{children}</div>
        <nav aria-label="Otros textos legales" className="mt-16 flex flex-wrap gap-x-6 gap-y-2 border-t border-border pt-6 text-sm">
          <Link href="/aviso-legal" className="text-burdeos hover:text-oro">Aviso legal</Link>
          <Link href="/privacidad" className="text-burdeos hover:text-oro">Política de privacidad</Link>
          <Link href="/cookies" className="text-burdeos hover:text-oro">Política de cookies</Link>
        </nav>
      </div>
    </article>
  )
}

/** Muestra un dato del titular, o un aviso visible si aún falta. */
export function Dato({ valor, falta }: { valor: string; falta: string }) {
  return valor ? <>{valor}</> : <mark className="bg-oro/25 px-1 text-incienso">[{falta} — pendiente]</mark>
}

export function Correo() {
  return <a href={`mailto:${legal.email}`}>{legal.email}</a>
}
