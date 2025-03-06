"use client"

import { Button } from "@/components/ui/button"
import type { OnboardingData } from "./onboarding-modal"
import { Check, Music, Brush, BookOpen, Mic, Film, Users } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface StepCompleteProps {
  data: OnboardingData
  onComplete: () => void
  onBack: () => void
  loading: boolean
}

export function StepComplete({ data, onComplete, onBack, loading }: StepCompleteProps) {
  // Function to get role icon based on selected role
  const getRoleIcon = () => {
    switch (data.role) {
      case "musician":
        return <Music className="h-5 w-5 text-primary" />
      case "artist":
        return <Brush className="h-5 w-5 text-primary" />
      case "writer":
        return <BookOpen className="h-5 w-5 text-primary" />
      case "podcaster":
        return <Mic className="h-5 w-5 text-primary" />
      case "filmmaker":
        return <Film className="h-5 w-5 text-primary" />
      default:
        return <Users className="h-5 w-5 text-primary" />
    }
  }

  // Get role name based on selected role
  const getRoleName = () => {
    switch (data.role) {
      case "musician":
        return "Musician"
      case "artist":
        return "Artist"
      case "writer":
        return "Writer"
      case "podcaster":
        return "Podcaster"
      case "filmmaker":
        return "Filmmaker"
      default:
        return "Fan"
    }
  }

  // Get initials for avatar fallback
  const getInitials = () => {
    if (!data.displayName) return "UN"
    return data.displayName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <div className="rounded-full bg-primary/10 p-3">
            <Check className="h-6 w-6 text-primary" />
          </div>
        </div>
        <h2 className="text-xl font-bold mb-2">You're all set!</h2>
        <p className="text-muted-foreground">
          Your profile has been created successfully. You're ready to start using Slydr.
        </p>
      </div>

      <div className="bg-muted/50 rounded-lg p-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={data.avatar ? URL.createObjectURL(data.avatar) : undefined} />
            <AvatarFallback className="text-lg">{getInitials()}</AvatarFallback>
          </Avatar>

          <div>
            <h3 className="font-medium text-lg">{data.displayName}</h3>
            <p className="text-sm text-muted-foreground">@{data.username}</p>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">{getRoleIcon()}</div>
            <span className="text-sm">{getRoleName()}</span>
          </div>

          {data.bio && <p className="text-sm bg-background/50 p-3 rounded">{data.bio}</p>}
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onComplete} disabled={loading}>
          {loading ? "Setting up your account..." : "Go to Dashboard"}
        </Button>
      </div>
    </div>
  )
}

