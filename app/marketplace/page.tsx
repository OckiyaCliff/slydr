import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, SlidersHorizontal } from "lucide-react"
import MarketplaceGrid from "@/components/marketplace-grid"

export default function MarketplacePage() {
  return (
    <div className="container px-4 py-8 md:py-12">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Marketplace</h1>
        <p className="text-muted-foreground">Discover and collect exclusive digital content with resale rights</p>
      </div>

      <div className="mt-8 flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search for content or creators..." className="pl-8 w-full" />
          </div>
          <div className="flex gap-2">
            <Select defaultValue="newest">
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="royalty">Highest Royalty</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <SlidersHorizontal className="h-4 w-4" />
              <span className="sr-only">Filters</span>
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid grid-cols-5 w-full max-w-md">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="art">Art</TabsTrigger>
            <TabsTrigger value="music">Music</TabsTrigger>
            <TabsTrigger value="design">Design</TabsTrigger>
            <TabsTrigger value="other">Other</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-6">
            <MarketplaceGrid />
          </TabsContent>
          <TabsContent value="art" className="mt-6">
            <MarketplaceGrid category="art" />
          </TabsContent>
          <TabsContent value="music" className="mt-6">
            <MarketplaceGrid category="music" />
          </TabsContent>
          <TabsContent value="design" className="mt-6">
            <MarketplaceGrid category="design" />
          </TabsContent>
          <TabsContent value="other" className="mt-6">
            <MarketplaceGrid category="other" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

