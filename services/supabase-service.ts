import { createClient } from "@supabase/supabase-js"
import type { Database } from "@/types/supabase"

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

// User-related functions
export async function getUserByWallet(walletAddress: string) {
  const { data, error } = await supabase.from("users").select("*").eq("wallet_address", walletAddress).single()

  if (error) throw error
  return data
}

export async function createUser(userData: {
  wallet_address: string
  username: string
  display_name: string
  role: string
  bio?: string
  avatar_url?: string
  cover_image_url?: string
}) {
  const { data, error } = await supabase.from("users").insert(userData).select().single()

  if (error) throw error
  return data
}

export async function updateUser(userId: string, updates: any) {
  const { data, error } = await supabase.from("users").update(updates).eq("id", userId).select().single()

  if (error) throw error
  return data
}

// Content-related functions
export async function getContentById(contentId: string) {
  const { data, error } = await supabase
    .from("contents")
    .select(`
      *,
      creator:users(*)
    `)
    .eq("id", contentId)
    .single()

  if (error) throw error
  return data
}

export async function getAllContents(limit = 20, offset = 0) {
  const { data, error } = await supabase
    .from("contents")
    .select(`
      *,
      creator:users(*)
    `)
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1)

  if (error) throw error
  return data
}

export async function getContentsByCreator(creatorId: string) {
  const { data, error } = await supabase
    .from("contents")
    .select(`
      *,
      creator:users(*)
    `)
    .eq("creator_id", creatorId)
    .order("created_at", { ascending: false })

  if (error) throw error
  return data
}

export async function createContent(contentData: {
  title: string
  description: string
  price: number
  creator_id: string
  category: string
  tags: string[]
  media_transaction_id: string
  thumbnail_transaction_id: string
  resale_rights: boolean
  resale_royalty: number
}) {
  const { data, error } = await supabase.from("contents").insert(contentData).select().single()

  if (error) throw error
  return data
}

// Transaction-related functions
export async function recordTransaction(transactionData: {
  content_id: string
  seller_id: string
  buyer_id: string
  price: number
  transaction_hash: string
}) {
  const { data, error } = await supabase.from("transactions").insert(transactionData).select().single()

  if (error) throw error
  return data
}

export async function getUserTransactions(userId: string) {
  const { data, error } = await supabase
    .from("transactions")
    .select(`
      *,
      content:contents(*),
      seller:users!seller_id(*),
      buyer:users!buyer_id(*)
    `)
    .or(`seller_id.eq.${userId},buyer_id.eq.${userId}`)
    .order("created_at", { ascending: false })

  if (error) throw error
  return data
}

// Follow-related functions
export async function followUser(followerId: string, followingId: string) {
  const { data, error } = await supabase
    .from("follows")
    .insert({
      follower_id: followerId,
      following_id: followingId,
    })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function unfollowUser(followerId: string, followingId: string) {
  const { error } = await supabase.from("follows").delete().match({
    follower_id: followerId,
    following_id: followingId,
  })

  if (error) throw error
  return true
}

export async function getFollowers(userId: string) {
  const { data, error } = await supabase
    .from("follows")
    .select(`
      follower:users!follower_id(*)
    `)
    .eq("following_id", userId)

  if (error) throw error
  return data.map((item) => item.follower)
}

export async function getFollowing(userId: string) {
  const { data, error } = await supabase
    .from("follows")
    .select(`
      following:users!following_id(*)
    `)
    .eq("follower_id", userId)

  if (error) throw error
  return data.map((item) => item.following)
}

// Analytics functions
export async function recordView(contentId: string, userId?: string) {
  const { data, error } = await supabase
    .from("content_views")
    .insert({
      content_id: contentId,
      user_id: userId || null,
      ip_hash: "anonymous", // In a real app, you'd hash the IP
    })
    .select()
    .single()

  if (error && error.code !== "23505") throw error // Ignore unique constraint errors
  return data
}

export async function getContentViews(contentId: string) {
  const { count, error } = await supabase
    .from("content_views")
    .select("*", { count: "exact", head: true })
    .eq("content_id", contentId)

  if (error) throw error
  return count || 0
}

