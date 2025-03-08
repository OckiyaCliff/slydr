import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import fs from "fs"
import path from "path"

// This is an admin-only endpoint that should be protected
export async function POST(request: Request) {
  // In a real app, you'd add authentication here
  // to ensure only admins can access this endpoint

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY

    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json({ error: "Missing Supabase environment variables" }, { status: 500 })
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Read the schema SQL file
    const schemaPath = path.join(process.cwd(), "supabase", "schema.sql")
    const schemaSql = fs.readFileSync(schemaPath, "utf8")

    // Execute the SQL
    const { error } = await supabase.rpc("exec_sql", { sql: schemaSql })

    if (error) {
      throw error
    }

    return NextResponse.json({ success: true, message: "Database setup completed successfully" })
  } catch (error) {
    console.error("Error setting up database:", error)
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 })
  }
}

