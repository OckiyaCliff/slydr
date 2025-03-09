"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import { GripVertical, X, Plus, Save } from "lucide-react"

// Mock data for demonstration
const mockFeaturedContent = [
  { id: "1", title: "Digital Art Collection", creator: "Artist Name", type: "Art" },
  { id: "2", title: "Music Album", creator: "Musician Name", type: "Music" },
  { id: "3", title: "E-Book Series", creator: "Author Name", type: "Writing" },
]

const mockFeaturedCreators = [
  { id: "1", name: "Creator One", followers: 1200, contentCount: 15 },
  { id: "2", name: "Creator Two", followers: 850, contentCount: 8 },
  { id: "3", name: "Creator Three", followers: 3400, contentCount: 24 },
]

export default function FeaturedContentPage() {
  const [featuredContent, setFeaturedContent] = useState(mockFeaturedContent)
  const [featuredCreators, setFeaturedCreators] = useState(mockFeaturedCreators)
  const [autoTrending, setAutoTrending] = useState(true)

  // Handle drag and drop reordering
  const handleDragEnd = (result: any, listType: "content" | "creators") => {
    if (!result.destination) return

    const items = listType === "content" ? [...featuredContent] : [...featuredCreators]
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    if (listType === "content") {
      setFeaturedContent(items)
    } else {
      setFeaturedCreators(items)
    }
  }

  // Remove item from list
  const removeItem = (id: string, listType: "content" | "creators") => {
    if (listType === "content") {
      setFeaturedContent(featuredContent.filter((item) => item.id !== id))
    } else {
      setFeaturedCreators(featuredCreators.filter((item) => item.id !== id))
    }
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Featured Content Management</h1>

      <Tabs defaultValue="homepage">
        <TabsList className="mb-4">
          <TabsTrigger value="homepage">Homepage</TabsTrigger>
          <TabsTrigger value="creators">Featured Creators</TabsTrigger>
          <TabsTrigger value="trending">Trending</TabsTrigger>
        </TabsList>

        <TabsContent value="homepage">
          <Card>
            <CardHeader>
              <CardTitle>Homepage Featured Content</CardTitle>
              <CardDescription>Drag and drop to reorder featured content on the homepage carousel.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">Current Featured Content</h3>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-1" /> Add Content
                  </Button>
                </div>

                <DragDropContext onDragEnd={(result) => handleDragEnd(result, "content")}>
                  <Droppable droppableId="featured-content">
                    {(provided) => (
                      <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                        {featuredContent.map((item, index) => (
                          <Draggable key={item.id} draggableId={item.id} index={index}>
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                className="flex items-center justify-between p-3 border rounded-md bg-card"
                              >
                                <div className="flex items-center">
                                  <div {...provided.dragHandleProps} className="mr-2 cursor-grab">
                                    <GripVertical className="h-5 w-5 text-muted-foreground" />
                                  </div>
                                  <div>
                                    <p className="font-medium">{item.title}</p>
                                    <p className="text-sm text-muted-foreground">By {item.creator}</p>
                                  </div>
                                </div>
                                <div className="flex items-center">
                                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded mr-2">
                                    {item.type}
                                  </span>
                                  <Button variant="ghost" size="icon" onClick={() => removeItem(item.id, "content")}>
                                    <X className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>

                {featuredContent.length === 0 && (
                  <div className="text-center p-4 border rounded-md">
                    <p className="text-muted-foreground">No featured content selected</p>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="mr-2">
                Reset
              </Button>
              <Button>
                <Save className="h-4 w-4 mr-1" /> Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="creators">
          <Card>
            <CardHeader>
              <CardTitle>Featured Creators</CardTitle>
              <CardDescription>Manage creators featured in the "Featured Creators" section.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">Current Featured Creators</h3>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-1" /> Add Creator
                  </Button>
                </div>

                <DragDropContext onDragEnd={(result) => handleDragEnd(result, "creators")}>
                  <Droppable droppableId="featured-creators">
                    {(provided) => (
                      <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                        {featuredCreators.map((creator, index) => (
                          <Draggable key={creator.id} draggableId={creator.id} index={index}>
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                className="flex items-center justify-between p-3 border rounded-md bg-card"
                              >
                                <div className="flex items-center">
                                  <div {...provided.dragHandleProps} className="mr-2 cursor-grab">
                                    <GripVertical className="h-5 w-5 text-muted-foreground" />
                                  </div>
                                  <div>
                                    <p className="font-medium">{creator.name}</p>
                                    <p className="text-sm text-muted-foreground">
                                      {creator.followers} followers • {creator.contentCount} items
                                    </p>
                                  </div>
                                </div>
                                <Button variant="ghost" size="icon" onClick={() => removeItem(creator.id, "creators")}>
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>

                {featuredCreators.length === 0 && (
                  <div className="text-center p-4 border rounded-md">
                    <p className="text-muted-foreground">No featured creators selected</p>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="mr-2">
                Reset
              </Button>
              <Button>
                <Save className="h-4 w-4 mr-1" /> Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="trending">
          <Card>
            <CardHeader>
              <CardTitle>Trending Content Settings</CardTitle>
              <CardDescription>Configure how trending content is determined and displayed.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="auto-trending" className="font-medium">
                      Automatic Trending
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Let the algorithm determine trending content based on views, sales, and engagement.
                    </p>
                  </div>
                  <Switch id="auto-trending" checked={autoTrending} onCheckedChange={setAutoTrending} />
                </div>

                {!autoTrending && (
                  <div className="space-y-4">
                    <h3 className="font-medium">Manual Trending Selection</h3>
                    <p className="text-sm text-muted-foreground">Select content to appear in the trending section.</p>

                    <div className="border rounded-md p-4">
                      <p className="text-center text-muted-foreground">
                        Manual trending selection is enabled. Connect your database to select trending content.
                      </p>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="trending-refresh" className="font-medium">
                    Trending Refresh Interval
                  </Label>
                  <p className="text-sm text-muted-foreground mb-2">
                    How often the trending algorithm updates (in hours).
                  </p>
                  <Input id="trending-refresh" type="number" defaultValue="24" min="1" max="168" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="mr-2">
                Reset to Default
              </Button>
              <Button>Save Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

