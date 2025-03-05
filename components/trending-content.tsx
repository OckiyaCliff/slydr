"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, Share2 } from "lucide-react"

export default function TrendingContent() {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null)

  const trendingItems = [
    {
      id: 1,
      title: "Neon Dreams Collection",
      creator: "CyberArtist",
      type: "Digital Art",
      price: "3.2 SOL",
      resaleRoyalty: "12%",
      image: "/placeholder.svg?height=400&width=400",
    },
    {
      id: 2,
      title: "Ethereal Soundscapes",
      creator: "AudioAlchemist",
      type: "Music",
      price: "1.8 SOL",
      resaleRoyalty: "15%",
      image: "/placeholder.svg?height=400&width=400",
    },
    {
      id: 3,
      title: "Future Fashion Designs",
      creator: "DigitalCouture",
      type: "3D Models",
      price: "4.5 SOL",
      resaleRoyalty: "10%",
      image: "/placeholder.svg?height=400&width=400",
    },
    {
      id: 4,
      title: "Abstract Emotions",
      creator: "ColorTheory",
      type: "Digital Art",
      price: "2.7 SOL",
      resaleRoyalty: "18%",
      image: "/placeholder.svg?height=400&width=400",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
      {trendingItems.map((item) => (
        <Link
          href={`/content/${item.id}`}
          key={item.id}
          className="group"
          onMouseEnter={() => setHoveredItem(item.id)}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
            <div className="relative aspect-square overflow-hidden">
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.title}
                fill
                className={`object-cover transition-transform duration-500 ${
                  hoveredItem === item.id ? "scale-110" : "scale-100"
                }`}
              />
              <div className="absolute top-2 left-2">
                <Badge variant="secondary" className="bg-black/70 text-white hover:bg-black/80">
                  {item.type}
                </Badge>
              </div>
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg line-clamp-1">{item.title}</h3>
              <p className="text-sm text-muted-foreground">by {item.creator}</p>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex justify-between items-center">
              <div>
                <p className="text-sm font-medium">{item.price}</p>
                <p className="text-xs text-primary">Resale: {item.resaleRoyalty}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Heart className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  )
}

