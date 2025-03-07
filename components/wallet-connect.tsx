"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useUser } from "@/context/user-context"
import { useWallet } from "@/context/wallet-context"
import { OnboardingModal } from "./onboarding/onboarding-modal"

export default function WalletConnect() {
  const { connected, connecting, connect, disconnect } = useWallet()
  const { user, login, logout } = useUser()
  const [showOnboarding, setShowOnboarding] = useState(false)

  const handleConnect = async () => {
    try {
      await connect()
      await login()

      // Show onboarding modal for new users AFTER successful wallet connection
      if (!user?.bio) {
        setShowOnboarding(true)
      }
    } catch (error) {
      console.error("Failed to connect wallet:", error)
    }
  }

  const handleDisconnect = () => {
    disconnect()
    logout()
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

