import { type NextRequest, NextResponse } from "next/server"
import { getFollowing } from "@/services/supabase-service"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const following = await getFollowing(id)
    return NextResponse.json(following)
  } catch (error) {
    console.error("Error fetching following:", error)
    return NextResponse.json({ error: "Failed to fetch following" }, { status: 500 })
  }
}

