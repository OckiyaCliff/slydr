import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { WalletProvider } from "@/context/wallet-context"
import { UserProvider } from "@/context/user-context"
import { AIProvider } from "@/context/ai-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Slydr - Creator Marketplace",
  description: "A blockchain-powered creator marketplace where creators can sell content with resale rights",
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
                <div className="flex min-h-screen flex-col">
                  <Navbar />
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