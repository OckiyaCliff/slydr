"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { supabase } from "@/lib/supabaseClient"

export default function DatabaseManager() {
  const [results, setResults] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const fetchTableData = async (tableName: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const { data, error } = await supabase.from(tableName).select("*").limit(100)

      if (error) throw error

      setResults({
        table: tableName,
        data,
        count: data.length,
      })
    } catch (err) {
      console.error(`Error fetching ${tableName}:`, err)
      setError(err instanceof Error ? err.message : "An unknown error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const resetTable = async (tableName: string) => {
    if (!confirm(`Are you sure you want to delete all data from the ${tableName} table? This cannot be undone.`)) {
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const { error } = await supabase.from(tableName).delete().neq("id", "00000000-0000-0000-0000-000000000000") // Safety check to avoid deleting everything

      if (error) throw error

      // Refresh the data
      await fetchTableData(tableName)
    } catch (err) {
      console.error(`Error resetting ${tableName}:`, err)
      setError(err instanceof Error ? err.message : "An unknown error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Database Manager</h1>

      <Tabs defaultValue="users">
        <TabsList className="mb-6">
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="contents">Contents</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="follows">Follows</TabsTrigger>
          <TabsTrigger value="content_views">Content Views</TabsTrigger>
          <TabsTrigger value="user_stats">User Stats</TabsTrigger>
        </TabsList>

        {["users", "contents", "transactions", "follows", "content_views", "user_stats"].map((table) => (
          <TabsContent key={table} value={table}>
            <Card>
              <CardHeader>
                <CardTitle className="capitalize">{table.replace("_", " ")}</CardTitle>
                <CardDescription>View and manage {table.replace("_", " ")} in your database</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between mb-4">
                  <Button onClick={() => fetchTableData(table)} disabled={isLoading}>
                    {isLoading ? "Loading..." : "Fetch Data"}
                  </Button>
                  <Button variant="destructive" onClick={() => resetTable(table)} disabled={isLoading}>
                    Reset Table
                  </Button>
                </div>

                {error && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>
                )}

                {results && results.table === table && (
                  <div>
                    <p className="mb-2">Found {results.count} records</p>
                    <div className="overflow-auto max-h-96 border rounded">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            {results.data.length > 0 &&
                              Object.keys(results.data[0]).map((key) => (
                                <th
                                  key={key}
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  {key}
                                </th>
                              ))}
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {results.data.map((row: any, i: number) => (
                            <tr key={i}>
                              {Object.entries(row).map(([key, value]) => (
                                <td key={key} className="px-6 py-4 whitespace-nowrap text-sm">
                                  {typeof value === "object"
                                    ? JSON.stringify(value).substring(0, 50) +
                                      (JSON.stringify(value).length > 50 ? "..." : "")
                                    : String(value).substring(0, 50) + (String(value).length > 50 ? "..." : "")}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

