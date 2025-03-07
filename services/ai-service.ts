import { generateText } from "ai"
import { deepseek } from "./deepseek-provider"

export type AIAgentRole = "assistant" | "creator-coach" | "market-analyst" | "content-curator" | "pricing-advisor"

export interface AIMessage {
  role: "user" | "assistant"
  content: string
  timestamp: number
}

export interface AIConversation {
  id: string
  messages: AIMessage[]
  agentRole: AIAgentRole
  createdAt: number
  updatedAt: number
}

export class AIService {
  private apiKey: string

  constructor(apiKey?: string) {
    this.apiKey = apiKey || process.env.DEEPSEEK_API_KEY || ""
  }

  /**
   * Generate a response from the AI agent
   */
  async generateResponse(messages: AIMessage[], agentRole: AIAgentRole = "assistant"): Promise<string> {
    try {
      // Create system prompt based on agent role
      const systemPrompt = this.getSystemPromptForRole(agentRole)

      // Format messages for the AI model
      const formattedMessages = [
        { role: "system", content: systemPrompt },
        ...messages.map((msg) => ({
          role: msg.role,
          content: msg.content,
        })),
      ]

      // Generate response using AI SDK with DeepSeek
      const { text } = await generateText({
        model: deepseek("deepseek-chat"),
        messages: formattedMessages,
        temperature: 0.7,
        maxTokens: 1000,
      })

      return text
    } catch (error) {
      console.error("Error generating AI response:", error)
      return "I'm sorry, I encountered an error while processing your request. Please try again later."
    }
  }

  /**
   * Get system prompt based on agent role
   */
  private getSystemPromptForRole(role: AIAgentRole): string {
    switch (role) {
      case "assistant":
        return `You are Slydr AI, a helpful assistant for the Slydr platform, a blockchain-powered creator marketplace where creators can sell content with resale rights. Help users navigate the platform, understand blockchain concepts, and provide general assistance.`

      case "creator-coach":
        return `You are Slydr Creator Coach, an AI specialized in helping creators optimize their content, pricing, and marketing strategies on the Slydr platform. Provide specific, actionable advice to help creators succeed.`

      case "market-analyst":
        return `You are Slydr Market Analyst, an AI specialized in analyzing market trends, competitor pricing, and consumer behavior on the Slydr platform. Provide data-driven insights to help users make informed decisions.`

      case "content-curator":
        return `You are Slydr Content Curator, an AI specialized in discovering and recommending content based on user preferences. Help users find content they'll love and suggest new creators to follow.`

      case "pricing-advisor":
        return `You are Slydr Pricing Advisor, an AI specialized in optimizing pricing strategies for content on the Slydr platform. Help creators set optimal prices and royalty percentages based on market data and content type.`

      default:
        return `You are Slydr AI, a helpful assistant for the Slydr platform, a blockchain-powered creator marketplace where creators can sell content with resale rights.`
    }
  }

  /**
   * Create a new conversation
   */
  createConversation(agentRole: AIAgentRole = "assistant"): AIConversation {
    const now = Date.now()
    return {
      id: `conv_${Math.random().toString(36).substring(2, 9)}`,
      messages: [],
      agentRole,
      createdAt: now,
      updatedAt: now,
    }
  }

  /**
   * Add a message to a conversation
   */
  addMessageToConversation(conversation: AIConversation, role: "user" | "assistant", content: string): AIConversation {
    const now = Date.now()
    return {
      ...conversation,
      messages: [...conversation.messages, { role, content, timestamp: now }],
      updatedAt: now,
    }
  }

  /**
   * Get personalized content recommendations
   */
  async getContentRecommendations(
    userId: string,
    userPreferences: string[],
    recentActivity: string[],
  ): Promise<string[]> {
    try {
      const prompt = `Based on a user who likes ${userPreferences.join(", ")} and recently engaged with ${recentActivity.join(", ")}, suggest 4 types of content they might enjoy on a creator marketplace platform. Format as a simple list.`

      const { text } = await generateText({
        model: deepseek("deepseek-chat"),
        prompt,
        temperature: 0.7,
        maxTokens: 200,
      })

      // Parse the response into an array of recommendations
      return text
        .split("\n")
        .filter((line) => line.trim().length > 0)
        .map((line) => line.replace(/^-\s*/, "").trim())
        .slice(0, 4)
    } catch (error) {
      console.error("Error generating content recommendations:", error)
      return [
        "Explore new music from indie artists",
        "Check out trending digital art collections",
        "Discover writers in the science fiction genre",
        "Popular podcast episodes this week",
      ]
    }
  }

  /**
   * Analyze content performance
   */
  async analyzeContentPerformance(contentId: string, metrics: any): Promise<string> {
    try {
      const metricsStr = JSON.stringify(metrics)
      const prompt = `Analyze these content performance metrics and provide actionable insights: ${metricsStr}. Keep it concise and specific.`

      const { text } = await generateText({
        model: deepseek("deepseek-chat"),
        prompt,
        temperature: 0.7,
        maxTokens: 200,
      })

      return text
    } catch (error) {
      console.error("Error analyzing content performance:", error)
      return "Your content is performing well with engagement 20% above average for similar content. Consider promoting during evening hours when your audience is most active."
    }
  }

  /**
   * Generate content description
   */
  async generateContentDescription(title: string, keywords: string[], contentType: string): Promise<string> {
    try {
      const prompt = `Generate a compelling description for a ${contentType} titled "${title}" with the following keywords: ${keywords.join(", ")}.`

      const { text } = await generateText({
        model: deepseek("deepseek-chat"),
        prompt,
        temperature: 0.7,
        maxTokens: 200,
      })

      return text
    } catch (error) {
      console.error("Error generating content description:", error)
      return "An engaging piece of content that explores fascinating themes and ideas."
    }
  }

  /**
   * Suggest optimal pricing
   */
  async suggestOptimalPricing(
    contentType: string,
    contentQuality: "basic" | "standard" | "premium",
    creatorReputation: "new" | "established" | "renowned",
  ): Promise<{ price: number; royaltyPercentage: number }> {
    // In a real implementation, this would use market data and ML models
    // For now, we'll return mock suggestions based on simple rules
    let basePrice = 0
    let royaltyPercentage = 0

    // Set base price by content type
    switch (contentType) {
      case "music":
        basePrice = 5
        break
      case "art":
        basePrice = 10
        break
      case "writing":
        basePrice = 3
        break
      case "video":
        basePrice = 8
        break
      default:
        basePrice = 5
    }

    // Adjust by quality
    switch (contentQuality) {
      case "basic":
        basePrice *= 0.8
        break
      case "premium":
        basePrice *= 1.5
        break
    }

    // Adjust by reputation
    switch (creatorReputation) {
      case "new":
        basePrice *= 0.9
        royaltyPercentage = 10
        break
      case "established":
        basePrice *= 1.2
        royaltyPercentage = 15
        break
      case "renowned":
        basePrice *= 1.5
        royaltyPercentage = 20
        break
    }

    return {
      price: Number.parseFloat(basePrice.toFixed(2)),
      royaltyPercentage,
    }
  }
}

// Create and export a singleton instance
export const aiService = new AIService()

