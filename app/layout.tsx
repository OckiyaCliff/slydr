import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { WalletProvider } from "@/context/wallet-context"
import { UserProvider } from "@/context/user-context"
import { AIProvider } from "@/context/ai-context"
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
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <WalletProvider>
            <UserProvider>
              <AIProvider>
                <div className="flex flex-col min-h-screen">
                  <Navbar />
                  <BetaBanner />
                  <main className="flex-1">{children}</main>
                  <Footer />
                </div>
              </AIProvider>
            </UserProvider>
          </WalletProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'