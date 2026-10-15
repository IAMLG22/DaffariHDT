"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"
import { nav, site } from "@/lib/content"
import { Firma } from "@/components/site/firma"
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

/** Píxeles de scroll en los que el cristal pasa de invisible a opaco. */
const RECORRIDO = 140

/**
 * Barra fija. Sobre el Hero de portada flota sobre la fotografía con un velo
 * apenas perceptible; al hacer scroll el cristal esmerilado y el filete dorado
 * aparecen gradualmente, proporcionales al desplazamiento. En el resto de
 * páginas parte ya opaca.
 *
 * Sin `border-b`: un borde transparente sobre un degradado de fondo repite la
 * primera fila del degradado bajo el borde y dibuja una línea negra nítida.
 */
export function Navbar() {
  const pathname = usePathname()
  const portada = pathname === "/"
  const headerRef = React.useRef<HTMLElement>(null)
  const [compacta, setCompacta] = React.useState(!portada)

  React.useEffect(() => {
    const header = headerRef.current
    if (!header) return
    let raf = 0
    const sync = () => {
      raf = 0
      const p = portada ? Math.min(Math.max(window.scrollY / RECORRIDO, 0), 1) : 1
      // Variable CSS en vez de estado: el fundido sigue al dedo sin re-renders.
      header.style.setProperty("--nav-p", p.toFixed(3))
      setCompacta(p > 0.35)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(sync)
    }
    sync()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      cancelAnimationFrame(raf)
    }
  }, [portada])

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href.split("?")[0])

  return (
    <header
      ref={headerRef}
      style={{ "--nav-p": portada ? 0 : 1 } as React.CSSProperties}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[padding] duration-500 ease-out",
        compacta ? "py-2.5 sm:py-3" : "py-4 sm:py-5",
      )}
    >
      {/* Velo de lectura sobre la foto: largo y muy suave, sin borde inferior visible */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[180%] bg-[linear-gradient(to_bottom,rgba(20,20,19,0.55)_0%,rgba(20,20,19,0.32)_35%,rgba(20,20,19,0.12)_65%,rgba(20,20,19,0)_100%)] transition-opacity duration-300"
        style={{ opacity: "calc(1 - var(--nav-p))" }}
      />
      {/* Cristal incienso esmerilado + filete de oro, que se funden con el scroll */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-incienso/80 backdrop-blur-md backdrop-saturate-150 transition-opacity duration-300"
        style={{ opacity: "var(--nav-p)" }}
      >
        <span className="absolute inset-x-0 bottom-0 h-px bg-[linear-gradient(to_right,transparent,rgba(197,160,89,0.2)_18%,rgba(197,160,89,0.2)_82%,transparent)]" />
      </div>
      <nav
        aria-label="Principal"
        className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 sm:px-8"
      >
        <Link href="/" className="group flex shrink-0 items-center gap-2.5 sm:gap-4 text-pergamino" aria-label="Asociación Cultural Daffari · Hombres de Trono, inicio">
          <Firma className="h-auto w-[82px] sm:w-[130px] text-pergamino transition-colors group-hover:text-oro" title="" />
          <span className="h-5 w-px bg-oro/40 sm:h-7" aria-hidden="true" />
          <span className="font-display text-[0.68rem] sm:text-[0.95rem] font-semibold tracking-[0.14em] sm:tracking-[0.2em] text-pergamino/90 uppercase transition-colors group-hover:text-oro whitespace-nowrap">
            Hombres de Trono
          </span>
        </Link>

        <ul className="hidden items-center gap-6 xl:gap-8 lg:flex">
          {nav.map((item) => {
            const enlace = cn(
              "relative block py-1 font-display text-[0.78rem] tracking-[0.16em] uppercase font-medium transition-colors",
              "after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-oro after:transition-transform after:duration-500 hover:after:scale-x-100",
              isActive(item.href) ? "text-oro after:scale-x-100" : "text-pergamino/80 hover:text-pergamino",
            )
            return "children" in item ? (
              <li key={item.href} className="group/dd relative">
                <Link href={item.href} aria-haspopup="true" className={enlace}>
                  {item.label}
                </Link>
                <div className="invisible absolute top-full left-1/2 w-72 -translate-x-1/2 translate-y-2 pt-4 opacity-0 transition-all duration-300 group-hover/dd:visible group-hover/dd:translate-y-0 group-hover/dd:opacity-100 group-focus-within/dd:visible group-focus-within/dd:translate-y-0 group-focus-within/dd:opacity-100">
                  <ul className="rounded-xl border border-oro/20 bg-incienso/95 p-2 shadow-2xl backdrop-blur-xl">
                    {item.children.map((c) => (
                      <li key={c.href}>
                        <Link href={c.href} className="block rounded-lg px-4 py-3 transition-colors hover:bg-pergamino/5">
                          <span className="block font-serif text-lg text-pergamino">{c.label}</span>
                          <span className="block text-xs text-pergamino/55">{c.hint}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ) : (
              <li key={item.href}>
                <Link href={item.href} aria-current={isActive(item.href) ? "page" : undefined} className={enlace}>
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={site.redes.instagram}
            target="_blank"
            rel="noreferrer"
            aria-label="Daffari en Instagram"
            className="hidden items-center gap-2 rounded-full border border-oro/30 bg-incienso/40 px-3.5 py-1.5 text-pergamino/90 backdrop-blur-sm transition-all hover:border-oro hover:bg-oro hover:text-incienso sm:flex"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-4" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.3" cy="6.7" r="0.9" fill="currentColor" stroke="none" />
            </svg>
            <span className="font-display text-[0.7rem] tracking-[0.18em] uppercase font-semibold">Instagram</span>
          </a>

          <Sheet>
            <SheetTrigger
              className="flex size-10 items-center justify-center rounded-full border border-oro/30 bg-incienso/30 text-oro backdrop-blur-sm transition-colors active:bg-oro/15 lg:hidden"
              aria-label="Abrir menú"
            >
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent side="right" className="border-oro/20 bg-incienso text-pergamino">
              <SheetTitle className="px-6 pt-8 font-display text-sm tracking-[0.3em] text-oro uppercase">
                Daffari · Hombres de Trono
              </SheetTitle>
              <ul className="flex flex-col px-6">
                {nav.map((item) => (
                  <React.Fragment key={item.href}>
                    {"children" in item ? (
                      item.children.map((c) => (
                        <li key={c.href} className="border-b border-oro/10">
                          <SheetClose nativeButton={false}
                            render={<Link href={c.href} />}
                            className="block py-3.5"
                          >
                            <span className="block font-serif text-[1.6rem] leading-tight">{c.label}</span>
                            <span className="mt-0.5 block font-display text-[0.6rem] tracking-[0.2em] text-oro/70 uppercase">
                              {c.hint}
                            </span>
                          </SheetClose>
                        </li>
                      ))
                    ) : (
                      <li className="border-b border-oro/10">
                        <SheetClose nativeButton={false}
                          render={<Link href={item.href} />}
                          className={cn("block py-4 font-serif text-[1.6rem] leading-tight", isActive(item.href) && "text-oro")}
                        >
                          {item.label}
                        </SheetClose>
                      </li>
                    )}
                  </React.Fragment>
                ))}
              </ul>
              <div className="mt-auto p-6">
                <a
                  href={site.redes.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 border border-oro bg-oro/10 py-3.5 text-center font-display text-xs font-semibold tracking-[0.2em] text-oro uppercase transition-colors hover:bg-oro hover:text-incienso"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-4" aria-hidden="true">
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.3" cy="6.7" r="0.9" fill="currentColor" stroke="none" />
                  </svg>
                  Instagram Oficial
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  )
}
