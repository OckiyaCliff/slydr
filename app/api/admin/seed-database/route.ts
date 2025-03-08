import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import type { Database } from "@/types/supabase"

// This is an admin-only endpoint that should be protected
export async function POST(request: Request) {
  // In a real app, you'd add authentication here

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY!

    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json({ error: "Missing Supabase environment variables" }, { status: 500 })
    }

    const supabase = createClient<Database>(supabaseUrl, supabaseServiceKey)

    // Create test users
    const users = [
      {
        wallet_address: "test_wallet_1",
        username: "musician1",
        display_name: "Test Musician",
        bio: "I create amazing music",
        role: "musician",
        avatar_url: "https://api.dicebear.com/7.x/personas/svg?seed=musician1",
        social_links: { twitter: "@musician1", website: "musician1.com" },
      },
      {
        wallet_address: "test_wallet_2",
        username: "artist1",
        display_name: "Test Artist",
        bio: "Visual artist creating digital art",
        role: "artist",
        avatar_url: "https://api.dicebear.com/7.x/personas/svg?seed=artist1",
        social_links: { instagram: "@artist1" },
      },
      {
        wallet_address: "test_wallet_3",
        username: "writer1",
        display_name: "Test Writer",
        bio: "I write short stories and poetry",
        role: "writer",
        avatar_url: "https://api.dicebear.com/7.x/personas/svg?seed=writer1",
        social_links: { twitter: "@writer1" },
      },
    ]

    const createdUsers = []

    for (const user of users) {
      const { data, error } = await supabase.from("users").insert(user).select()

      if (error) {
        console.error(`Error creating user ${user.username}:`, error)
        continue
      }

      if (data && data[0]) {
        createdUsers.push(data[0])

        // Initialize user stats
        await supabase.from("user_stats").insert({
          user_id: data[0].id,
          followers_count: 0,
          following_count: 0,
          creations_count: 0,
          sales_count: 0,
        })
      }
    }

    // Create test content
    const contents = [
      {
        title: "Sample Music Track",
        description: "This is a sample music track for testing",
        price: 0.5,
        creator_id: createdUsers.find((u) => u.username === "musician1")?.id,
        category: "music",
        tags: ["test", "music", "sample"],
        media_transaction_id: "mock_transaction_id_1",
        thumbnail_transaction_id: "mock_thumbnail_id_1",
        resale_rights: true,
        resale_royalty: 10,
      },
      {
        title: "Digital Artwork",
        description: "A beautiful digital artwork",
        price: 1.0,
        creator_id: createdUsers.find((u) => u.username === "artist1")?.id,
        category: "art",
        tags: ["test", "art", "digital"],
        media_transaction_id: "mock_transaction_id_2",
        thumbnail_transaction_id: "mock_thumbnail_id_2",
        resale_rights: true,
        resale_royalty: 15,
      },
      {
        title: "Short Story Collection",
        description: "A collection of short stories",
        price: 0.75,
        creator_id: createdUsers.find((u) => u.username === "writer1")?.id,
        category: "writing",
        tags: ["test", "writing", "stories"],
        media_transaction_id: "mock_transaction_id_3",
        thumbnail_transaction_id: "mock_thumbnail_id_3",
        resale_rights: false,
        resale_royalty: 0,
      },
    ]

    for (const content of contents) {
      if (!content.creator_id) {
        console.error(`Missing creator_id for content: ${content.title}`)
        continue
      }

      const { error } = await supabase.from("contents").insert(content)

      if (error) {
        console.error(`Error creating content ${content.title}:`, error)
      }
    }

    // Create some follow relationships
    const followRelationships = [
      {
        follower_id: createdUsers.find((u) => u.username === "musician1")?.id,
        following_id: createdUsers.find((u) => u.username === "artist1")?.id,
      },
      {
        follower_id: createdUsers.find((u) => u.username === "artist1")?.id,
        following_id: createdUsers.find((u) => u.username === "writer1")?.id,
      },
      {
        follower_id: createdUsers.find((u) => u.username === "writer1")?.id,
        following_id: createdUsers.find((u) => u.username === "musician1")?.id,
      },
    ]

    for (const relationship of followRelationships) {
      if (!relationship.follower_id || !relationship.following_id) {
        console.error("Missing follower_id or following_id")
        continue
      }

      const { error } = await supabase.from("follows").insert(relationship)

      if (error) {
        console.error("Error creating follow relationship:", error)
      }
    }

    return NextResponse.json({
      success: true,
      message: "Database seeded successfully",
      data: {
        users: createdUsers.length,
        contents: contents.length,
        follows: followRelationships.length,
      },
    })
  } catch (error) {
    console.error("Error seeding database:", error)
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 })
  }
}

