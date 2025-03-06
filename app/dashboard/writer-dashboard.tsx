"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, FileText, Eye, BarChart3, Users, Clock, Plus, BookMarked } from "lucide-react"
import type { UserProfile } from "@/context/user-context"
import type { ContentMetadata } from "@/services/arweave-service"

interface WriterDashboardProps {
  user: UserProfile
  stats: {
    revenue: number
    sales: number
    creations: number
    followers: number
  }
  contents: ContentMetadata[]
}

export default function WriterDashboard({ user, stats, contents }: WriterDashboardProps) {
  return (
    <div className="container py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <BookOpen className="h-8 w-8 text-primary" /> Writer Dashboard
          </h1>
          <p className="text-muted-foreground">
            Manage your published work, track reader engagement, and analyze your performance
          </p>
        </div>
        <div className="flex gap-4">
          <Button asChild variant="outline">
            <Link href="/profile">View Profile</Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard/create">
              <Plus className="mr-2 h-4 w-4" />
              Publish New Work
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card className="bg-primary/10 border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Publications</CardTitle>
            <FileText className="h-4 w-4 text-primary" />
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
            <CardTitle className="text-sm font-medium">Readers</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.sales * 5}</div>
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

      {/* Main Content */}
      <div className="grid gap-8 md:grid-cols-3 mb-8">
        {/* Recent Publications */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Recent Publications</CardTitle>
            <CardDescription>Your latest published content</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {contents.length > 0 ? (
                contents.slice(0, 5).map((content) => (
                  <div key={content.id} className="flex gap-4 p-2 hover:bg-muted rounded-md group">
                    <div className="relative h-16 w-16 rounded overflow-hidden flex-shrink-0">
                      <Image
                        src={
                          content.thumbnailTransactionId
                            ? `https://arweave.net/${content.thumbnailTransactionId}`
                            : "/placeholder.svg?height=64&width=64"
                        }
                        alt={content.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate">{content.title}</h4>
                      <p className="text-xs text-muted-foreground">
                        Published {new Date(content.createdAt).toLocaleDateString()}
                      </p>
                      <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" /> {Math.floor(Math.random() * 200) + 50} reads
                        </span>
                        <span className="flex items-center gap-1">
                          <BookMarked className="h-3 w-3" /> {Math.floor(Math.random() * 20) + 5} saves
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      asChild
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Link href={`/content/${content.id}`}>View</Link>
                    </Button>
                  </div>
                ))
              ) : (
                <div className="text-center py-6">
                  <p className="text-muted-foreground">You haven't published any content yet.</p>
                  <Button className="mt-4" asChild>
                    <Link href="/dashboard/create">Publish Your First Work</Link>
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/dashboard/publications">View All Publications</Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Drafts & Reading Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Drafts & Insights</CardTitle>
            <CardDescription>Your work in progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">Drafts</h3>
                  <Button variant="ghost" size="sm" className="h-8 text-xs">
                    View All
                  </Button>
                </div>
                <div className="space-y-2">
                  <div className="p-2 rounded-md border flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Untitled Draft</span>
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" /> 2 days ago
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Top Reading Times</h3>
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Morning (6am-12pm)</span>
                    <span>45%</span>
                  </div>
                  <div className="h-2 w-full bg-muted/50 rounded-full mt-1">
                    <div className="h-full bg-primary rounded-full" style={{ width: "45%" }}></div>
                  </div>
                </div>
                <div className="mt-2">
                  <div className="flex justify-between text-sm">
                    <span>Evening (6pm-12am)</span>
                    <span>32%</span>
                  </div>
                  <div className="h-2 w-full bg-muted/50 rounded-full mt-1">
                    <div className="h-full bg-primary rounded-full" style={{ width: "32%" }}></div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Create New Draft</Button>
          </CardFooter>
        </Card>
      </div>

      {/* Publications grid */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Your Publications</h2>
        {contents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {contents.map((publication) => (
              <PublicationCard key={publication.id} publication={publication} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-muted/20 rounded-lg">
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No Publications Yet</h3>
            <p className="text-muted-foreground mb-4">Start sharing your writing with the world</p>
            <Button asChild>
              <Link href="/dashboard/create">Publish Now</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

// Publication card component
function PublicationCard({ publication }: { publication: ContentMetadata }) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="aspect-[4/3] relative">
        <Image
          src={
            publication.thumbnailTransactionId
              ? `https://arweave.net/${publication.thumbnailTransactionId}`
              : "/placeholder.svg?height=300&width=400"
          }
          alt={publication.title}
          fill
          className="object-cover"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="font-medium truncate">{publication.title}</h3>
        <p className="text-xs text-muted-foreground mt-1">
          Published {new Date(publication.createdAt).toLocaleDateString()}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Eye className="h-3 w-3" /> {Math.floor(Math.random() * 200) + 50}
          </span>
        </div>
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/content/${publication.id}`}>Read</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

