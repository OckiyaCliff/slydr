import { createClient } from "@supabase/supabase-js"
import type { Database } from "@/types/supabase"

// This script removes test data from the database
// Run with: npx ts-node -r dotenv/config scripts/cleanup-test-data.ts

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY! // Use service key for admin privileges

const supabase = createClient<Database>(supabaseUrl, supabaseServiceKey)

async function cleanupTestData() {
  console.log("Starting database cleanup...")

  // Define test wallet addresses to remove
  const testWalletPrefixes = ["test_wallet_", "dummy_", "mock_"]

  try {
    // Find users with test wallet addresses
    const { data: testUsers, error: findError } = await supabase
      .from("users")
      .select("id, wallet_address")
      .or(testWalletPrefixes.map((prefix) => `wallet_address.ilike.${prefix}%`).join(","))

    if (findError) {
      throw findError
    }

    if (!testUsers || testUsers.length === 0) {
      console.log("No test users found")
      return
    }

    const testUserIds = testUsers.map((user) => user.id)
    console.log(`Found ${testUserIds.length} test users to remove`)

    // Delete in the correct order to maintain referential integrity

    // 1. Delete follows
    const { error: followsError } = await supabase
      .from("follows")
      .delete()
      .or(`follower_id.in.(${testUserIds.join(",")}),following_id.in.(${testUserIds.join(",")})`)

    if (followsError) {
      console.error("Error deleting follows:", followsError)
    } else {
      console.log("Deleted follows for test users")
    }

    // 2. Delete content_views
    const { error: viewsError } = await supabase
      .from("content_views")
      .delete()
      .or(`user_id.in.(${testUserIds.join(",")})`)

    if (viewsError) {
      console.error("Error deleting content views:", viewsError)
    } else {
      console.log("Deleted content views for test users")
    }

    // 3. Delete transactions
    const { error: transactionsError } = await supabase
      .from("transactions")
      .delete()
      .or(`seller_id.in.(${testUserIds.join(",")}),buyer_id.in.(${testUserIds.join(",")})`)

    if (transactionsError) {
      console.error("Error deleting transactions:", transactionsError)
    } else {
      console.log("Deleted transactions for test users")
    }

    // 4. Delete contents
    const { error: contentsError } = await supabase.from("contents").delete().in("creator_id", testUserIds)

    if (contentsError) {
      console.error("Error deleting contents:", contentsError)
    } else {
      console.log("Deleted contents for test users")
    }

    // 5. Delete user_stats
    const { error: statsError } = await supabase.from("user_stats").delete().in("user_id", testUserIds)

    if (statsError) {
      console.error("Error deleting user stats:", statsError)
    } else {
      console.log("Deleted user stats for test users")
    }

    // 6. Finally delete users
    const { error: usersError } = await supabase.from("users").delete().in("id", testUserIds)

    if (usersError) {
      console.error("Error deleting users:", usersError)
    } else {
      console.log(`Successfully deleted ${testUserIds.length} test users`)
    }

    console.log("Database cleanup completed!")
  } catch (error) {
    console.error("Error during cleanup:", error)
  }
}

// Run the cleanup
cleanupTestData()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Unhandled error:", err)
    process.exit(1)
  })

