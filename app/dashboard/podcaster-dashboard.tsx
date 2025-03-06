"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mic, PlayCircle, BarChart3, Users, Plus, Clock, Radio, Headphones } from "lucide-react"
import type { UserProfile } from "@/context/user-context"
import type { ContentMetadata } from "@/services/arweave-service"

interface PodcasterDashboardProps {
  user: UserProfile
  stats: {
    revenue: number
    sales: number
    creations: number
    followers: number
  }
  contents: ContentMetadata[]
}

export default function PodcasterDashboard({ user, stats, contents }: PodcasterDashboardProps) {
  return (
    <div className="container py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Mic className="h-8 w-8 text-primary" /> Podcaster Studio
          </h1>
          <p className="text-muted-foreground">
            Manage your podcast episodes, track listener engagement, and analyze your growth
          </p>
        </div>
        <div className="flex gap-4">
          <Button asChild variant="outline">
            <Link href="/profile">View Profile</Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard/create">
              <Plus className="mr-2 h-4 w-4" />
              Upload New Episode
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card className="bg-primary/10 border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Episodes</CardTitle>
            <Radio className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.creations}</div>
            <p className="text-xs text-muted-foreground">+0 new this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.revenue.toFixed(2)} SOL</div>
            <p className="text-xs text-muted-foreground">+0% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Listeners</CardTitle>
            <Headphones className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.sales * 24}</div>
            <p className="text-xs text-muted-foreground">+0 this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Subscribers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.followers}</div>
            <p className="text-xs text-muted-foreground">+0 new this month</p>
          </CardContent>
        </Card>
      </div>

      {/* Episode management section */}
      <div className="grid gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Your Podcast Episodes</CardTitle>
            <CardDescription>Manage and monitor all your podcast content</CardDescription>
          </CardHeader>
          <CardContent>
            {contents.length > 0 ? (
              <div className="space-y-4">
                {contents.map((episode) => (
                  <div key={episode.id} className="flex items-center gap-4 p-3 hover:bg-muted rounded-md group">
                    <div className="relative h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                      <Image
                        src={
                          episode.thumbnailTransactionId
                            ? `https://arweave.net/${episode.thumbnailTransactionId}`
                            : "/placeholder.svg?height=64&width=64"
                        }
                        alt={episode.title}
                        fill
                        className="object-cover"
                      />
                      <button className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <PlayCircle className="h-8 w-8 text-white" />
                      </button>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate">{episode.title}</h4>
                      <div className="flex items-center gap-4 mt-1">
                        <p className="text-xs text-muted-foreground">
                          Released {new Date(episode.createdAt).toLocaleDateString()}
                        </p>
                        <span className="text-xs flex items-center gap-1 text-muted-foreground">
                          <Clock className="h-3 w-3" /> 32:15
                        </span>
                        <span className="text-xs flex items-center gap-1 text-muted-foreground">
                          <Headphones className="h-3 w-3" /> {Math.floor(Math.random() * 1000) + 100}
                        </span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/content/${episode.id}`}>View Details</Link>
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Mic className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No Episodes Yet</h3>
                <p className="text-muted-foreground mb-4">Upload your first podcast episode to get started</p>
                <Button asChild>
                  <Link href="/dashboard/create">Upload Episode</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Analytics Tabs */}
      <Tabs defaultValue="analytics">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="analytics">Listener Analytics</TabsTrigger>
          <TabsTrigger value="distribution">Distribution</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
        </TabsList>
        <TabsContent value="analytics" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Listener Demographics</CardTitle>
              <CardDescription>Understand your audience better</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center text-center p-12">
              <p className="text-muted-foreground">
                Advanced analytics will be displayed here once you have more listener data.
              </p>
              <Button variant="outline" className="mt-4">
                Explore Listener Data
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="distribution" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Distribution Channels</CardTitle>
              <CardDescription>Manage where your podcast is available</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center text-center p-12">
              <p className="text-muted-foreground">Connect distribution channels to reach more listeners.</p>
              <Button className="mt-4">Connect Platforms</Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="engagement" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Listener Engagement</CardTitle>
              <CardDescription>See how listeners interact with your content</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center text-center p-12">
              <p className="text-muted-foreground">Engagement metrics will be shown here as your podcast grows.</p>
              <Button variant="outline" className="mt-4">
                View Engagement Tips
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

