"use client"

import { useState } from "react"
import { useUser } from "@/context/user-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { Bell, Shield, Wallet, User, Globe } from "lucide-react"

export default function SettingsPage() {
  const { user, isLoading, updateProfile } = useUser()
  const router = useRouter()
  const [isSaving, setIsSaving] = useState(false)

  // Redirect if not logged in
  if (!isLoading && !user) {
    router.push("/")
    return null
  }

  if (isLoading || !user) {
    return <div className="container py-12">Loading settings...</div>
  }

  const handleSaveProfile = async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSaving(false)
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-4 mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
      </div>

      <Tabs defaultValue="profile">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/4">
            <TabsList className="flex flex-col w-full h-auto">
              <TabsTrigger value="profile" className="justify-start w-full">
                <User className="h-4 w-4 mr-2" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="account" className="justify-start w-full">
                <Shield className="h-4 w-4 mr-2" />
                Account
              </TabsTrigger>
              <TabsTrigger value="notifications" className="justify-start w-full">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="wallet" className="justify-start w-full">
                <Wallet className="h-4 w-4 mr-2" />
                Wallet
              </TabsTrigger>
              <TabsTrigger value="preferences" className="justify-start w-full">
                <Globe className="h-4 w-4 mr-2" />
                Preferences
              </TabsTrigger>
            </TabsList>
          </div>
          <div className="md:w-3/4">
            <TabsContent value="profile" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Profile</CardTitle>
                  <CardDescription>Manage your public profile information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="displayName">Display Name</Label>
                    <Input id="displayName" defaultValue={user.displayName} placeholder="Your display name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" defaultValue={user.username} placeholder="Your username" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea id="bio" defaultValue={user.bio} placeholder="Tell us about yourself" rows={4} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="twitter">Twitter</Label>
                    <Input id="twitter" defaultValue={user.socialLinks.twitter || ""} placeholder="@username" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="instagram">Instagram</Label>
                    <Input id="instagram" defaultValue={user.socialLinks.instagram || ""} placeholder="@username" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      defaultValue={user.socialLinks.website || ""}
                      placeholder="https://example.com"
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSaveProfile} disabled={isSaving}>
                    {isSaving ? "Saving..." : "Save Changes"}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="account" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Account</CardTitle>
                  <CardDescription>Manage your account settings and security</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="Your email address" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="twoFactor">Two-Factor Authentication</Label>
                      <Switch id="twoFactor" />
                    </div>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSaveProfile} disabled={isSaving}>
                    {isSaving ? "Saving..." : "Save Changes"}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="notifications" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Notifications</CardTitle>
                  <CardDescription>Manage your notification preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="salesNotifications">Sales</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications when your content is sold</p>
                    </div>
                    <Switch id="salesNotifications" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="royaltyNotifications">Royalties</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications when you earn royalties</p>
                    </div>
                    <Switch id="royaltyNotifications" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="followNotifications">New Followers</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications when someone follows you</p>
                    </div>
                    <Switch id="followNotifications" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="marketingNotifications">Marketing</Label>
                      <p className="text-sm text-muted-foreground">Receive updates about new features and promotions</p>
                    </div>
                    <Switch id="marketingNotifications" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSaveProfile} disabled={isSaving}>
                    {isSaving ? "Saving..." : "Save Changes"}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="wallet" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Wallet</CardTitle>
                  <CardDescription>Manage your connected wallets and payment settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Wallet className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">Solana Wallet</p>
                          <p className="text-sm text-muted-foreground">
                            {user.publicKey.substring(0, 6)}...{user.publicKey.substring(user.publicKey.length - 4)}
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Disconnect
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="defaultRoyalty">Default Royalty Percentage</Label>
                    <div className="flex items-center gap-2">
                      <Input id="defaultRoyalty" type="number" defaultValue="10" min="0" max="50" />
                      <span>%</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Set your default royalty percentage for new creations
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSaveProfile} disabled={isSaving}>
                    {isSaving ? "Saving..." : "Save Changes"}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="preferences" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Preferences</CardTitle>
                  <CardDescription>Customize your experience on Slydr</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="darkMode">Dark Mode</Label>
                      <p className="text-sm text-muted-foreground">Toggle between light and dark mode</p>
                    </div>
                    <Switch id="darkMode" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="language">Language</Label>
                      <p className="text-sm text-muted-foreground">Choose your preferred language</p>
                    </div>
                    <select className="p-2 border rounded-md">
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                    </select>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSaveProfile} disabled={isSaving}>
                    {isSaving ? "Saving..." : "Save Changes"}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </div>
  )
}

