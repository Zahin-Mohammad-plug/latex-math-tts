"use client"

import { useEffect, useRef } from "react"

interface EquationDisplayProps {
  latex: string
}

export function EquationDisplay({ latex }: EquationDisplayProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return

    // Dynamically import KaTeX
    const loadKatex = async () => {
      try {
        // Import KaTeX CSS
        const katexCss = document.createElement("link")
        katexCss.rel = "stylesheet"
        katexCss.href = "https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css"
        document.head.appendChild(katexCss)

        // Import KaTeX script
        const { default: katex } = await import("katex")

        // Import auto-render extension
        const { default: renderMathInElement } = await import("katex/contrib/auto-render")

        if (containerRef.current) {
          // First, set the raw content
          containerRef.current.textContent = latex

          // Then render the math
          renderMathInElement(containerRef.current, {
            delimiters: [
              { left: "$$", right: "$$", display: true },
              { left: "$", right: "$", display: false },
              { left: "$$", right: "$$", display: false },
              { left: "\\[", right: "\\]", display: true },
            ],
            throwOnError: false,
            output: "html",
            trust: true,
            strict: false,
            macros: {
              "\\Bigg": "\\Bigg",
              "\\bigg": "\\bigg",
            },
          })
        }
      } catch (error) {
        console.error("Error loading KaTeX:", error)
      }
    }

    loadKatex()
  }, [latex])

  return (
    <div ref={containerRef} className="overflow-x-auto">
      {/* KaTeX will render here */}
    </div>
  )
}
