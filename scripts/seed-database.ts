import { createClient } from "@supabase/supabase-js"
import type { Database } from "@/types/supabase"

// This script should be run with environment variables set
// You can run it with: npx ts-node -r dotenv/config scripts/seed-database.ts

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY! // Use service key for admin privileges

const supabase = createClient<Database>(supabaseUrl, supabaseServiceKey)

async function seedDatabase() {
  console.log("Starting database seeding...")

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

  console.log("Creating test users...")
  for (const user of users) {
    const { data, error } = await supabase.from("users").insert(user).select()

    if (error) {
      console.error(`Error creating user ${user.username}:`, error)
      continue
    }

    console.log(`Created user: ${user.username} with ID: ${data[0].id}`)

    // Initialize user stats
    await supabase.from("user_stats").insert({
      user_id: data[0].id,
      followers_count: 0,
      following_count: 0,
      creations_count: 0,
      sales_count: 0,
    })
  }

  // Get created users for reference
  const { data: createdUsers } = await supabase.from("users").select("id, username")
  if (!createdUsers || createdUsers.length === 0) {
    console.error("No users were created successfully")
    return
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

  console.log("Creating test content...")
  for (const content of contents) {
    if (!content.creator_id) {
      console.error(`Missing creator_id for content: ${content.title}`)
      continue
    }

    const { data, error } = await supabase.from("contents").insert(content).select()

    if (error) {
      console.error(`Error creating content ${content.title}:`, error)
      continue
    }

    console.log(`Created content: ${content.title} with ID: ${data[0].id}`)

    // Update creator's content count
    await supabase.rpc("increment_user_stat", {
      user_id_param: content.creator_id,
      stat_column: "creations_count",
      increment_amount: 1,
    })
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

  console.log("Creating follow relationships...")
  for (const relationship of followRelationships) {
    if (!relationship.follower_id || !relationship.following_id) {
      console.error("Missing follower_id or following_id")
      continue
    }

    const { error } = await supabase.from("follows").insert(relationship)

    if (error) {
      console.error("Error creating follow relationship:", error)
      continue
    }

    console.log(`Created follow: ${relationship.follower_id} follows ${relationship.following_id}`)

    // Update follower and following counts
    await supabase.rpc("increment_user_stat", {
      user_id_param: relationship.follower_id,
      stat_column: "following_count",
      increment_amount: 1,
    })

    await supabase.rpc("increment_user_stat", {
      user_id_param: relationship.following_id,
      stat_column: "followers_count",
      increment_amount: 1,
    })
  }

  console.log("Database seeding completed!")
}

// Create the increment_user_stat function if it doesn't exist
async function createHelperFunctions() {
  const { error } = await supabase.rpc("create_increment_user_stat_function", {
    sql: `
      CREATE OR REPLACE FUNCTION increment_user_stat(user_id_param UUID, stat_column TEXT, increment_amount INTEGER)
      RETURNS VOID AS $$
      BEGIN
        UPDATE user_stats
        SET 
          followers_count = CASE WHEN stat_column = 'followers_count' 
                            THEN followers_count + increment_amount ELSE followers_count END,
          following_count = CASE WHEN stat_column = 'following_count' 
                            THEN following_count + increment_amount ELSE following_count END,
          creations_count = CASE WHEN stat_column = 'creations_count' 
                            THEN creations_count + increment_amount ELSE creations_count END,
          sales_count = CASE WHEN stat_column = 'sales_count' 
                        THEN sales_count + increment_amount ELSE sales_count END
        WHERE user_id = user_id_param;
      END;
      $$ LANGUAGE plpgsql;
    `,
  })

  if (error) {
    console.error("Error creating helper function:", error)
  } else {
    console.log("Helper functions created successfully")
  }
}

// Run the seeding
async function run() {
  try {
    await createHelperFunctions()
    await seedDatabase()
  } catch (error) {
    console.error("Error during seeding:", error)
  } finally {
    process.exit(0)
  }
}

run()

