"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"
import { nav, site } from "@/lib/content"
import { Firma } from "@/components/site/firma"
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

/**
 * Barra fija. Sobre el Hero de portada es transparente; al hacer scroll (o en
 * cualquier otra página) pasa a un cristal oscuro esmerilado con filete dorado.
 */
export function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = React.useState(false)

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const solid = scrolled || pathname !== "/"

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href.split("?")[0])

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter,padding] duration-500",
        solid
          ? "border-b border-oro/15 bg-incienso/80 py-2.5 backdrop-blur-xl backdrop-saturate-150"
          : "border-b border-transparent bg-gradient-to-b from-incienso/45 to-transparent py-4",
      )}
    >
      <nav
        aria-label="Principal"
        className="mx-auto grid max-w-[1216px] grid-cols-[1fr_auto] items-center gap-6 px-4 sm:px-8 lg:grid-cols-[1fr_auto_1fr]"
      >
        <Link href="/" className="flex shrink-0 items-center gap-3.5 text-pergamino" aria-label="Asociación Daffari, inicio">
          <Firma className="h-auto w-[108px]" title="" />
          <span className="h-7 w-px bg-pergamino/35" aria-hidden="true" />
          <span className="text-[0.62rem] leading-[1.25] font-medium tracking-[0.28em] text-pergamino/80 uppercase">
            Hombres
            <br />
            de trono
          </span>
        </Link>

        <ul className="hidden items-center gap-7 lg:flex">
          {nav.map((item) => {
            const enlace = cn(
              "relative block py-1.5 text-[0.92rem] transition-colors",
              "after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-oro after:transition-transform after:duration-500 hover:after:scale-x-100",
              isActive(item.href) ? "text-pergamino after:scale-x-100" : "text-pergamino/80 hover:text-pergamino",
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

        <div className="flex items-center justify-end gap-4">
          <a
            href={site.redes.instagram}
            target="_blank"
            rel="noreferrer"
            aria-label="Daffari en Instagram"
            className="hidden text-pergamino/90 transition-colors hover:text-oro sm:block"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="size-5" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.3" cy="6.7" r="0.9" fill="currentColor" stroke="none" />
            </svg>
          </a>
          <Link
            href="/alta-socio"
            className={cn(
              "hidden rounded-full border px-4 py-2 text-[0.82rem] font-medium transition-colors duration-300 sm:inline-block",
              pathname === "/alta-socio"
                ? "border-oro bg-oro text-incienso"
                : "border-oro/70 bg-incienso/20 text-oro backdrop-blur-sm hover:bg-oro hover:text-incienso",
            )}
          >
            Hazte socio
          </Link>

          <Sheet>
            <SheetTrigger
              className="flex size-11 items-center justify-center border border-oro/30 text-oro lg:hidden"
              aria-label="Abrir menú"
            >
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent side="right" className="border-oro/20 bg-incienso text-pergamino">
              <SheetTitle className="px-6 pt-8 font-display text-sm tracking-[0.3em] text-oro uppercase">
                Daffari
              </SheetTitle>
              <ul className="flex flex-col px-6">
                {nav.map((item) => (
                  <React.Fragment key={item.href}>
                    {"children" in item ? (
                      item.children.map((c) => (
                        <li key={c.href} className="border-b border-oro/10">
                          <SheetClose nativeButton={false}
                            render={<Link href={c.href} />}
                            className="block py-4 font-serif text-2xl"
                          >
                            {c.label}
                          </SheetClose>
                        </li>
                      ))
                    ) : (
                      <li className="border-b border-oro/10">
                        <SheetClose nativeButton={false}
                          render={<Link href={item.href} />}
                          className={cn("block py-4 font-serif text-2xl", isActive(item.href) && "text-oro")}
                        >
                          {item.label}
                        </SheetClose>
                      </li>
                    )}
                  </React.Fragment>
                ))}
              </ul>
              <div className="mt-auto p-6">
                <SheetClose nativeButton={false}
                  render={<Link href="/alta-socio" />}
                  className="block bg-oro py-4 text-center text-xs font-semibold tracking-[0.2em] text-incienso uppercase"
                >
                  Hazte socio
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  )
}
