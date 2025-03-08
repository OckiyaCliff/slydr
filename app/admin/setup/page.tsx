"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle2 } from "lucide-react"

export default function SetupPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)

  const setupDatabase = async () => {
    if (
      !confirm("This will set up the database schema. Existing tables with the same names will be dropped. Continue?")
    ) {
      return
    }

    setIsLoading(true)
    setResult(null)

    try {
      const response = await fetch("/api/admin/setup-database", {
        method: "POST",
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to set up database")
      }

      setResult({
        success: true,
        message: data.message || "Database setup completed successfully",
      })
    } catch (error) {
      setResult({
        success: false,
        message: error instanceof Error ? error.message : "An unknown error occurred",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Database Setup</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Set Up Database Schema</CardTitle>
          <CardDescription>
            This will create all necessary tables, indexes, and functions in your Supabase database.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Warning: This operation will drop existing tables with the same names and recreate them. Only use this in
            development or when setting up a new database.
          </p>

          {result && (
            <Alert variant={result.success ? "default" : "destructive"} className="mb-4">
              {result.success ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
              <AlertTitle>{result.success ? "Success" : "Error"}</AlertTitle>
              <AlertDescription>{result.message}</AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter>
          <Button onClick={setupDatabase} disabled={isLoading}>
            {isLoading ? "Setting Up..." : "Set Up Database"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

