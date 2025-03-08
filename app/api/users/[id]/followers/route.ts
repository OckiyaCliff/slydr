import { type NextRequest, NextResponse } from "next/server"
import { getFollowers } from "@/services/supabase-service"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const followers = await getFollowers(id)
    return NextResponse.json(followers)
  } catch (error) {
    console.error("Error fetching followers:", error)
    return NextResponse.json({ error: "Failed to fetch followers" }, { status: 500 })
  }
}

