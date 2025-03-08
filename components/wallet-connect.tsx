"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useUser } from "@/context/user-context"
import { useWallet } from "@/context/wallet-context"
import { OnboardingModal } from "./onboarding/onboarding-modal"

export default function WalletConnect() {
  const { connected, connecting, connect, disconnect } = useWallet()
  const { user, isLoading, login, logout } = useUser()
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [connectionAttempted, setConnectionAttempted] = useState(false)

  // Check if we should show onboarding after wallet connection and user data is loaded
  useEffect(() => {
    // Only proceed if we've attempted connection and wallet is connected
    if (connectionAttempted && connected && !isLoading) {
      // Only show onboarding for new users who need to complete their profile
      const needsOnboarding = user && (!user.bio || !user.display_name || user.display_name === user.username)

      if (needsOnboarding) {
        setShowOnboarding(true)
      }

      // Reset the connection attempt flag after checking
      setConnectionAttempted(false)
    }
  }, [connected, user, isLoading, connectionAttempted])

  const handleConnect = async () => {
    try {
      await connect()
      await login()
      // Mark that we've attempted connection, the useEffect will handle showing onboarding if needed
      setConnectionAttempted(true)
    } catch (error) {
      console.error("Failed to connect wallet:", error)
      setConnectionAttempted(false)
    }
  }

  const handleDisconnect = () => {
    disconnect()
    logout()
    setShowOnboarding(false)
  }

  const handleCloseOnboarding = (open: boolean) => {
    setShowOnboarding(open)
  }

  return (
    <>
      {connected ? (
        <Button onClick={handleDisconnect} variant="outline" size="sm">
          Disconnect
        </Button>
      ) : (
        <Button onClick={handleConnect} disabled={connecting} size="sm">
          {connecting ? "Connecting..." : "Connect Wallet"}
        </Button>
      )}

      <OnboardingModal open={showOnboarding} onOpenChange={handleCloseOnboarding} />
    </>
  )
}

