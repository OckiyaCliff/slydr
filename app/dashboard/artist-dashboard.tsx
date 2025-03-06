"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brush, Heart, Eye, BarChart3, Users, ExternalLink, Plus, Grid, Columns, LayoutGrid } from "lucide-react"
import { Toggle } from "@/components/ui/toggle"
import type { UserProfile } from "@/context/user-context"
import type { ContentMetadata } from "@/services/arweave-service"

interface ArtistDashboardProps {
  user: UserProfile
  stats: {
    revenue: number
    sales: number
    creations: number
    followers: number
  }
  contents: ContentMetadata[]
}

export default function ArtistDashboard({ user, stats, contents }: ArtistDashboardProps) {
  // Mock engagement data
  const engagementData = [
    { title: "Gallery Views", value: stats.sales * 18, icon: Eye },
    { title: "Likes", value: stats.sales * 8, icon: Heart },
    { title: "Comments", value: stats.sales * 3, icon: ExternalLink },
  ]

  return (
    <div className="container py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Brush className="h-8 w-8 text-primary" /> Artist Gallery
          </h1>
          <p className="text-muted-foreground">Showcase your artwork, monitor engagement, and track your sales</p>
        </div>
        <div className="flex gap-4">
          <Button asChild variant="outline">
            <Link href="/profile">View Public Gallery</Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard/create">
              <Plus className="mr-2 h-4 w-4" />
              Upload New Artwork
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card className="bg-primary/10 border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Artworks</CardTitle>
            <Brush className="h-4 w-4 text-primary" />
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
            <CardTitle className="text-sm font-medium">Sales</CardTitle>
            <ExternalLink className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.sales}</div>
            <p className="text-xs text-muted-foreground">+0 this month</p>
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

      {/* Featured Artwork - Top Section */}
      {contents.length > 0 && (
        <Card className="mb-8 overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="relative aspect-square md:aspect-auto">
              <Image
                src={
                  contents[0].thumbnailTransactionId
                    ? `https://arweave.net/${contents[0].thumbnailTransactionId}`
                    : "/placeholder.svg?height=600&width=600"
                }
                alt={contents[0].title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6 flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">{contents[0].title}</h2>
                <p className="text-muted-foreground mb-4">
                  {contents[0].description ||
                    "This is your featured artwork. Add a description to make it more engaging."}
                </p>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  {engagementData.map((item) => {
                    const Icon = item.icon
                    return (
                      <div key={item.title} className="text-center">
                        <div className="flex justify-center mb-2">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Icon className="h-5 w-5 text-primary" />
                          </div>
                        </div>
                        <div className="text-xl font-bold">{item.value}</div>
                        <p className="text-xs text-muted-foreground">{item.title}</p>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="flex gap-4">
                <Button className="flex-1" asChild>
                  <Link href={`/content/${contents[0].id}`}>View Details</Link>
                </Button>
                <Button variant="outline" className="flex-1">
                  Promote
                </Button>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Gallery Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Your Gallery</h2>
          <div className="flex items-center gap-2 bg-muted/50 p-1 rounded-md">
            <Toggle aria-label="Grid view" defaultPressed>
              <Grid className="h-4 w-4" />
            </Toggle>
            <Toggle aria-label="Columns view">
              <Columns className="h-4 w-4" />
            </Toggle>
            <Toggle aria-label="Large grid view">
              <LayoutGrid className="h-4 w-4" />
            </Toggle>
          </div>
        </div>

        {contents.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {contents.map((artwork) => (
              <ArtworkCard key={artwork.id} artwork={artwork} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-muted/20 rounded-lg">
            <Brush className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Your Gallery is Empty</h3>
            <p className="text-muted-foreground mb-4">Upload your first artwork to start building your gallery</p>
            <Button asChild>
              <Link href="/dashboard/create">Upload Artwork</Link>
            </Button>
          </div>
        )}
      </div>

      {/* Tabs for analytics and more */}
      <Tabs defaultValue="analytics">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="collections">Collections</TabsTrigger>
          <TabsTrigger value="commissions">Commissions</TabsTrigger>
        </TabsList>
        <TabsContent value="analytics" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Artwork Performance</CardTitle>
              <CardDescription>How your artwork is performing across the platform</CardDescription>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="font-medium">Top Performers</h3>
                {contents.slice(0, 3).map((artwork, index) => (
                  <div key={artwork.id} className="flex items-center gap-4">
                    <div className="text-lg font-bold text-muted-foreground">#{index + 1}</div>
                    <div className="h-12 w-12 relative rounded overflow-hidden">
                      <Image
                        src={
                          artwork.thumbnailTransactionId
                            ? `https://arweave.net/${artwork.thumbnailTransactionId}`
                            : "/placeholder.svg?height=48&width=48"
                        }
                        alt={artwork.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium line-clamp-1">{artwork.title}</p>
                      <div className="flex text-xs text-muted-foreground gap-2">
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" /> {Math.floor(Math.random() * 500) + 50}
                        </span>
                        <span className="flex items-center gap-1">
                          <Heart className="h-3 w-3" /> {Math.floor(Math.random() * 100) + 10}
                        </span>
                      </div>
                    </div>
                    <div className="font-medium">{artwork.price} SOL</div>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Visitor Demographics</h3>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>United States</span>
                      <span>42%</span>
                    </div>
                    <div className="h-2 w-full bg-muted/50 rounded-full mt-1">
                      <div className="h-full bg-primary rounded-full" style={{ width: "42%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>United Kingdom</span>
                      <span>18%</span>
                    </div>
                    <div className="h-2 w-full bg-muted/50 rounded-full mt-1">
                      <div className="h-full bg-primary rounded-full" style={{ width: "18%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>Germany</span>
                      <span>14%</span>
                    </div>
                    <div className="h-2 w-full bg-muted/50 rounded-full mt-1">
                      <div className="h-full bg-primary rounded-full" style={{ width: "14%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>Japan</span>
                      <span>12%</span>
                    </div>
                    <div className="h-2 w-full bg-muted/50 rounded-full mt-1">
                      <div className="h-full bg-primary rounded-full" style={{ width: "12%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>Other</span>
                      <span>14%</span>
                    </div>
                    <div className="h-2 w-full bg-muted/50 rounded-full mt-1">
                      <div className="h-full bg-primary rounded-full" style={{ width: "14%" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="collections" className="mt-6">
          <div className="text-center py-12">
            <p className="text-muted-foreground">You haven't created any collections yet.</p>
            <p className="text-sm text-muted-foreground mt-2">
              Group your artwork into themed collections to help collectors discover your work.
            </p>
            <Button className="mt-4">Create Collection</Button>
          </div>
        </TabsContent>
        <TabsContent value="commissions" className="mt-6">
          <div className="text-center py-12">
            <p className="text-muted-foreground">Commission requests will appear here.</p>
            <p className="text-sm text-muted-foreground mt-2">
              You can enable commissions in your profile settings to allow collectors to request custom artwork.
            </p>
            <Button className="mt-4" variant="outline" asChild>
              <Link href="/settings">Enable Commissions</Link>
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Artwork card component for the artist dashboard
function ArtworkCard({ artwork }: { artwork: ContentMetadata }) {
  return (
    <div className="group relative overflow-hidden rounded-md">
      <div className="aspect-square relative">
        <Image
          src={
            artwork.thumbnailTransactionId
              ? `https://arweave.net/${artwork.thumbnailTransactionId}`
              : "/placeholder.svg?height=400&width=400"
          }
          alt={artwork.title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
        <h3 className="font-medium text-white truncate">{artwork.title}</h3>
        <div className="flex justify-between items-center mt-1">
          <p className="text-sm text-white/80">{artwork.price} SOL</p>
          <div className="flex gap-2">
            <Button
              size="icon"
              variant="ghost"
              className="h-7 w-7 rounded-full bg-white/20 text-white hover:bg-white/30 hover:text-white"
            >
              <Eye className="h-3.5 w-3.5" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="h-7 w-7 rounded-full bg-white/20 text-white hover:bg-white/30 hover:text-white"
            >
              <Heart className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

