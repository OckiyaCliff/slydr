"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@/context/user-context"
import { useWallet } from "@/context/wallet-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { ArweaveService } from "@/services/arweave-service"
import { contentStore } from "@/store/content-store"
import { AIContentHelper } from "@/components/ai/ai-content-helper"
import { AIAssistantButton } from "@/components/ai/ai-assistant-button"

export default function CreateContentPage() {
  const router = useRouter()
  const { user } = useUser()
  const { wallet } = useWallet()

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState(5)
  const [royaltyPercentage, setRoyaltyPercentage] = useState(10)
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState("")

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!wallet || !user) {
      setError("Please connect your wallet first")
      return
    }

    if (!title || !description || !file) {
      setError("Please fill in all fields and upload a file")
      return
    }

    setIsUploading(true)
    setError("")

    try {
      // Upload to Arweave
      const arweaveService = new ArweaveService()
      const contentId = await arweaveService.uploadContent(file, {
        title,
        description,
        creator: user.publicKey,
        creatorName: user.username || "Anonymous",
        creatorRole: user.role || "creator",
        price,
        royaltyPercentage,
        timestamp: Date.now(),
      })

      // Add to content store
      contentStore.addContent({
        id: contentId,
        title,
        description,
        creator: user.publicKey,
        creatorName: user.username || "Anonymous",
        creatorRole: user.role || "creator",
        price,
        royaltyPercentage,
        timestamp: Date.now(),
        likes: 0,
        purchases: 0,
      })

      // Redirect to content page
      router.push(`/content/${contentId}`)
    } catch (err) {
      console.error("Error uploading content:", err)
      setError("Failed to upload content. Please try again.")
    } finally {
      setIsUploading(false)
    }
  }

  const handleDescriptionGenerated = (generatedDescription: string) => {
    setDescription(generatedDescription)
  }

  const handlePricingSuggested = (pricing: { price: number; royaltyPercentage: number }) => {
    setPrice(pricing.price)
    setRoyaltyPercentage(pricing.royaltyPercentage)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Create New Content</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Content Details</CardTitle>
              <CardDescription>Fill in the details about your content and set your pricing</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter a title for your content"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your content"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    className="min-h-[120px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="file">Upload File</Label>
                  <Input id="file" type="file" onChange={handleFileChange} required />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="price">Price (SOL)</Label>
                    <span className="text-sm font-medium">{price} SOL</span>
                  </div>
                  <Slider
                    id="price"
                    min={0.1}
                    max={100}
                    step={0.1}
                    value={[price]}
                    onValueChange={(value) => setPrice(value[0])}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="royalty">Royalty Percentage</Label>
                    <span className="text-sm font-medium">{royaltyPercentage}%</span>
                  </div>
                  <Slider
                    id="royalty"
                    min={0}
                    max={50}
                    step={1}
                    value={[royaltyPercentage]}
                    onValueChange={(value) => setRoyaltyPercentage(value[0])}
                  />
                </div>

                {error && <div className="text-red-500 text-sm">{error}</div>}
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isUploading} className="w-full">
                  {isUploading ? "Uploading..." : "Create Content"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>

        <div>
          <AIContentHelper
            onDescriptionGenerated={handleDescriptionGenerated}
            onPricingSuggested={handlePricingSuggested}
          />
        </div>
      </div>

      <AIAssistantButton />
    </div>
  )
}

