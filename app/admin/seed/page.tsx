"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle2 } from "lucide-react"

export default function SeedPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message: string; data?: any } | null>(null)

  const seedDatabase = async () => {
    if (!confirm("This will add test data to your database. Continue?")) {
      return
    }

    setIsLoading(true)
    setResult(null)

    try {
      const response = await fetch("/api/admin/seed-database", {
        method: "POST",
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to seed database")
      }

      setResult({
        success: true,
        message: data.message || "Database seeded successfully",
        data: data.data,
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
      <h1 className="text-3xl font-bold mb-6">Seed Database</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Add Test Data</CardTitle>
          <CardDescription>This will add test users, content, and relationships to your database.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            This is useful for development and testing. The seed data includes test users with different roles, sample
            content, and follow relationships.
          </p>

          {result && (
            <Alert variant={result.success ? "default" : "destructive"} className="mb-4">
              {result.success ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
              <AlertTitle>{result.success ? "Success" : "Error"}</AlertTitle>
              <AlertDescription>
                {result.message}
                {result.data && (
                  <div className="mt-2">
                    <p>Created {result.data.users} users</p>
                    <p>Created {result.data.contents} content items</p>
                    <p>Created {result.data.follows} follow relationships</p>
                  </div>
                )}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter>
          <Button onClick={seedDatabase} disabled={isLoading}>
            {isLoading ? "Seeding..." : "Seed Database"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

