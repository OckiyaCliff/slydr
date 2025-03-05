import { create } from "zustand"
import type { ContentMetadata } from "../services/arweave-service"
import type { PublicKey } from "@solana/web3.js"

interface ContentState {
  contents: ContentMetadata[]
  featuredContents: ContentMetadata[]
  trendingContents: ContentMetadata[]
  userContents: ContentMetadata[]
  userPurchases: ContentMetadata[]
  isLoading: boolean
  error: string | null

  // Actions
  fetchAllContents: () => Promise<void>
  fetchContentById: (id: string) => Promise<ContentMetadata | null>
  fetchContentsByCreator: (creatorId: string) => Promise<ContentMetadata[]>
  fetchUserContents: (userId: string) => Promise<void>
  fetchUserPurchases: (userId: string) => Promise<void>
  createContent: (
    content: Omit<ContentMetadata, "id" | "createdAt">,
    mediaFile: File,
    thumbnailFile: File,
  ) => Promise<string>
  purchaseContent: (contentId: string, buyerPublicKey: PublicKey) => Promise<boolean>
  resellContent: (
    contentId: string,
    sellerPublicKey: PublicKey,
    buyerPublicKey: PublicKey,
    price: number,
  ) => Promise<boolean>
}

// Mock function to simulate fetching from Arweave/Solana
const fetchContentFromBlockchain = async (): Promise<ContentMetadata[]> => {
  // In a real implementation, this would query the blockchain
  // For now, return mock data
  return [
    {
      id: "content-1",
      title: "Cosmic Dreamscape Collection",
      description: "A mesmerizing digital art collection that explores the boundaries between reality and imagination.",
      price: 2.5,
      resaleRights: true,
      resaleRoyalty: 15,
      creator: {
        id: "creator-1",
        name: "Astral Artisan",
        username: "astralartist",
      },
      category: "Digital Art",
      tags: ["cosmic", "dreamscape", "digital", "collection"],
      createdAt: "2023-09-15T14:30:00Z",
      mediaTransactionId: "mock-arweave-tx-1",
      thumbnailTransactionId: "mock-arweave-thumbnail-1",
    },
    {
      id: "content-2",
      title: "Neon Metropolis",
      description: "A vibrant exploration of future cityscapes, where neon lights illuminate the urban jungle.",
      price: 1.8,
      resaleRights: true,
      resaleRoyalty: 12,
      creator: {
        id: "creator-2",
        name: "Cyber Visionary",
        username: "cybervisionary",
      },
      category: "Digital Art",
      tags: ["cyberpunk", "neon", "city", "futuristic"],
      createdAt: "2023-10-05T11:20:00Z",
      mediaTransactionId: "mock-arweave-tx-2",
      thumbnailTransactionId: "mock-arweave-thumbnail-2",
    },
  ]
}

