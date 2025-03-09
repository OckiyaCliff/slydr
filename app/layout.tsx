import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { headers } from "next/headers"
import ContextProvider from "@/context"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { BetaBanner } from "@/components/beta-banner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Slydr - Web3 Content Platform",
  description: "Discover, create, and monetize content with blockchain technology",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookies = headers().get("cookie")

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ContextProvider cookies={cookies}>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <BetaBanner />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ContextProvider>
      </body>
    </html>
  )
}



import './globals.css'