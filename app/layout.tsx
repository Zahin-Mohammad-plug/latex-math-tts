import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Math TTS - Text to Speech for Mathematical Expressions",
  description: "Convert text and LaTeX math expressions into spoken audio with granular playback controls",
  metadataBase: new URL("https://mathtts.zahin.org"),
  openGraph: {
    title: "Math TTS - Text to Speech for Math",
    description: "Turn LaTeX and math text into spoken audio. Custom voices, playback, and symbol cheat sheets.",
    url: "https://mathtts.zahin.org",
    siteName: "Math TTS",
    images: [
      {
        url: "/og.png", // Make sure you add this OG image to your public folder
        width: 1200,
        height: 630,
        alt: "Math TTS - Turn math into audio",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Math TTS",
    description: "Convert LaTeX math to speech with full control and clarity.",
    images: ["/og.png"],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Favicon variants */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/favicon.png" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <main className="min-h-screen bg-background">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}
