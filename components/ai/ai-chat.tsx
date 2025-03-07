"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useAI } from "@/context/ai-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { AIAgentRole } from "@/services/ai-service"
import { Avatar } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Loader2, Send, Bot, User, X } from "lucide-react"

export function AIChat({ onClose }: { onClose?: () => void }) {
  const { currentConversation, conversations, createNewConversation, selectConversation, sendMessage, isLoading } =
    useAI()

  const [input, setInput] = useState("")
  const [activeTab, setActiveTab] = useState<AIAgentRole>("assistant")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom of messages when they change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [currentConversation?.messages])

  // Create a new conversation if none exists
  useEffect(() => {
    if (!currentConversation) {
      createNewConversation(activeTab)
    }
  }, [currentConversation, createNewConversation, activeTab])

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim() && !isLoading) {
      const message = input.trim()
      setInput("")
      await sendMessage(message)
    }
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value as AIAgentRole)
    createNewConversation(value as AIAgentRole)
  }

  return (
    <Card className="w-full max-w-md h-[600px] flex flex-col shadow-lg border-primary/10">
      <CardHeader className="p-4 border-b">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium">Slydr AI Assistant</CardTitle>
          {onClose && (
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        <Tabs defaultValue="assistant" value={activeTab} onValueChange={handleTabChange}>
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="assistant">Assistant</TabsTrigger>
            <TabsTrigger value="creator-coach">Creator</TabsTrigger>
            <TabsTrigger value="market-analyst">Analyst</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {currentConversation?.messages.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              <Bot className="mx-auto h-8 w-8 mb-2" />
              <p>How can I help you today?</p>
              {activeTab === "assistant" && (
                <p className="text-sm mt-2">Ask me anything about Slydr, blockchain, or content creation.</p>
              )}
              {activeTab === "creator-coach" && (
                <p className="text-sm mt-2">I can help optimize your content, pricing, and marketing strategies.</p>
              )}
              {activeTab === "market-analyst" && (
                <p className="text-sm mt-2">I can provide insights on market trends and consumer behavior.</p>
              )}
            </div>
          ) : (
            currentConversation?.messages.map((message, index) => (
              <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`flex items-start gap-2 max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  <Avatar className={`h-8 w-8 ${message.role === "user" ? "bg-primary" : "bg-secondary"}`}>
                    {message.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                  </Avatar>
                  <div
                    className={`rounded-lg px-3 py-2 ${
                      message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      <CardFooter className="p-4 border-t">
        <form onSubmit={handleSend} className="flex w-full gap-2">
          <Input
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            className="flex-1"
          />
          <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </form>
      </CardFooter>
    </Card>
  )
}

