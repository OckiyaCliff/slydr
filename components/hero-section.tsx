"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

export default function HeroSection() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-background to-background/80">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Own, Resell, Earn with <span className="text-primary">Slydr</span>
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                The decentralized marketplace where creators sell resale rights and fans earn from promotion.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg">
                <Link href="/marketplace">
                  Explore Marketplace
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg">
                <Link href="/learn-more">How It Works</Link>
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <motion.div
              className="relative w-full max-w-[500px] aspect-square rounded-lg overflow-hidden shadow-2xl"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              initial={{ y: 20, opacity: 0.8 }}
              animate={{
                y: 0,
                opacity: 1,
                rotateY: isHovered ? 10 : 0,
                rotateX: isHovered ? -10 : 0,
              }}
              transition={{ duration: 0.5 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-background/5 z-10" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-6 bg-black/30 backdrop-blur-sm rounded-lg w-4/5">
                  <h3 className="text-xl font-bold text-white mb-2">Exclusive Digital Art</h3>
                  <p className="text-white/80 text-sm mb-4">By Artist Name</p>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-white">Price: 2.5 SOL</span>
                    <span className="text-primary font-medium">Resale: 15%</span>
                  </div>
                </div>
              </div>
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url('/placeholder.svg?height=500&width=500')" }}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

