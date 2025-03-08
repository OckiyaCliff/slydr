import { type NextRequest, NextResponse } from "next/server"
import { getUserTransactions } from "@/services/supabase-service"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const transactions = await getUserTransactions(id)
    return NextResponse.json(transactions)
  } catch (error) {
    console.error("Error fetching user transactions:", error)
    return NextResponse.json({ error: "Failed to fetch user transactions" }, { status: 500 })
  }
}

