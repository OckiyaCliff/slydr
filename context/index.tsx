"use client"

import { wagmiAdapter, projectId } from "@/config"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { createWeb3Modal } from "@web3modal/wagmi/react"
import { mainnet, arbitrum, avalanche, base, optimism, polygon } from "viem/chains"
import type { ReactNode } from "react"
import { cookieToInitialState, WagmiProvider, type Config } from "wagmi"
import { ThemeProvider } from "@/components/theme-provider"
import { UserProvider } from "@/context/user-context"
import { AIProvider } from "@/context/ai-context"
import { WalletProvider } from "@/context/wallet-context"

// Set up queryClient
const queryClient = new QueryClient()

if (!projectId) {
  throw new Error("Project ID is not defined")
}

// Set up metadata
const metadata = {
  name: "Slydr",
  description: "Web3 Content Platform",
  url: "https://slydr.vercel.app", // origin must match your domain & subdomain
  icons: ["https://slydr.vercel.app/logo.png"],
}

// Create the modal
createWeb3Modal({
  wagmiConfig: wagmiAdapter.wagmiConfig as Config,
  projectId,
  chains: [mainnet, arbitrum, avalanche, base, optimism, polygon],
  themeMode: "light",
  themeVariables: {
    "--w3m-accent": "rgb(147, 51, 234)",
    "--w3m-border-radius-master": "0.5rem",
  },
})

function ContextProvider({ children, cookies }: { children: ReactNode; cookies: string | null }) {
  const initialState = cookieToInitialState(wagmiAdapter.wagmiConfig as Config, cookies)

  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig as Config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <WalletProvider>
            <UserProvider>
              <AIProvider>{children}</AIProvider>
            </UserProvider>
          </WalletProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default ContextProvider

