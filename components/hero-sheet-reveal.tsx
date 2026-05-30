"use client"

import { useEffect } from "react"

export function HeroSheetReveal() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    const shell = document.querySelector<HTMLElement>(".layered-reveal-shell")
    const about = document.querySelector<HTMLElement>(".about-underlayer")

    if (prefersReducedMotion.matches || !shell || !about) return

    const root = document.documentElement
    const aboutImage = about.querySelector<HTMLImageElement>('img[src="/about-liz.png"]')
    const aboutImageRevealDuration = 3600
    let frame = 0
    let typewriterFrame = 0
    let imageRevealTimeout = 0
    let refreshUpdateTimeout = 0
    let lateRefreshUpdateTimeout = 0
    let aboutTypewriterStarted = false
    let aboutImageRevealed = false

    if (aboutImage) {
      aboutImage.style.opacity = "0"
      aboutImage.style.transition = `opacity ${aboutImageRevealDuration}ms cubic-bezier(0.22, 1, 0.36, 1)`
      aboutImage.style.willChange = "opacity"
    }

    const prepareAboutTypewriter = () => {
      const textRoot = about.querySelector<HTMLElement>(".max-w-3xl")
      const cta = textRoot?.querySelector<HTMLAnchorElement>('a[href="#services"]')

      if (!textRoot || textRoot.dataset.aboutTypewriterPrepared) {
        return { characters: [] as HTMLSpanElement[], cta: null, ctaStartIndex: 0 }
      }

      if (cta) {
        cta.style.opacity = "0"
        cta.style.visibility = "hidden"
        cta.style.pointerEvents = "none"
        cta.style.transition = "opacity 240ms ease-out, background-color 300ms ease, color 300ms ease"
      }

      const textNodes: Text[] = []
      const walker = document.createTreeWalker(textRoot, NodeFilter.SHOW_TEXT, {
        acceptNode(node) {
          const parent = node.parentElement

          if (!node.textContent?.trim() || parent?.closest("script, style")) {
            return NodeFilter.FILTER_REJECT
          }

          return NodeFilter.FILTER_ACCEPT
        },
      })

      while (walker.nextNode()) {
        textNodes.push(walker.currentNode as Text)
      }

      const characters: HTMLSpanElement[] = []
      let ctaStartIndex = 0

      for (const textNode of textNodes) {
        const isCtaText = Boolean(cta?.contains(textNode.parentElement))

        if (isCtaText) {
          ctaStartIndex = characters.length
        }

        const fragment = document.createDocumentFragment()

        for (const character of Array.from(textNode.textContent ?? "")) {
          const span = document.createElement("span")
          span.textContent = isCtaText && character === " " ? "\u00a0" : character
          span.style.opacity = "0"
          span.style.transition = "opacity 90ms ease-out"
          span.style.willChange = "opacity"
          fragment.appendChild(span)
          characters.push(span)
        }

        textNode.parentNode?.replaceChild(fragment, textNode)
      }

      textRoot.dataset.aboutTypewriterPrepared = "true"
      return { characters, cta, ctaStartIndex }
    }

    const { characters: aboutCharacters, cta: aboutCta, ctaStartIndex } = prepareAboutTypewriter()

    const startAboutImageReveal = () => {
      if (!aboutImage || aboutImageRevealed) return

      aboutImageRevealed = true
      aboutImage.style.opacity = "1"
      imageRevealTimeout = window.setTimeout(() => {
        aboutImage.style.willChange = "auto"
      }, aboutImageRevealDuration)
    }

    const showAboutCta = () => {
      if (!aboutCta) return

      aboutCta.style.opacity = "1"
      aboutCta.style.visibility = "visible"
      aboutCta.style.pointerEvents = "auto"
    }

    const startAboutTypewriter = () => {
      if (aboutTypewriterStarted || aboutCharacters.length === 0) return

      aboutTypewriterStarted = true
      const duration = 5000
      const startedAt = performance.now()
      let visibleCount = 0

      const revealCharacters = (now: number) => {
        const progress = Math.min((now - startedAt) / duration, 1)
        const nextVisibleCount = Math.floor(progress * aboutCharacters.length)

        if (aboutCta && nextVisibleCount > ctaStartIndex) {
          showAboutCta()
        }

        for (let index = visibleCount; index < nextVisibleCount; index += 1) {
          aboutCharacters[index]?.style.setProperty("opacity", "1")
        }

        visibleCount = nextVisibleCount

        if (progress < 1) {
          typewriterFrame = window.requestAnimationFrame(revealCharacters)
          return
        }

        showAboutCta()

        for (const character of aboutCharacters) {
          character.style.opacity = "1"
          character.style.willChange = "auto"
        }
      }

      typewriterFrame = window.requestAnimationFrame(revealCharacters)
    }

    const updateAboutHeight = () => {
      root.style.setProperty("--about-underlayer-height", `${about.offsetHeight}px`)
    }

    const updateProgress = () => {
      frame = 0
      updateAboutHeight()

      const viewportHeight = window.innerHeight || 1
      const shellTop = shell.getBoundingClientRect().top
      const progress = Math.min(Math.max(-shellTop / viewportHeight, 0), 1)

      root.style.setProperty("--hero-sheet-progress", progress.toString())
      root.style.setProperty("--hero-sheet-y", `${progress * -100}%`)
      root.classList.toggle("hero-sheet-reveal-complete", progress >= 1)

      if (progress > 0.01) {
        startAboutImageReveal()
        startAboutTypewriter()
      }
    }

    const requestUpdate = () => {
      if (frame) return
      frame = window.requestAnimationFrame(updateProgress)
    }

    const requestRefreshUpdate = () => {
      if (refreshUpdateTimeout) window.clearTimeout(refreshUpdateTimeout)
      refreshUpdateTimeout = window.setTimeout(requestUpdate, 120)
    }

    const resizeObserver = "ResizeObserver" in window ? new ResizeObserver(requestUpdate) : null

    updateAboutHeight()
    root.classList.add("hero-sheet-reveal-ready")
    updateProgress()
    refreshUpdateTimeout = window.setTimeout(requestUpdate, 250)
    lateRefreshUpdateTimeout = window.setTimeout(requestUpdate, 900)
    resizeObserver?.observe(about)

    window.addEventListener("scroll", requestUpdate, { passive: true })
    window.addEventListener("resize", requestUpdate)
    window.addEventListener("load", requestRefreshUpdate)
    window.addEventListener("pageshow", requestRefreshUpdate)

    return () => {
      if (frame) window.cancelAnimationFrame(frame)
      if (typewriterFrame) window.cancelAnimationFrame(typewriterFrame)
      if (imageRevealTimeout) window.clearTimeout(imageRevealTimeout)
      if (refreshUpdateTimeout) window.clearTimeout(refreshUpdateTimeout)
      if (lateRefreshUpdateTimeout) window.clearTimeout(lateRefreshUpdateTimeout)
      if (aboutImage) {
        aboutImage.style.removeProperty("opacity")
        aboutImage.style.removeProperty("transition")
        aboutImage.style.removeProperty("will-change")
      }
      resizeObserver?.disconnect()
      root.classList.remove("hero-sheet-reveal-ready")
      root.classList.remove("hero-sheet-reveal-complete")
      root.style.removeProperty("--about-underlayer-height")
      root.style.removeProperty("--hero-sheet-progress")
      root.style.removeProperty("--hero-sheet-y")
      window.removeEventListener("scroll", requestUpdate)
      window.removeEventListener("resize", requestUpdate)
      window.removeEventListener("load", requestRefreshUpdate)
      window.removeEventListener("pageshow", requestRefreshUpdate)
    }
  }, [])

  return null
}
