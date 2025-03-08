import { type NextRequest, NextResponse } from "next/server"
import { uploadToArweave } from "@/services/arweave-service"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Read file as buffer
    const buffer = Buffer.from(await file.arrayBuffer())

    // Upload to Arweave
    const transactionId = await uploadToArweave(buffer, file.type)

    return NextResponse.json({ transactionId })
  } catch (error) {
    console.error("Error uploading to Arweave:", error)
    return NextResponse.json({ error: "Failed to upload to Arweave" }, { status: 500 })
  }
}

