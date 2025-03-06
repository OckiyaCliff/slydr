import type React from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, Book, Code, FileText, Lightbulb, Search } from "lucide-react"

export const metadata: Metadata = {
  title: "Documentation | Slydr",
  description: "Technical documentation and guides for the Slydr platform",
}

export default function DocumentationPage() {
  return (
    <main className="flex-1">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm">
                <span className="font-medium text-primary">Documentation</span>
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Slydr Platform Documentation
              </h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Comprehensive guides, API references, and examples to help you get the most out of Slydr
              </p>
            </div>
            <div className="w-full max-w-md space-y-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <input
                  type="search"
                  placeholder="Search documentation..."
                  className="w-full bg-background py-2 pl-8 pr-4 rounded-md border border-input ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <Tabs defaultValue="getting-started" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="grid w-full max-w-md grid-cols-3">
                <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
                <TabsTrigger value="guides">Guides</TabsTrigger>
                <TabsTrigger value="api">API Reference</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="getting-started" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <DocCard
                  icon={<Book className="h-8 w-8" />}
                  title="Introduction to Slydr"
                  description="Learn about Slydr's mission, features, and how it works"
                  href="/docs/introduction"
                />
                <DocCard
                  icon={<Lightbulb className="h-8 w-8" />}
                  title="Quick Start Guide"
                  description="Get up and running with Slydr in just a few minutes"
                  href="/docs/quick-start"
                />
                <DocCard
                  icon={<FileText className="h-8 w-8" />}
                  title="Core Concepts"
                  description="Understand the key concepts behind Slydr's platform"
                  href="/docs/core-concepts"
                />
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight">Platform Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>For Creators</CardTitle>
                      <CardDescription>Learn how to monetize your content with Slydr</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p>• Creating and uploading content</p>
                      <p>• Setting prices and royalty percentages</p>
                      <p>• Managing your creator profile</p>
                      <p>• Tracking sales and analytics</p>
                    </CardContent>
                    <CardFooter>
                      <Button asChild variant="outline" className="w-full">
                        <Link href="/docs/creators">
                          Read Creator Guide
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>For Fans</CardTitle>
                      <CardDescription>Discover how to buy, promote, and resell content</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p>• Browsing and purchasing content</p>
                      <p>• Understanding resale rights</p>
                      <p>• Promoting content to earn</p>
                      <p>• Managing your collection</p>
                    </CardContent>
                    <CardFooter>
                      <Button asChild variant="outline" className="w-full">
                        <Link href="/docs/fans">
                          Read Fan Guide
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="guides" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <DocCard
                  icon={<Code className="h-8 w-8" />}
                  title="Wallet Setup"
                  description="How to set up and connect your Solana wallet"
                  href="/docs/guides/wallet-setup"
                />
                <DocCard
                  icon={<Code className="h-8 w-8" />}
                  title="Content Creation"
                  description="Step-by-step guide to creating and publishing content"
                  href="/docs/guides/content-creation"
                />
                <DocCard
                  icon={<Code className="h-8 w-8" />}
                  title="Purchasing Content"
                  description="How to buy content and understand your rights"
                  href="/docs/guides/purchasing"
                />
                <DocCard
                  icon={<Code className="h-8 w-8" />}
                  title="Reselling Content"
                  description="Guide to promoting and reselling content"
                  href="/docs/guides/reselling"
                />
                <DocCard
                  icon={<Code className="h-8 w-8" />}
                  title="Royalty Distribution"
                  description="Understanding how royalties work on Slydr"
                  href="/docs/guides/royalties"
                />
                <DocCard
                  icon={<Code className="h-8 w-8" />}
                  title="Analytics & Tracking"
                  description="How to track your earnings and performance"
                  href="/docs/guides/analytics"
                />
              </div>
            </TabsContent>

            <TabsContent value="api" className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight">API Reference</h2>
                <p className="text-muted-foreground">
                  Comprehensive documentation for Slydr's API endpoints and smart contracts
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>REST API</CardTitle>
                      <CardDescription>HTTP endpoints for interacting with the Slydr platform</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p>• Authentication</p>
                      <p>• Content endpoints</p>
                      <p>• User endpoints</p>
                      <p>• Analytics endpoints</p>
                    </CardContent>
                    <CardFooter>
                      <Button asChild variant="outline" className="w-full">
                        <Link href="/docs/api/rest">
                          View REST API Docs
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Smart Contracts</CardTitle>
                      <CardDescription>Documentation for Slydr's Solana smart contracts</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p>• Contract architecture</p>
                      <p>• Account structures</p>
                      <p>• Instructions</p>
                      <p>• Error codes</p>
                    </CardContent>
                    <CardFooter>
                      <Button asChild variant="outline" className="w-full">
                        <Link href="/docs/api/smart-contracts">
                          View Smart Contract Docs
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </div>

                <div className="mt-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>SDK Documentation</CardTitle>
                      <CardDescription>Client libraries for integrating with Slydr</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Button asChild variant="outline">
                          <Link href="/docs/sdk/javascript">JavaScript SDK</Link>
                        </Button>
                        <Button asChild variant="outline">
                          <Link href="/docs/sdk/python">Python SDK</Link>
                        </Button>
                        <Button asChild variant="outline">
                          <Link href="/docs/sdk/rust">Rust SDK</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </main>
  )
}

function DocCard({
  icon,
  title,
  description,
  href,
}: { icon: React.ReactNode; title: string; description: string; href: string }) {
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
            Read More
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

