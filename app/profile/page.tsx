"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useUser } from "@/context/user-context"
import { Loader2, Edit, LogOut } from "lucide-react"

export default function ProfilePage() {
  const router = useRouter()
  const { user, logout } = useUser()
  const [contents, setContents] = useState([])
  const [transactions, setTransactions] = useState([])
  const [followers, setFollowers] = useState([])
  const [following, setFollowing] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [showFollowers, setShowFollowers] = useState(false)
  const [showFollowing, setShowFollowing] = useState(false)

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return

      try {
        // Fetch user's content
        const contentsResponse = await fetch(`/api/contents/creator/${user.id}`)
        if (contentsResponse.ok) {
          const contentsData = await contentsResponse.json()
          setContents(contentsData)
        }

        // Fetch user's transactions
        const transactionsResponse = await fetch(`/api/users/${user.id}/transactions`)
        if (transactionsResponse.ok) {
          const transactionsData = await transactionsResponse.json()
          setTransactions(transactionsData)
        }

        // Fetch followers
        const followersResponse = await fetch(`/api/users/${user.id}/followers`)
        if (followersResponse.ok) {
          const followersData = await followersResponse.json()
          setFollowers(followersData)
        }

        // Fetch following
        const followingResponse = await fetch(`/api/users/${user.id}/following`)
        if (followingResponse.ok) {
          const followingData = await followingResponse.json()
          setFollowing(followingData)
        }
      } catch (error) {
        console.error("Error fetching user data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserData()
  }, [user])

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Please connect your wallet</h1>
          <p className="text-muted-foreground mb-4">You need to connect your wallet to view your profile.</p>
          <Button onClick={() => router.push("/")}>Go to Home</Button>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="container py-8">
      {/* Cover Image */}
      <div className="relative h-64 w-full rounded-lg overflow-hidden mb-16">
        <Image
          src={user.cover_image_url || "/placeholder.svg?height=400&width=1200"}
          alt={`${user.display_name}'s cover`}
          fill
          className="object-cover"
        />
        <Button
          variant="outline"
          size="sm"
          className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm"
          onClick={() => router.push("/settings")}
        >
          <Edit className="h-4 w-4 mr-2" />
          Edit Profile
        </Button>
      </div>

      {/* Profile Header */}
      <div className="flex flex-col md:flex-row gap-8 mb-8">
        <div className="relative -mt-24 md:-mt-32">
          <div className="relative h-32 w-32 md:h-48 md:w-48 rounded-full overflow-hidden border-4 border-background">
            <Image
              src={user.avatar_url || "/placeholder.svg?height=200&width=200"}
              alt={user.display_name}
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">{user.display_name}</h1>
              <p className="text-muted-foreground">@{user.username}</p>
            </div>

            <Button variant="outline" onClick={logout}>
              <LogOut className="h-4 w-4 mr-2" />
              Disconnect
            </Button>
          </div>

          <div className="mt-4">
            <p>{user.bio}</p>
          </div>

          <div className="flex items-center gap-6 mt-4">
            <button onClick={() => setShowFollowers(true)} className="flex items-center gap-2 hover:underline">
              <span className="font-bold">{followers.length}</span> Followers
            </button>
            <button onClick={() => setShowFollowing(true)} className="flex items-center gap-2 hover:underline">
              <span className="font-bold">{following.length}</span> Following
            </button>
            <span className="flex items-center gap-2">
              <span className="font-bold">{contents.length}</span> Creations
            </span>
          </div>
        </div>
      </div>

      <Separator className="my-8" />

      {/* Content Tabs */}
      <Tabs defaultValue="creations">
        <TabsList className="mb-8">
          <TabsTrigger value="creations">My Creations</TabsTrigger>
          <TabsTrigger value="purchases">My Purchases</TabsTrigger>
          <TabsTrigger value="sales">My Sales</TabsTrigger>
        </TabsList>

        <TabsContent value="creations">
          {contents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {contents.map((content: any) => (
                <div
                  key={content.id}
                  className="rounded-lg overflow-hidden border cursor-pointer"
                  onClick={() => router.push(`/content/${content.id}`)}
                >
                  <div className="relative aspect-video">
                    <Image
                      src={`https://arweave.net/${content.thumbnail_transaction_id}`}
                      alt={content.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold">{content.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{content.description}</p>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-sm text-muted-foreground capitalize">{content.category}</span>
                      <span className="font-bold">{content.price} SOL</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">You haven't created any content yet</p>
              <Button onClick={() => router.push("/dashboard/create")}>Create Content</Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="purchases">
          {transactions.filter((tx: any) => tx.buyer_id === user.id).length > 0 ? (
            <div className="space-y-4">
              {transactions
                .filter((tx: any) => tx.buyer_id === user.id)
                .map((transaction: any) => (
                  <div
                    key={transaction.id}
                    className="flex items-center gap-4 p-4 border rounded-lg cursor-pointer"
                    onClick={() => router.push(`/content/${transaction.content_id}`)}
                  >
                    <div className="relative h-16 w-16 rounded overflow-hidden">
                      <Image
                        src={`https://arweave.net/${transaction.content.thumbnail_transaction_id}`}
                        alt={transaction.content.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{transaction.content.title}</h3>
                      <p className="text-sm text-muted-foreground">Purchased from {transaction.seller.display_name}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{transaction.price} SOL</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(transaction.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">You haven't purchased any content yet</p>
              <Button onClick={() => router.push("/marketplace")}>Browse Marketplace</Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="sales">
          {transactions.filter((tx: any) => tx.seller_id === user.id).length > 0 ? (
            <div className="space-y-4">
              {transactions
                .filter((tx: any) => tx.seller_id === user.id)
                .map((transaction: any) => (
                  <div key={transaction.id} className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className="relative h-16 w-16 rounded overflow-hidden">
                      <Image
                        src={`https://arweave.net/${transaction.content.thumbnail_transaction_id}`}
                        alt={transaction.content.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{transaction.content.title}</h3>
                      <p className="text-sm text-muted-foreground">Sold to {transaction.buyer.display_name}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{transaction.price} SOL</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(transaction.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">You haven't sold any content yet</p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Followers Modal */}
      {showFollowers && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background rounded-lg p-6 max-w-md w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Followers</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowFollowers(false)}>
                ✕
              </Button>
            </div>

            {followers.length > 0 ? (
              <div className="space-y-4">
                {followers.map((follower: any) => (
                  <div
                    key={follower.id}
                    className="flex items-center gap-4 cursor-pointer"
                    onClick={() => {
                      setShowFollowers(false)
                      router.push(`/creator/${follower.id}`)
                    }}
                  >
                    <div className="relative h-10 w-10 rounded-full overflow-hidden">
                      <Image
                        src={follower.avatar_url || "/placeholder.svg?height=40&width=40"}
                        alt={follower.display_name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{follower.display_name}</p>
                      <p className="text-sm text-muted-foreground">@{follower.username}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center py-4 text-muted-foreground">No followers yet</p>
            )}
          </div>
        </div>
      )}

      {/* Following Modal */}
      {showFollowing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background rounded-lg p-6 max-w-md w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Following</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowFollowing(false)}>
                ✕
              </Button>
            </div>

            {following.length > 0 ? (
              <div className="space-y-4">
                {following.map((followed: any) => (
                  <div
                    key={followed.id}
                    className="flex items-center gap-4 cursor-pointer"
                    onClick={() => {
                      setShowFollowing(false)
                      router.push(`/creator/${followed.id}`)
                    }}
                  >
                    <div className="relative h-10 w-10 rounded-full overflow-hidden">
                      <Image
                        src={followed.avatar_url || "/placeholder.svg?height=40&width=40"}
                        alt={followed.display_name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{followed.display_name}</p>
                      <p className="text-sm text-muted-foreground">@{followed.username}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center py-4 text-muted-foreground">Not following anyone yet</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

