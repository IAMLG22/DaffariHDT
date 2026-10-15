import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { formatearFecha, type Noticia } from "@/lib/content"
import { cn } from "@/lib/utils"

export function NoticiaCard({ noticia: n, destacada = false }: { noticia: Noticia; destacada?: boolean }) {
  const fecha = n.fechaTexto ?? formatearFecha(n.fecha)
  return (
    <article
      className={cn(
        "group relative flex h-full flex-col border border-border bg-white transition-[border-color,box-shadow] duration-500 hover:border-oro/60 hover:shadow-[0_24px_60px_-30px_rgba(90,24,39,0.35)]",
        destacada && "md:grid md:grid-cols-12 md:items-stretch",
      )}
    >
      {n.imagen && (
        <div className={cn("relative overflow-hidden bg-incienso", destacada ? "aspect-[16/10] md:col-span-7 md:aspect-auto md:min-h-[440px]" : "aspect-[16/10]")}>
          <Image
            src={n.imagen}
            alt=""
            fill
            sizes={destacada ? "(min-width: 768px) 60vw, 100vw" : "(min-width: 768px) 33vw, 100vw"}
            className="foto-antigua object-cover group-hover:scale-[1.03]"
          />
          <span className="absolute top-4 left-4 bg-incienso/85 px-3 py-1.5 text-[0.62rem] font-semibold tracking-[0.22em] text-oro uppercase backdrop-blur">
            {n.categoria}
          </span>
        </div>
      )}
      <div className={cn("flex flex-1 flex-col p-7", destacada && "md:col-span-5 md:justify-center md:p-12")}>
        {destacada && <p className="eyebrow mb-6">Última noticia</p>}
        <time dateTime={n.fecha} className="text-xs tracking-[0.18em] text-muted-foreground uppercase">
          {fecha}
        </time>
        <h3 className={cn("mt-3 font-serif leading-[1.1] text-incienso text-balance", destacada ? "text-4xl lg:text-5xl" : "text-2xl")}>
          <Link href={`/noticias/${n.slug}`} className="after:absolute after:inset-0">
            {n.titular}
          </Link>
        </h3>
        <p className={cn("mt-4 leading-relaxed text-muted-foreground", destacada ? "text-base" : "line-clamp-3 text-sm")}>{n.extracto}</p>
        <span className="mt-auto inline-flex items-center gap-2 pt-6 text-[0.7rem] font-semibold tracking-[0.22em] text-burdeos uppercase transition-colors group-hover:text-oro">
          Leer noticia <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </article>
  )
}
