import { type NextRequest, NextResponse } from "next/server"
import { recordView, getContentViews } from "@/services/supabase-service"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { content_id, user_id } = body

    if (!content_id) {
      return NextResponse.json({ error: "Content ID is required" }, { status: 400 })
    }

    await recordView(content_id, user_id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error recording view:", error)
    return NextResponse.json({ error: "Failed to record view" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const contentId = searchParams.get("content_id")

    if (!contentId) {
      return NextResponse.json({ error: "Content ID is required" }, { status: 400 })
    }

    const views = await getContentViews(contentId)
    return NextResponse.json({ views })
  } catch (error) {
    console.error("Error fetching views:", error)
    return NextResponse.json({ error: "Failed to fetch views" }, { status: 500 })
  }
}

