"use client"

import { useState } from "react"
import { useAI } from "@/context/ai-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Loader2, Sparkles, Wand2 } from "lucide-react"

interface AIContentHelperProps {
  onDescriptionGenerated?: (description: string) => void
  onPricingSuggested?: (pricing: { price: number; royaltyPercentage: number }) => void
}

export function AIContentHelper({ onDescriptionGenerated, onPricingSuggested }: AIContentHelperProps) {
  const { generateContentDescription, suggestOptimalPricing } = useAI()
  const [activeTab, setActiveTab] = useState("description")

  // Description generation state
  const [title, setTitle] = useState("")
  const [keywords, setKeywords] = useState("")
  const [contentType, setContentType] = useState("music")
  const [generatedDescription, setGeneratedDescription] = useState("")
  const [isGeneratingDescription, setIsGeneratingDescription] = useState(false)

  // Pricing suggestion state
  const [pricingContentType, setPricingContentType] = useState("music")
  const [contentQuality, setContentQuality] = useState<"basic" | "standard" | "premium">("standard")
  const [creatorReputation, setCreatorReputation] = useState<"new" | "established" | "renowned">("established")
  const [suggestedPricing, setSuggestedPricing] = useState<{ price: number; royaltyPercentage: number } | null>(null)
  const [isGeneratingPricing, setIsGeneratingPricing] = useState(false)

  const handleGenerateDescription = async () => {
    if (!title || !keywords || !contentType) return

    setIsGeneratingDescription(true)
    try {
      const keywordsList = keywords.split(",").map((k) => k.trim())
      const description = await generateContentDescription(title, keywordsList, contentType)
      setGeneratedDescription(description)
      if (onDescriptionGenerated) {
        onDescriptionGenerated(description)
      }
    } catch (error) {
      console.error("Error generating description:", error)
    } finally {
      setIsGeneratingDescription(false)
    }
  }

  const handleSuggestPricing = async () => {
    setIsGeneratingPricing(true)
    try {
      const pricing = await suggestOptimalPricing(pricingContentType, contentQuality, creatorReputation)
      setSuggestedPricing(pricing)
      if (onPricingSuggested) {
        onPricingSuggested(pricing)
      }
    } catch (error) {
      console.error("Error suggesting pricing:", error)
    } finally {
      setIsGeneratingPricing(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          AI Content Helper
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="description" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="description">Generate Description</TabsTrigger>
            <TabsTrigger value="pricing">Suggest Pricing</TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="title">Content Title</Label>
              <Input
                id="title"
                placeholder="Enter your content title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="keywords">Keywords (comma separated)</Label>
              <Input
                id="keywords"
                placeholder="e.g., electronic, ambient, relaxing"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contentType">Content Type</Label>
              <select
                id="contentType"
                className="w-full p-2 rounded-md border border-input bg-background"
                value={contentType}
                onChange={(e) => setContentType(e.target.value)}
              >
                <option value="music">Music</option>
                <option value="art">Digital Art</option>
                <option value="writing">Writing</option>
                <option value="podcast">Podcast</option>
                <option value="video">Video</option>
              </select>
            </div>

            {generatedDescription && (
              <div className="space-y-2 mt-4">
                <Label>Generated Description</Label>
                <Textarea readOnly value={generatedDescription} className="min-h-[100px]" />
              </div>
            )}
          </TabsContent>

          <TabsContent value="pricing" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="pricingContentType">Content Type</Label>
              <select
                id="pricingContentType"
                className="w-full p-2 rounded-md border border-input bg-background"
                value={pricingContentType}
                onChange={(e) => setPricingContentType(e.target.value)}
              >
                <option value="music">Music</option>
                <option value="art">Digital Art</option>
                <option value="writing">Writing</option>
                <option value="podcast">Podcast</option>
                <option value="video">Video</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="contentQuality">Content Quality</Label>
              <select
                id="contentQuality"
                className="w-full p-2 rounded-md border border-input bg-background"
                value={contentQuality}
                onChange={(e) => setContentQuality(e.target.value as any)}
              >
                <option value="basic">Basic</option>
                <option value="standard">Standard</option>
                <option value="premium">Premium</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="creatorReputation">Your Reputation</Label>
              <select
                id="creatorReputation"
                className="w-full p-2 rounded-md border border-input bg-background"
                value={creatorReputation}
                onChange={(e) => setCreatorReputation(e.target.value as any)}
              >
                <option value="new">New Creator</option>
                <option value="established">Established Creator</option>
                <option value="renowned">Renowned Creator</option>
              </select>
            </div>

            {suggestedPricing && (
              <div className="mt-4 p-4 bg-muted rounded-md">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Suggested Price:</span>
                  <Badge variant="outline" className="text-lg">
                    ${suggestedPricing.price}
                  </Badge>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="font-medium">Royalty Percentage:</span>
                  <Badge variant="outline" className="text-lg">
                    {suggestedPricing.royaltyPercentage}%
                  </Badge>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>

      <CardFooter>
        {activeTab === "description" ? (
          <Button
            onClick={handleGenerateDescription}
            disabled={isGeneratingDescription || !title || !keywords}
            className="w-full"
          >
            {isGeneratingDescription ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Wand2 className="mr-2 h-4 w-4" />
                Generate Description
              </>
            )}
          </Button>
        ) : (
          <Button onClick={handleSuggestPricing} disabled={isGeneratingPricing} className="w-full">
            {isGeneratingPricing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Calculating...
              </>
            ) : (
              <>
                <Wand2 className="mr-2 h-4 w-4" />
                Suggest Optimal Pricing
              </>
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

