"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useAccount, useDisconnect, useSignMessage } from "wagmi"
import { useWeb3Modal } from "@web3modal/wagmi/react"
import type { PublicKey } from "@solana/web3.js"

// Define the wallet context type
interface WalletContextType {
  connected: boolean
  publicKey: PublicKey | null
  connecting: boolean
  disconnecting: boolean
  connect: () => Promise<void>
  disconnect: () => Promise<void>
  signMessage: (message: Uint8Array) => Promise<Uint8Array>
}

// Create the wallet context
const WalletContext = createContext<WalletContextType | undefined>(undefined)

// Create a provider component
export function WalletProvider({ children }: { children: ReactNode }) {
  const { address, isConnected, isConnecting } = useAccount()
  const { disconnect: wagmiDisconnect, isLoading: isDisconnecting } = useDisconnect()
  const { signMessageAsync } = useSignMessage()
  const { open } = useWeb3Modal()
  const [publicKey, setPublicKey] = useState<PublicKey | null>(null)
  const [isMounted, setIsMounted] = useState(false)

  // Handle client-side only code
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Update publicKey when address changes
  useEffect(() => {
    if (address && isMounted) {
      try {
        // Convert Ethereum address to Solana-compatible PublicKey
        // This is a simplified approach - in a real app, you might want to derive this differently
        const addressBuffer = Buffer.from(address.slice(2), "hex")
        const publicKeyBytes = addressBuffer.slice(0, 32)
        setPublicKey(new PublicKey(publicKeyBytes))
      } catch (error) {
        console.error("Failed to convert address to PublicKey:", error)
        setPublicKey(null)
      }
    } else {
      setPublicKey(null)
    }
  }, [address, isMounted])

  // Connect to wallet
  const connect = async () => {
    if (!isMounted) return
    try {
      await open()
    } catch (error) {
      console.error("Failed to connect wallet:", error)
      throw error
    }
  }

  // Disconnect from wallet
  const disconnect = async () => {
    if (!isMounted) return
    try {
      await wagmiDisconnect()
    } catch (error) {
      console.error("Failed to disconnect wallet:", error)
      throw error
    }
  }

  // Sign a message
  const signMessage = async (message: Uint8Array): Promise<Uint8Array> => {
    if (!isMounted || !isConnected) {
      throw new Error("Wallet not connected")
    }

    try {
      const signature = await signMessageAsync({ message })
      return Buffer.from(signature.slice(2), "hex")
    } catch (error) {
      console.error("Failed to sign message:", error)
      throw error
    }
  }

  // Don't expose context until client-side hydration is complete
  if (!isMounted) {
    return <>{children}</>
  }

  return (
    <WalletContext.Provider
      value={{
        connected: isConnected,
        publicKey,
        connecting: isConnecting,
        disconnecting: isDisconnecting,
        connect,
        disconnect,
        signMessage,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}

// Create a hook to use the wallet context
export function useWallet() {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider")
  }
  return context
}

