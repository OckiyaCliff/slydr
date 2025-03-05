"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useWallet } from "@/context/wallet-context"

// Define user types
export type UserRole = "creator" | "fan" | "admin"

export interface UserProfile {
  id: string
  publicKey: string
  username: string
  displayName: string
  bio: string
  avatar: string
  coverImage: string
  role: UserRole
  isVerified: boolean
  joinedAt: string
  socialLinks: {
    twitter?: string
    instagram?: string
    website?: string
  }
  stats: {
    followers: number
    following: number
    sales: number
    creations: number
  }
}

// Define the user context type
interface UserContextType {
  user: UserProfile | null
  isLoading: boolean
  error: Error | null
  login: () => Promise<void>
  logout: () => void
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>
}

// Create the user context
const UserContext = createContext<UserContextType | undefined>(undefined)

// Create a provider component
export function UserProvider({ children }: { children: ReactNode }) {
  const { connected, publicKey, connect, disconnect } = useWallet()
  const [user, setUser] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        // In a real app, you would check for a valid session token
        const storedUser = localStorage.getItem("slydr_user")
        if (storedUser) {
          setUser(JSON.parse(storedUser))
        }
      } catch (err) {
        console.error("Failed to restore session:", err)
      }
    }

    checkSession()
  }, [])

  // Update user when wallet connects/disconnects
  useEffect(() => {
    if (connected && publicKey) {
      fetchUserProfile(publicKey.toString())
    } else if (!connected) {
      // Clear user data on disconnect
      setUser(null)
      localStorage.removeItem("slydr_user")
    }
  }, [connected, publicKey])

  // Fetch user profile from API
  const fetchUserProfile = async (walletAddress: string) => {
    setIsLoading(true)
    setError(null)

    try {
      // In a real app, you would fetch the user profile from your API
      // For demo purposes, we'll create a mock user
      const mockUser: UserProfile = {
        id: `user_${Math.random().toString(36).substring(2, 9)}`,
        publicKey: walletAddress,
        username: `user_${walletAddress.substring(0, 6)}`,
        displayName: "Slydr User",
        bio: "A passionate collector and creator on Slydr.",
        avatar: "/placeholder.svg?height=200&width=200",
        coverImage: "/placeholder.svg?height=800&width=1600",
        role: "fan",
        isVerified: false,
        joinedAt: new Date().toISOString(),
        socialLinks: {},
        stats: {
          followers: 0,
          following: 0,
          sales: 0,
          creations: 0,
        },
      }

      setUser(mockUser)
      localStorage.setItem("slydr_user", JSON.stringify(mockUser))
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to fetch user profile"))
      console.error("Failed to fetch user profile:", err)
    } finally {
      setIsLoading(false)
    }
  }

  // Login function
  const login = async () => {
    try {
      await connect()
      // The user profile will be fetched in the useEffect when connected changes
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to login"))
      console.error("Login failed:", err)
    }
  }

  // Logout function
  const logout = () => {
    disconnect()
    setUser(null)
    localStorage.removeItem("slydr_user")
  }

  // Update user profile
  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) return

    setIsLoading(true)
    setError(null)

    try {
      // In a real app, you would send the updates to your API
      const updatedUser = { ...user, ...updates }
      setUser(updatedUser)
      localStorage.setItem("slydr_user", JSON.stringify(updatedUser))
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to update profile"))
      console.error("Failed to update profile:", err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <UserContext.Provider
      value={{
        user,
        isLoading,
        error,
        login,
        logout,
        updateProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

// Create a hook to use the user context
export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}

