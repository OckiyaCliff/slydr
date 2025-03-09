"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useUser } from "@/context/user-context"
import { useWallet } from "@/context/wallet-context"
import { OnboardingModal } from "./onboarding/onboarding-modal"
import { toast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"

export default function WalletConnect() {
  const { connected, connecting, connect, disconnect, publicKey } = useWallet()
  const { user, isLoading, login, logout } = useUser()
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [connectionAttempted, setConnectionAttempted] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  // Handle hydration mismatch
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Check if we should show onboarding after wallet connection and user data is loaded
  useEffect(() => {
    if (!isMounted) return

    // Only proceed if we've attempted connection and wallet is connected
    if (connectionAttempted && connected && !isLoading) {
      // Only show onboarding for new users who need to complete their profile
      const needsOnboarding =
        connected && (!user || (user && (!user.bio || !user.display_name || user.display_name === user.username)))

      if (needsOnboarding) {
        setShowOnboarding(true)
      }

      // Reset the connection attempt flag after checking
      setConnectionAttempted(false)
    }
  }, [connected, user, isLoading, connectionAttempted, isMounted])

  const handleConnect = async () => {
    try {
      toast({
        title: "Connecting wallet...",
        description: "Please approve the connection request in your wallet.",
      })

      await connect()

      if (publicKey) {
        toast({
          title: "Wallet connected!",
          description: `Connected to ${publicKey.toString().slice(0, 4)}...${publicKey.toString().slice(-4)}`,
        })
      }

      await login()

      // Mark that we've attempted connection, the useEffect will handle showing onboarding if needed
      setConnectionAttempted(true)
    } catch (error) {
      console.error("Failed to connect wallet:", error)
      toast({
        title: "Connection failed",
        description: "Could not connect to your wallet. Please try again.",
        variant: "destructive",
      })
      setConnectionAttempted(false)
    }
  }

  const handleDisconnect = () => {
    try {
      disconnect()
      logout()
      setShowOnboarding(false)
      toast({
        title: "Wallet disconnected",
        description: "You've been logged out successfully.",
      })
    } catch (error) {
      console.error("Failed to disconnect wallet:", error)
      toast({
        title: "Disconnect failed",
        description: "Could not disconnect your wallet. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleCloseOnboarding = (open: boolean) => {
    setShowOnboarding(open)
  }

  // Don't render anything until client-side hydration is complete
  if (!isMounted) return null

  return (
    <>
      {connected ? (
        <Button
          onClick={handleDisconnect}
          variant="outline"
          size="sm"
          className="text-primary border-primary hover:bg-primary/10"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Loading...
            </>
          ) : (
            <>
              Disconnect {publicKey?.toString().slice(0, 4)}...{publicKey?.toString().slice(-4)}
            </>
          )}
        </Button>
      ) : (
        <Button
          onClick={handleConnect}
          disabled={connecting || isLoading}
          size="sm"
          className="bg-primary hover:bg-primary/90 text-white"
        >
          {connecting || isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Connecting...
            </>
          ) : (
            "Connect Wallet"
          )}
        </Button>
      )}

      <OnboardingModal open={showOnboarding} onOpenChange={handleCloseOnboarding} />
    </>
  )
}

