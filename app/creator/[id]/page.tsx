"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useContentStore } from "@/store/content-store"
import { CheckCircle, Twitter, Instagram, Globe, Users, BarChart3, Heart, MessageSquare, Share2 } from "lucide-react"

// Mock creator data
const creatorData = {
  "creator-1": {
    id: "creator-1",
    name: "Astral Artisan",
    username: "astralartist",
    bio: "Digital artist exploring cosmic themes and ethereal landscapes. Creating immersive visual experiences that blur the line between reality and imagination.",
    avatar: "/placeholder.svg?height=200&width=200",
    coverImage: "/placeholder.svg?height=800&width=1600",
    isVerified: true,
    joinedDate: "2022-05-12T10:30:00Z",
    socialLinks: {
      twitter: "@astralartist",
      instagram: "@astral.artisan",
      website: "astralartisan.io",
    },
    stats: {
      followers: 5842,
      following: 321,
      creations: 47,
      sales: 215,
    },
    featured: [
      {
        id: "content-1",
        title: "Cosmic Dreamscape Collection",
        price: 2.5,
        media: "/placeholder.svg?height=800&width=800",
        likes: 342,
      },
    ],
    creations: [
      {
        id: "content-1",
        title: "Cosmic Dreamscape Collection",
        price: 2.5,
        media: "/placeholder.svg?height=800&width=800",
        likes: 342,
      },
      {
        id: "creation-2",
        title: "Nebula Whispers",
        price: 1.8,
        media: "/placeholder.svg?height=800&width=800",
        likes: 256,
      },
      {
        id: "creation-3",
        title: "Stellar Odyssey",
        price: 3.2,
        media: "/placeholder.svg?height=800&width=800",
        likes: 189,
      },
      {
        id: "creation-4",
        title: "Galactic Horizons",
        price: 2.1,
        media: "/placeholder.svg?height=800&width=800",
        likes: 217,
      },
    ],
    collections: [
      {
        id: "collection-1",
        title: "Cosmic Visions",
        itemCount: 12,
        thumbnail: "/placeholder.svg?height=800&width=800",
      },
      {
        id: "collection-2",
        title: "Ethereal Dimensions",
        itemCount: 8,
        thumbnail: "/placeholder.svg?height=800&width=800",
      },
    ],
  },
  "creator-2": {
    id: "creator-2",
    name: "Cyber Visionary",
    username: "cybervisionary",
    bio: "Digital artist specializing in cyberpunk aesthetics and futuristic cityscapes. Exploring the intersection of technology and humanity through vibrant neon-infused artwork.",
    avatar: "/placeholder.svg?height=200&width=200",
    coverImage: "/placeholder.svg?height=800&width=1600",
    isVerified: true,
    joinedDate: "2022-08-24T14:15:00Z",
    socialLinks: {
      twitter: "@cybervisionary",
      instagram: "@cyber.visionary",
      website: "cybervisionary.art",
    },
    stats: {
      followers: 4218,
      following: 187,
      creations: 32,
      sales: 178,
    },
    featured: [
      {
        id: "content-2",
        title: "Neon Metropolis",
        price: 1.8,
        media: "/placeholder.svg?height=800&width=800",
        likes: 278,
      },
    ],
    creations: [
      {
        id: "content-2",
        title: "Neon Metropolis",
        price: 1.8,
        media: "/placeholder.svg?height=800&width=800",
        likes: 278,
      },
      {
        id: "creation-5",
        title: "Digital Dystopia",
        price: 2.2,
        media: "/placeholder.svg?height=800&width=800",
        likes: 203,
      },
      {
        id: "creation-6",
        title: "Synthetic Dreams",
        price: 1.5,
        media: "/placeholder.svg?height=800&width=800",
        likes: 167,
      },
    ],
    collections: [
      {
        id: "collection-3",
        title: "Cyberpunk Visions",
        itemCount: 9,
        thumbnail: "/placeholder.svg?height=800&width=800",
      },
    ],
  },
}

