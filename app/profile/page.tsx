"use client"

import type React from "react"

import { useState } from "react"
import { useUser, type UserProfile } from "@/context/user-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Pencil, Save, User, Twitter, Instagram, Globe, CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function ProfilePage() {
  const { user, isLoading, updateProfile } = useUser()
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState<Partial<UserProfile>>(user || {})

  // Redirect if not logged in
  if (!isLoading && !user) {
    router.push("/")
    return null
  }

  if (isLoading || !user) {
    return <div className="container py-12">Loading profile...</div>
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    if (name.includes(".")) {
      const [parent, child] = name.split(".")
      setFormData({
        ...formData,
        [parent]: {
          ...((formData as any)[parent] || {}),
          [child]: value,
        },
      })
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await updateProfile(formData)
    setIsEditing(false)
  }

  return (
    <div className="container py-8">
      <div className="relative w-full h-48 md:h-64 rounded-lg overflow-hidden mb-16">
        <Image
          src={user.coverImage || "/placeholder.svg?height=800&width=1600"}
          alt="Cover"
          fill
          className="object-cover"
        />
        <div className="absolute -bottom-16 left-8 border-4 border-background rounded-full">
          <Avatar className="h-32 w-32">
            <AvatarImage src={user.avatar} alt={user.displayName} />
            <AvatarFallback>{user.displayName.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>
        <div className="absolute top-4 right-4">
          <Button
            variant="outline"
            size="sm"
            className="bg-background/80 backdrop-blur-sm"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? (
              <>
                <Save className="h-4 w-4 mr-2" />
                <span>Cancel</span>
              </>
            ) : (
              <>
                <Pencil className="h-4 w-4 mr-2" />
                <span>Edit Profile</span>
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {user.displayName}
                {user.isVerified && <CheckCircle className="h-5 w-5 text-primary" />}
              </CardTitle>
              <CardDescription>@{user.username}</CardDescription>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="displayName">Display Name</Label>
                      <Input
                        id="displayName"
                        name="displayName"
                        value={formData.displayName || ""}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        name="username"
                        value={formData.username || ""}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea id="bio" name="bio" value={formData.bio || ""} onChange={handleInputChange} rows={4} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="socialLinks.twitter">Twitter</Label>
                      <Input
                        id="socialLinks.twitter"
                        name="socialLinks.twitter"
                        value={formData.socialLinks?.twitter || ""}
                        onChange={handleInputChange}
                        placeholder="@username"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="socialLinks.instagram">Instagram</Label>
                      <Input
                        id="socialLinks.instagram"
                        name="socialLinks.instagram"
                        value={formData.socialLinks?.instagram || ""}
                        onChange={handleInputChange}
                        placeholder="@username"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="socialLinks.website">Website</Label>
                      <Input
                        id="socialLinks.website"
                        name="socialLinks.website"
                        value={formData.socialLinks?.website || ""}
                        onChange={handleInputChange}
                        placeholder="https://example.com"
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      Save Changes
                    </Button>
                  </div>
                </form>
              ) : (
                <>
                  <p className="text-sm text-muted-foreground mb-4">{user.bio}</p>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-sm">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span>Joined {new Date(user.joinedAt).toLocaleDateString()}</span>
                    </div>
                    {user.socialLinks.twitter && (
                      <div className="flex items-center gap-2 text-sm">
                        <Twitter className="h-4 w-4 text-muted-foreground" />
                        <span>{user.socialLinks.twitter}</span>
                      </div>
                    )}
                    {user.socialLinks.instagram && (
                      <div className="flex items-center gap-2 text-sm">
                        <Instagram className="h-4 w-4 text-muted-foreground" />
                        <span>{user.socialLinks.instagram}</span>
                      </div>
                    )}
                    {user.socialLinks.website && (
                      <div className="flex items-center gap-2 text-sm">
                        <Globe className="h-4 w-4 text-muted-foreground" />
                        <span>{user.socialLinks.website}</span>
                      </div>
                    )}
                  </div>
                </>
              )}
            </CardContent>
            <CardFooter className="border-t pt-4">
              <div className="grid grid-cols-2 w-full gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold">{user.stats.followers}</p>
                  <p className="text-xs text-muted-foreground">Followers</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">{user.stats.following}</p>
                  <p className="text-xs text-muted-foreground">Following</p>
                </div>
              </div>
            </CardFooter>
          </Card>
        </div>

        <div className="w-full md:w-2/3">
          <Tabs defaultValue="creations">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="creations">Creations</TabsTrigger>
              <TabsTrigger value="collected">Collected</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="reselling">Reselling</TabsTrigger>
            </TabsList>
            <TabsContent value="creations" className="mt-6">
              {user.stats.creations > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Content would be loaded here */}
                  <Card>
                    <CardContent className="p-0">
                      <div className="aspect-square relative">
                        <Image
                          src="/placeholder.svg?height=400&width=400"
                          alt="Creation"
                          fill
                          className="object-cover rounded-t-lg"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium">Sample Creation</h3>
                        <p className="text-sm text-muted-foreground">2.5 SOL</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">You haven't created any content yet.</p>
                  <Button className="mt-4">Create Your First Item</Button>
                </div>
              )}
            </TabsContent>
            <TabsContent value="collected" className="mt-6">
              {user.stats.sales > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="p-0">
                      <div className="aspect-square relative">
                        <Image
                          src="/placeholder.svg?height=400&width=400"
                          alt="Collected Item"
                          fill
                          className="object-cover rounded-t-lg"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium">Collected Item</h3>
                        <p className="text-sm text-muted-foreground">Purchased for 1.8 SOL</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">You haven't collected any items yet.</p>
                  <Button className="mt-4">Explore Marketplace</Button>
                </div>
              )}
            </TabsContent>
            <TabsContent value="activity" className="mt-6">
              <div className="space-y-4">
                <p className="text-muted-foreground text-center py-12">No recent activity to display.</p>
              </div>
            </TabsContent>
            <TabsContent value="reselling" className="mt-6">
              <div className="text-center py-12">
                <p className="text-muted-foreground">You aren't reselling any items yet.</p>
                <Button className="mt-4">Start Reselling</Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

