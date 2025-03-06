import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Award, TrendingUp, Users } from "lucide-react"

export const metadata: Metadata = {
  title: "Creators | Slydr",
  description: "Discover talented creators on the Slydr platform",
}

// Mock data for creators
const creators = [
  {
    id: "creator1",
    name: "Alex Rivera",
    handle: "@alexrivera",
    avatar: "/placeholder.svg?height=300&width=300",
    bio: "Digital artist specializing in futuristic landscapes and cyberpunk aesthetics",
    followers: 12400,
    contentCount: 47,
    featured: true,
    verified: true,
    categories: ["Digital Art", "3D Models"],
    trending: true,
  },
  {
    id: "creator2",
    name: "Sophia Chen",
    handle: "@sophiachen",
    avatar: "/placeholder.svg?height=300&width=300",
    bio: "Music producer and sound designer creating immersive audio experiences",
    followers: 8700,
    contentCount: 32,
    featured: true,
    verified: true,
    categories: ["Music", "Sound Design"],
    trending: false,
  },
  {
    id: "creator3",
    name: "Marcus Johnson",
    handle: "@marcusj",
    avatar: "/placeholder.svg?height=300&width=300",
    bio: "Photographer capturing urban landscapes and street culture",
    followers: 5300,
    contentCount: 28,
    featured: false,
    verified: true,
    categories: ["Photography", "Visual Arts"],
    trending: true,
  },
  {
    id: "creator4",
    name: "Elena Petrova",
    handle: "@elenap",
    avatar: "/placeholder.svg?height=300&width=300",
    bio: "Fashion designer and digital clothing creator for virtual worlds",
    followers: 9200,
    contentCount: 36,
    featured: true,
    verified: false,
    categories: ["Fashion", "Digital Clothing"],
    trending: false,
  },
  {
    id: "creator5",
    name: "David Kim",
    handle: "@davidkim",
    avatar: "/placeholder.svg?height=300&width=300",
    bio: "Game developer creating interactive experiences and assets",
    followers: 7500,
    contentCount: 24,
    featured: false,
    verified: true,
    categories: ["Game Assets", "Interactive"],
    trending: true,
  },
  {
    id: "creator6",
    name: "Aisha Patel",
    handle: "@aishap",
    avatar: "/placeholder.svg?height=300&width=300",
    bio: "Illustrator and comic artist with a unique storytelling style",
    followers: 6800,
    contentCount: 41,
    featured: false,
    verified: false,
    categories: ["Illustration", "Comics"],
    trending: false,
  },
]

// Filter creators by category
const featuredCreators = creators.filter((creator) => creator.featured)
const trendingCreators = creators.filter((creator) => creator.trending)
const allCreators = creators

export default function CreatorsPage() {
  return (
    <main className="flex-1">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm">
                <span className="font-medium text-primary">Discover Creators</span>
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Meet the Talented Creators on Slydr
              </h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Discover unique digital content from artists, musicians, designers, and more. Support your favorites and
                earn by promoting their work.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Creators Section */}
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h2 className="text-2xl font-bold tracking-tight">Featured Creators</h2>
                <p className="text-muted-foreground">Handpicked creators making waves on the platform</p>
              </div>
              <Button asChild variant="ghost" size="sm">
                <Link href="/marketplace">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredCreators.map((creator) => (
                <CreatorCard key={creator.id} creator={creator} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trending Creators Section */}
      <section className="w-full py-12 md:py-24 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h2 className="text-2xl font-bold tracking-tight">Trending Creators</h2>
                <p className="text-muted-foreground">Creators gaining popularity right now</p>
              </div>
              <Button asChild variant="ghost" size="sm">
                <Link href="/trending">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {trendingCreators.map((creator) => (
                <CreatorCard key={creator.id} creator={creator} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* All Creators Section */}
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h2 className="text-2xl font-bold tracking-tight">All Creators</h2>
                <p className="text-muted-foreground">Browse all creators on the platform</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {allCreators.map((creator) => (
                <CreatorCard key={creator.id} creator={creator} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Become a Creator CTA */}
      <section className="w-full py-12 md:py-24 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Ready to Share Your Creations?</h2>
              <p className="max-w-[700px] md:text-xl/relaxed">
                Join Slydr as a creator and start earning from your digital content with our unique resale model.
              </p>
            </div>
            <Button asChild size="lg" variant="secondary">
              <Link href="/dashboard/create">
                Become a Creator
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}

function CreatorCard({ creator }: { creator: any }) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div className="aspect-square relative">
        <Image
          src={creator.avatar || "/placeholder.svg"}
          alt={creator.name}
          fill
          className="object-cover transition-all hover:scale-105"
        />
      </div>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-bold text-lg">{creator.name}</h3>
            <p className="text-sm text-muted-foreground">{creator.handle}</p>
          </div>
          <div className="flex gap-1">
            {creator.verified && (
              <Badge variant="outline" className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20">
                <Award className="h-3 w-3 mr-1" />
                Verified
              </Badge>
            )}
            {creator.trending && (
              <Badge variant="outline" className="bg-orange-500/10 text-orange-500 hover:bg-orange-500/20">
                <TrendingUp className="h-3 w-3 mr-1" />
                Trending
              </Badge>
            )}
          </div>
        </div>
        <p className="mt-2 text-sm line-clamp-2">{creator.bio}</p>
        <div className="mt-3 flex flex-wrap gap-1">
          {creator.categories.map((category: string) => (
            <Badge key={category} variant="secondary" className="text-xs">
              {category}
            </Badge>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between text-sm">
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1 text-muted-foreground" />
            <span>{creator.followers.toLocaleString()} followers</span>
          </div>
          <div>
            <span>{creator.contentCount} items</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full">
          <Link href={`/creator/${creator.id}`}>View Profile</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