// Update the component to use our content store
export default function CreatorProfilePage() {
  const { id } = useParams()
  const { fetchContentsByCreator, isLoading, error } = useContentStore()
  const [isFollowing, setIsFollowing] = useState(false)
  const [creator, setCreator] = useState<any>(null)
  const [creatorContents, setCreatorContents] = useState<any[]>([])

  useEffect(() => {
    // In a real app, we would fetch the creator profile from an API
    // For now, use the mock data
    const mockCreator = creatorData[id as string] || creatorData["creator-1"]
    setCreator(mockCreator)

    const loadCreatorContents = async () => {
      const contents = await fetchContentsByCreator(id as string)
      setCreatorContents(contents)
    }

    loadCreatorContents()
  }, [id, fetchContentsByCreator])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  if (isLoading) {
    return <div className="container py-12">Loading creator profile...</div>
  }

  if (error) {
    return <div className="container py-12 text-destructive">{error}</div>
  }

  if (!creator) {
    return <div className="container py-12">Creator not found</div>
  }

  return (
    <div className="container pb-12">
      {/* Cover Image */}
      <div className="relative w-full h-64 md:h-80 rounded-b-lg overflow-hidden">
        <Image
          src={creator.coverImage || "/placeholder.svg"}
          alt={`${creator.name} cover`}
          fill
          className="object-cover"
        />
      </div>

      {/* Profile Info */}
      <div className="relative px-4 sm:px-6 lg:px-8 -mt-20">
        <div className="bg-background rounded-lg shadow-lg p-6">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
            <Avatar className="h-24 w-24 border-4 border-background">
              <AvatarImage src={creator.avatar} alt={creator.name} />
              <AvatarFallback>{creator.name.charAt(0)}</AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold">{creator.name}</h1>
                {creator.isVerified && <CheckCircle className="h-5 w-5 text-primary" />}
              </div>
              <p className="text-muted-foreground">@{creator.username}</p>
            </div>

            <div className="flex gap-3 self-end md:self-center">
              <Button variant="outline" size="icon">
                <Share2 className="h-5 w-5" />
                <span className="sr-only">Share</span>
              </Button>
              <Button variant="outline" size="icon">
                <MessageSquare className="h-5 w-5" />
                <span className="sr-only">Message</span>
              </Button>
              <Button variant={isFollowing ? "outline" : "default"} onClick={() => setIsFollowing(!isFollowing)}>
                {isFollowing ? "Following" : "Follow"}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 text-center">
            <div className="p-3 rounded-lg bg-muted/50">
              <p className="text-2xl font-bold">{creator.stats.followers + (isFollowing ? 1 : 0)}</p>
              <p className="text-sm text-muted-foreground">Followers</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/50">
              <p className="text-2xl font-bold">{creator.stats.following}</p>
              <p className="text-sm text-muted-foreground">Following</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/50">
              <p className="text-2xl font-bold">{creator.stats.creations}</p>
              <p className="text-sm text-muted-foreground">Creations</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/50">
              <p className="text-2xl font-bold">{creator.stats.sales}</p>
              <p className="text-sm text-muted-foreground">Sales</p>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="font-semibold mb-2">About</h2>
            <p className="text-muted-foreground">{creator.bio}</p>

            <div className="flex flex-wrap gap-4 mt-4">
              <div className="flex items-center gap-2 text-sm">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span>Joined {formatDate(creator.joinedDate)}</span>
              </div>

              {creator.socialLinks.twitter && (
                <a href="#" className="flex items-center gap-2 text-sm hover:text-primary">
                  <Twitter className="h-4 w-4" />
                  <span>{creator.socialLinks.twitter}</span>
                </a>
              )}

              {creator.socialLinks.instagram && (
                <a href="#" className="flex items-center gap-2 text-sm hover:text-primary">
                  <Instagram className="h-4 w-4" />
                  <span>{creator.socialLinks.instagram}</span>
                </a>
              )}

              {creator.socialLinks.website && (
                <a href="#" className="flex items-center gap-2 text-sm hover:text-primary">
                  <Globe className="h-4 w-4" />
                  <span>{creator.socialLinks.website}</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Featured Work */}
      {creator.featured && creator.featured.length > 0 && (
        <div className="mt-12 px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-6">Featured Work</h2>
          <div className="grid grid-cols-1 gap-6">
            {creator.featured.map((item) => (
              <div key={item.id} className="relative rounded-lg overflow-hidden">
                <div className="aspect-[21/9] relative">
                  <Image src={item.media || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-6 text-white">
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-lg font-semibold">{item.price} SOL</p>
                    <div className="flex items-center gap-1">
                      <Heart className="h-4 w-4" />
                      <span>{item.likes}</span>
                    </div>
                  </div>
                  <Button className="mt-4" asChild>
                    <Link href={`/content/${item.id}`}>View Details</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tabs Section */}
      <div className="mt-12 px-4 sm:px-6 lg:px-8">
        <Tabs defaultValue="creations">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="creations">Creations</TabsTrigger>
            <TabsTrigger value="collections">Collections</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="creations" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {creator.creations.map((item) => (
                <Link href={`/content/${item.id}`} key={item.id}>
                  <Card className="overflow-hidden transition-all hover:shadow-md">
                    <div className="aspect-square relative">
                      <Image src={item.media || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-medium truncate">{item.title}</h3>
                      <div className="flex justify-between items-center mt-2">
                        <p className="text-sm font-semibold">{item.price} SOL</p>
                        <div className="flex items-center gap-1">
                          <Heart className="h-3 w-3" />
                          <span className="text-xs">{item.likes}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="collections" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {creator.collections.map((collection) => (
                <Card key={collection.id} className="overflow-hidden transition-all hover:shadow-md">
                  <div className="aspect-video relative">
                    <Image
                      src={collection.thumbnail || "/placeholder.svg"}
                      alt={collection.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-medium">{collection.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{collection.itemCount} items</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="activity" className="mt-6">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <BarChart3 className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">Listed "Cosmic Dreamscape Collection"</p>
                      <p className="text-sm text-muted-foreground">{formatDate(new Date().toISOString())} • 2.5 SOL</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <Heart className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">Received 50 likes on "Nebula Whispers"</p>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(new Date(Date.now() - 86400000).toISOString())}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <Users className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">Reached 5,000 followers</p>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(new Date(Date.now() - 172800000).toISOString())}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

