import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { blogActual, formatearFecha } from "@/lib/content"

export function generateStaticParams() {
  // Cache Components exige al menos un parámetro: mientras el blog esté vacío,
  // se genera uno de reserva que responde con 404.
  return blogActual.length ? blogActual.map((e) => ({ slug: e.slug })) : [{ slug: "proximamente" }]
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params
  const e = blogActual.find((x) => x.slug === slug)
  return e ? { title: e.titulo, description: e.extracto } : {}
}

export default async function EntradaPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params
  const e = blogActual.find((x) => x.slug === slug)
  if (!e) notFound()

  return (
    <article className="bg-pergamino">
      <header className="relative isolate overflow-hidden bg-incienso pt-36 pb-20 text-pergamino sm:pt-44">
        {e.imagen && (
          <Image src={e.imagen} alt="" fill preload sizes="100vw" className="-z-10 object-cover opacity-25" />
        )}
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-incienso to-incienso/40" aria-hidden="true" />
        <div className="mx-auto max-w-3xl px-4 sm:px-8">
          <Link href="/blog" className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-oro uppercase hover:text-oro-claro">
            <ArrowLeft className="size-4" /> Blog
          </Link>
          <p className="eyebrow mt-10">{e.seccion} · {e.lectura ? `${e.lectura} min de lectura` : "Blog"}</p>
          <h1 className="mt-5 font-serif text-4xl leading-[1.05] text-balance sm:text-6xl">{e.titulo}</h1>
          <p className="mt-8 text-xs tracking-[0.18em] text-pergamino/70 uppercase">
            {e.autor} · <time dateTime={e.fecha}>{formatearFecha(e.fecha)}</time>
          </p>
        </div>
      </header>
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-8 sm:py-20">
        <p className="font-serif text-2xl leading-relaxed text-incienso italic">{e.extracto}</p>
        <div className="prosa mt-10">
          {e.cuerpo.map((p, i) => (
            <p key={i} className={i === 0 ? "capitular" : undefined}>
              {p}
            </p>
          ))}
        </div>
      </div>
    </article>
  )
}
