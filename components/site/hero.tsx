"use client"

import * as React from "react"
import MorphGallery from "@/components/ui/morph-gallery"
import { Firma } from "@/components/site/firma"
import { heroFotos, heroFotosMovil } from "@/lib/content"

const MOVIL = "(max-width: 639px)"

const suscribir = (aviso: () => void) => {
  const mq = window.matchMedia(MOVIL)
  mq.addEventListener("change", aviso)
  return () => mq.removeEventListener("change", aviso)
}


export function Hero() {
  // En el servidor no se sabe el ancho: `null` hasta hidratar, y mientras tanto
  // el póster <picture> ya muestra la foto correcta de cada dispositivo.
  const movil = React.useSyncExternalStore(
    suscribir,
    () => window.matchMedia(MOVIL).matches,
    () => null,
  )

  return (
    <div className="relative h-svh min-h-[560px] w-full overflow-hidden bg-incienso sm:min-h-[640px]">
      <picture>
        <source media={MOVIL} srcSet={heroFotosMovil[0].src} />
        <img
          src={heroFotos[0].src}
          alt=""
          fetchPriority="high"
          decoding="async"
          // Mismo virado que el lienzo de la galería, para que póster y fotos casen.
          className="absolute inset-0 h-full w-full object-cover [filter:grayscale(0.85)_contrast(1.05)]"
        />
      </picture>

      {movil !== null && (
        <MorphGallery
          // Cambiar de juego de fotos (girar una tablet, redimensionar) monta una galería nueva.
          key={movil ? "movil" : "escritorio"}
          items={movil ? heroFotosMovil : heroFotos}
          autoplay={5500}
          duration={1800}
          noiseScale={3}
          drift={0.4}
          height="100%"
          thumbnails={!movil}
          className="[--mg-controls-bottom:6.5rem] [&_canvas]:[filter:grayscale(0.85)_contrast(1.05)] [&>img]:[filter:grayscale(0.85)_contrast(1.05)]"
        />
      )}

      {/* Velo neutro: apaga la foto lo justo para que el texto respire */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[4]">
        <div className="absolute inset-0 bg-black/45 sm:bg-black/35" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_85%_32%_at_50%_54%,rgba(10,10,9,0.62)_0%,rgba(10,10,9,0.3)_55%,transparent_100%)] sm:bg-[radial-gradient(ellipse_55%_45%_at_50%_55%,rgba(0,0,0,0.35)_0%,transparent_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-black/55 to-transparent sm:hidden" />
        <div className="absolute inset-0 opacity-[0.12] mix-blend-overlay grano" />
      </div>

      {/* Firma, rótulo y lema */}
      <div className="pointer-events-none absolute inset-0 z-[6] flex flex-col items-center justify-center px-8 pt-10 text-center text-pergamino sm:px-6 sm:pt-16">
        <Firma className="h-auto w-[min(230px,62vw)] sm:w-[320px] drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)] animate-in fade-in slide-in-from-bottom-3 duration-1000" />

        <p className="mt-6 sm:mt-8 font-display text-[0.66rem] sm:text-[0.92rem] font-semibold tracking-[0.36em] sm:tracking-[0.34em] text-oro uppercase animate-in fade-in duration-1000 fill-mode-both [animation-delay:250ms]">
          Asociación Cultural
        </p>

        <h1 className="mt-2 sm:mt-3 font-serif text-[clamp(2.35rem,9vw,4.2rem)] leading-[1.05] font-normal [text-shadow:0_2px_24px_rgba(0,0,0,0.6)] animate-in fade-in slide-in-from-bottom-2 duration-1000 fill-mode-both [animation-delay:350ms]">
          Hombres de Trono
        </h1>

        <div aria-hidden="true" className="mt-5 flex items-center gap-2.5 text-oro/80 sm:hidden animate-in fade-in duration-1000 fill-mode-both [animation-delay:450ms]">
          <span className="h-px w-8 bg-current" />
          <span className="size-1 rotate-45 bg-current" />
          <span className="h-px w-8 bg-current" />
        </div>

        <p className="mt-4 sm:mt-5 max-w-[17rem] sm:max-w-[36rem] font-serif text-[1.12rem] italic leading-snug text-pergamino/85 sm:font-sans sm:text-[clamp(0.95rem,1.4vw,1.25rem)] sm:not-italic sm:leading-relaxed sm:text-pergamino/90 animate-in fade-in duration-1000 fill-mode-both [animation-delay:500ms]">
          Memoria y Oficio del Hombre de Trono en la Semana Santa de Málaga.
        </p>
      </div>

      {/* Indicador de scroll */}
      <a
        href="#asociacion"
        className="absolute bottom-5 left-1/2 z-[7] flex -translate-x-1/2 flex-col items-center gap-2.5 text-pergamino/70 transition-colors hover:text-oro"
        aria-label="Bajar a La Asociación"
      >
        <span className="font-display text-[0.6rem] font-semibold tracking-[0.36em] uppercase">Descubre</span>
        <span className="relative block h-9 sm:h-12 w-px overflow-hidden bg-pergamino/20">
          <span className="absolute inset-0 bg-pergamino/80 animate-scroll-cue" />
        </span>
      </a>
    </div>
  )
}
