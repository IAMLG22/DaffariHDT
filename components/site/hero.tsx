"use client"

import MorphGallery from "@/components/ui/morph-gallery"
import { Firma } from "@/components/site/firma"
import { heroFotos } from "@/lib/content"

export function Hero() {
  return (
    <div className="relative w-full">
      <MorphGallery
        items={heroFotos}
        autoplay={5500}
        duration={1800}
        noiseScale={3}
        drift={0.4}
        height="100svh"
        className="min-h-[640px] [&_canvas]:[filter:grayscale(0.85)_contrast(1.05)]"
      />

      {/* Velo neutro: apaga la foto lo justo para que el texto respire */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[4]">
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_55%,rgba(0,0,0,0.35)_0%,transparent_100%)]" />
        <div className="absolute inset-0 opacity-[0.12] mix-blend-overlay grano" />
      </div>

      {/* Firma, rótulo y lema */}
      <div className="pointer-events-none absolute inset-0 z-[6] flex flex-col items-center justify-center px-6 pt-16 text-center text-pergamino">
        <Firma className="h-auto w-[min(330px,70vw)] drop-shadow-[0_4px_24px_rgba(0,0,0,0.5)] animate-in fade-in slide-in-from-bottom-3 duration-1000" />

        <p className="mt-8 text-[0.72rem] font-semibold tracking-[0.34em] text-oro uppercase animate-in fade-in duration-1000 fill-mode-both [animation-delay:250ms]">
          Asociación cultural
        </p>

        <h1 className="mt-3 font-serif text-[clamp(2.2rem,4.4vw,3.6rem)] leading-[1.1] font-normal [text-shadow:0_2px_24px_rgba(0,0,0,0.5)] animate-in fade-in slide-in-from-bottom-2 duration-1000 fill-mode-both [animation-delay:350ms]">
          Daffari <span className="text-oro">·</span> Hombres de Trono
        </h1>

        <p className="mt-5 max-w-[34rem] text-[clamp(1rem,1.3vw,1.15rem)] leading-relaxed text-pergamino/85 animate-in fade-in duration-1000 fill-mode-both [animation-delay:500ms]">
          Memoria, oficio y formación del hombre de trono, el capataz y el mayordomo en la Semana Santa de Málaga.
        </p>
      </div>

      {/* Indicador de scroll */}
      <a
        href="#asociacion"
        className="absolute bottom-5 left-1/2 z-[7] flex -translate-x-1/2 flex-col items-center gap-3 text-pergamino/70 transition-colors hover:text-oro"
        aria-label="Bajar a La Asociación"
      >
        <span className="text-[0.62rem] font-semibold tracking-[0.36em] uppercase">Descubre</span>
        <span className="relative block h-12 w-px overflow-hidden bg-pergamino/20">
          <span className="absolute inset-0 bg-pergamino/80 animate-scroll-cue" />
        </span>
      </a>
    </div>
  )
}
