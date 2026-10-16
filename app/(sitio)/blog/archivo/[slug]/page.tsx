import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { archivo, entradaArchivo, prepararVideos } from "@/lib/archivo"
import { AvisoArchivo } from "@/components/site/aviso-archivo"
import { ArchivoCuerpo } from "@/components/site/archivo-cuerpo"
import { formatearFecha } from "@/lib/content"

export function generateStaticParams() {
  return archivo.map((e) => ({ slug: e.slug }))
}

export async function generateMetadata({ params }: PageProps<"/blog/archivo/[slug]">): Promise<Metadata> {
  const { slug } = await params
  const { entrada } = entradaArchivo(slug)
  return entrada ? { title: `${entrada.titulo} · Archivo Histórico`, description: entrada.extracto } : {}
}

export default async function EntradaArchivoPage({ params }: PageProps<"/blog/archivo/[slug]">) {
  const { slug } = await params
  const { entrada: e, anterior, posterior } = entradaArchivo(slug)
  if (!e) notFound()

  // Imágenes diferidas: el cuerpo viene tal cual del blog antiguo (ya saneado).
  const html = prepararVideos(e.html).replace(/<img /g, '<img loading="lazy" decoding="async" ')

  return (
    <article className="relative bg-[#efe8da]">
      <div className="pointer-events-none absolute inset-0 opacity-[0.18] mix-blend-multiply grano" aria-hidden="true" />
      <header className="relative bg-incienso pt-36 pb-16 text-pergamino sm:pt-44">
        <div className="mx-auto max-w-3xl px-4 sm:px-8">
          <Link
            href="/blog?etapa=archivo"
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-oro uppercase hover:text-oro-claro"
          >
            <ArrowLeft className="size-4" /> Archivo Histórico
          </Link>
          <p className="eyebrow mt-10">
            {e.tipo === "pagina" ? "Página del blog antiguo" : "Blog antiguo"} · Publicado el{" "}
            <time dateTime={e.fecha}>{formatearFecha(e.fecha)}</time>
          </p>
          <h1 className="mt-5 font-serif text-4xl leading-[1.08] text-balance sm:text-5xl">{e.titulo}</h1>
          <p className="mt-6 text-xs tracking-[0.18em] text-pergamino/60 uppercase">
            {e.autor}
            {e.etiquetas.length > 0 && <> · {e.etiquetas.join(", ")}</>}
          </p>
        </div>
      </header>

      <div className="relative mx-auto max-w-3xl px-4 py-14 sm:px-8 sm:py-20">
        <ArchivoCuerpo html={html} />

        <AvisoArchivo className="mt-14" />

        <p className="mt-8 border-t border-dashed border-incienso/30 pt-6 text-xs text-tinta/70">
          Publicación original:{" "}
          <a href={e.urlOriginal} target="_blank" rel="noreferrer" className="break-all underline underline-offset-4 hover:text-burdeos">
            {e.urlOriginal}
          </a>
        </p>

        {e.tipo === "entrada" && (
          <nav aria-label="Entradas contiguas" className="mt-10 grid gap-4 sm:grid-cols-2">
            {anterior ? (
              <Link href={`/blog/archivo/${anterior.slug}`} className="group border border-incienso/20 p-5 transition-colors hover:border-burdeos">
                <span className="flex items-center gap-2 text-[0.65rem] font-semibold tracking-[0.22em] text-burdeos uppercase">
                  <ArrowLeft className="size-3.5" /> Anterior · {formatearFecha(anterior.fecha)}
                </span>
                <span className="mt-2 block font-serif text-xl leading-snug text-incienso">{anterior.titulo}</span>
              </Link>
            ) : (
              <span />
            )}
            {posterior && (
              <Link href={`/blog/archivo/${posterior.slug}`} className="group border border-incienso/20 p-5 text-right transition-colors hover:border-burdeos">
                <span className="flex items-center justify-end gap-2 text-[0.65rem] font-semibold tracking-[0.22em] text-burdeos uppercase">
                  Siguiente · {formatearFecha(posterior.fecha)} <ArrowRight className="size-3.5" />
                </span>
                <span className="mt-2 block font-serif text-xl leading-snug text-incienso">{posterior.titulo}</span>
              </Link>
            )}
          </nav>
        )}
      </div>
    </article>
  )
}
