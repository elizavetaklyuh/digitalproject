"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { sitePath } from "@/lib/site-path"

const navItems = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Blog", href: "#blog" },
  { label: "Contacts", href: "#contacts" },
]

const bookingUrl = "https://zcal.co/elizavetaklyukhina/30min"

export function Header() {
  const headerRef = useRef<HTMLElement>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOnLightBackground, setIsOnLightBackground] = useState(false)

  useEffect(() => {
    let frame = 0

    const updateHeaderState = () => {
      frame = 0
      setIsScrolled(window.scrollY > 20)

      const header = headerRef.current
      if (!header) return

      const sampleX = window.innerWidth / 2
      const sampleY = Math.min(header.offsetHeight * 0.55, window.innerHeight - 1)
      const elementsBelowHeader = document
        .elementsFromPoint(sampleX, sampleY)
        .filter((element) => element !== header && !header.contains(element))

      const sectionBelowHeader = elementsBelowHeader
        .map((element) => element.closest("#about, #services, #contacts, footer"))
        .find(Boolean)

      const isLightSection =
        sectionBelowHeader?.id === "about" || sectionBelowHeader?.tagName.toLowerCase() === "footer"

      setIsOnLightBackground(Boolean(isLightSection))
    }

    const requestUpdate = () => {
      if (frame) return
      frame = window.requestAnimationFrame(updateHeaderState)
    }

    updateHeaderState()
    window.addEventListener("scroll", requestUpdate, { passive: true })
    window.addEventListener("resize", requestUpdate)

    return () => {
      if (frame) window.cancelAnimationFrame(frame)
      window.removeEventListener("scroll", requestUpdate)
      window.removeEventListener("resize", requestUpdate)
    }
  }, [])

  const navLinkClassName = cn(
    "text-sm tracking-wider uppercase transition-colors duration-300",
    isOnLightBackground ? "text-[#253131]/70 hover:text-[#253131]" : "text-muted-foreground hover:text-foreground"
  )

  const mobileLinkClassName = cn(
    "text-lg tracking-wider uppercase transition-colors duration-300",
    isOnLightBackground ? "text-[#253131]/72 hover:text-[#253131]" : "text-muted-foreground hover:text-foreground"
  )

  const bookingButtonClassName = cn(
    "inline-flex items-center justify-center px-5 font-medium uppercase tracking-[0.18em] shadow-[0_12px_28px_rgba(0,0,0,0.18)] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2",
    isOnLightBackground
      ? "bg-[#253131] text-[#ede7dc] hover:bg-[#253131]/90 focus-visible:ring-[#253131]/35"
      : "bg-accent text-accent-foreground hover:bg-accent/90 focus-visible:ring-accent/50"
  )

  return (
    <header 
      ref={headerRef}
      className={cn(
        "site-header fixed top-0 left-0 right-0 w-full z-50 px-6 transition-all duration-500 ease-out lg:px-12",
        isOnLightBackground
          ? "bg-[#ede7dc]/72 border-b border-[#253131]/10 text-[#253131] backdrop-blur-[12px]"
          : "bg-[#300450]/50 border-b border-white/5 text-foreground backdrop-blur-[12px]",
        isScrolled && "shadow-lg shadow-black/10"
      )}
      style={{ backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* Logo */}
          <Link href="/" className="flex items-center group py-2">
            <img
              src={sitePath("/logo.svg")}
              alt="Clavis"
              className={cn(
                "h-16 lg:h-20 w-auto transition-all duration-300 group-hover:opacity-80",
                isOnLightBackground && "brightness-0"
              )}
            />
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {/* Desktop Navigation */}
            <nav className="flex items-center gap-8 xl:gap-10">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={navLinkClassName}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <a
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(bookingButtonClassName, "h-11 text-xs")}
            >
              Book a call
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={cn("lg:hidden p-2 transition-colors duration-300", isOnLightBackground ? "text-[#253131]" : "text-foreground")}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "lg:hidden fixed inset-x-0 top-20 px-6 backdrop-blur-xl border-b transition-all duration-300 overflow-hidden",
          isOnLightBackground ? "bg-[#ede7dc]/95 border-[#253131]/10" : "bg-[#300450]/70 border-white/5",
          isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <nav className="container mx-auto py-8 flex flex-col gap-6">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className={mobileLinkClassName}
            >
              {item.label}
            </Link>
          ))}
          <a
            href={bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsMenuOpen(false)}
            className={cn(bookingButtonClassName, "h-12 w-full text-sm")}
          >
            Book a call
          </a>
        </nav>
      </div>
    </header>
  )
}
