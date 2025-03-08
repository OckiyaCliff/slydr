"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useWallet } from "@/context/wallet-context"
import { useUser } from "@/context/user-context"
import { OnboardingModal } from "./onboarding-modal"
import { createUser } from "@/lib/db"

export function OnboardingFlow({ children }: { children: React.ReactNode }) {
  const { connected, publicKey } = useWallet()
  const { user, isLoading } = useUser()
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [isCheckingUser, setIsCheckingUser] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Only check for onboarding needs when wallet is connected and user state is loaded
    if (connected && publicKey && !isLoading) {
      setIsCheckingUser(true)

      // If no user exists for this wallet, we need to show onboarding
      if (!user) {
        setShowOnboarding(true)
      }

      setIsCheckingUser(false)
    } else if (!connected) {
      // If wallet disconnects, hide onboarding
      setShowOnboarding(false)
      setIsCheckingUser(false)
    }
  }, [connected, publicKey, user, isLoading])

  // Handle onboarding completion
  const handleOnboardingComplete = async (userData: {
    displayName: string
    username: string
    bio: string
    role: string
    avatar?: File | null
    coverImage?: File | null
  }) => {
    if (!publicKey) return

    try {
      // Create the user in the database
      const walletAddress = publicKey.toString()

      // Handle avatar and cover image uploads if needed
      const avatarUrl = null
      const coverImageUrl = null

      if (userData.avatar) {
        // Upload avatar to your storage service
        // avatarUrl = await uploadToStorage(userData.avatar)
      }

      if (userData.coverImage) {
        // Upload cover image to your storage service
        // coverImageUrl = await uploadToStorage(userData.coverImage)
      }

      // Create the user with the wallet address and profile data
      await createUser({
        wallet_address: walletAddress,
        username: userData.username,
        display_name: userData.displayName,
        role: userData.role,
        bio: userData.bio,
        avatar_url: avatarUrl,
        cover_image_url: coverImageUrl,
      })

      // Refresh the page to update user context
      router.refresh()

      // Close the onboarding modal
      setShowOnboarding(false)
    } catch (error) {
      console.error("Error creating user:", error)
      // Handle error (show error message to user)
    }
  }

  // Show loading state while checking user status
  if (isCheckingUser) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  return (
    <>
      {children}
      <OnboardingModal open={showOnboarding} onOpenChange={setShowOnboarding} onComplete={handleOnboardingComplete} />
    </>
  )
}

