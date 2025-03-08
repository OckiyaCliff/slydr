"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StepWelcome } from "./step-welcome"
import { StepProfile } from "./step-profile"
import { StepRole } from "./step-role"
import { StepComplete } from "./step-complete"
import { useUser } from "@/context/user-context"
import { useRouter } from "next/navigation"

export type UserRole = "creator" | "fan" | "artist" | "musician" | "writer" | "podcaster" | "filmmaker"

export interface OnboardingData {
  displayName: string
  username: string
  bio: string
  role: UserRole
  avatar?: File | null
  coverImage?: File | null
}

interface OnboardingModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onComplete?: (data: OnboardingData) => Promise<void>
}

export function OnboardingModal({ open, onOpenChange, onComplete }: OnboardingModalProps) {
  const { updateProfile } = useUser()
  const router = useRouter()
  const [step, setStep] = useState<"welcome" | "profile" | "role" | "complete">("welcome")
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    displayName: "",
    username: "",
    bio: "",
    role: "fan",
  })
  const [loading, setLoading] = useState(false)

  const handleNext = () => {
    if (step === "welcome") setStep("profile")
    else if (step === "profile") setStep("role")
    else if (step === "role") setStep("complete")
  }

  const handleBack = () => {
    if (step === "profile") setStep("welcome")
    else if (step === "role") setStep("profile")
    else if (step === "complete") setStep("role")
  }

  const handleUpdateData = (data: Partial<OnboardingData>) => {
    setOnboardingData((prev) => ({ ...prev, ...data }))
  }

  const handleComplete = async () => {
    setLoading(true)
    try {
      if (onComplete) {
        await onComplete(onboardingData)
      } else {
        // Fallback to the old behavior
        await updateProfile({
          displayName: onboardingData.displayName,
          bio: onboardingData.bio,
          role: onboardingData.role as any,
        })

        // Close modal and redirect to appropriate dashboard
        onOpenChange(false)
        router.push("/dashboard")
      }
    } catch (error) {
      console.error("Error updating profile:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden bg-background">
        <Tabs value={step} className="w-full">
          <TabsList className="w-full grid grid-cols-4 h-14 rounded-none bg-muted/50">
            <TabsTrigger
              value="welcome"
              disabled
              className="data-[state=active]:bg-background data-[state=active]:shadow-none rounded-none"
            >
              Welcome
            </TabsTrigger>
            <TabsTrigger
              value="profile"
              disabled
              className="data-[state=active]:bg-background data-[state=active]:shadow-none rounded-none"
            >
              Profile
            </TabsTrigger>
            <TabsTrigger
              value="role"
              disabled
              className="data-[state=active]:bg-background data-[state=active]:shadow-none rounded-none"
            >
              Role
            </TabsTrigger>
            <TabsTrigger
              value="complete"
              disabled
              className="data-[state=active]:bg-background data-[state=active]:shadow-none rounded-none"
            >
              Complete
            </TabsTrigger>
          </TabsList>

          <div className="p-6">
            <TabsContent value="welcome" className="mt-0">
              <StepWelcome onNext={handleNext} />
            </TabsContent>

            <TabsContent value="profile" className="mt-0">
              <StepProfile
                data={onboardingData}
                onUpdateData={handleUpdateData}
                onNext={handleNext}
                onBack={handleBack}
              />
            </TabsContent>

            <TabsContent value="role" className="mt-0">
              <StepRole
                selectedRole={onboardingData.role}
                onUpdateRole={(role) => handleUpdateData({ role })}
                onNext={handleNext}
                onBack={handleBack}
              />
            </TabsContent>

            <TabsContent value="complete" className="mt-0">
              <StepComplete data={onboardingData} onComplete={handleComplete} onBack={handleBack} loading={loading} />
            </TabsContent>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

