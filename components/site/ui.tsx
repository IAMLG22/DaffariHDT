"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

/** Componente contenedor que garantiza visibilidad y carga instantánea de contenidos. */
export function Reveal({
  as: Tag = "div",
  delay = 0,
  className,
  children,
  ...rest
}: {
  as?: React.ElementType
  delay?: number
  className?: string
  children: React.ReactNode
} & React.HTMLAttributes<HTMLElement>) {
  return (
    <Tag
      data-visible="true"
      className={cn("reveal", className)}
      {...rest}
    >
      {children}
    </Tag>
  )
}
