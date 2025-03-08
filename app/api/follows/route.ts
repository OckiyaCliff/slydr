import { type NextRequest, NextResponse } from "next/server"
import { followUser, unfollowUser } from "@/services/supabase-service"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { follower_id, following_id } = body

    if (!follower_id || !following_id) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const follow = await followUser(follower_id, following_id)
    return NextResponse.json(follow, { status: 201 })
  } catch (error) {
    console.error("Error following user:", error)
    return NextResponse.json({ error: "Failed to follow user" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json()
    const { follower_id, following_id } = body

    if (!follower_id || !following_id) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    await unfollowUser(follower_id, following_id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error unfollowing user:", error)
    return NextResponse.json({ error: "Failed to unfollow user" }, { status: 500 })
  }
}

