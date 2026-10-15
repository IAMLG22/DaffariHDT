import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { formatearFecha, noticias } from "@/lib/content"

export function generateStaticParams() {
  return noticias.map((n) => ({ slug: n.slug }))
}

export async function generateMetadata({ params }: PageProps<"/noticias/[slug]">): Promise<Metadata> {
  const { slug } = await params
  const n = noticias.find((x) => x.slug === slug)
  return n ? { title: n.titular, description: n.extracto } : {}
}

export default async function NoticiaPage({ params }: PageProps<"/noticias/[slug]">) {
  const { slug } = await params
  const n = noticias.find((x) => x.slug === slug)
  if (!n) notFound()

  return (
    <article className="bg-pergamino">
      <header className="bg-incienso pt-36 pb-16 text-pergamino sm:pt-44">
        <div className="mx-auto max-w-3xl px-4 sm:px-8">
          <Link href="/noticias" className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-oro uppercase hover:text-oro-claro">
            <ArrowLeft className="size-4" /> Noticias
          </Link>
          <p className="eyebrow mt-10">
            {n.categoria} · <time dateTime={n.fecha}>{n.fechaTexto ?? formatearFecha(n.fecha)}</time>
          </p>
          <h1 className="mt-5 font-serif text-4xl leading-[1.08] text-balance sm:text-6xl">{n.titular}</h1>
          <p className="mt-6 font-serif text-xl leading-relaxed text-pergamino/70 italic">{n.extracto}</p>
        </div>
      </header>

      {n.imagen && (
        <figure className="mx-auto -mt-px max-w-4xl px-4 sm:px-8">
          <div className="relative overflow-hidden bg-incienso">
            <Image src={n.imagen} alt="" width={1150} height={720} sizes="(min-width: 896px) 896px, 100vw" className="h-auto max-h-[70svh] w-full object-contain" preload />
          </div>
          {n.creditoImagen && <figcaption className="mt-3 text-xs text-muted-foreground">{n.creditoImagen}</figcaption>}
        </figure>
      )}

      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-8 sm:py-20">
        <div className="prosa">
          {n.cuerpo.map((p, i) => (
            <p key={i} className={i === 0 ? "capitular" : undefined}>
              {p}
            </p>
          ))}
        </div>
        <div className="mt-16 border-t border-border pt-8">
          <Link href="/noticias" className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-burdeos uppercase hover:text-oro">
            <ArrowLeft className="size-4" /> Volver a Noticias
          </Link>
        </div>
      </div>
    </article>
  )
}
