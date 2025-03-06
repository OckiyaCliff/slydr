"use client"

import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import type { UserRole } from "./onboarding-modal"
import { Music, Brush, BookOpen, Mic, Film, Users } from "lucide-react"
import { cn } from "@/lib/utils"

interface StepRoleProps {
  selectedRole: UserRole
  onUpdateRole: (role: UserRole) => void
  onNext: () => void
  onBack: () => void
}

export function StepRole({ selectedRole, onUpdateRole, onNext, onBack }: StepRoleProps) {
  // Role definitions
  const roles = [
    {
      value: "musician",
      label: "Musician",
      description: "Share your music tracks, albums, and audio content",
      icon: Music,
    },
    {
      value: "artist",
      label: "Artist",
      description: "Showcase your visual artwork, illustrations, and designs",
      icon: Brush,
    },
    {
      value: "writer",
      label: "Writer",
      description: "Publish articles, stories, and written content",
      icon: BookOpen,
    },
    {
      value: "podcaster",
      label: "Podcaster",
      description: "Share podcast episodes and audio shows",
      icon: Mic,
    },
    {
      value: "filmmaker",
      label: "Filmmaker",
      description: "Distribute video content, films, and visual stories",
      icon: Film,
    },
    {
      value: "fan",
      label: "Fan",
      description: "Collect and resell content from your favorite creators",
      icon: Users,
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold mb-2">Choose your role</h2>
        <p className="text-muted-foreground">
          Select how you primarily plan to use Slydr. This will customize your dashboard experience.
        </p>
      </div>

      <RadioGroup
        value={selectedRole}
        onValueChange={(value) => onUpdateRole(value as UserRole)}
        className="grid gap-4"
      >
        {roles.map((role) => {
          const Icon = role.icon
          return (
            <div key={role.value} className="relative">
              <RadioGroupItem value={role.value} id={role.value} className="peer sr-only" />
              <Label
                htmlFor={role.value}
                className={cn(
                  "flex cursor-pointer items-start gap-4 rounded-lg border bg-card p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary",
                )}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div className="space-y-1">
                  <p className="font-medium leading-none">{role.label}</p>
                  <p className="text-sm text-muted-foreground">{role.description}</p>
                </div>
              </Label>
            </div>
          )
        })}
      </RadioGroup>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onNext}>Continue</Button>
      </div>
    </div>
  )
}

