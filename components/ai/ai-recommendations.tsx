"use client"

import { useEffect, useState } from "react"
import { useAI } from "@/context/ai-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Bot } from "lucide-react"

export function AIRecommendations() {
  const { getRecommendations } = useAI()
  const [recommendations, setRecommendations] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const recs = await getRecommendations()
        setRecommendations(recs)
      } catch (error) {
        console.error("Error fetching recommendations:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchRecommendations()
  }, [getRecommendations])

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Bot className="h-5 w-5" />
          AI Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[90%]" />
            <Skeleton className="h-4 w-[80%]" />
            <Skeleton className="h-4 w-[85%]" />
          </div>
        ) : (
          <ul className="space-y-2">
            {recommendations.map((rec, index) => (
              <li key={index} className="text-sm">
                • {rec}
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}

