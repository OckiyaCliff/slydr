"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { supabase } from "@/lib/supabaseClient"

export default function SupabaseTestPage() {
  const [testResult, setTestResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const testConnection = async () => {
    setLoading(true)
    setError(null)

    try {
      // Test direct connection
      const { data: directData, error: directError } = await supabase
        .from("users")
        .select("count(*)", { count: "exact", head: true })

      if (directError) throw directError

      // Test API route
      const apiResponse = await fetch("/api/test-supabase")
      const apiData = await apiResponse.json()

      setTestResult({
        directTest: { success: true, data: directData },
        apiTest: apiData,
      })
    } catch (err) {
      console.error("Connection test failed:", err)
      setError(err instanceof Error ? err.message : "An unknown error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Supabase Connection Test</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Test Supabase Connection</CardTitle>
          <CardDescription>Click the button below to test your connection to Supabase</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium">Supabase URL:</p>
              <p className="text-sm text-muted-foreground">
                {process.env.NEXT_PUBLIC_SUPABASE_URL || "Not configured"}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">Supabase Anon Key:</p>
              <p className="text-sm text-muted-foreground">
                {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
                  ? `${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.substring(0, 5)}...`
                  : "Not configured"}
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={testConnection} disabled={loading}>
            {loading ? "Testing..." : "Test Connection"}
          </Button>
        </CardFooter>
      </Card>

      {error && (
        <Card className="mb-6 border-red-500">
          <CardHeader>
            <CardTitle className="text-red-500">Connection Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{error}</p>
          </CardContent>
        </Card>
      )}

      {testResult && (
        <Card>
          <CardHeader>
            <CardTitle>Test Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium">Direct Connection Test:</h3>
                <pre className="bg-muted p-4 rounded-md overflow-auto mt-2">
                  {JSON.stringify(testResult.directTest, null, 2)}
                </pre>
              </div>

              <div>
                <h3 className="text-lg font-medium">API Route Test:</h3>
                <pre className="bg-muted p-4 rounded-md overflow-auto mt-2">
                  {JSON.stringify(testResult.apiTest, null, 2)}
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

