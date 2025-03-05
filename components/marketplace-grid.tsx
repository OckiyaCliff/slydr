import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, Share2 } from "lucide-react"

interface MarketplaceGridProps {
  category?: string
}

export default function MarketplaceGrid({ category }: MarketplaceGridProps) {
  // This would normally be fetched from an API based on the category
  const items = [
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
    },
  ]

  const filteredItems = category && category !== "all" ? items.filter((item) => item.type === category) : items

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {filteredItems.map((item) => (
        <Card key={item.id} className="overflow-hidden">
          <Link href={`/content/${item.id}`} className="block">
            <div className="relative aspect-square overflow-hidden">
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
              />
              <div className="absolute top-2 left-2">
                <Badge variant="secondary" className="bg-black/70 text-white hover:bg-black/80">
                  {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
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
      ))}
    </div>
  )
}

