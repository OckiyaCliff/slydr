"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { AIChat } from "./ai-chat"
import { Bot } from "lucide-react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

export function AIAssistantButton() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="icon"
          variant="outline"
          className="rounded-full fixed bottom-6 right-6 h-12 w-12 shadow-lg bg-primary text-primary-foreground hover:bg-primary/90 z-50"
        >
          <Bot className="h-6 w-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md p-0 border-none bg-transparent shadow-none">
        <AIChat onClose={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}

