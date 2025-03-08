"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useUser } from "@/context/user-context"
import { useWallet } from "@/context/wallet-context"
import { AnchorService } from "@/services/anchor-service"
import { Loader2, Heart, Share2, ShoppingCart, Download, User, Calendar, Tag, Shield, ArrowRight } from "lucide-react"

export default function ContentDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useUser()
  const { wallet, connected } = useWallet()

  const [content, setContent] = useState<any>(null)
  const [creator, setCreator] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isPurchasing, setIsPurchasing] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(0)
  const [hasPurchased, setHasPurchased] = useState(false)
  const [relatedContent, setRelatedContent] = useState([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchContentDetails = async () => {
      try {
        // Fetch content details
        const response = await fetch(`/api/contents/${params.id}`)
        if (!response.ok) throw new Error("Failed to fetch content")

        const contentData = await response.json()
        setContent(contentData)

        // Record view
        await fetch("/api/analytics/views", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content_id: contentData.id,
            user_id: user?.id || null,
          }),
        })

        // Fetch creator details
        const creatorResponse = await fetch(`/api/users/${contentData.creator_id}`)
        if (creatorResponse.ok) {
          const creatorData = await creatorResponse.json()
          setCreator(creatorData)
        }

        // Check if user has purchased this content
        if (user) {
          const purchaseResponse = await fetch(`/api/users/${user.id}/transactions?content_id=${contentData.id}`)
          if (purchaseResponse.ok) {
            const purchaseData = await purchaseResponse.json()
            setHasPurchased(purchaseData.length > 0)
          }

          // Check if user has liked this content
          // This would require a likes table in Supabase
          // For now, we'll just simulate it
          setIsLiked(Math.random() > 0.5)
        }

        // Set like count
        setLikeCount(contentData.like_count || Math.floor(Math.random() * 100))

        // Fetch related content
        const relatedResponse = await fetch(`/api/contents?category=${contentData.category}&limit=3`)
        if (relatedResponse.ok) {
          const relatedData = await relatedResponse.json()
          setRelatedContent(relatedData.filter((item: any) => item.id !== contentData.id))
        }
      } catch (error) {
        console.error("Error fetching content:", error)
        setError("Failed to load content. Please try again.")
      } finally {
        setIsLoading(false)
      }
    }

    if (params.id) {
      fetchContentDetails()
    }
  }, [params.id, user])

  const handlePurchase = async () => {
    if (!user || !wallet || !connected) {
      alert("Please connect your wallet to purchase this content")
      return
    }

    setIsPurchasing(true)
    setError(null)

    try {
      // 1. Execute Solana transaction via Anchor program
      const anchorService = new AnchorService()
      const txSignature = await anchorService.purchaseContent(content.id, content.creator_id, content.price)

      // 2. Record transaction in Supabase
      const transactionResponse = await fetch("/api/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content_id: content.id,
          buyer_id: user.id,
          seller_id: content.creator_id,
          price: content.price,
          transaction_signature: txSignature,
        }),
      })

      if (!transactionResponse.ok) {
        throw new Error("Failed to record transaction")
      }

      // 3. Update UI state
      setHasPurchased(true)
    } catch (err) {
      console.error("Error purchasing content:", err)
      setError("Failed to complete purchase. Please try again.")
    } finally {
      setIsPurchasing(false)
    }
  }

  const handleLikeToggle = async () => {
    if (!user) return

    // Toggle like state optimistically
    setIsLiked(!isLiked)
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1)

    // In a real app, we would update the likes in the database
    // await fetch('/api/contents/${content.id}/like', {
    //   method: isLiked ? 'DELETE' : 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     user_id: user.id
    //   }),
    // })
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: content.title,
        text: content.description,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert("Link copied to clipboard!")
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="container py-12">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Error</h1>
          <p className="text-muted-foreground mb-6">{error}</p>
          <Button onClick={() => router.back()}>Go Back</Button>
        </div>
      </div>
    )
  }

  if (!content) {
    return (
      <div className="container py-12">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Content Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The content you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => router.push("/marketplace")}>Browse Marketplace</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Content Preview */}
          <div className="rounded-lg overflow-hidden border mb-6">
            <div className="relative aspect-video">
              <Image
                src={`https://arweave.net/${content.thumbnail_transaction_id}`}
                alt={content.title}
                fill
                className="object-cover"
              />
            </div>

            {!hasPurchased && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                <div className="text-center p-6 bg-background/80 backdrop-blur-sm rounded-lg">
                  <ShoppingCart className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h3 className="text-xl font-bold mb-2">Purchase to Access</h3>
                  <p className="text-muted-foreground mb-4">Purchase this content to get full access</p>
                  <Button onClick={handlePurchase} disabled={isPurchasing || !connected} className="w-full">
                    {isPurchasing ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>Buy for {content.price} SOL</>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Content Info */}
          <div className="space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold">{content.title}</h1>
                <div className="flex items-center gap-2 mt-2">
                  <Badge className="capitalize">{content.category}</Badge>
                  <span className="text-muted-foreground">{new Date(content.created_at).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleLikeToggle}
                  className={isLiked ? "text-red-500" : ""}
                >
                  <Heart className="h-5 w-5" fill={isLiked ? "currentColor" : "none"} />
                  <span className="sr-only">Like</span>
                </Button>
                <Button variant="outline" size="icon" onClick={handleShare}>
                  <Share2 className="h-5 w-5" />
                  <span className="sr-only">Share</span>
                </Button>
              </div>
            </div>

            <Separator />

            <div>
              <h2 className="text-xl font-bold mb-2">Description</h2>
              <p className="text-muted-foreground whitespace-pre-line">{content.description}</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-lg bg-muted/50">
                <User className="h-5 w-5 text-muted-foreground mb-2" />
                <h3 className="text-sm font-medium">Creator</h3>
                <p className="text-sm truncate">{creator?.display_name || "Unknown"}</p>
              </div>

              <div className="p-4 rounded-lg bg-muted/50">
                <Calendar className="h-5 w-5 text-muted-foreground mb-2" />
                <h3 className="text-sm font-medium">Published</h3>
                <p className="text-sm">{new Date(content.created_at).toLocaleDateString()}</p>
              </div>

              <div className="p-4 rounded-lg bg-muted/50">
                <Tag className="h-5 w-5 text-muted-foreground mb-2" />
                <h3 className="text-sm font-medium">Price</h3>
                <p className="text-sm font-bold">{content.price} SOL</p>
              </div>

              <div className="p-4 rounded-lg bg-muted/50">
                <Shield className="h-5 w-5 text-muted-foreground mb-2" />
                <h3 className="text-sm font-medium">Resale</h3>
                <p className="text-sm">
                  {content.resale_rights ? `${content.resale_royalty}% Royalty` : "Not Allowed"}
                </p>
              </div>
            </div>

            {content.tags && content.tags.length > 0 && (
              <div>
                <h2 className="text-xl font-bold mb-2">Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {content.tags.map((tag: string, index: number) => (
                    <Badge key={index} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div>
          {/* Creator Card */}
          {creator && (
            <Card className="mb-6">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden">
                    <Image
                      src={creator.avatar_url || "/placeholder.svg?height=48&width=48"}
                      alt={creator.display_name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold">{creator.display_name}</h3>
                    <p className="text-sm text-muted-foreground">@{creator.username}</p>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{creator.bio || "No bio provided."}</p>

                <Button variant="outline" className="w-full" onClick={() => router.push(`/creator/${creator.id}`)}>
                  View Profile
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Purchase Card */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <h3 className="text-xl font-bold mb-4">{hasPurchased ? "You Own This Content" : "Purchase Content"}</h3>

              <div className="flex items-center justify-between mb-4">
                <span className="text-muted-foreground">Price</span>
                <span className="text-2xl font-bold">{content.price} SOL</span>
              </div>

              {hasPurchased ? (
                <Button className="w-full mb-4">
                  <Download className="h-4 w-4 mr-2" />
                  Download Content
                </Button>
              ) : (
                <Button className="w-full mb-4" onClick={handlePurchase} disabled={isPurchasing || !connected}>
                  {isPurchasing ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Buy for {content.price} SOL
                    </>
                  )}
                </Button>
              )}

              <div className="text-sm text-muted-foreground">
                {content.resale_rights ? (
                  <p>Includes resale rights with {content.resale_royalty}% royalty to creator</p>
                ) : (
                  <p>This content cannot be resold</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Related Content */}
          {relatedContent.length > 0 && (
            <div>
              <h3 className="text-xl font-bold mb-4">Related Content</h3>
              <div className="space-y-4">
                {relatedContent.map((item: any) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-3 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => router.push(`/content/${item.id}`)}
                  >
                    <div className="relative h-16 w-16 rounded overflow-hidden">
                      <Image
                        src={`https://arweave.net/${item.thumbnail_transaction_id}`}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.price} SOL</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

