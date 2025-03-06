import type React from "react"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, BookOpen, Download, Play, Video } from "lucide-react"

export const metadata: Metadata = {
  title: "Resources | Slydr",
  description: "Resources, guides, and tools for the Slydr platform",
}

export default function ResourcesPage() {
  return (
    <main className="flex-1">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm">
                <span className="font-medium text-primary">Resources</span>
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Slydr Platform Resources</h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Everything you need to succeed on Slydr - guides, tools, templates, and more
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <Tabs defaultValue="guides" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="grid w-full max-w-md grid-cols-4">
                <TabsTrigger value="guides">Guides</TabsTrigger>
                <TabsTrigger value="templates">Templates</TabsTrigger>
                <TabsTrigger value="videos">Videos</TabsTrigger>
                <TabsTrigger value="tools">Tools</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="guides" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <ResourceCard
                  title="Complete Beginner's Guide"
                  description="Everything you need to know to get started with Slydr"
                  icon={<BookOpen className="h-8 w-8" />}
                  href="/guides/beginners-guide"
                />
                <ResourceCard
                  title="Creator Success Guide"
                  description="Strategies for maximizing your earnings as a creator"
                  icon={<BookOpen className="h-8 w-8" />}
                  href="/guides/creator-success"
                />
                <ResourceCard
                  title="Fan Promotion Playbook"
                  description="How to effectively promote content and earn from resales"
                  icon={<BookOpen className="h-8 w-8" />}
                  href="/guides/fan-promotion"
                />
                <ResourceCard
                  title="Wallet Setup Guide"
                  description="Step-by-step instructions for setting up your Solana wallet"
                  icon={<BookOpen className="h-8 w-8" />}
                  href="/guides/wallet-setup"
                />
                <ResourceCard
                  title="Content Optimization Guide"
                  description="Tips for creating content that sells well on Slydr"
                  icon={<BookOpen className="h-8 w-8" />}
                  href="/guides/content-optimization"
                />
                <ResourceCard
                  title="Analytics & Reporting Guide"
                  description="How to use Slydr's analytics to grow your audience"
                  icon={<BookOpen className="h-8 w-8" />}
                  href="/guides/analytics"
                />
              </div>

              <div className="flex justify-center mt-8">
                <Button asChild>
                  <Link href="/guides">
                    View All Guides
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="templates" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <TemplateCard
                  title="Creator Profile Template"
                  description="Optimize your creator profile with this template"
                  image="/placeholder.svg?height=200&width=300"
                  href="/templates/creator-profile"
                />
                <TemplateCard
                  title="Content Description Template"
                  description="Write compelling content descriptions that sell"
                  image="/placeholder.svg?height=200&width=300"
                  href="/templates/content-description"
                />
                <TemplateCard
                  title="Social Media Promotion Kit"
                  description="Templates for promoting your content on social media"
                  image="/placeholder.svg?height=200&width=300"
                  href="/templates/social-media-kit"
                />
                <TemplateCard
                  title="Email Newsletter Template"
                  description="Keep your fans updated with this newsletter template"
                  image="/placeholder.svg?height=200&width=300"
                  href="/templates/newsletter"
                />
                <TemplateCard
                  title="Content Launch Checklist"
                  description="Ensure a successful content launch with this checklist"
                  image="/placeholder.svg?height=200&width=300"
                  href="/templates/launch-checklist"
                />
                <TemplateCard
                  title="Pricing Strategy Worksheet"
                  description="Determine the optimal pricing for your content"
                  image="/placeholder.svg?height=200&width=300"
                  href="/templates/pricing-worksheet"
                />
              </div>
            </TabsContent>

            <TabsContent value="videos" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <VideoCard
                  title="Slydr Platform Overview"
                  description="A comprehensive overview of the Slydr platform"
                  thumbnail="/placeholder.svg?height=200&width=300"
                  duration="10:23"
                  href="/videos/platform-overview"
                />
                <VideoCard
                  title="Creating Your First Content"
                  description="Step-by-step guide to uploading your first content"
                  thumbnail="/placeholder.svg?height=200&width=300"
                  duration="8:45"
                  href="/videos/first-content"
                />
                <VideoCard
                  title="Wallet Setup Tutorial"
                  description="How to set up and connect your Solana wallet"
                  thumbnail="/placeholder.svg?height=200&width=300"
                  duration="6:12"
                  href="/videos/wallet-setup"
                />
                <VideoCard
                  title="Reselling Content Guide"
                  description="Learn how to effectively resell content as a fan"
                  thumbnail="/placeholder.svg?height=200&width=300"
                  duration="9:37"
                  href="/videos/reselling-guide"
                />
                <VideoCard
                  title="Creator Dashboard Walkthrough"
                  description="Tour of the creator dashboard and analytics"
                  thumbnail="/placeholder.svg?height=200&width=300"
                  duration="7:58"
                  href="/videos/dashboard-walkthrough"
                />
                <VideoCard
                  title="Advanced Promotion Strategies"
                  description="Expert tips for promoting content effectively"
                  thumbnail="/placeholder.svg?height=200&width=300"
                  duration="12:05"
                  href="/videos/promotion-strategies"
                />
              </div>

              <div className="flex justify-center mt-8">
                <Button asChild>
                  <Link href="/videos">
                    View All Videos
                    <Video className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="tools" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <ToolCard
                  title="Royalty Calculator"
                  description="Calculate potential earnings from content sales and resales"
                  href="/tools/royalty-calculator"
                />
                <ToolCard
                  title="Content Pricing Assistant"
                  description="Get recommendations for optimal content pricing"
                  href="/tools/pricing-assistant"
                />
                <ToolCard
                  title="Promotion Link Generator"
                  description="Create trackable promotion links for content"
                  href="/tools/link-generator"
                />
                <ToolCard
                  title="Audience Analytics Dashboard"
                  description="Analyze your audience demographics and behavior"
                  href="/tools/audience-analytics"
                />
                <ToolCard
                  title="Content Performance Tracker"
                  description="Track the performance of your content over time"
                  href="/tools/performance-tracker"
                />
                <ToolCard
                  title="Wallet Balance Monitor"
                  description="Monitor your Solana wallet balance and transactions"
                  href="/tools/wallet-monitor"
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Featured Resource */}
      <section className="w-full py-12 md:py-24 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm mb-4">
                <span className="font-medium text-primary">Featured Resource</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tighter mb-4">The Complete Slydr Playbook</h2>
              <p className="text-muted-foreground mb-6">
                Our comprehensive guide covering everything you need to know about Slydr - from getting started to
                advanced strategies for creators and fans. This 50-page playbook is packed with actionable insights,
                tips, and examples to help you succeed on the platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg">
                  <Link href="/resources/slydr-playbook">
                    Download Now
                    <Download className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/resources/playbook-preview">
                    Preview
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative aspect-video rounded-lg overflow-hidden shadow-xl">
              <Image src="/placeholder.svg?height=400&width=600" alt="Slydr Playbook" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Stay Updated with New Resources</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                Subscribe to our newsletter to receive the latest guides, templates, and tools
              </p>
            </div>
            <div className="w-full max-w-md space-y-2">
              <form className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 min-w-0 px-4 py-2 rounded-md border border-input bg-background"
                  required
                />
                <Button type="submit">Subscribe</Button>
              </form>
              <p className="text-xs text-muted-foreground">We respect your privacy. Unsubscribe at any time.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

function ResourceCard({
  title,
  description,
  icon,
  href,
}: { title: string; description: string; icon: React.ReactNode; href: string }) {
  return (
    <Card className="transition-all hover:shadow-md">
      <CardHeader>
        <div className="text-primary">{icon}</div>
        <CardTitle className="mt-2">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button asChild variant="ghost" className="w-full">
          <Link href={href}>
            Read Guide
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

function TemplateCard({
  title,
  description,
  image,
  href,
}: { title: string; description: string; image: string; href: string }) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="aspect-video relative">
        <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
      </div>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={href}>
            Download Template
            <Download className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

function VideoCard({
  title,
  description,
  thumbnail,
  duration,
  href,
}: { title: string; description: string; thumbnail: string; duration: string; href: string }) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="aspect-video relative group">
        <Image src={thumbnail || "/placeholder.svg"} alt={title} fill className="object-cover" />
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="rounded-full bg-white/90 p-3">
            <Play className="h-6 w-6 text-primary fill-current" />
          </div>
        </div>
        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">{duration}</div>
      </div>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button asChild variant="outline" className="w-full">
          <Link href={href}>
            Watch Video
            <Play className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

function ToolCard({ title, description, href }: { title: string; description: string; href: string }) {
  return (
    <Card className="transition-all hover:shadow-md">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={href}>
            Use Tool
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

