"use client"

import type React from "react"

import { useState } from "react"
import { useUser } from "@/context/user-context"
import { useWallet } from "@/context/wallet-context"
import { useContentStore } from "@/store/content-store"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"
import { Upload, ImageIcon, X, Check } from "lucide-react"
import Image from "next/image"

export default function CreateContentPage() {
  const { user, isLoading: userLoading } = useUser()
  const { connected } = useWallet()
  const { createContent, isLoading, error } = useContentStore()
  const router = useRouter()

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState(1)
  const [category, setCategory] = useState("Digital Art")
  const [tags, setTags] = useState("")
  const [resaleRights, setResaleRights] = useState(true)
  const [resaleRoyalty, setResaleRoyalty] = useState(15)
  const [mediaFile, setMediaFile] = useState<File | null>(null)
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)
  const [mediaPreview, setMediaPreview] = useState<string | null>(null)
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  // Handle media file selection
  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setMediaFile(file)

      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        setMediaPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  // Handle thumbnail file selection
  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setThumbnailFile(file)

      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        setThumbnailPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user || !connected) {
      alert("You must be logged in and have your wallet connected to create content.")
      return
    }

    if (!mediaFile || !thumbnailFile) {
      alert("Please upload both a media file and a thumbnail.")
      return
    }

    setSubmitting(true)

    try {
      // Prepare content metadata
      const contentMetadata = {
        title,
        description,
        price,
        resaleRights,
        resaleRoyalty,
        creator: {
          id: user.id,
          name: user.displayName,
          username: user.username,
        },
        category,
        tags: tags.split(",").map((tag) => tag.trim()),
      }

      // Create content
      const contentId = await createContent(contentMetadata, mediaFile, thumbnailFile)

      setSuccess(true)

      // Redirect to content page after a short delay
      setTimeout(() => {
        router.push(`/content/${contentId}`)
      }, 2000)
    } catch (error) {
      console.error("Error creating content:", error)
      alert("Failed to create content. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  // Redirect if not logged in
  if (!userLoading && !user) {
    router.push("/")
    return null
  }

  if (userLoading) {
    return <div className="container py-12">Loading...</div>
  }

  return (
    <div className="container py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight mb-6">Create New Content</h1>

        {success ? (
          <Card className="border-green-500">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                  <Check className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Content Created Successfully!</h2>
                  <p className="text-muted-foreground">Redirecting you to your new content page...</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <form onSubmit={handleSubmit}>
            <Card>
              <CardHeader>
                <CardTitle>Content Details</CardTitle>
                <CardDescription>Provide information about your content to help others discover it.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter a title for your content"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe your content in detail"
                    rows={4}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price (SOL)</Label>
                    <Input
                      id="price"
                      type="number"
                      min="0.01"
                      step="0.01"
                      value={price}
                      onChange={(e) => setPrice(Number.parseFloat(e.target.value))}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Digital Art">Digital Art</SelectItem>
                        <SelectItem value="Music">Music</SelectItem>
                        <SelectItem value="Video">Video</SelectItem>
                        <SelectItem value="3D Model">3D Model</SelectItem>
                        <SelectItem value="E-Book">E-Book</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">Tags (comma separated)</Label>
                  <Input
                    id="tags"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="art, digital, abstract"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="resaleRights" className="text-base">
                        Resale Rights
                      </Label>
                      <p className="text-sm text-muted-foreground">Allow buyers to resell this content</p>
                    </div>
                    <Switch id="resaleRights" checked={resaleRights} onCheckedChange={setResaleRights} />
                  </div>

                  {resaleRights && (
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="resaleRoyalty">Royalty Percentage: {resaleRoyalty}%</Label>
                      </div>
                      <Slider
                        id="resaleRoyalty"
                        min={1}
                        max={50}
                        step={1}
                        value={[resaleRoyalty]}
                        onValueChange={(value) => setResaleRoyalty(value[0])}
                      />
                      <p className="text-sm text-muted-foreground">
                        You will receive {resaleRoyalty}% of each resale transaction.
                      </p>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="mediaFile">Upload Content</Label>
                    <div className="border-2 border-dashed rounded-lg p-4 text-center">
                      {mediaPreview ? (
                        <div className="relative aspect-square">
                          <Image
                            src={mediaPreview || "/placeholder.svg"}
                            alt="Content preview"
                            fill
                            className="object-contain rounded-md"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2"
                            onClick={() => {
                              setMediaFile(null)
                              setMediaPreview(null)
                            }}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <label className="flex flex-col items-center gap-2 cursor-pointer">
                          <Upload className="h-8 w-8 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">Click to upload or drag and drop</span>
                          <input id="mediaFile" type="file" className="hidden" onChange={handleMediaChange} required />
                        </label>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="thumbnailFile">Upload Thumbnail</Label>
                    <div className="border-2 border-dashed rounded-lg p-4 text-center">
                      {thumbnailPreview ? (
                        <div className="relative aspect-square">
                          <Image
                            src={thumbnailPreview || "/placeholder.svg"}
                            alt="Thumbnail preview"
                            fill
                            className="object-contain rounded-md"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2"
                            onClick={() => {
                              setThumbnailFile(null)
                              setThumbnailPreview(null)
                            }}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <label className="flex flex-col items-center gap-2 cursor-pointer">
                          <ImageIcon className="h-8 w-8 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">Upload a thumbnail image</span>
                          <input
                            id="thumbnailFile"
                            type="file"
                            className="hidden"
                            onChange={handleThumbnailChange}
                            required
                          />
                        </label>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={submitting || !connected}>
                  {submitting ? "Creating..." : "Create Content"}
                </Button>
              </CardFooter>
            </Card>
          </form>
        )}
      </div>
    </div>
  )
}

