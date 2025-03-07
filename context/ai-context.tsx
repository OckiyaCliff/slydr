"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback, useEffect } from "react"
import { type AIConversation, type AIAgentRole, aiService } from "../services/ai-service"
import { useUser } from "./user-context"

interface AIContextType {
  conversations: AIConversation[]
  currentConversation: AIConversation | null
  isLoading: boolean
  createNewConversation: (agentRole?: AIAgentRole) => AIConversation
  selectConversation: (conversationId: string) => void
  sendMessage: (content: string) => Promise<void>
  getRecommendations: () => Promise<string[]>
  generateContentDescription: (title: string, keywords: string[], contentType: string) => Promise<string>
  suggestOptimalPricing: (
    contentType: string,
    contentQuality: "basic" | "standard" | "premium",
    creatorReputation: "new" | "established" | "renowned",
  ) => Promise<{ price: number; royaltyPercentage: number }>
}

const AIContext = createContext<AIContextType | undefined>(undefined)

export const AIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useUser()
  const [conversations, setConversations] = useState<AIConversation[]>([])
  const [currentConversation, setCurrentConversation] = useState<AIConversation | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // Load conversations from localStorage on mount
  useEffect(() => {
    if (user?.publicKey) {
      const savedConversations = localStorage.getItem(`slydr-ai-conversations-${user.publicKey}`)
      if (savedConversations) {
        try {
          const parsed = JSON.parse(savedConversations)
          setConversations(parsed)

          // Set the most recent conversation as current if it exists
          if (parsed.length > 0) {
            setCurrentConversation(parsed[0])
          }
        } catch (e) {
          console.error("Error parsing saved conversations:", e)
        }
      }
    }
  }, [user?.publicKey])

  // Save conversations to localStorage when they change
  useEffect(() => {
    if (user?.publicKey && conversations.length > 0) {
      localStorage.setItem(`slydr-ai-conversations-${user.publicKey}`, JSON.stringify(conversations))
    }
  }, [conversations, user?.publicKey])

  const createNewConversation = useCallback((agentRole: AIAgentRole = "assistant") => {
    const newConversation = aiService.createConversation(agentRole)
    setConversations((prev) => [newConversation, ...prev])
    setCurrentConversation(newConversation)
    return newConversation
  }, [])

  const selectConversation = useCallback(
    (conversationId: string) => {
      const conversation = conversations.find((c) => c.id === conversationId)
      if (conversation) {
        setCurrentConversation(conversation)
      }
    },
    [conversations],
  )

  const updateConversation = useCallback((updatedConversation: AIConversation) => {
    setConversations((prev) => prev.map((conv) => (conv.id === updatedConversation.id ? updatedConversation : conv)))
    setCurrentConversation(updatedConversation)
  }, [])

  const sendMessage = useCallback(
    async (content: string) => {
      if (!currentConversation) {
        return
      }

      // Add user message
      const conversationWithUserMsg = aiService.addMessageToConversation(currentConversation, "user", content)
      updateConversation(conversationWithUserMsg)

      // Generate AI response
      setIsLoading(true)
      try {
        const response = await aiService.generateResponse(
          conversationWithUserMsg.messages,
          conversationWithUserMsg.agentRole,
        )

        // Add AI response
        const updatedConversation = aiService.addMessageToConversation(conversationWithUserMsg, "assistant", response)
        updateConversation(updatedConversation)
      } catch (error) {
        console.error("Error sending message:", error)
      } finally {
        setIsLoading(false)
      }
    },
    [currentConversation, updateConversation],
  )

  const getRecommendations = useCallback(async () => {
    if (!user) {
      return ["Sign in to get personalized recommendations"]
    }

    // Mock user preferences and recent activity
    // In a real app, these would come from user data
    const userPreferences = ["music", "digital art", "podcasts"]
    const recentActivity = ["viewed music content", "followed 3 creators"]

    return await aiService.getContentRecommendations(user.publicKey, userPreferences, recentActivity)
  }, [user])

  const generateContentDescription = useCallback(async (title: string, keywords: string[], contentType: string) => {
    return await aiService.generateContentDescription(title, keywords, contentType)
  }, [])

  const suggestOptimalPricing = useCallback(
    async (
      contentType: string,
      contentQuality: "basic" | "standard" | "premium",
      creatorReputation: "new" | "established" | "renowned",
    ) => {
      return await aiService.suggestOptimalPricing(contentType, contentQuality, creatorReputation)
    },
    [],
  )

  const value = {
    conversations,
    currentConversation,
    isLoading,
    createNewConversation,
    selectConversation,
    sendMessage,
    getRecommendations,
    generateContentDescription,
    suggestOptimalPricing,
  }

  return <AIContext.Provider value={value}>{children}</AIContext.Provider>
}

export const useAI = () => {
  const context = useContext(AIContext)
  if (context === undefined) {
    throw new Error("useAI must be used within an AIProvider")
  }
  return context
}

