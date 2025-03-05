import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function FeaturedCreators() {
  const creators = [
    {
      id: 1,
      name: "Alex Rivera",
      handle: "@digitalartist",
      specialty: "Digital Art & Animation",
      followers: "12.5K",
      items: 24,
      avatar: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 2,
      name: "Samantha Chen",
      handle: "@musicmaker",
      specialty: "Electronic Music",
      followers: "8.3K",
      items: 16,
      avatar: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 3,
      name: "Marcus Johnson",
      handle: "@3ddesigner",
      specialty: "3D Models & Designs",
      followers: "15.7K",
      items: 32,
      avatar: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 4,
      name: "Priya Sharma",
      handle: "@fashiontech",
      specialty: "Digital Fashion",
      followers: "9.2K",
      items: 18,
      avatar: "/placeholder.svg?height=100&width=100",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
      {creators.map((creator) => (
        <Card key={creator.id} className="overflow-hidden">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={creator.avatar} alt={creator.name} />
                <AvatarFallback>{creator.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <h3 className="font-semibold text-lg">{creator.name}</h3>
              <p className="text-sm text-primary mb-1">{creator.handle}</p>
              <p className="text-sm text-muted-foreground mb-4">{creator.specialty}</p>
              <div className="flex justify-between w-full mb-4">
                <div className="text-center">
                  <p className="text-sm font-medium">{creator.followers}</p>
                  <p className="text-xs text-muted-foreground">Followers</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium">{creator.items}</p>
                  <p className="text-xs text-muted-foreground">Items</p>
                </div>
              </div>
              <Button asChild variant="outline" className="w-full">
                <Link href={`/creator/${creator.id}`}>View Profile</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

