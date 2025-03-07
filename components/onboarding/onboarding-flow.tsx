"use client"

import { useEffect, useState } from "react"
import { useUser } from "@/context/user-context"
import { useRouter } from "next/navigation"
import { OnboardingModal } from "./onboarding-modal"

export function OnboardingFlow() {
  const { user, isLoading } = useUser()
  const [showOnboarding, setShowOnboarding] = useState(false)
  const router = useRouter()

  // Check if user is new and needs onboarding
  useEffect(() => {
    if (!isLoading && user) {
      // Only show onboarding if the user is connected and needs onboarding
      const needsOnboarding = !user.bio || !user.displayName.includes(" ")
      if (needsOnboarding) {
        setShowOnboarding(true)
      }
    }
  }, [user, isLoading])

  // Handle when modal is closed without completing
  const handleOpenChange = (open: boolean) => {
    setShowOnboarding(open)

    // If user closes modal without completing, redirect to home
    if (!open) {
      router.push("/")
    }
  }

  if (isLoading || !user) {
    return null
  }

  return <OnboardingModal open={showOnboarding} onOpenChange={handleOpenChange} />
}

