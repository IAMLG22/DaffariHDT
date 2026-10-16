import { Navbar } from "@/components/site/navbar"
import { Footer } from "@/components/site/footer"
import { SanityLive } from "@/sanity/live"

/** Maqueta de la web pública (el panel /admin queda fuera de ella). */
export default function SitioLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:bg-oro focus:px-4 focus:py-2 focus:text-incienso"
      >
        Saltar al contenido
      </a>
      <Navbar />
      <main id="contenido" className="flex-1">
        {children}
      </main>
      <Footer />
      {/* Cuando el admin publica, las páginas abiertas se actualizan solas. */}
      <SanityLive includeDrafts={false} />
    </>
  )
}
