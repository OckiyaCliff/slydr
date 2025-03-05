import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, BookOpen, Lightbulb, Wallet, Layers, Repeat, Shield, Clock } from "lucide-react"

export default function LearnPage() {
  return (
    <div className="container py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">Learn About Slydr</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Discover how Slydr works, learn about blockchain technology, and understand how to make the most of resale
          rights.
        </p>
      </div>

      {/* Featured Guides */}
      <div className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Featured Guides</h2>
          <Button variant="outline" asChild>
            <Link href="/guides">View All Guides</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="overflow-hidden">
            <div className="aspect-video relative">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Getting Started with Slydr"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">Beginner</Badge>
              </div>
            </div>
            <CardHeader>
              <CardTitle>Getting Started with Slydr</CardTitle>
              <CardDescription>Learn the basics of the platform and how to set up your account</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                This comprehensive guide will walk you through the process of setting up your Slydr account, connecting
                your wallet, and navigating the platform.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full justify-between" asChild>
                <Link href="/guides/getting-started">
                  Read Guide <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="overflow-hidden">
            <div className="aspect-video relative">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Understanding Resale Rights"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">Intermediate</Badge>
              </div>
            </div>
            <CardHeader>
              <CardTitle>Understanding Resale Rights</CardTitle>
              <CardDescription>Learn how resale rights work and how to profit from them</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Discover the innovative resale rights model that Slydr offers, how royalties are distributed, and
                strategies to maximize your earnings.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full justify-between" asChild>
                <Link href="/guides/resale-rights">
                  Read Guide <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="overflow-hidden">
            <div className="aspect-video relative">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Solana Blockchain Basics"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">Beginner</Badge>
              </div>
            </div>
            <CardHeader>
              <CardTitle>Solana Blockchain Basics</CardTitle>
              <CardDescription>Learn about the Solana blockchain and how it powers Slydr</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Get familiar with the Solana blockchain, understand wallets, transactions, and why Slydr chose Solana
                for its platform.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full justify-between" asChild>
                <Link href="/guides/solana-basics">
                  Read Guide <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* Topics Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8">Browse Topics</h2>

        <Tabs defaultValue="platform">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="platform">Platform</TabsTrigger>
            <TabsTrigger value="blockchain">Blockchain</TabsTrigger>
            <TabsTrigger value="creators">For Creators</TabsTrigger>
            <TabsTrigger value="fans">For Fans</TabsTrigger>
          </TabsList>

          <TabsContent value="platform" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <BookOpen className="h-8 w-8 text-primary" />
                  <div>
                    <CardTitle>Platform Overview</CardTitle>
                    <CardDescription>Learn about Slydr's features</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <ArrowRight className="h-3 w-3 text-primary" />
                      <Link href="#" className="hover:underline">
                        What is Slydr?
                      </Link>
                    </li>
                    <li className="flex items-center gap-2">
                      <ArrowRight className="h-3 w-3 text-primary" />
                      <Link href="#" className="hover:underline">
                        Platform Features
                      </Link>
                    </li>
                    <li className="flex items-center gap-2">
                      <ArrowRight className="h-3 w-3 text-primary" />
                      <Link href="#" className="hover:underline">
                        Getting Started Guide
                      </Link>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <Wallet className="h-8 w-8 text-primary" />
                  <div>
                    <CardTitle>Wallet & Payments</CardTitle>
                    <CardDescription>Managing your assets</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <ArrowRight className="h-3 w-3 text-primary" />
                      <Link href="#" className="hover:underline">
                        Connecting Your Wallet
                      </Link>
                    </li>
                    <li className="flex items-center gap-2">
                      <ArrowRight className="h-3 w-3 text-primary" />
                      <Link href="#" className="hover:underline">
                        Buying & Selling
                      </Link>
                    </li>
                    <li className="flex items-center gap-2">
                      <ArrowRight className="h-3 w-3 text-primary" />
                      <Link href="#" className="hover:underline">
                        Transaction Fees
                      </Link>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <Shield className="h-8 w-8 text-primary" />
                  <div>
                    <CardTitle>Security & Privacy</CardTitle>
                    <CardDescription>Staying safe on Slydr</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <ArrowRight className="h-3 w-3 text-primary" />
                      <Link href="#" className="hover:underline">
                        Account Security
                      </Link>
                    </li>
                    <li className="flex items-center gap-2">
                      <ArrowRight className="h-3 w-3 text-primary" />
                      <Link href="#" className="hover:underline">
                        Privacy Settings
                      </Link>
                    </li>
                    <li className="flex items-center gap-2">
                      <ArrowRight className="h-3 w-3 text-primary" />
                      <Link href="#" className="hover:underline">
                        Safe Trading Practices
                      </Link>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="blockchain" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <Lightbulb className="h-8 w-8 text-primary" />
                  <div>
                    <CardTitle>Blockchain Basics</CardTitle>
                    <CardDescription>Fundamentals of blockchain</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <ArrowRight className="h-3 w-3 text-primary" />
                      <Link href="#" className="hover:underline">
                        What is Blockchain?
                      </Link>
                    </li>
                    <li className="flex items-center gap-2">
                      <ArrowRight className="h-3 w-3 text-primary" />
                      <Link href="#" className="hover:underline">
                        Decentralization Explained
                      </Link>
                    </li>
                    <li className="flex items-center gap-2">
                      <ArrowRight className="h-3 w-3 text-primary" />
                      <Link href="#" className="hover:underline">
                        Blockchain vs. Traditional Systems
                      </Link>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <Layers className="h-8 w-8 text-primary" />
                  <div>
                    <CardTitle>Solana Blockchain</CardTitle>
                    <CardDescription>Understanding Solana</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <ArrowRight className="h-3 w-3 text-primary" />
                      <Link href="#" className="hover:underline">
                        Why Solana?
                      </Link>
                    </li>
                    <li className="flex items-center gap-2">
                      <ArrowRight className="h-3 w-3 text-primary" />
                      <Link href="#" className="hover:underline">
                        Solana's Architecture
                      </Link>
                    </li>
                    <li className="flex items-center gap-2">
                      <ArrowRight className="h-3 w-3 text-primary" />
                      <Link href="#" className="hover:underline">
                        Proof of History Explained
                      </Link>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <Wallet className="h-8 w-8 text-primary" />
                  <div>
                    <CardTitle>Wallets & Tokens</CardTitle>
                    <CardDescription>Managing digital assets</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <ArrowRight className="h-3 w-3 text-primary" />
                      <Link href="#" className="hover:underline">
                        Types of Wallets
                      </Link>
                    </li>
                    <li className="flex items-center gap-2">
                      <ArrowRight className="h-3 w-3 text-primary" />
                      <Link href="#" className="hover:underline">
                        Securing Your Wallet
                      </Link>
                    </li>
                    <li className="flex items-center gap-2">
                      <ArrowRight className="h-3 w-3 text-primary" />
                      <Link href="#" className="hover:underline">
                        Understanding SOL Token
                      </Link>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="creators" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <BookOpen className="h-8 w-8 text-primary" />
                  <div>
                    <CardTitle>Getting Started</CardTitle>
                    <CardDescription>Begin your creator journey</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <ArrowRight className="h-3 w-3 text-primary" />
                      <Link href="#" className="hover:underline">
                        Creator Account Setup
                      </Link>
                    </li>
                    <li className="flex items-center gap-2">
                      <ArrowRight className="h-3 w-3 text-primary" />
                      <Link href="#" className="hover:underline">
                        Creating Your First Listing
                      </Link>
                    </li>
                    <li className="flex items-center gap-2">
                      <ArrowRight className="h-3 w-3 text-primary" />
                      <Link href="#" className="hover:underline">
                        Building Your Profile
                      </Link>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <Repeat className="h-8 w-8 text-primary" />
                  <div>
                    <CardTitle>Resale Rights</CardTitle>
                    <CardDescription>Maximize your earnings</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <ArrowRight className="h-3 w-3 text-primary" />
                      <Link href="#" className="hover:underline">
                        Setting Resale Terms
                      </Link>
                    </li>
                    <li className="flex items-center gap-2">
                      <ArrowRight className="h-3 w-3 text-primary" />
                      <Link href="#" className="hover:underline">
                        Royalty Strategies
                      </Link>
                    </li>
                    <li className="flex items-center gap-2">
                      <ArrowRight className="h-3 w-3 text-primary" />
                      <Link href="#" className="hover:underline">
                        Tracking Resales
                      </Link>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <Lightbulb className="h-8 w-8 text-primary" />
                  <div>
                    <CardTitle>Growth Strategies</CardTitle>
                    <CardDescription>Expand your audience</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <ArrowRight className="h-3 w-3 text-primary" />
                      <Link href="#" className="hover:underline">
                        Building Your Brand
                      </Link>
                    </li>
                    <li className="flex items-center gap-2">
                      <ArrowRight className="h-3 w-3 text-primary" />
                      <Link href="#" className="hover:underline">
                        Marketing Your Content
                      </Link>
                    </li>
                    <li className="flex items-center gap-2">
                      <ArrowRight className="h-3 w-3 text-primary" />
                      <Link href="#" className="hover:underline">
                        Community Engagement
                      </Link>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="fans" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <BookOpen className="h-8 w-8 text-primary" />
                  <div>
                    <CardTitle>Getting Started</CardTitle>
                    <CardDescription>Begin your fan journey</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <ArrowRight className="h-3 w-3 text-primary" />
                      <Link href="#" className="hover:underline">
                        Setting Up Your Account
                      </Link>
                    </li>
                    <li className="flex items-center gap-2">
                      <ArrowRight className="h-3 w-3 text-primary" />
                      <Link href="#" className="hover:underline">
                        Finding Content to Collect
                      </Link>
                    </li>
                    <li className="flex items-center gap-2">
                      <ArrowRight className="h-3 w-3 text-primary" />
                      <Link href="#" className="hover:underline">
                        Making Your First Purchase
                      </Link>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <Repeat className="h-8 w-8 text-primary" />
                  <div>
                    <CardTitle>Reselling Content</CardTitle>
                    <CardDescription>Earn from promotion</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <ArrowRight className="h-3 w-3 text-primary" />
                      <Link href="#" className="hover:underline">
                        How Reselling Works
                      </Link>
                    </li>
                    <li className="flex items-center gap-2">
                      <ArrowRight className="h-3 w-3 text-primary" />
                      <Link href="#" className="hover:underline">
                        Promotion Strategies
                      </Link>
                    </li>
                    <li className="flex items-center gap-2">
                      <ArrowRight className="h-3 w-3 text-primary" />
                      <Link href="#" className="hover:underline">
                        Maximizing Your Earnings
                      </Link>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <Shield className="h-8 w-8 text-primary" />
                  <div>
                    <CardTitle>Smart Collecting</CardTitle>
                    <CardDescription>Build a valuable collection</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <ArrowRight className="h-3 w-3 text-primary" />
                      <Link href="#" className="hover:underline">
                        Identifying Valuable Content
                      </Link>
                    </li>
                    <li className="flex items-center gap-2">
                      <ArrowRight className="h-3 w-3 text-primary" />
                      <Link href="#" className="hover:underline">
                        Building a Collection Strategy
                      </Link>
                    </li>
                    <li className="flex items-center gap-2">
                      <ArrowRight className="h-3 w-3 text-primary" />
                      <Link href="#" className="hover:underline">
                        Long-term Value Creation
                      </Link>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Video Tutorials */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8">Video Tutorials</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="overflow-hidden">
            <div className="aspect-video relative bg-muted flex items-center justify-center">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Getting Started with Slydr"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <div className="h-16 w-16 rounded-full bg-primary/90 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-8 h-8 text-white"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <CardHeader>
              <CardTitle>Getting Started with Slydr</CardTitle>
              <CardDescription>A complete walkthrough of the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>10:24</span>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <div className="aspect-video relative bg-muted flex items-center justify-center">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="How to Create and Sell Content"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <div className="h-16 w-16 rounded-full bg-primary/90 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-8 h-8 text-white"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <CardHeader>
              <CardTitle>How to Create and Sell Content</CardTitle>
              <CardDescription>A guide for creators on Slydr</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>15:37</span>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <div className="aspect-video relative bg-muted flex items-center justify-center">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Understanding Resale Rights"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <div className="h-16 w-16 rounded-full bg-primary/90 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-8 h-8 text-white"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <CardHeader>
              <CardTitle>Understanding Resale Rights</CardTitle>
              <CardDescription>How to profit from reselling content</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>12:45</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Call to Action */}
      <div className="rounded-lg bg-muted p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Start Your Journey?</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
          Whether you're a creator looking to monetize your content or a fan wanting to support creators and earn from
          promotion, Slydr has everything you need.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild>
            <Link href="/marketplace">Explore Marketplace</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/guides">View All Guides</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

