"use client"

import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"

interface StepWelcomeProps {
  onNext: () => void
}

export function StepWelcome({ onNext }: StepWelcomeProps) {
  return (
    <div className="space-y-4 py-4 text-center">
      <div className="flex justify-center">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <Sparkles className="h-6 w-6 text-primary" />
        </div>
      </div>
      <h2 className="text-2xl font-bold">Welcome to Slydr!</h2>
      <p className="text-muted-foreground">
        We're excited to have you on board. Let's set up your profile and preferences to get you started with the
        platform.
      </p>
      <div className="flex justify-center pt-4">
        <Button onClick={onNext} className="w-full md:w-auto">
          Get Started
        </Button>
      </div>
    </div>
  )
}

