import Link from "next/link"
import { Info } from "lucide-react"
import { legal } from "@/lib/content"
import { cn } from "@/lib/utils"

/** Aviso de memoria histórica y vía de retirada para quien aparezca en el archivo. */
export function AvisoArchivo({ className }: { className?: string }) {
  return (
    <aside
      className={cn(
        "flex gap-4 border border-incienso/15 bg-pergamino/60 p-5 text-sm leading-relaxed text-tinta",
        className,
      )}
    >
      <Info className="mt-0.5 size-5 shrink-0 text-burdeos" aria-hidden="true" />
      <p>
        Publicaciones del blog de la asociación (2010–2014) conservadas con fines de memoria histórica, tal y como se
        publicaron. Si apareces en alguna imagen o texto y quieres que se retire o se corrija, escríbenos a{" "}
        <a href={`mailto:${legal.email}`} className="text-burdeos underline underline-offset-4 hover:text-oro">
          {legal.email}
        </a>{" "}
        indicando el enlace y lo atenderemos lo antes posible. Más información en la{" "}
        <Link href="/privacidad" className="text-burdeos underline underline-offset-4 hover:text-oro">
          política de privacidad
        </Link>
        .
      </p>
    </aside>
  )
}
