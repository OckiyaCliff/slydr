"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Film, Play, BarChart3, Users, Plus, Clock, Video, Eye } from "lucide-react"
import type { UserProfile } from "@/context/user-context"
import type { ContentMetadata } from "@/services/arweave-service"

interface FilmmakerDashboardProps {
  user: UserProfile
  stats: {
    revenue: number
    sales: number
    creations: number
    followers: number
  }
  contents: ContentMetadata[]
}

export default function FilmmakerDashboard({ user, stats, contents }: FilmmakerDashboardProps) {
  return (
    <div className="container py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Film className="h-8 w-8 text-primary" /> Filmmaker Studio
          </h1>
          <p className="text-muted-foreground">
            Manage your video content, track audience engagement, and grow your following
          </p>
        </div>
        <div className="flex gap-4">
          <Button asChild variant="outline">
            <Link href="/profile">View Profile</Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard/create">
              <Plus className="mr-2 h-4 w-4" />
              Upload New Video
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card className="bg-primary/10 border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Videos</CardTitle>
            <Video className="h-4 w-4 text-primary" />
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
            <CardTitle className="text-sm font-medium">Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.sales * 32}</div>
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

      {/* Featured Video */}
      {contents.length > 0 && (
        <Card className="mb-8 overflow-hidden">
          <div className="grid md:grid-cols-5">
            <div className="md:col-span-3 relative aspect-video md:aspect-auto">
              <Image
                src={
                  contents[0].thumbnailTransactionId
                    ? `https://arweave.net/${contents[0].thumbnailTransactionId}`
                    : "/placeholder.svg?height=400&width=700"
                }
                alt={contents[0].title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Button size="icon" className="rounded-full h-16 w-16 bg-primary/90 hover:bg-primary">
                  <Play className="h-8 w-8 text-white" />
                </Button>
              </div>
            </div>
            <div className="md:col-span-2 p-6 flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">{contents[0].title}</h2>
                <p className="text-muted-foreground mb-4 line-clamp-3">
                  {contents[0].description || "Add a description to your video to engage your audience."}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center">
                    <div className="flex justify-center mb-2">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Eye className="h-5 w-5 text-primary" />
                      </div>
                    </div>
                    <div className="text-xl font-bold">{Math.floor(Math.random() * 1000) + 500}</div>
                    <p className="text-xs text-muted-foreground">Views</p>
                  </div>
                  <div className="text-center">
                    <div className="flex justify-center mb-2">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Clock className="h-5 w-5 text-primary" />
                      </div>
                    </div>
                    <div className="text-xl font-bold">12:34</div>
                    <p className="text-xs text-muted-foreground">Duration</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button className="flex-1" asChild>
                  <Link href={`/content/${contents[0].id}`}>Watch Now</Link>
                </Button>
                <Button variant="outline" className="flex-1">
                  Promote
                </Button>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Video Grid */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Your Videos</h2>
        {contents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {contents.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-muted/20 rounded-lg">
            <Film className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No Videos Yet</h3>
            <p className="text-muted-foreground mb-4">Start sharing your films and videos with your audience</p>
            <Button asChild>
              <Link href="/dashboard/create">Upload Video</Link>
            </Button>
          </div>
        )}
      </div>

      {/* Analytics Tabs */}
      <Tabs defaultValue="analytics">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="analytics">Viewer Analytics</TabsTrigger>
          <TabsTrigger value="comments">Comments</TabsTrigger>
          <TabsTrigger value="distributions">Distributions</TabsTrigger>
        </TabsList>
        <TabsContent value="analytics" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Viewer Insights</CardTitle>
              <CardDescription>Understand your audience better</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center text-center p-12">
              <p className="text-muted-foreground">
                Detailed analytics will be displayed here as you grow your audience.
              </p>
              <Button variant="outline" className="mt-4">
                Explore Analytics
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="comments" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Comments & Feedback</CardTitle>
              <CardDescription>What your audience is saying</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center text-center p-12">
              <p className="text-muted-foreground">Comments from your viewers will appear here.</p>
              <Button className="mt-4">Manage Comments</Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="distributions" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Distribution Channels</CardTitle>
              <CardDescription>Where your content is being watched</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center text-center p-12">
              <p className="text-muted-foreground">Distribution analytics will show here as your content spreads.</p>
              <Button variant="outline" className="mt-4">
                Expand Distribution
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Video card component
function VideoCard({ video }: { video: ContentMetadata }) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md group">
      <div className="aspect-video relative">
        <Image
          src={
            video.thumbnailTransactionId
              ? `https://arweave.net/${video.thumbnailTransactionId}`
              : "/placeholder.svg?height=200&width=350"
          }
          alt={video.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Button variant="ghost" size="icon" className="rounded-full bg-white text-black h-12 w-12">
            <Play className="h-6 w-6" />
          </Button>
        </div>
        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">12:34</div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-medium truncate">{video.title}</h3>
        <div className="flex justify-between items-center mt-2">
          <p className="text-sm">{video.price} SOL</p>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Eye className="h-3 w-3" />
            <span className="text-xs">{Math.floor(Math.random() * 1000) + 100}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button variant="ghost" className="w-full" asChild>
          <Link href={`/content/${video.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

