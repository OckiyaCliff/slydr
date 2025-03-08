import { type NextRequest, NextResponse } from "next/server"
import { recordTransaction } from "@/services/supabase-service"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { content_id, seller_id, buyer_id, price, transaction_hash } = body

    if (!content_id || !seller_id || !buyer_id || price === undefined || !transaction_hash) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const transaction = await recordTransaction({
      content_id,
      seller_id,
      buyer_id,
      price,
      transaction_hash,
    })

    return NextResponse.json(transaction, { status: 201 })
  } catch (error) {
    console.error("Error recording transaction:", error)
    return NextResponse.json({ error: "Failed to record transaction" }, { status: 500 })
  }
}

