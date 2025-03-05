"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useWallet } from "@/context/wallet-context"
import { useUser } from "@/context/user-context"
import { useContentStore } from "@/store/content-store"
import {
  Heart,
  Share2,
  MoreHorizontal,
  Clock,
  Tag,
  Users,
  Repeat,
  ShoppingCart,
  CheckCircle,
  ArrowRight,
  MessageCircle,
  Eye,
} from "lucide-react"

// Update the component to use our content store
export default function ContentDetailPage() {
  const { id } = useParams()
  const { connected, publicKey } = useWallet()
  const { user } = useUser()
  const { fetchContentById, purchaseContent, isLoading, error } = useContentStore()
  const [content, setContent] = useState<any>(null)
  const [isLiked, setIsLiked] = useState(false)
  const [isPurchasing, setIsPurchasing] = useState(false)
  const [contentData, setContentData] = useState<any>({})

  useEffect(() => {
    const loadContent = async () => {
      const contentData = await fetchContentById(id as string)
      if (contentData) {
        setContent(contentData)
        setContentData({ [contentData.id]: contentData })
      }
    }

    loadContent()
  }, [id, fetchContentById])

  const handlePurchase = async () => {
    if (!connected || !publicKey) {
      alert("Please connect your wallet to purchase this content.")
      return
    }

    setIsPurchasing(true)
    try {
      const success = await purchaseContent(id as string, publicKey)
      if (success) {
        alert("Purchase successful! You now own this content.")
      } else {
        alert("Purchase failed. Please try again.")
      }
    } catch (error) {
      console.error("Error purchasing content:", error)
      alert("An error occurred during purchase. Please try again.")
    } finally {
      setIsPurchasing(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  if (isLoading) {
    return <div className="container py-12">Loading content...</div>
  }

  if (error) {
    return <div className="container py-12 text-destructive">{error}</div>
  }

  if (!content) {
    return <div className="container py-12">Content not found</div>
  }

  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Content Image */}
        <div className="lg:col-span-2">
          <div className="relative aspect-square rounded-lg overflow-hidden">
            <Image src={content.media || "/placeholder.svg"} alt={content.title} fill className="object-cover" />
          </div>

          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsLiked(!isLiked)}
                className={isLiked ? "text-red-500" : ""}
              >
                <Heart className={`h-5 w-5 ${isLiked ? "fill-red-500" : ""}`} />
                <span className="sr-only">Like</span>
              </Button>
              <span className="text-sm text-muted-foreground">{content.likes + (isLiked ? 1 : 0)}</span>

              <Button variant="outline" size="icon">
                <Share2 className="h-5 w-5" />
                <span className="sr-only">Share</span>
              </Button>

              <Button variant="outline" size="icon">
                <MoreHorizontal className="h-5 w-5" />
                <span className="sr-only">More</span>
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{content.views} views</span>
            </div>
          </div>
        </div>

        {/* Content Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{content.title}</h1>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="outline">{content.category}</Badge>
              {content.resaleRights && (
                <Badge variant="secondary" className="bg-primary/10">
                  <Repeat className="h-3 w-3 mr-1" />
                  Resale Rights
                </Badge>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link href={`/creator/${content.creator.id}`}>
              <Avatar className="h-10 w-10">
                <AvatarImage src={content.creator.avatar} alt={content.creator.name} />
                <AvatarFallback>{content.creator.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </Link>
            <div>
              <Link
                href={`/creator/${content.creator.id}`}
                className="font-medium flex items-center hover:text-primary"
              >
                {content.creator.name}
                {content.creator.isVerified && <CheckCircle className="h-4 w-4 ml-1 text-primary" />}
              </Link>
              <p className="text-sm text-muted-foreground">@{content.creator.username}</p>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Current Price</p>
                <p className="text-3xl font-bold">{content.price} SOL</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Royalty</p>
                <p className="text-xl font-semibold">{content.resaleRoyalty}%</p>
              </div>
            </div>

            {connected ? (
              <div className="grid grid-cols-2 gap-4">
                <Button className="w-full" onClick={handlePurchase} disabled={isPurchasing}>
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {isPurchasing ? "Purchasing..." : "Buy Now"}
                </Button>
                <Button variant="outline" className="w-full">
                  <Repeat className="h-4 w-4 mr-2" />
                  Resell
                </Button>
              </div>
            ) : (
              <Button className="w-full">Connect Wallet to Purchase</Button>
            )}
          </div>

          <Separator />

          <div className="space-y-2">
            <h3 className="font-semibold">Description</h3>
            <p className="text-sm text-muted-foreground">{content.description}</p>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">Details</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>Created {formatDate(content.createdAt)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4 text-muted-foreground" />
                <span>{content.category}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span>{content.owners} owners</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {content.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  #{tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="mt-12">
        <Tabs defaultValue="comments">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="comments">Comments</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="related">Related</TabsTrigger>
          </TabsList>

          <TabsContent value="comments" className="mt-6">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  {content.comments.map((comment) => (
                    <div key={comment.id} className="flex gap-4">
                      <Avatar>
                        <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
                        <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{comment.user.name}</span>
                          <span className="text-sm text-muted-foreground">@{comment.user.username}</span>
                          <span className="text-xs text-muted-foreground">{formatDate(comment.timestamp)}</span>
                        </div>
                        <p className="text-sm">{comment.text}</p>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" className="h-8 px-2">
                            <Heart className="h-4 w-4 mr-1" />
                            <span>{comment.likes}</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 px-2">
                            <MessageCircle className="h-4 w-4 mr-1" />
                            <span>Reply</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {connected ? (
                    <div className="flex gap-4 mt-6">
                      <Avatar>
                        <AvatarImage src={user?.avatar} alt={user?.displayName} />
                        <AvatarFallback>{user?.displayName?.charAt(0) || "U"}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <textarea
                          className="w-full p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="Add a comment..."
                          rows={3}
                        />
                        <div className="flex justify-end mt-2">
                          <Button>Post Comment</Button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-muted-foreground mb-2">Connect your wallet to join the conversation</p>
                      <Button variant="outline">Connect Wallet</Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="mt-6">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {content.history.map((event, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        {event.event === "Created" && <Clock className="h-5 w-5" />}
                        {event.event === "Listed" && <Tag className="h-5 w-5" />}
                        {(event.event === "Purchased" || event.event === "Resold") && (
                          <ShoppingCart className="h-5 w-5" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{event.event}</p>
                        <p className="text-sm text-muted-foreground">
                          {formatDate(event.timestamp)}
                          {event.price && ` • ${event.price} SOL`}
                        </p>
                      </div>
                      {(event.from || event.to) && (
                        <div className="text-sm">
                          {event.from && <span>From: {event.from}</span>}
                          {event.from && event.to && <ArrowRight className="inline h-3 w-3 mx-1" />}
                          {event.to && <span>To: {event.to}</span>}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="related" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {Object.values(contentData)
                .filter((item: any) => item.id !== content.id)
                .map((item: any) => (
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
        </Tabs>
      </div>
    </div>
  )
}

