import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Search, Filter, FlameIcon as Fire, Music, Paintbrush, Shapes, TrendingUp } from "lucide-react"
import TrendingGrid from "@/components/trending-grid"

export default function TrendingPage() {
  return (
    <div className="container px-4 py-8 md:py-12">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Fire className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold tracking-tight">Hot & Trending</h1>
        </div>
        <p className="text-muted-foreground">Discover the most popular content trending across the Slydr marketplace</p>
      </div>

      <div className="mt-8 flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search trending content..." className="pl-8 w-full" />
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <span>Filters</span>
          </Button>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid grid-cols-5 w-full max-w-md mx-auto">
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
            <TabsTrigger value="other" className="flex items-center gap-1">
              <span>Other</span>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-6">
            <TrendingGrid />
          </TabsContent>
          <TabsContent value="art" className="mt-6">
            <TrendingGrid category="art" />
          </TabsContent>
          <TabsContent value="music" className="mt-6">
            <TrendingGrid category="music" />
          </TabsContent>
          <TabsContent value="design" className="mt-6">
            <TrendingGrid category="design" />
          </TabsContent>
          <TabsContent value="other" className="mt-6">
            <TrendingGrid category="other" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

