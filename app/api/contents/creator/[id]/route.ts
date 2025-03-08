import { type NextRequest, NextResponse } from "next/server"
import { getContentsByCreator } from "@/services/supabase-service"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const contents = await getContentsByCreator(id)
    return NextResponse.json(contents)
  } catch (error) {
    console.error("Error fetching creator contents:", error)
    return NextResponse.json({ error: "Failed to fetch creator contents" }, { status: 500 })
  }
}

