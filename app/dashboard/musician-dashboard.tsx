"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Music, Play, BarChart3, Users, Headphones, Plus, Clock, TrendingUp } from "lucide-react"
import type { UserProfile } from "@/context/user-context"
import type { ContentMetadata } from "@/services/arweave-service"

interface MusicianDashboardProps {
  user: UserProfile
  stats: {
    revenue: number
    sales: number
    creations: number
    followers: number
  }
  contents: ContentMetadata[]
}

export default function MusicianDashboard({ user, stats, contents }: MusicianDashboardProps) {
  const [currentTrack, setCurrentTrack] = useState<ContentMetadata | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const recentTracks = contents.slice(0, 5)

  const handlePlay = (track: ContentMetadata) => {
    setCurrentTrack(track)
    setIsPlaying(true)
  }

  // Mock data for top cities
  const topCities = [
    { name: "Los Angeles", percent: 32 },
    { name: "New York", percent: 24 },
    { name: "London", percent: 18 },
    { name: "Tokyo", percent: 14 },
    { name: "Berlin", percent: 12 },
  ]

  return (
    <div className="container py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Music className="h-8 w-8 text-primary" /> Music Dashboard
          </h1>
          <p className="text-muted-foreground">
            Manage your tracks, monitor listener engagement, and track your earnings
          </p>
        </div>
        <div className="flex gap-4">
          <Button asChild variant="outline">
            <Link href="/profile">View Profile</Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard/create">
              <Plus className="mr-2 h-4 w-4" />
              Upload New Track
            </Link>
          </Button>
        </div>
      </div>

      {/* Music Player - Always visible when a track is selected */}
      {currentTrack && (
        <Card className="mb-8 bg-black text-white overflow-hidden">
          <div className="flex items-center p-4">
            <div className="flex-shrink-0 relative h-16 w-16 rounded overflow-hidden mr-4">
              <Image
                src={
                  currentTrack.thumbnailTransactionId
                    ? `https://arweave.net/${currentTrack.thumbnailTransactionId}`
                    : "/placeholder.svg?height=64&width=64"
                }
                alt={currentTrack.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-grow mr-4">
              <h3 className="font-medium text-white">{currentTrack.title}</h3>
              <p className="text-sm text-gray-400">{user.displayName}</p>
              <div className="mt-2 flex items-center gap-2">
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 rounded-full bg-white text-black hover:bg-white/90 hover:text-black"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? <span className="h-3 w-3 bg-black rounded"></span> : <Play className="h-4 w-4" />}
                </Button>
                <Progress value={33} className="h-1 w-full max-w-[200px]" />
                <span className="text-xs text-gray-400">1:14 / 3:45</span>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card className="bg-primary/10 border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Plays</CardTitle>
            <Headphones className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.sales * 12}</div>
            <p className="text-xs text-muted-foreground">+24% from last month</p>
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
            <CardTitle className="text-sm font-medium">Tracks</CardTitle>
            <Music className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.creations}</div>
            <p className="text-xs text-muted-foreground">+0 new this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Followers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.followers}</div>
            <p className="text-xs text-muted-foreground">+0 new this month</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid gap-8 md:grid-cols-3 mb-8">
        {/* Recent Tracks */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Recent Tracks</CardTitle>
            <CardDescription>Your latest uploaded music</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {recentTracks.length > 0 ? (
                recentTracks.map((track, index) => (
                  <div key={track.id} className="flex items-center gap-3 p-2 hover:bg-muted rounded-md group">
                    <div className="text-sm text-muted-foreground w-6 text-center">{index + 1}</div>
                    <div className="relative h-10 w-10 rounded overflow-hidden flex-shrink-0">
                      <Image
                        src={
                          track.thumbnailTransactionId
                            ? `https://arweave.net/${track.thumbnailTransactionId}`
                            : "/placeholder.svg?height=40&width=40"
                        }
                        alt={track.title}
                        fill
                        className="object-cover"
                      />
                      <button
                        className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handlePlay(track)}
                      >
                        <Play className="h-4 w-4 text-white" />
                      </button>
                    </div>
                    <div className="flex-grow min-w-0">
                      <h4 className="font-medium truncate">{track.title}</h4>
                      <p className="text-xs text-muted-foreground">{new Date(track.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm mr-2">{Math.floor(Math.random() * 1000)}</span>
                      <Headphones className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6">
                  <p className="text-muted-foreground">You haven't uploaded any tracks yet.</p>
                  <Button className="mt-4" asChild>
                    <Link href="/dashboard/create">Upload Your First Track</Link>
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/dashboard/tracks">View All Tracks</Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Listener Demographics */}
        <Card>
          <CardHeader>
            <CardTitle>Top Listeners</CardTitle>
            <CardDescription>Where your fans are located</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topCities.map((city) => (
                <div key={city.name} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span>{city.name}</span>
                    <span className="font-medium">{city.percent}%</span>
                  </div>
                  <Progress value={city.percent} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for different content sections */}
      <Tabs defaultValue="tracks">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="tracks">All Tracks</TabsTrigger>
          <TabsTrigger value="stats">Detailed Stats</TabsTrigger>
          <TabsTrigger value="earnings">Earnings</TabsTrigger>
        </TabsList>
        <TabsContent value="tracks" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {contents.length > 0 ? (
              contents.map((track) => <TrackCard key={track.id} track={track} onPlay={() => handlePlay(track)} />)
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">You haven't created any tracks yet.</p>
                <Button className="mt-4" asChild>
                  <Link href="/dashboard/create">Create Your First Track</Link>
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="stats" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Popular Times</CardTitle>
                <CardDescription>When your music is most played</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center p-6">
                <div className="flex items-center gap-4">
                  <Clock className="h-10 w-10 text-primary" />
                  <div>
                    <p className="text-lg font-medium">Peak Listening Time</p>
                    <p className="text-sm text-muted-foreground">8:00 PM - 11:00 PM EST</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Growth Trends</CardTitle>
                <CardDescription>Your audience growth over time</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center p-6">
                <div className="flex items-center gap-4">
                  <TrendingUp className="h-10 w-10 text-primary" />
                  <div>
                    <p className="text-lg font-medium">Listener Growth</p>
                    <p className="text-sm text-muted-foreground">+15% in the last 30 days</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="earnings" className="mt-6">
          <div className="text-center py-12">
            <p className="text-muted-foreground">Detailed earnings data will be available soon.</p>
            <p className="text-sm text-muted-foreground mt-2">
              We're working on enhancing our analytics dashboard to provide you with comprehensive earnings data.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Track card component for the music dashboard
function TrackCard({ track, onPlay }: { track: ContentMetadata; onPlay: () => void }) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md group">
      <div className="aspect-square relative">
        <Image
          src={
            track.thumbnailTransactionId
              ? `https://arweave.net/${track.thumbnailTransactionId}`
              : "/placeholder.svg?height=400&width=400"
          }
          alt={track.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Button variant="ghost" size="icon" className="rounded-full bg-white text-black h-12 w-12" onClick={onPlay}>
            <Play className="h-6 w-6" />
          </Button>
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-medium truncate">{track.title}</h3>
        <div className="flex justify-between items-center mt-2">
          <p className="text-sm">{track.price} SOL</p>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Headphones className="h-3 w-3" />
            <span className="text-xs">{Math.floor(Math.random() * 1000)}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button variant="ghost" className="w-full" asChild>
          <Link href={`/content/${track.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

