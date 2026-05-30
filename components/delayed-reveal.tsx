"use client"

import { useEffect, useState, type ReactNode } from "react"
import { cn } from "@/lib/utils"

type DelayedRevealProps = {
  children: ReactNode
  delay?: number
  className?: string
  restartOnHash?: string
}

export function DelayedReveal({
  children,
  delay = 2000,
  className,
  restartOnHash,
}: DelayedRevealProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    let timeoutId: ReturnType<typeof window.setTimeout> | undefined

    const startReveal = () => {
      window.clearTimeout(timeoutId)

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setIsVisible(true)
        return
      }

      setIsVisible(false)
      timeoutId = window.setTimeout(() => setIsVisible(true), delay)
    }

    const handleHashChange = () => {
      if (!restartOnHash || window.location.hash === restartOnHash) {
        startReveal()
      }
    }

    startReveal()
    window.addEventListener("hashchange", handleHashChange)

    return () => {
      window.clearTimeout(timeoutId)
      window.removeEventListener("hashchange", handleHashChange)
    }
  }, [delay, restartOnHash])

  return (
    <div
      className={cn(
        "transition-all duration-700 ease-out",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
        className
      )}
    >
      {children}
    </div>
  )
}
