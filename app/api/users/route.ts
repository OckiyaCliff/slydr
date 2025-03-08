import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function GET(request: NextRequest) {
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

  const searchParams = request.nextUrl.searchParams
  const search = searchParams.get("search")
  const role = searchParams.get("role")
  const limit = Number.parseInt(searchParams.get("limit") || "50")

  let query = supabase
    .from("users")
    .select(`
      *,
      stats:user_stats(followers_count, following_count, creations_count, sales_count)
    `)
    .order("created_at", { ascending: false })
    .limit(limit)

  if (search) {
    query = query.or(`username.ilike.%${search}%, display_name.ilike.%${search}%, bio.ilike.%${search}%`)
  }

  if (role) {
    query = query.eq("role", role)
  }

  const { data, error } = await query

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Format the stats for easier consumption
  const formattedData = data.map((user) => ({
    ...user,
    stats: {
      followers: user.stats?.[0]?.followers_count || 0,
      following: user.stats?.[0]?.following_count || 0,
      creations: user.stats?.[0]?.creations_count || 0,
      sales: user.stats?.[0]?.sales_count || 0,
    },
  }))

  return NextResponse.json(formattedData)
}

export async function POST(request: NextRequest) {
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

  try {
    const body = await request.json()

    // Check if user with this wallet address already exists
    const { data: existingUser } = await supabase
      .from("users")
      .select("id")
      .eq("wallet_address", body.wallet_address)
      .single()

    if (existingUser) {
      return NextResponse.json({ error: "User with this wallet address already exists" }, { status: 400 })
    }

    // Create new user
    const { data, error } = await supabase
      .from("users")
      .insert({
        wallet_address: body.wallet_address,
        username: body.username,
        display_name: body.display_name,
        role: body.role,
        bio: body.bio,
        avatar_url: body.avatar_url,
        cover_image_url: body.cover_image_url,
        social_links: body.social_links || {},
      })
      .select()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Initialize user stats
    await supabase.from("user_stats").insert({
      user_id: data[0].id,
      followers_count: 0,
      following_count: 0,
      creations_count: 0,
      sales_count: 0,
    })

    return NextResponse.json(data[0])
  } catch (error) {
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 })
  }
}

