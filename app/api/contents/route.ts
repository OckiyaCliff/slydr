import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function GET(request: NextRequest) {
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

  const searchParams = request.nextUrl.searchParams
  const search = searchParams.get("search")
  const category = searchParams.get("category")
  const creator_id = searchParams.get("creator_id")
  const limit = Number.parseInt(searchParams.get("limit") || "50")

  let query = supabase
    .from("contents")
    .select(`
      *,
      creator:creator_id(id, username, display_name, avatar_url)
    `)
    .order("created_at", { ascending: false })
    .limit(limit)

  if (search) {
    query = query.or(`title.ilike.%${search}%, description.ilike.%${search}%`)
  }

  if (category) {
    query = query.eq("category", category)
  }

  if (creator_id) {
    query = query.eq("creator_id", creator_id)
  }

  const { data, error } = await query

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

export async function POST(request: NextRequest) {
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

  try {
    const body = await request.json()

    const { data, error } = await supabase
      .from("contents")
      .insert({
        title: body.title,
        description: body.description,
        price: body.price,
        creator_id: body.creator_id,
        category: body.category,
        tags: body.tags,
        media_transaction_id: body.media_transaction_id,
        thumbnail_transaction_id: body.thumbnail_transaction_id,
        resale_rights: body.resale_rights,
        resale_royalty: body.resale_royalty,
      })
      .select()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data[0])
  } catch (error) {
    return NextResponse.json({ error: "Failed to create content" }, { status: 500 })
  }
}

