"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FlameIcon as Fire, Heart, Share2 } from "lucide-react"
import { motion } from "framer-motion"

interface TrendingGridProps {
  category?: string
}

export default function TrendingGrid({ category }: TrendingGridProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // This would normally be fetched from an API based on the category
  const trendingItems = [
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
      rank: 1,
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
      rank: 2,
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
      rank: 3,
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
      rank: 4,
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
      rank: 5,
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
      rank: 6,
    },
    {
      id: 7,
      title: "Digital Dreamscapes",
      creator: "VirtualVisions",
      creatorId: 7,
      type: "art",
      price: "3.8 SOL",
      resaleRoyalty: "15%",
      image: "/placeholder.svg?height=400&width=400",
      avatar: "/placeholder.svg?height=40&width=40",
      likes: 312,
      views: 945,
      rank: 7,
    },
    {
      id: 8,
      title: "Blockchain Beats",
      creator: "CryptoComposer",
      creatorId: 8,
      type: "music",
      price: "2.2 SOL",
      resaleRoyalty: "12%",
      image: "/placeholder.svg?height=400&width=400",
      avatar: "/placeholder.svg?height=40&width=40",
      likes: 278,
      views: 832,
      rank: 8,
    },
    {
      id: 9,
      title: "Metaverse Architecture",
      creator: "DigitalBuilder",
      creatorId: 9,
      type: "design",
      price: "6.5 SOL",
      resaleRoyalty: "10%",
      image: "/placeholder.svg?height=400&width=400",
      avatar: "/placeholder.svg?height=40&width=40",
      likes: 201,
      views: 678,
      rank: 9,
    },
    {
      id: 10,
      title: "Quantum Visuals",
      creator: "FutureArtist",
      creatorId: 10,
      type: "art",
      price: "4.2 SOL",
      resaleRoyalty: "15%",
      image: "/placeholder.svg?height=400&width=400",
      avatar: "/placeholder.svg?height=40&width=40",
      likes: 245,
      views: 789,
      rank: 10,
    },
    {
      id: 11,
      title: "Synthwave Collection",
      creator: "RetroWave",
      creatorId: 11,
      type: "music",
      price: "2.8 SOL",
      resaleRoyalty: "18%",
      image: "/placeholder.svg?height=400&width=400",
      avatar: "/placeholder.svg?height=40&width=40",
      likes: 234,
      views: 712,
      rank: 11,
    },
    {
      id: 12,
      title: "3D Character Assets",
      creator: "ModelMaster",
      creatorId: 12,
      type: "design",
      price: "7.5 SOL",
      resaleRoyalty: "8%",
      image: "/placeholder.svg?height=400&width=400",
      avatar: "/placeholder.svg?height=40&width=40",
      likes: 178,
      views: 598,
      rank: 12,
    },
  ]

  const filteredItems =
    category && category !== "all" ? trendingItems.filter((item) => item.type === category) : trendingItems

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {filteredItems.map((item, index) => (
        <motion.div
          key={item.id}
          initial={isLoaded ? { opacity: 0, y: 20 } : false}
          animate={isLoaded ? { opacity: 1, y: 0 } : false}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow duration-300 group">
            <Link href={`/content/${item.id}`} className="block relative">
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-2 left-2 flex gap-2">
                  <Badge variant="secondary" className="bg-black/70 text-white hover:bg-black/80">
                    {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                  </Badge>
                  <Badge variant="secondary" className="bg-primary/80 text-white hover:bg-primary/90">
                    <Fire className="h-3 w-3 mr-1" />#{item.rank}
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
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="h-8 px-2">
                    <Heart className="h-3 w-3 mr-1 text-primary" />
                    <span className="text-xs">{item.likes}</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 px-2">
                    <Share2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}

