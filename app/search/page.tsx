"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, SearchIcon } from "lucide-react"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const query = searchParams.get("q") || ""
  const [searchQuery, setSearchQuery] = useState(query)
  const [contents, setContents] = useState([])
  const [creators, setCreators] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("all")

  useEffect(() => {
    const performSearch = async () => {
      if (!query) return

      setIsLoading(true)

      try {
        // Search contents
        const contentsResponse = await fetch(`/api/contents?search=${query}`)
        if (contentsResponse.ok) {
          const contentsData = await contentsResponse.json()
          setContents(contentsData)
        }

        // Search creators
        const creatorsResponse = await fetch(`/api/users?search=${query}`)
        if (creatorsResponse.ok) {
          const creatorsData = await creatorsResponse.json()
          setCreators(creatorsData)
        }
      } catch (error) {
        console.error("Error searching:", error)
      } finally {
        setIsLoading(false)
      }
    }

    performSearch()
  }, [query])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    const params = new URLSearchParams()
    params.set("q", searchQuery)
    router.push(`/search?${params.toString()}`)
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Search</h1>

      <form onSubmit={handleSearch} className="flex gap-2 mb-8">
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for content, creators, or tags..."
          className="flex-1"
        />
        <Button type="submit">
          <SearchIcon className="h-4 w-4 mr-2" />
          Search
        </Button>
      </form>

      {query ? (
        <>
          <h2 className="text-xl font-bold mb-4">Search results for "{query}"</h2>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="all">All ({contents.length + creators.length})</TabsTrigger>
              <TabsTrigger value="content">Content ({contents.length})</TabsTrigger>
              <TabsTrigger value="creators">Creators ({creators.length})</TabsTrigger>
            </TabsList>

            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : (
              <>
                <TabsContent value="all">
                  {contents.length === 0 && creators.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground mb-4">No results found for "{query}"</p>
                      <p className="text-sm text-muted-foreground">Try different keywords or check your spelling</p>
                    </div>
                  ) : (
                    <div className="space-y-8">
                      {creators.length > 0 && (
                        <div>
                          <h3 className="text-lg font-bold mb-4">Creators</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {creators.slice(0, 3).map((creator: any) => (
                              <div
                                key={creator.id}
                                className="flex items-center gap-4 p-4 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                                onClick={() => router.push(`/creator/${creator.id}`)}
                              >
                                <div className="relative h-12 w-12 rounded-full overflow-hidden">
                                  <Image
                                    src={creator.avatar_url || "/placeholder.svg?height=48&width=48"}
                                    alt={creator.display_name}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <div>
                                  <h4 className="font-medium">{creator.display_name}</h4>
                                  <p className="text-sm text-muted-foreground">@{creator.username}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                          {creators.length > 3 && (
                            <Button variant="link" onClick={() => setActiveTab("creators")} className="mt-2">
                              View all creators
                            </Button>
                          )}
                        </div>
                      )}

                      {contents.length > 0 && (
                        <div>
                          <h3 className="text-lg font-bold mb-4">Content</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {contents.slice(0, 6).map((content: any) => (
                              <div
                                key={content.id}
                                className="rounded-lg overflow-hidden border cursor-pointer hover:shadow-md transition-shadow"
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
                                  <h4 className="font-bold">{content.title}</h4>
                                  <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                                    {content.description}
                                  </p>
                                  <div className="flex items-center justify-between mt-4">
                                    <Badge className="capitalize">{content.category}</Badge>
                                    <span className="font-bold">{content.price} SOL</span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                          {contents.length > 6 && (
                            <Button variant="link" onClick={() => setActiveTab("content")} className="mt-2">
                              View all content
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="content">
                  {contents.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {contents.map((content: any) => (
                        <div
                          key={content.id}
                          className="rounded-lg overflow-hidden border cursor-pointer hover:shadow-md transition-shadow"
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
                            <h4 className="font-bold">{content.title}</h4>
                            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{content.description}</p>
                            <div className="flex items-center justify-between mt-4">
                              <Badge className="capitalize">{content.category}</Badge>
                              <span className="font-bold">{content.price} SOL</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground">No content found for "{query}"</p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="creators">
                  {creators.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {creators.map((creator: any) => (
                        <div
                          key={creator.id}
                          className="p-6 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                          onClick={() => router.push(`/creator/${creator.id}`)}
                        >
                          <div className="flex items-center gap-4 mb-4">
                            <div className="relative h-16 w-16 rounded-full overflow-hidden">
                              <Image
                                src={creator.avatar_url || "/placeholder.svg?height=64&width=64"}
                                alt={creator.display_name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <h4 className="font-bold">{creator.display_name}</h4>
                              <p className="text-sm text-muted-foreground">@{creator.username}</p>
                            </div>
                          </div>

                          <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                            {creator.bio || "No bio provided."}
                          </p>

                          <div className="flex items-center justify-between text-sm">
                            <span>{creator.stats?.followers || 0} followers</span>
                            <span>{creator.stats?.creations || 0} creations</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground">No creators found for "{query}"</p>
                    </div>
                  )}
                </TabsContent>
              </>
            )}
          </Tabs>
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">Enter a search term to find content and creators</p>
          <div className="max-w-md mx-auto">
            <h3 className="font-bold mb-2">Popular searches</h3>
            <div className="flex flex-wrap gap-2 justify-center">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchQuery("music")
                  router.push("/search?q=music")
                }}
              >
                Music
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchQuery("art")
                  router.push("/search?q=art")
                }}
              >
                Art
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchQuery("podcast")
                  router.push("/search?q=podcast")
                }}
              >
                Podcast
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchQuery("writing")
                  router.push("/search?q=writing")
                }}
              >
                Writing
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

