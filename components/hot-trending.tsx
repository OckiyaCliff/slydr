"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FlameIcon as Fire, Music, Paintbrush, Shapes, TrendingUp } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

interface TrendingItem {
  id: number
  title: string
  creator: string
  creatorId: number
  type: string
  price: string
  resaleRoyalty: string
  image: string
  avatar: string
  likes: number
  views: number
}

export default function HotTrending() {
  const [activeTab, setActiveTab] = useState("all")
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const trendingItems: TrendingItem[] = [
    {
      id: 1,
      title: "Neon Dreams Collection",
      creator: "CyberArtist",
      creatorId: 1,
      type: "art",
      price: "3.2 SOL",
      resaleRoyalty: "12%",
      image: "/placeholder.svg?height=400&width=400",
      avatar: "/placeholder.svg?height=40&width=40",
      likes: 342,
      views: 1205,
    },
    {
      id: 2,
      title: "Ethereal Soundscapes",
      creator: "AudioAlchemist",
      creatorId: 2,
      type: "music",
      price: "1.8 SOL",
      resaleRoyalty: "15%",
      image: "/placeholder.svg?height=400&width=400",
      avatar: "/placeholder.svg?height=40&width=40",
      likes: 289,
      views: 876,
    },
    {
      id: 3,
      title: "Future Fashion Designs",
      creator: "DigitalCouture",
      creatorId: 3,
      type: "design",
      price: "4.5 SOL",
      resaleRoyalty: "10%",
      image: "/placeholder.svg?height=400&width=400",
      avatar: "/placeholder.svg?height=40&width=40",
      likes: 156,
      views: 543,
    },
    {
      id: 4,
      title: "Abstract Emotions",
      creator: "ColorTheory",
      creatorId: 4,
      type: "art",
      price: "2.7 SOL",
      resaleRoyalty: "18%",
      image: "/placeholder.svg?height=400&width=400",
      avatar: "/placeholder.svg?height=40&width=40",
      likes: 421,
      views: 1532,
    },
    {
      id: 5,
      title: "Ambient Loops Vol. 1",
      creator: "SoundScaper",
      creatorId: 5,
      type: "music",
      price: "1.5 SOL",
      resaleRoyalty: "20%",
      image: "/placeholder.svg?height=400&width=400",
      avatar: "/placeholder.svg?height=40&width=40",
      likes: 267,
      views: 892,
    },
    {
      id: 6,
      title: "Cyberpunk Interface Kit",
      creator: "UIWizard",
      creatorId: 6,
      type: "design",
      price: "5.0 SOL",
      resaleRoyalty: "8%",
      image: "/placeholder.svg?height=400&width=400",
      avatar: "/placeholder.svg?height=40&width=40",
      likes: 189,
      views: 723,
    },
  ]

  const filteredItems = activeTab === "all" ? trendingItems : trendingItems.filter((item) => item.type === activeTab)

  return (
    <section className="container px-4 py-12 md:py-24">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="flex items-center gap-2 rounded-lg bg-primary/10 px-3 py-1 text-sm">
          <Fire className="h-4 w-4 text-primary" />
          <span className="font-medium text-primary">Hot & Trending</span>
        </div>
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Discover What's Hot</h2>
        <p className="max-w-[700px] text-muted-foreground md:text-xl">
          The most popular content trending across the Slydr marketplace
        </p>
      </div>

      <Tabs defaultValue="all" className="mt-12" onValueChange={setActiveTab}>
        <div className="flex justify-center">
          <TabsList className="grid grid-cols-4 w-full max-w-md">
            <TabsTrigger value="all" className="flex items-center gap-1">
              <TrendingUp className="h-4 w-4" />
              <span>All</span>
            </TabsTrigger>
            <TabsTrigger value="art" className="flex items-center gap-1">
              <Paintbrush className="h-4 w-4" />
              <span>Art</span>
            </TabsTrigger>
            <TabsTrigger value="music" className="flex items-center gap-1">
              <Music className="h-4 w-4" />
              <span>Music</span>
            </TabsTrigger>
            <TabsTrigger value="design" className="flex items-center gap-1">
              <Shapes className="h-4 w-4" />
              <span>Design</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <TabsContent value={activeTab} className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={isLoaded ? { opacity: 0, y: 20 } : false}
                    animate={isLoaded ? { opacity: 1, y: 0 } : false}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow duration-300">
                      <Link href={`/content/${item.id}`} className="block relative">
                        <div className="relative aspect-video overflow-hidden">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.title}
                            fill
                            className="object-cover transition-transform duration-500 hover:scale-105"
                          />
                          <div className="absolute top-2 left-2 flex gap-2">
                            <Badge variant="secondary" className="bg-black/70 text-white hover:bg-black/80">
                              {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                            </Badge>
                            <Badge variant="secondary" className="bg-primary/80 text-white hover:bg-primary/90">
                              <Fire className="h-3 w-3 mr-1" />
                              Hot
                            </Badge>
                          </div>
                          <div className="absolute bottom-2 right-2">
                            <Badge variant="outline" className="bg-black/50 text-white border-none">
                              {item.views} views
                            </Badge>
                          </div>
                        </div>
                      </Link>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={item.avatar} alt={item.creator} />
                            <AvatarFallback>{item.creator.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <Link href={`/creator/${item.creatorId}`} className="text-sm hover:underline">
                            {item.creator}
                          </Link>
                        </div>
                        <Link href={`/content/${item.id}`} className="block">
                          <h3 className="font-semibold text-lg line-clamp-1 hover:underline">{item.title}</h3>
                        </Link>
                        <div className="flex justify-between items-center mt-3">
                          <div>
                            <p className="text-sm font-medium">{item.price}</p>
                            <p className="text-xs text-primary">Resale: {item.resaleRoyalty}</p>
                          </div>
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="sm" className="h-8 px-2">
                              <Fire className="h-3 w-3 mr-1 text-primary" />
                              <span className="text-xs">{item.likes}</span>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </motion.div>
        </AnimatePresence>
      </Tabs>

      <div className="flex justify-center mt-8">
        <Button asChild variant="outline" size="lg" className="group">
          <Link href="/trending">
            <span>View All Trending</span>
            <Fire className="ml-2 h-4 w-4 group-hover:text-primary transition-colors" />
          </Link>
        </Button>
      </div>
    </section>
  )
}

