"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useWallet } from "@/context/wallet-context"
import {
  getUserByWallet,
  updateUser,
  followUser as dbFollowUser,
  unfollowUser as dbUnfollowUser,
  isFollowing as dbIsFollowing,
  getFollowers as dbGetFollowers,
  getFollowing as dbGetFollowing,
} from "@/lib/db"
import { toast } from "@/hooks/use-toast"

// Define user types
export type UserRole = "creator" | "fan" | "admin" | "artist" | "musician" | "writer" | "podcaster" | "filmmaker"

export interface UserProfile {
  id: string
  wallet_address: string
  username: string
  display_name: string
  bio: string | null
  avatar_url: string | null
  cover_image_url: string | null
  role: UserRole
  is_verified: boolean
  created_at: string
  updated_at: string
  social_links: {
    twitter?: string
    instagram?: string
    website?: string
  } | null
  stats?: {
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
  followUser: (userId: string) => Promise<void>
  unfollowUser: (userId: string) => Promise<void>
  isFollowing: (userId: string) => Promise<boolean>
  getFollowers: (userId: string) => Promise<UserProfile[]>
  getFollowing: (userId: string) => Promise<UserProfile[]>
}

// Create the user context
const UserContext = createContext<UserContextType | undefined>(undefined)

// Create a provider component
export function UserProvider({ children }: { children: ReactNode }) {
  const { connected, publicKey, connect, disconnect } = useWallet()
  const [user, setUser] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [isMounted, setIsMounted] = useState(false)

  // Handle client-side only code
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Check for existing session on mount
  useEffect(() => {
    if (!isMounted) return

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
  }, [isMounted])

  // Update user when wallet connects/disconnects
  useEffect(() => {
    if (!isMounted) return

    if (connected && publicKey) {
      fetchUserProfile(publicKey.toString())
    } else if (!connected) {
      // Clear user data on disconnect
      setUser(null)
      localStorage.removeItem("slydr_user")
    }
  }, [connected, publicKey, isMounted])

  // Fetch user profile from Supabase
  const fetchUserProfile = async (walletAddress: string) => {
    if (!isMounted) return

    setIsLoading(true)
    setError(null)

    try {
      // Try to get user from Supabase
      const user = await getUserByWallet(walletAddress)

      if (user) {
        // User exists, set in state
        setUser(user)
        localStorage.setItem("slydr_user", JSON.stringify(user))
        toast({
          title: "Welcome back!",
          description: `Logged in as ${user.display_name || user.username}`,
        })
      } else {
        // User doesn't exist, show onboarding
        setUser(null)
        toast({
          title: "Welcome to Slydr!",
          description: "Please complete your profile to get started.",
        })
      }
    } catch (err) {
      // User likely doesn't exist yet, which is fine
      setUser(null)
      console.log("User not found, needs onboarding")
    } finally {
      setIsLoading(false)
    }
  }

  // Login function
  const login = async () => {
    if (!isMounted) return

    try {
      if (!connected) {
        await connect()
      }
      // The user profile will be fetched in the useEffect when connected changes
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to login"))
      console.error("Login failed:", err)
      toast({
        title: "Login failed",
        description: "Could not connect to your wallet. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Logout function
  const logout = () => {
    if (!isMounted) return

    disconnect()
    setUser(null)
    localStorage.removeItem("slydr_user")
    toast({
      title: "Logged out",
      description: "You've been successfully logged out.",
    })
  }

  // Update user profile
  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user || !isMounted) return

    setIsLoading(true)
    setError(null)

    try {
      // Update user in Supabase
      const updatedUser = await updateUser(user.id, updates)

      if (updatedUser) {
        // Update local state
        setUser(updatedUser)
        localStorage.setItem("slydr_user", JSON.stringify(updatedUser))
        toast({
          title: "Profile updated",
          description: "Your profile has been successfully updated.",
        })
      } else {
        throw new Error("Failed to update profile")
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to update profile"))
      console.error("Failed to update profile:", err)
      toast({
        title: "Update failed",
        description: "Could not update your profile. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Follow a user
  const followUser = async (userId: string) => {
    if (!user || !isMounted) throw new Error("You must be logged in to follow users")

    try {
      const success = await dbFollowUser(user.id, userId)

      if (!success) {
        throw new Error("Failed to follow user")
      }

      // Update local stats if they exist
      if (user.stats) {
        setUser({
          ...user,
          stats: {
            ...user.stats,
            following: user.stats.following + 1,
          },
        })
      }

      toast({
        title: "User followed",
        description: "You are now following this user.",
      })
    } catch (err) {
      console.error("Error following user:", err)
      toast({
        title: "Follow failed",
        description: "Could not follow this user. Please try again.",
        variant: "destructive",
      })
      throw err
    }
  }

  // Unfollow a user
  const unfollowUser = async (userId: string) => {
    if (!user || !isMounted) throw new Error("You must be logged in to unfollow users")

    try {
      const success = await dbUnfollowUser(user.id, userId)

      if (!success) {
        throw new Error("Failed to unfollow user")
      }

      // Update local stats if they exist
      if (user.stats && user.stats.following > 0) {
        setUser({
          ...user,
          stats: {
            ...user.stats,
            following: user.stats.following - 1,
          },
        })
      }

      toast({
        title: "User unfollowed",
        description: "You are no longer following this user.",
      })
    } catch (err) {
      console.error("Error unfollowing user:", err)
      toast({
        title: "Unfollow failed",
        description: "Could not unfollow this user. Please try again.",
        variant: "destructive",
      })
      throw err
    }
  }

  // Check if following a user
  const isFollowing = async (userId: string): Promise<boolean> => {
    if (!user || !isMounted) return false
    return dbIsFollowing(user.id, userId)
  }

  // Get followers of a user
  const getFollowers = async (userId: string): Promise<UserProfile[]> => {
    if (!isMounted) return []
    return dbGetFollowers(userId)
  }

  // Get users that a user is following
  const getFollowing = async (userId: string): Promise<UserProfile[]> => {
    if (!isMounted) return []
    return dbGetFollowing(userId)
  }

  // Don't expose context until client-side hydration is complete
  if (!isMounted) {
    return <>{children}</>
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
        followUser,
        unfollowUser,
        isFollowing,
        getFollowers,
        getFollowing,
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

