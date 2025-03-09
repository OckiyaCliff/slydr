"use client"

import { useState, useEffect } from "react"

export function BetaBanner() {
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const messages = [
    "🚀 Welcome to Slydr Beta! We're constantly improving.",
    "⚠️ This is a beta version. Some features may not work as expected.",
    "💜 Thanks for being an early adopter!",
    "🔄 We update frequently. Check back often for new features.",
    "🐛 Found a bug? Let us know!",
    "💡 Have suggestions? We'd love to hear them.",
  ]

  // Duplicate messages to ensure smooth looping
  const repeatedMessages = [...messages, ...messages]

  return (
    <div className="bg-primary/90 text-primary-foreground py-2 overflow-hidden">
      <div className="marquee">
        {repeatedMessages.map((message, index) => (
          <div key={index} className="mx-6 whitespace-nowrap text-sm font-medium">
            {message}
          </div>
        ))}
      </div>
    </div>
  )
}

