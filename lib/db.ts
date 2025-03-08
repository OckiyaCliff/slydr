import { supabase } from "./supabaseClient"
import type { UserProfile } from "@/context/user-context"
import type { ContentItem } from "@/types/content"

// User-related functions
export async function getUserByWallet(walletAddress: string): Promise<UserProfile | null> {
  const { data, error } = await supabase
    .from("users")
    .select(`
      *,
      stats:user_stats(followers_count, following_count, creations_count, sales_count)
    `)
    .eq("wallet_address", walletAddress)
    .single()

  if (error) {
    console.error("Error fetching user by wallet:", error)
    return null
  }

  if (!data) return null

  // Format the user data to match our UserProfile type
  return {
    id: data.id,
    wallet_address: data.wallet_address,
    username: data.username,
    display_name: data.display_name,
    bio: data.bio,
    avatar_url: data.avatar_url,
    cover_image_url: data.cover_image_url,
    role: data.role,
    is_verified: data.is_verified,
    created_at: data.created_at,
    updated_at: data.updated_at,
    social_links: data.social_links,
    stats: {
      followers: data.stats?.[0]?.followers_count || 0,
      following: data.stats?.[0]?.following_count || 0,
      creations: data.stats?.[0]?.creations_count || 0,
      sales: data.stats?.[0]?.sales_count || 0,
    },
  }
}

export async function createUser(userData: {
  wallet_address: string
  username: string
  display_name: string
  role: string
  bio?: string
  avatar_url?: string
  cover_image_url?: string
  social_links?: Record<string, string>
}): Promise<UserProfile | null> {
  // First, create the user
  const { data, error: userError } = await supabase
    .from("users")
    .insert({
      wallet_address: userData.wallet_address,
      username: userData.username,
      display_name: userData.display_name,
      role: userData.role,
      bio: userData.bio,
      avatar_url: userData.avatar_url,
      cover_image_url: userData.cover_image_url,
      social_links: userData.social_links || {},
    })
    .select()
    .single()

  if (userError) {
    console.error("Error creating user:", userError)
    return null
  }

  // Then, initialize their stats
  if (data) {
    await supabase.from("user_stats").insert({
      user_id: data.id,
      followers_count: 0,
      following_count: 0,
      creations_count: 0,
      sales_count: 0,
    })

    // Return the created user
    return getUserByWallet(userData.wallet_address)
  } else {
    return null
  }
}

export async function updateUser(userId: string, updates: Partial<UserProfile>): Promise<UserProfile | null> {
  const { data, error } = await supabase
    .from("users")
    .update({
      username: updates.username,
      display_name: updates.display_name,
      bio: updates.bio,
      avatar_url: updates.avatar_url,
      cover_image_url: updates.cover_image_url,
      role: updates.role,
      social_links: updates.social_links,
    })
    .eq("id", userId)
    .select()
    .single()

  if (error) {
    console.error("Error updating user:", error)
    return null
  }

  return getUserByWallet(data.wallet_address)
}

// Content-related functions
export async function getContentById(contentId: string): Promise<ContentItem | null> {
  const { data, error } = await supabase
    .from("contents")
    .select(`
      *,
      creator:creator_id(id, username, display_name, avatar_url, role)
    `)
    .eq("id", contentId)
    .single()

  if (error) {
    console.error("Error fetching content by ID:", error)
    return null
  }

  return data as unknown as ContentItem
}

export async function getContentsByCreator(creatorId: string): Promise<ContentItem[]> {
  const { data, error } = await supabase
    .from("contents")
    .select(`
      *,
      creator:creator_id(id, username, display_name, avatar_url, role)
    `)
    .eq("creator_id", creatorId)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching creator content:", error)
    return []
  }

  return data as unknown as ContentItem[]
}

export async function getTrendingContent(limit = 10): Promise<ContentItem[]> {
  // For now, just return the most recent content
  // In a real app, you'd implement a more sophisticated algorithm
  const { data, error } = await supabase
    .from("contents")
    .select(`
      *,
      creator:creator_id(id, username, display_name, avatar_url, role)
    `)
    .order("created_at", { ascending: false })
    .limit(limit)

  if (error) {
    console.error("Error fetching trending content:", error)
    return []
  }

  return data as unknown as ContentItem[]
}

export async function searchContent(
  query: string,
  filters: { category?: string; creator_id?: string } = {},
  limit = 20,
): Promise<ContentItem[]> {
  let supabaseQuery = supabase.from("contents").select(`
      *,
      creator:creator_id(id, username, display_name, avatar_url, role)
    `)

  if (query) {
    supabaseQuery = supabaseQuery.or(`title.ilike.%${query}%,description.ilike.%${query}%`)
  }

  if (filters.category) {
    supabaseQuery = supabaseQuery.eq("category", filters.category)
  }

  if (filters.creator_id) {
    supabaseQuery = supabaseQuery.eq("creator_id", filters.creator_id)
  }

  const { data, error } = await supabaseQuery.order("created_at", { ascending: false }).limit(limit)

  if (error) {
    console.error("Error searching content:", error)
    return []
  }

  return data as unknown as ContentItem[]
}

