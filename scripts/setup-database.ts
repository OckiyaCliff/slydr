import { createClient } from "@supabase/supabase-js"
import fs from "fs"
import path from "path"

// This script should be run with environment variables set
// You can run it with: npx ts-node -r dotenv/config scripts/setup-database.ts

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY!

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Missing Supabase environment variables")
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function setupDatabase() {
  console.log("Setting up database...")

  try {
    // Read the schema SQL file
    const schemaPath = path.join(process.cwd(), "supabase", "schema.sql")
    const schemaSql = fs.readFileSync(schemaPath, "utf8")

    // Execute the SQL
    const { error } = await supabase.rpc("exec_sql", { sql: schemaSql })

    if (error) {
      throw error
    }

    console.log("Database setup completed successfully!")
  } catch (error) {
    console.error("Error setting up database:", error)
  }
}

setupDatabase()

