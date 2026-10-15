import Link from "next/link"
import Image from "next/image"
import { Mail, MapPin } from "lucide-react"
import { nav, site } from "@/lib/content"
import { Emblema } from "@/components/site/emblema"

function IconoX(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M18.9 2H22l-6.8 7.8L23 22h-6.2l-4.8-6.3L6.4 22H3.3l7.3-8.3L1 2h6.3l4.4 5.8L18.9 2Zm-1.1 18h1.7L6.3 3.9H4.5L17.8 20Z" />
    </svg>
  )
}
function IconoFacebook(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M13.5 22v-8.2h2.8l.4-3.2h-3.2V8.5c0-.9.3-1.6 1.6-1.6h1.7V4.1c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.4H7.3v3.2h2.8V22h3.4Z" />
    </svg>
  )
}

export function Footer() {
  const enlaces: { href: string; label: string }[] = nav.flatMap<{ href: string; label: string }>((n) => ("children" in n ? [...n.children] : [n]))
  return (
    <footer className="relative overflow-hidden bg-incienso text-pergamino/75">
      <div className="pointer-events-none absolute inset-0 opacity-[0.07] grano" aria-hidden="true" />
      <div className="mx-auto max-w-7xl px-4 pt-20 pb-10 sm:px-8">
        <div className="grid gap-14 border-b border-oro/15 pb-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-5">
              <Emblema className="size-20 shrink-0 text-oro" />
              <Image src="/images/logo-daffari-blanco.png" alt="Daffari, hombres de trono" width={290} height={102} className="h-auto w-40" />
            </div>
            <p className="mt-8 max-w-sm font-serif text-xl leading-relaxed text-pergamino/80 italic">
              «Es importante saber de dónde venimos y quiénes nos han llevado hasta aquí.»
            </p>
            <p className="mt-6 text-sm leading-relaxed">
              {site.nombreCompleto}. Única asociación que representa a los hombres de trono, capataces y mayordomos en Málaga.
            </p>
          </div>

          <div className="md:col-span-3">
            <h2 className="eyebrow mb-6">Secciones</h2>
            <ul className="grid gap-3 text-sm">
              {enlaces.map((e) => (
                <li key={e.href + e.label}>
                  <Link href={e.href} className="transition-colors hover:text-oro">
                    {e.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/alta-socio" className="text-oro transition-colors hover:text-oro-claro">
                  Alta de Socio →
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <h2 className="eyebrow mb-6">Contacto</h2>
            <ul className="grid gap-4 text-sm">
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 size-4 text-oro" />
                <a href={`mailto:${site.email}`} className="transition-colors hover:text-oro">
                  {site.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 text-oro" />
                <span>Málaga, Andalucía</span>
              </li>
            </ul>
            <div className="mt-8 flex gap-3">
              <a
                href={site.redes.twitter}
                target="_blank"
                rel="noreferrer"
                aria-label="Daffari en X (Twitter)"
                className="flex size-11 items-center justify-center border border-oro/30 text-oro transition-colors hover:bg-oro hover:text-incienso"
              >
                <IconoX className="size-4" />
              </a>
              <a
                href={site.redes.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Daffari en Facebook"
                className="flex size-11 items-center justify-center border border-oro/30 text-oro transition-colors hover:bg-oro hover:text-incienso"
              >
                <IconoFacebook className="size-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 pt-8 text-xs tracking-wide sm:flex-row">
          <p>© Asociación Cultural Daffari · Hombres de Trono</p>
          <p className="font-display tracking-[0.3em] text-oro/80 uppercase">Málaga · Desde {site.fundacion}</p>
        </div>
      </div>
    </footer>
  )
}
