import { create } from "zustand"
import { getContentById, getContentsByCreator, getTrendingContent, searchContent, recordContentView } from "@/lib/db"
import type { ContentItem } from "@/types/content"

interface ContentStore {
  contents: ContentItem[]
  trendingContents: ContentItem[]
  currentContent: ContentItem | null
  isLoading: boolean
  error: string | null

  // Actions
  fetchContents: (creatorId?: string) => Promise<void>
  fetchTrendingContents: () => Promise<void>
  fetchContentById: (id: string) => Promise<ContentItem | null>
  searchContents: (query: string, filters?: any) => Promise<ContentItem[]>
  createContent: (contentData: any) => Promise<void>
  viewContent: (contentId: string, userId?: string) => Promise<void>
}

export const useContentStore = create<ContentStore>((set, get) => ({
  contents: [],
  trendingContents: [],
  currentContent: null,
  isLoading: false,
  error: null,

  fetchContents: async (creatorId) => {
    set({ isLoading: true, error: null })

    try {
      let contents

      if (creatorId) {
        contents = await getContentsByCreator(creatorId)
      } else {
        contents = await getTrendingContent(50) // Get more if no creator filter
      }

      set({ contents, isLoading: false })
    } catch (error) {
      console.error("Error fetching contents:", error)
      set({
        error: error instanceof Error ? error.message : "Failed to fetch contents",
        isLoading: false,
      })
    }
  },

  fetchTrendingContents: async () => {
    set({ isLoading: true, error: null })

    try {
      const trendingContents = await getTrendingContent()
      set({ trendingContents, isLoading: false })
    } catch (error) {
      console.error("Error fetching trending contents:", error)
      set({
        error: error instanceof Error ? error.message : "Failed to fetch trending contents",
        isLoading: false,
      })
    }
  },

  fetchContentById: async (id) => {
    set({ isLoading: true, error: null, currentContent: null })

    try {
      const content = await getContentById(id)
      set({ currentContent: content, isLoading: false })
      return content
    } catch (error) {
      console.error("Error fetching content by ID:", error)
      set({
        error: error instanceof Error ? error.message : "Failed to fetch content",
        isLoading: false,
      })
      return null
    }
  },

  searchContents: async (query, filters = {}) => {
    set({ isLoading: true, error: null })

    try {
      const results = await searchContent(query, filters)
      set({ isLoading: false })
      return results
    } catch (error) {
      console.error("Error searching contents:", error)
      set({
        error: error instanceof Error ? error.message : "Failed to search contents",
        isLoading: false,
      })
      return []
    }
  },

  createContent: async (contentData) => {
    set({ isLoading: true, error: null })

    try {
      // This would call your API endpoint to create content
      const response = await fetch("/api/contents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contentData),
      })

      if (!response.ok) {
        throw new Error("Failed to create content")
      }

      // Refresh the contents list
      if (contentData.creatorId) {
        await get().fetchContents(contentData.creatorId)
      }

      set({ isLoading: false })
    } catch (error) {
      console.error("Error creating content:", error)
      set({
        error: error instanceof Error ? error.message : "Failed to create content",
        isLoading: false,
      })
    }
  },

  viewContent: async (contentId, userId) => {
    try {
      await recordContentView(contentId, userId)
    } catch (error) {
      console.error("Error recording content view:", error)
    }
  },
}))

