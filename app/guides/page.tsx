import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Clock, Eye } from "lucide-react"

export const metadata: Metadata = {
  title: "Guides | Slydr",
  description: "Step-by-step guides to help you get the most out of Slydr",
}

// Mock data for guides
const guides = [
  {
    id: "getting-started",
    title: "Getting Started with Slydr",
    description: "Learn the basics of Slydr and how to set up your account",
    image: "/placeholder.svg?height=400&width=600",
    category: "Beginner",
    readTime: "5 min read",
    views: 1240,
    featured: true,
  },
  {
    id: "creator-guide",
    title: "Complete Creator Guide",
    description: "Everything you need to know about creating and selling content on Slydr",
    image: "/placeholder.svg?height=400&width=600",
    category: "Creator",
    readTime: "15 min read",
    views: 890,
    featured: true,
  },
  {
    id: "wallet-setup",
    title: "Setting Up Your Solana Wallet",
    description: "A step-by-step guide to setting up and connecting your Solana wallet",
    image: "/placeholder.svg?height=400&width=600",
    category: "Beginner",
    readTime: "8 min read",
    views: 1560,
    featured: false,
  },
  {
    id: "content-creation",
    title: "Creating Your First Content Piece",
    description: "Learn how to create, price, and publish your first content on Slydr",
    image: "/placeholder.svg?height=400&width=600",
    category: "Creator",
    readTime: "12 min read",
    views: 720,
    featured: false,
  },
  {
    id: "resale-rights",
    title: "Understanding Resale Rights",
    description: "A comprehensive guide to how resale rights work on Slydr",
    image: "/placeholder.svg?height=400&width=600",
    category: "Intermediate",
    readTime: "10 min read",
    views: 950,
    featured: true,
  },
  {
    id: "promoting-content",
    title: "Promoting Content as a Fan",
    description: "How to effectively promote content and maximize your earnings",
    image: "/placeholder.svg?height=400&width=600",
    category: "Fan",
    readTime: "7 min read",
    views: 680,
    featured: false,
  },
  {
    id: "royalties",
    title: "Royalty Distribution Explained",
    description: "How royalties are calculated and distributed on Slydr",
    image: "/placeholder.svg?height=400&width=600",
    category: "Intermediate",
    readTime: "9 min read",
    views: 810,
    featured: false,
  },
  {
    id: "analytics",
    title: "Using Analytics to Grow Your Audience",
    description: "How to use Slydr's analytics tools to grow your audience and increase sales",
    image: "/placeholder.svg?height=400&width=600",
    category: "Creator",
    readTime: "11 min read",
    views: 540,
    featured: false,
  },
]

// Filter guides
const featuredGuides = guides.filter((guide) => guide.featured)
const beginnerGuides = guides.filter((guide) => guide.category === "Beginner")
const creatorGuides = guides.filter((guide) => guide.category === "Creator")
const fanGuides = guides.filter((guide) => guide.category === "Fan")

export default function GuidesPage() {
  return (
    <main className="flex-1">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm">
                <span className="font-medium text-primary">Learn</span>
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Slydr Platform Guides</h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Step-by-step guides to help you get the most out of Slydr
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Guides */}
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col gap-8">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold tracking-tight">Featured Guides</h2>
              <p className="text-muted-foreground">Our most popular and essential guides to get you started</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredGuides.map((guide) => (
                <GuideCard key={guide.id} guide={guide} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Guide Categories */}
      <section className="w-full py-12 md:py-24 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col gap-12">
            {/* Beginner Guides */}
            <div className="space-y-6">
              <div className="space-y-1">
                <h2 className="text-2xl font-bold tracking-tight">For Beginners</h2>
                <p className="text-muted-foreground">
                  Essential guides for those new to Slydr and blockchain technology
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {beginnerGuides.map((guide) => (
                  <GuideCard key={guide.id} guide={guide} />
                ))}
              </div>
            </div>

            {/* Creator Guides */}
            <div className="space-y-6">
              <div className="space-y-1">
                <h2 className="text-2xl font-bold tracking-tight">For Creators</h2>
                <p className="text-muted-foreground">
                  Guides to help creators publish, promote, and monetize their content
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {creatorGuides.map((guide) => (
                  <GuideCard key={guide.id} guide={guide} />
                ))}
              </div>
            </div>

            {/* Fan Guides */}
            <div className="space-y-6">
              <div className="space-y-1">
                <h2 className="text-2xl font-bold tracking-tight">For Fans</h2>
                <p className="text-muted-foreground">Learn how to discover, purchase, and resell content as a fan</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {fanGuides.map((guide) => (
                  <GuideCard key={guide.id} guide={guide} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Request Guide CTA */}
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Can't Find What You're Looking For?</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                Request a guide on a specific topic and our team will create it for you
              </p>
            </div>
            <Button asChild size="lg">
              <Link href="/support">
                Request a Guide
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}

function GuideCard({ guide }: { guide: any }) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="aspect-video relative">
        <Image src={guide.image || "/placeholder.svg"} alt={guide.title} fill className="object-cover" />
      </div>
      <CardHeader>
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="bg-primary/10 text-primary hover:bg-primary/20">
            {guide.category}
          </Badge>
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="mr-1 h-3 w-3" />
            {guide.readTime}
          </div>
        </div>
        <CardTitle className="line-clamp-2">{guide.title}</CardTitle>
        <CardDescription className="line-clamp-2">{guide.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center text-sm text-muted-foreground">
          <Eye className="mr-1 h-3 w-3" />
          {guide.views.toLocaleString()} views
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={`/guides/${guide.id}`}>
            Read Guide
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

