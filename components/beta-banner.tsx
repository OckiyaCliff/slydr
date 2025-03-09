"use client"

import { useEffect, useState } from "react"

export function BetaBanner() {
  const [isMounted, setIsMounted] = useState(false)

  // Handle hydration mismatch
  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  const messages = [
    "🚀 Welcome to Slydr Beta! We're constantly improving.",
    "⚠️ This is a beta version. Some features may not work as expected.",
    "💜 Thanks for being an early adopter!",
    "🔄 We update frequently. Check back often for new features.",
    "🛠️ Found a bug? Let us know!",
    "📱 Mobile optimization in progress.",
  ]

  const repeatedMessages = [...messages, ...messages]

  return (
    <div className="bg-primary text-primary-foreground py-1 overflow-hidden">
      <div className="marquee">
        {repeatedMessages.map((message, index) => (
          <span key={index} className="mx-6 whitespace-nowrap">
            {message}
          </span>
        ))}
      </div>
    </div>
  )
}

