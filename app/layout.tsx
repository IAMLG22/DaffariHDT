import type { Metadata } from "next"
import { Cinzel, Cormorant_Garamond, Lora } from "next/font/google"
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
      <body className="flex min-h-svh flex-col">{children}</body>
    </html>
  )
}
