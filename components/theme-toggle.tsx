"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Moon, Sun, Sparkles } from "lucide-react"

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const [isHovered, setIsHovered] = useState(false)

  // Ensure component is mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const isDark = theme === "dark"

  return (
    <Button
      variant="outline"
      size="icon"
      className="relative overflow-hidden border-primary/20 bg-background/50 backdrop-blur-sm"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative z-10">
        {isDark ? (
          <Moon className="h-[1.2rem] w-[1.2rem] rotate-90 transition-all duration-300" />
        ) : (
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 transition-all duration-300" />
        )}
        <span className="sr-only">Toggle theme</span>
      </div>

      {/* Background animation */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{
          opacity: isHovered ? 1 : 0,
          background: isDark
            ? "radial-gradient(circle at center, rgba(124, 58, 237, 0.15) 0%, rgba(0, 0, 0, 0) 70%)"
            : "radial-gradient(circle at center, rgba(124, 58, 237, 0.15) 0%, rgba(255, 255, 255, 0) 70%)",
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Sparkle animations */}
      {isHovered && (
        <>
          <motion.div
            className="absolute z-0 text-primary/70"
            initial={{ opacity: 0, scale: 0, x: -10, y: -10 }}
            animate={{ opacity: 1, scale: 1, x: -8, y: -8 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Sparkles size={12} />
          </motion.div>
          <motion.div
            className="absolute z-0 text-primary/70"
            initial={{ opacity: 0, scale: 0, x: 10, y: 10 }}
            animate={{ opacity: 1, scale: 1, x: 8, y: 8 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Sparkles size={12} />
          </motion.div>
        </>
      )}
    </Button>
  )
}

