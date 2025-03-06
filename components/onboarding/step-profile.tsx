"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { OnboardingData } from "./onboarding-modal"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { UploadCloud } from "lucide-react"

interface StepProfileProps {
  data: OnboardingData
  onUpdateData: (data: Partial<OnboardingData>) => void
  onNext: () => void
  onBack: () => void
}

export function StepProfile({ data, onUpdateData, onNext, onBack }: StepProfileProps) {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)

  // Handle avatar file selection
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      onUpdateData({ avatar: file })

      // Create a preview URL
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
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
      <div>
        <h2 className="text-xl font-bold mb-2">Create your profile</h2>
        <p className="text-muted-foreground">
          Tell us about yourself. This information will be displayed on your public profile.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col items-center gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={avatarPreview || undefined} />
            <AvatarFallback className="text-lg">{getInitials()}</AvatarFallback>
          </Avatar>

          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="avatar" className="text-center">
              Profile Picture
            </Label>
            <div className="flex items-center justify-center">
              <Label
                htmlFor="avatar"
                className="cursor-pointer flex items-center gap-2 text-sm text-primary hover:underline"
              >
                <UploadCloud className="h-4 w-4" />
                {data.avatar ? "Change picture" : "Upload picture"}
              </Label>
              <Input id="avatar" type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
            </div>
          </div>
        </div>

        <div className="grid w-full gap-1.5">
          <Label htmlFor="displayName">Display Name</Label>
          <Input
            id="displayName"
            value={data.displayName}
            onChange={(e) => onUpdateData({ displayName: e.target.value })}
            placeholder="Your name as shown to others"
          />
        </div>

        <div className="grid w-full gap-1.5">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            value={data.username}
            onChange={(e) => onUpdateData({ username: e.target.value })}
            placeholder="unique-username"
          />
        </div>

        <div className="grid w-full gap-1.5">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            placeholder="Tell us a bit about yourself"
            value={data.bio}
            onChange={(e) => onUpdateData({ bio: e.target.value })}
            rows={3}
          />
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onNext} disabled={!data.displayName || !data.username}>
          Continue
        </Button>
      </div>
    </div>
  )
}

