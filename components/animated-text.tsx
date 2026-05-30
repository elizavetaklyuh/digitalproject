"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

const words = ["Business", "Lifestyle", "Executive", "Family", "Travel"]

export function AnimatedText() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % words.length)
        setIsAnimating(false)
      }, 500)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <span className="inline-block min-w-[5.4em] overflow-hidden pb-[0.16em] pr-[0.04em] -mb-[0.16em] align-bottom">
      <span
        className={cn(
          "inline-block transition-all duration-500 ease-out",
          isAnimating
            ? "translate-y-full opacity-0"
            : "translate-y-0 opacity-100"
        )}
      >
        {words[currentIndex]}
      </span>
    </span>
  )
}