export const useContentStore = create<ContentState>((set, get) => ({
  contents: [],
  featuredContents: [],
  trendingContents: [],
  userContents: [],
  userPurchases: [],
  isLoading: false,
  error: null,

  fetchAllContents: async () => {
    set({ isLoading: true, error: null })
    try {
      const contents = await fetchContentFromBlockchain()

      // Sort by creation date for trending (in a real app, this would use more metrics)
      const trending = [...contents].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

      // Select a few for featured (in a real app, this would be curated)
      const featured = contents.slice(0, 2)

      set({
        contents,
        trendingContents: trending,
        featuredContents: featured,
        isLoading: false,
      })
    } catch (error) {
      console.error("Error fetching contents:", error)
      set({
        error: error instanceof Error ? error.message : "Failed to fetch contents",
        isLoading: false,
      })
    }
  },

  fetchContentById: async (id: string) => {
    set({ isLoading: true, error: null })
    try {
      // First check if we already have it in state
      const existingContent = get().contents.find((c) => c.id === id)
      if (existingContent) {
        set({ isLoading: false })
        return existingContent
      }

      // In a real implementation, this would fetch from Arweave/Solana
      // For now, use our mock function and filter
      const contents = await fetchContentFromBlockchain()
      const content = contents.find((c) => c.id === id) || null

      set({ isLoading: false })
      return content
    } catch (error) {
      console.error(`Error fetching content ${id}:`, error)
      set({
        error: error instanceof Error ? error.message : `Failed to fetch content ${id}`,
        isLoading: false,
      })
      return null
    }
  },

  fetchContentsByCreator: async (creatorId: string) => {
    set({ isLoading: true, error: null })
    try {
      // In a real implementation, this would fetch from Arweave/Solana
      // For now, use our mock function and filter
      const contents = await fetchContentFromBlockchain()
      const creatorContents = contents.filter((c) => c.creator.id === creatorId)

      set({ isLoading: false })
      return creatorContents
    } catch (error) {
      console.error(`Error fetching contents for creator ${creatorId}:`, error)
      set({
        error: error instanceof Error ? error.message : `Failed to fetch contents for creator ${creatorId}`,
        isLoading: false,
      })
      return []
    }
  },

  fetchUserContents: async (userId: string) => {
    set({ isLoading: true, error: null })
    try {
      // In a real implementation, this would fetch from Arweave/Solana
      // For now, use our mock function and filter for contents created by this user
      const contents = await fetchContentFromBlockchain()
      const userContents = contents.filter((c) => c.creator.id === userId)

      set({ userContents, isLoading: false })
    } catch (error) {
      console.error(`Error fetching user contents for ${userId}:`, error)
      set({
        error: error instanceof Error ? error.message : `Failed to fetch user contents for ${userId}`,
        isLoading: false,
      })
    }
  },

  fetchUserPurchases: async (userId: string) => {
    set({ isLoading: true, error: null })
    try {
      // In a real implementation, this would query the blockchain for purchases
      // For now, return an empty array (or mock data if needed)
      set({ userPurchases: [], isLoading: false })
    } catch (error) {
      console.error(`Error fetching user purchases for ${userId}:`, error)
      set({
        error: error instanceof Error ? error.message : `Failed to fetch user purchases for ${userId}`,
        isLoading: false,
      })
    }
  },

  createContent: async (content, mediaFile, thumbnailFile) => {
    set({ isLoading: true, error: null })
    try {
      // In a real implementation:
      // 1. Upload media file to Arweave
      // 2. Upload thumbnail to Arweave
      // 3. Create content metadata and upload to Arweave
      // 4. Register content on Solana using Anchor program

      // Mock implementation
      const id = `content-${Date.now()}`
      const newContent: ContentMetadata = {
        ...content,
        id,
        createdAt: new Date().toISOString(),
        mediaTransactionId: `mock-arweave-tx-${id}`,
        thumbnailTransactionId: `mock-arweave-thumbnail-${id}`,
      }

      // Add to state
      set((state) => ({
        contents: [...state.contents, newContent],
        isLoading: false,
      }))

      return id
    } catch (error) {
      console.error("Error creating content:", error)
      set({
        error: error instanceof Error ? error.message : "Failed to create content",
        isLoading: false,
      })
      throw error
    }
  },

  purchaseContent: async (contentId: string, buyerPublicKey: PublicKey) => {
    set({ isLoading: true, error: null })
    try {
      // In a real implementation, this would call the Anchor program
      // For now, just simulate success
      console.log(`Simulating purchase of content ${contentId} by ${buyerPublicKey.toString()}`)

      set({ isLoading: false })
      return true
    } catch (error) {
      console.error(`Error purchasing content ${contentId}:`, error)
      set({
        error: error instanceof Error ? error.message : `Failed to purchase content ${contentId}`,
        isLoading: false,
      })
      return false
    }
  },

  resellContent: async (contentId: string, sellerPublicKey: PublicKey, buyerPublicKey: PublicKey, price: number) => {
    set({ isLoading: true, error: null })
    try {
      // In a real implementation, this would call the Anchor program
      // For now, just simulate success
      console.log(
        `Simulating resale of content ${contentId} from ${sellerPublicKey.toString()} to ${buyerPublicKey.toString()} for ${price} SOL`,
      )

      set({ isLoading: false })
      return true
    } catch (error) {
      console.error(`Error reselling content ${contentId}:`, error)
      set({
        error: error instanceof Error ? error.message : `Failed to resell content ${contentId}`,
        isLoading: false,
      })
      return false
    }
  },
}))

