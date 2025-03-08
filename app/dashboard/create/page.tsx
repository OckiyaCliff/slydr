"use client"

import { useState, useEffect } from "react"
import { useUser } from "@/context/user-context"
import { useWallet } from "@/context/wallet-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { useRouter } from "next/navigation"
import { AIContentHelper } from "@/components/ai/ai-content-helper"
import { useContentStore } from "@/store/content-store"

export default function CreateContentPage() {
  const { user, isLoading: userLoading } = useUser()
  const { publicKey, connected, signTransaction } = useWallet()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const { createContent, isLoading: contentLoading } = useContentStore()

  // Add mounted state to prevent hydration issues
  useEffect(() => {
    setMounted(true)
  }, [])

  // Redirect if not logged in
  useEffect(() => {
    if (mounted && !userLoading && !user) {
      router.push("/")
    }
  }, [user, userLoading, router, mounted])

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    contentType: "music",
    price: 0.1,
    resaleRoyalty: 10,
    file: null,
    thumbnail: null,
  })

  const [previewUrl, setPreviewUrl] = useState("")
  const [thumbnailUrl, setThumbnailUrl] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData((prev) => ({
        ...prev,
        file,
      }))
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData((prev) => ({
        ...prev,
        thumbnail: file,
      }))
      setThumbnailUrl(URL.createObjectURL(file))
    }
  }

  const handlePriceChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      price: value[0],
    }))
  }

  const handleRoyaltyChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      resaleRoyalty: value[0],
    }))
  }

  const handleSubmit = async () => {
    if (!connected || !publicKey) {
      setError("Please connect your wallet first")
      return
    }

    if (!formData.file) {
      setError("Please upload a file")
      return
    }

    if (!formData.title) {
      setError("Please enter a title")
      return
    }

    try {
      setIsSubmitting(true)
      setError("")

      // For now, we'll just simulate the upload and transaction
      // In a real app, you would upload to Arweave and create a transaction

      // Mock transaction IDs for testing
      const mockContentTxId = "mock-content-tx-id-" + Date.now()
      const mockThumbnailTxId = formData.thumbnail ? "mock-thumbnail-tx-id-" + Date.now() : null

      // Create content in the store
      await createContent({
        title: formData.title,
        description: formData.description,
        contentType: formData.contentType,
        price: formData.price,
        resaleRoyalty: formData.resaleRoyalty,
        creatorId: user.id,
        transactionId: mockContentTxId,
        thumbnailTransactionId: mockThumbnailTxId,
      })

      // Redirect to dashboard
      router.push("/dashboard")
    } catch (err) {
      console.error(err)
      setError("Failed to create content. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!mounted || userLoading || !user) {
    return null
  }

  return (
    <div className="container mx-auto py-10">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create Content</h1>
          <p className="text-muted-foreground">Upload and sell your digital content on the blockchain.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Content Details</CardTitle>
                <CardDescription>Provide information about your content.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter a title for your content"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Describe your content"
                    rows={4}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contentType">Content Type</Label>
                  <select
                    id="contentType"
                    name="contentType"
                    className="w-full p-2 border rounded-md"
                    value={formData.contentType}
                    onChange={handleInputChange}
                  >
                    <option value="music">Music</option>
                    <option value="video">Video</option>
                    <option value="image">Image</option>
                    <option value="document">Document</option>
                    <option value="podcast">Podcast</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upload</CardTitle>
                <CardDescription>Upload your content and thumbnail.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="file">Content File</Label>
                  <Input
                    id="file"
                    type="file"
                    onChange={handleFileChange}
                    accept={
                      formData.contentType === "music"
                        ? "audio/*"
                        : formData.contentType === "video"
                          ? "video/*"
                          : formData.contentType === "image"
                            ? "image/*"
                            : formData.contentType === "document"
                              ? ".pdf,.doc,.docx"
                              : formData.contentType === "podcast"
                                ? "audio/*"
                                : "*"
                    }
                  />
                  {previewUrl && (
                    <div className="mt-2">
                      {formData.contentType === "image" ? (
                        <img src={previewUrl || "/placeholder.svg"} alt="Preview" className="max-h-40 rounded-md" />
                      ) : formData.contentType === "video" ? (
                        <video src={previewUrl} controls className="max-h-40 rounded-md" />
                      ) : formData.contentType === "music" || formData.contentType === "podcast" ? (
                        <audio src={previewUrl} controls className="w-full" />
                      ) : (
                        <p>File selected: {formData.file?.name}</p>
                      )}
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="thumbnail">Thumbnail Image</Label>
                  <Input id="thumbnail" type="file" onChange={handleThumbnailChange} accept="image/*" />
                  {thumbnailUrl && (
                    <img
                      src={thumbnailUrl || "/placeholder.svg"}
                      alt="Thumbnail"
                      className="mt-2 max-h-40 rounded-md"
                    />
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pricing</CardTitle>
                <CardDescription>Set the price and royalty for your content.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="price">Price (SOL)</Label>
                    <span>{formData.price} SOL</span>
                  </div>
                  <Slider
                    id="price"
                    min={0.01}
                    max={10}
                    step={0.01}
                    value={[formData.price]}
                    onValueChange={handlePriceChange}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="resaleRoyalty">Resale Royalty (%)</Label>
                    <span>{formData.resaleRoyalty}%</span>
                  </div>
                  <Slider
                    id="resaleRoyalty"
                    min={0}
                    max={50}
                    step={1}
                    value={[formData.resaleRoyalty]}
                    onValueChange={handleRoyaltyChange}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSubmit} disabled={isSubmitting || !connected} className="w-full">
                  {isSubmitting ? "Creating..." : connected ? "Create Content" : "Connect Wallet to Create"}
                </Button>
              </CardFooter>
              {error && <p className="text-red-500 text-center pb-4">{error}</p>}
            </Card>
          </div>

          <div className="space-y-6">
            <AIContentHelper />
            <Card>
              <CardHeader>
                <CardTitle>Tips for Success</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium">Quality Content</h3>
                  <p className="text-sm text-muted-foreground">
                    High-quality content sells better. Ensure your uploads are the best quality possible.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">Detailed Description</h3>
                  <p className="text-sm text-muted-foreground">
                    Be detailed in your description. Tell the story behind your content.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">Fair Pricing</h3>
                  <p className="text-sm text-muted-foreground">
                    Price your content fairly. Consider your audience and the value you're providing.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">Attractive Thumbnail</h3>
                  <p className="text-sm text-muted-foreground">
                    A good thumbnail can significantly increase sales. Make it eye-catching.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

