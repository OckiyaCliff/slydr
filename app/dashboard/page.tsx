"use client"

import { useEffect, useState } from "react"
import { useUser } from "@/context/user-context"
import { useWallet } from "@/context/wallet-context"
import { useContentStore } from "@/store/content-store"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, Upload, DollarSign, Users, Wallet, Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { OnboardingFlow } from "@/components/onboarding/onboarding-flow"
import type { ContentMetadata } from "@/services/arweave-service"

// Import role-specific dashboards
import MusicianDashboard from "./musician-dashboard"
import ArtistDashboard from "./artist-dashboard"
import WriterDashboard from "./writer-dashboard"
import PodcasterDashboard from "./podcaster-dashboard"
import FilmmakerDashboard from "./filmmaker-dashboard"

export default function DashboardPage() {
  const { user, isLoading: userLoading } = useUser()
  const { publicKey, connected } = useWallet()
  const {
    userContents,
    userPurchases,
    isLoading: contentLoading,
    error,
    fetchUserContents,
    fetchUserPurchases,
  } = useContentStore()
  const router = useRouter()
  const [stats, setStats] = useState({
    revenue: 0,
    sales: 0,
    creations: 0,
    followers: 0,
  })

  // Redirect if not logged in
  useEffect(() => {
    if (!userLoading && !user) {
      router.push("/")
    }
  }, [userLoading, user, router])

  // Fetch user content and purchases when user is loaded
  useEffect(() => {
    if (user) {
      fetchUserContents(user.id)
      fetchUserPurchases(user.id)

      // Set stats from user data
      setStats({
        revenue: 0, // This would come from blockchain in a real app
        sales: user.stats.sales,
        creations: user.stats.creations,
        followers: user.stats.followers,
      })
    }
  }, [user, fetchUserContents, fetchUserPurchases])

  if (userLoading || !user) {
    return <div className="container py-12">Loading dashboard...</div>
  }

  // Render role-specific dashboard based on user role
  const renderRoleDashboard = () => {
    switch (user.role) {
      case "musician":
        return <MusicianDashboard user={user} stats={stats} contents={userContents} />
      case "artist":
        return <ArtistDashboard user={user} stats={stats} contents={userContents} />
      case "writer":
        return <WriterDashboard user={user} stats={stats} contents={userContents} />
      case "podcaster":
        return <PodcasterDashboard user={user} stats={stats} contents={userContents} />
      case "filmmaker":
        return <FilmmakerDashboard user={user} stats={stats} contents={userContents} />
      default:
        return <FanDashboard />
    }
  }

  // Default Fan Dashboard
  const FanDashboard = () => (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Manage your content, track sales, and monitor your performance</p>
        </div>
        <div className="flex gap-4">
          <Button asChild variant="outline">
            <Link href="/profile">View Profile</Link>
          </Button>
          <Button asChild>
            <Link href="/marketplace">
              <Plus className="mr-2 h-4 w-4" />
              Explore Marketplace
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0.00 SOL</div>
            <p className="text-xs text-muted-foreground">+0% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Items Collected</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userPurchases.length}</div>
            <p className="text-xs text-muted-foreground">+0 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Following</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{user.stats.following}</div>
            <p className="text-xs text-muted-foreground">+0 new this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reselling</CardTitle>
            <Upload className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">+0 new this month</p>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Wallet</CardTitle>
          <CardDescription>Your connected wallet and balance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <Wallet className="h-10 w-10 text-primary" />
            <div>
              <p className="text-sm font-medium">
                {connected && publicKey ? truncateAddress(publicKey.toString()) : "Not connected"}
              </p>
              <p className="text-xs text-muted-foreground">Solana</p>
            </div>
          </div>
          <div className="mt-6 space-y-2">
            <div className="flex justify-between">
              <p className="text-sm">Balance:</p>
              <p className="text-sm font-medium">0.00 SOL</p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm">Pending:</p>
              <p className="text-sm font-medium">0.00 SOL</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full" disabled={!connected || !publicKey}>
            View on Explorer
          </Button>
        </CardFooter>
      </Card>

      <Tabs defaultValue="collected">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="collected">Collected</TabsTrigger>
          <TabsTrigger value="reselling">Reselling</TabsTrigger>
        </TabsList>
        <TabsContent value="collected" className="mt-6">
          {contentLoading ? (
            <p>Loading your collected items...</p>
          ) : error ? (
            <p className="text-destructive">{error}</p>
          ) : userPurchases.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {userPurchases.map((content) => (
                <ContentCard key={content.id} content={content} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">You haven't collected any items yet.</p>
              <Button className="mt-4" asChild>
                <Link href="/marketplace">Explore Marketplace</Link>
              </Button>
            </div>
          )}
        </TabsContent>
        <TabsContent value="reselling" className="mt-6">
          <div className="text-center py-12">
            <p className="text-muted-foreground">You aren't reselling any items yet.</p>
            <Button className="mt-4" asChild>
              <Link href="/marketplace">Start Reselling</Link>
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  return (
    <>
      <OnboardingFlow />
      {renderRoleDashboard()}
    </>
  )
}

// Content card component
function ContentCard({ content }: { content: ContentMetadata }) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="aspect-square relative">
        <Image
          src={
            content.thumbnailTransactionId
              ? `https://arweave.net/${content.thumbnailTransactionId}`
              : "/placeholder.svg?height=400&width=400"
          }
          alt={content.title}
          fill
          className="object-cover"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="font-medium truncate">{content.title}</h3>
        <div className="flex justify-between items-center mt-2">
          <p className="text-sm font-semibold">{content.price} SOL</p>
          <p className="text-xs text-primary">Resale: {content.resaleRoyalty}%</p>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button variant="ghost" className="w-full" asChild>
          <Link href={`/content/${content.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

