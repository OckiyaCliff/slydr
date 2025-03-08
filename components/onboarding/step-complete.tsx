"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useUser } from "@/context/user-context"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

export function StepComplete() {
  const { user, updateProfile } = useUser()
  const router = useRouter()
  const [isCompleting, setIsCompleting] = useState(false)

  const handleComplete = async () => {
    setIsCompleting(true)
    try {
      // Create user in Supabase via API
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          wallet_address: user?.publicKey || "",
          username: user?.username || "",
          display_name: user?.displayName || "",
          role: user?.role || "fan",
          bio: user?.bio || "",
          avatar_url: user?.avatar || "",
          cover_image_url: user?.coverImage || "",
          social_links: user?.socialLinks || {},
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to create user")
      }

      const createdUser = await response.json()

      // Update local user state with the Supabase user
      await updateProfile({
        id: createdUser.id,
        wallet_address: createdUser.wallet_address,
        username: createdUser.username,
        display_name: createdUser.display_name,
        bio: createdUser.bio,
        avatar_url: createdUser.avatar_url,
        cover_image_url: createdUser.cover_image_url,
        role: createdUser.role,
        is_verified: createdUser.is_verified,
        created_at: createdUser.created_at,
        updated_at: createdUser.updated_at,
        social_links: createdUser.social_links,
        stats: {
          followers: 0,
          following: 0,
          sales: 0,
          creations: 0,
        },
      })

      // Redirect to dashboard
      router.push("/dashboard")
    } catch (error) {
      console.error("Error completing onboarding:", error)
    } finally {
      setIsCompleting(false)
    }
  }

  return (
    <div className="space-y-4 text-center">
      <h2 className="text-2xl font-bold">You're all set!</h2>
      <p className="text-muted-foreground">Your profile has been created. You can now start exploring Slydr.</p>
      <Button onClick={handleComplete} className="w-full" disabled={isCompleting}>
        {isCompleting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Setting up your account...
          </>
        ) : (
          "Go to Dashboard"
        )}
      </Button>
    </div>
  )
}