// Follow-related functions
export async function followUser(followerId: string, followingId: string): Promise<boolean> {
  // First, create the follow relationship
  const { error } = await supabase.from("follows").insert({
    follower_id: followerId,
    following_id: followingId,
  })

  if (error) {
    console.error("Error following user:", error)
    return false
  }

  // Update follower's following count
  await supabase
    .from("user_stats")
    .update({ following_count: supabase.rpc("increment", { row_id: followerId, column_name: "following_count" }) })
    .eq("user_id", followerId)

  // Update following's follower count
  await supabase
    .from("user_stats")
    .update({ followers_count: supabase.rpc("increment", { row_id: followingId, column_name: "followers_count" }) })
    .eq("user_id", followingId)

  return true
}

export async function unfollowUser(followerId: string, followingId: string): Promise<boolean> {
  // First, delete the follow relationship
  const { error } = await supabase
    .from("follows")
    .delete()
    .match({ follower_id: followerId, following_id: followingId })

  if (error) {
    console.error("Error unfollowing user:", error)
    return false
  }

  // Update follower's following count
  await supabase
    .from("user_stats")
    .update({ following_count: supabase.rpc("decrement", { row_id: followerId, column_name: "following_count" }) })
    .eq("user_id", followerId)

  // Update following's follower count
  await supabase
    .from("user_stats")
    .update({ followers_count: supabase.rpc("decrement", { row_id: followingId, column_name: "followers_count" }) })
    .eq("user_id", followingId)

  return true
}

export async function isFollowing(followerId: string, followingId: string): Promise<boolean> {
  const { data, error } = await supabase
    .from("follows")
    .select("id")
    .match({ follower_id: followerId, following_id: followingId })
    .single()

  if (error) {
    // If error is not found, it means not following
    return false
  }

  return !!data
}

export async function getFollowers(userId: string): Promise<UserProfile[]> {
  const { data, error } = await supabase
    .from("follows")
    .select(`
      follower:users!follower_id(
        id, wallet_address, username, display_name, bio, avatar_url, 
        cover_image_url, role, is_verified, created_at, updated_at, social_links
      )
    `)
    .eq("following_id", userId)

  if (error) {
    console.error("Error fetching followers:", error)
    return []
  }

  return data.map((item) => item.follower) as unknown as UserProfile[]
}

export async function getFollowing(userId: string): Promise<UserProfile[]> {
  const { data, error } = await supabase
    .from("follows")
    .select(`
      following:users!following_id(
        id, wallet_address, username, display_name, bio, avatar_url, 
        cover_image_url, role, is_verified, created_at, updated_at, social_links
      )
    `)
    .eq("follower_id", userId)

  if (error) {
    console.error("Error fetching following:", error)
    return []
  }

  return data.map((item) => item.following) as unknown as UserProfile[]
}

// Transaction-related functions
export async function createTransaction(transactionData: {
  content_id: string
  seller_id: string
  buyer_id: string
  price: number
  transaction_hash: string
}): Promise<boolean> {
  const { error } = await supabase.from("transactions").insert(transactionData)

  if (error) {
    console.error("Error creating transaction:", error)
    return false
  }

  // Update seller's sales count
  await supabase
    .from("user_stats")
    .update({
      sales_count: supabase.rpc("increment", { row_id: transactionData.seller_id, column_name: "sales_count" }),
    })
    .eq("user_id", transactionData.seller_id)

  return true
}

export async function getUserTransactions(userId: string): Promise<any[]> {
  const { data, error } = await supabase
    .from("transactions")
    .select(`
      *,
      content:contents(*),
      seller:users!seller_id(id, username, display_name, avatar_url),
      buyer:users!buyer_id(id, username, display_name, avatar_url)
    `)
    .or(`seller_id.eq.${userId},buyer_id.eq.${userId}`)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching user transactions:", error)
    return []
  }

  return data
}

// Analytics functions
export async function recordContentView(contentId: string, userId?: string): Promise<boolean> {
  const { error } = await supabase.from("content_views").insert({
    content_id: contentId,
    user_id: userId || null,
    ip_hash: "anonymous", // In a real app, you'd hash the IP address
  })

  if (error && error.code !== "23505") {
    // Ignore unique constraint violations
    console.error("Error recording content view:", error)
    return false
  }

  return true
}

export async function getContentViews(contentId: string): Promise<number> {
  const { count, error } = await supabase
    .from("content_views")
    .select("*", { count: "exact", head: true })
    .eq("content_id", contentId)

  if (error) {
    console.error("Error getting content views:", error)
    return 0
  }

  return count || 0
}

