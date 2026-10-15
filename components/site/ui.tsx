"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

/** Aparece suavemente al entrar en pantalla. */
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
  const ref = React.useRef<HTMLElement | null>(null)
  const [visible, setVisible] = React.useState(false)

  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          io.disconnect()
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      data-visible={visible}
      className={cn("reveal", className)}
      style={{ transitionDelay: `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
