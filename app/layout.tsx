import type { Metadata } from "next"
import { Cinzel, Cormorant_Garamond, Lora } from "next/font/google"
import { Navbar } from "@/components/site/navbar"
import { Footer } from "@/components/site/footer"
import "./globals.css"

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
})

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
})

export const metadata: Metadata = {
  title: {
    default: "Asociación Daffari · Hombres de Trono · Málaga",
    template: "%s · Asociación Daffari",
  },
  description:
    "Asociación Cultural Daffari — Hombres de Trono. Defensa, divulgación y puesta en valor del hombre de trono y del capataz en la Semana Santa de Málaga.",
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${cinzel.variable} ${cormorant.variable} ${lora.variable}`}>
      <body className="flex min-h-svh flex-col">
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
      </body>
    </html>
  )
}
