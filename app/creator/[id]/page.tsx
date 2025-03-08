"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { type UserProfile, useUser } from "@/context/user-context"
import { Loader2, CheckCircle, Twitter, Instagram, Globe } from "lucide-react"

export default function CreatorProfilePage() {
  const params = useParams()
  const { user, isFollowing, followUser, unfollowUser } = useUser()
  const [creator, setCreator] = useState<UserProfile | null>(null)
  const [contents, setContents] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isFollowingCreator, setIsFollowingCreator] = useState(false)
  const [isProcessingFollow, setIsProcessingFollow] = useState(false)
  const [followers, setFollowers] = useState([])
  const [following, setFollowing] = useState([])
  const [showFollowers, setShowFollowers] = useState(false)
  const [showFollowing, setShowFollowing] = useState(false)

  useEffect(() => {
    const fetchCreator = async () => {
      try {
        const response = await fetch(`/api/users/${params.id}`)
        if (!response.ok) throw new Error("Failed to fetch creator")
        const data = await response.json()
        setCreator(data)

        // Check if the current user is following this creator
        if (user) {
          const following = await isFollowing(data.id)
          setIsFollowingCreator(following)
        }

        // Fetch creator's content
        const contentsResponse = await fetch(`/api/contents/creator/${data.id}`)
        if (contentsResponse.ok) {
          const contentsData = await contentsResponse.json()
          setContents(contentsData)
        }

        // Fetch followers
        const followersResponse = await fetch(`/api/users/${data.id}/followers`)
        if (followersResponse.ok) {
          const followersData = await followersResponse.json()
          setFollowers(followersData)
        }

        // Fetch following
        const followingResponse = await fetch(`/api/users/${data.id}/following`)
        if (followingResponse.ok) {
          const followingData = await followingResponse.json()
          setFollowing(followingData)
        }
      } catch (error) {
        console.error("Error fetching creator:", error)
      } finally {
        setIsLoading(false)
      }
    }

    if (params.id) {
      fetchCreator()
    }
  }, [params.id, user])

  const handleFollowToggle = async () => {
    if (!user) return

    setIsProcessingFollow(true)
    try {
      if (isFollowingCreator) {
        await unfollowUser(creator!.id)
        setIsFollowingCreator(false)
        setFollowers(followers.filter((follower: any) => follower.id !== user.id))
      } else {
        await followUser(creator!.id)
        setIsFollowingCreator(true)
        setFollowers([...followers, user])
      }
    } catch (error) {
      console.error("Error toggling follow:", error)
    } finally {
      setIsProcessingFollow(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!creator) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Creator not found</h1>
          <p className="text-muted-foreground">The creator you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8">
      {/* Cover Image */}
      <div className="relative h-64 w-full rounded-lg overflow-hidden mb-16">
        <Image
          src={creator.cover_image_url || "/placeholder.svg?height=400&width=1200"}
          alt={`${creator.display_name}'s cover`}
          fill
          className="object-cover"
        />
      </div>

      {/* Profile Header */}
      <div className="flex flex-col md:flex-row gap-8 mb-8">
        <div className="relative -mt-24 md:-mt-32">
          <div className="relative h-32 w-32 md:h-48 md:w-48 rounded-full overflow-hidden border-4 border-background">
            <Image
              src={creator.avatar_url || "/placeholder.svg?height=200&width=200"}
              alt={creator.display_name}
              fill
              className="object-cover"
            />
          </div>
          {creator.is_verified && (
            <div className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-1">
              <CheckCircle className="h-6 w-6" />
            </div>
          )}
        </div>

        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">{creator.display_name}</h1>
              <p className="text-muted-foreground">@{creator.username}</p>
            </div>

            {user && user.id !== creator.id && (
              <Button
                onClick={handleFollowToggle}
                variant={isFollowingCreator ? "outline" : "default"}
                disabled={isProcessingFollow}
              >
                {isProcessingFollow ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                {isFollowingCreator ? "Following" : "Follow"}
              </Button>
            )}
          </div>

          <div className="mt-4">
            <p>{creator.bio}</p>
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

          <div className="flex items-center gap-4 mt-4">
            {creator.social_links?.twitter && (
              <a
                href={`https://twitter.com/${creator.social_links.twitter}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary"
              >
                <Twitter className="h-5 w-5" />
              </a>
            )}
            {creator.social_links?.instagram && (
              <a
                href={`https://instagram.com/${creator.social_links.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary"
              >
                <Instagram className="h-5 w-5" />
              </a>
            )}
            {creator.social_links?.website && (
              <a
                href={creator.social_links.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary"
              >
                <Globe className="h-5 w-5" />
              </a>
            )}
          </div>
        </div>
      </div>

      <Separator className="my-8" />

      {/* Content Tabs */}
      <Tabs defaultValue="creations">
        <TabsList className="mb-8">
          <TabsTrigger value="creations">Creations</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
        </TabsList>

        <TabsContent value="creations">
          {contents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {contents.map((content: any) => (
                <div key={content.id} className="rounded-lg overflow-hidden border">
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
                      <Badge>{content.category}</Badge>
                      <span className="font-bold">{content.price} SOL</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No content yet</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="about">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold mb-4">About {creator.display_name}</h2>
            <p className="mb-6">{creator.bio || "No bio provided."}</p>

            <h3 className="text-xl font-bold mb-2">Role</h3>
            <p className="mb-6 capitalize">{creator.role}</p>

            <h3 className="text-xl font-bold mb-2">Joined</h3>
            <p className="mb-6">
              {new Date(creator.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
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
                  <div key={follower.id} className="flex items-center gap-4">
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
                  <div key={followed.id} className="flex items-center gap-4">
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

