"use client"

import { useState, useEffect } from "react"
import { useUser } from "@/context/user-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"

export default function SettingsPage() {
  const { user, updateUser, isLoading } = useUser()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  // Add mounted state to prevent hydration issues
  useEffect(() => {
    setMounted(true)
  }, [])

  // Redirect if not logged in
  useEffect(() => {
    if (mounted && !isLoading && !user) {
      router.push("/")
    }
  }, [user, isLoading, router, mounted])

  const [formData, setFormData] = useState({
    displayName: "",
    bio: "",
    email: "",
    notifications: {
      email: true,
      marketing: false,
      social: true,
      security: true,
    },
    privacy: {
      profileVisibility: "public",
      activityVisibility: "followers",
    },
  })

  // Update form data when user is loaded
  useEffect(() => {
    if (user) {
      setFormData({
        displayName: user.displayName || "",
        bio: user.bio || "",
        email: user.email || "",
        notifications: {
          email: true,
          marketing: false,
          social: true,
          security: true,
        },
        privacy: {
          profileVisibility: "public",
          activityVisibility: "followers",
        },
      })
    }
  }, [user])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleNotificationChange = (name, checked) => {
    setFormData((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [name]: checked,
      },
    }))
  }

  const handlePrivacyChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [name]: value,
      },
    }))
  }

  const handleSubmit = async () => {
    if (user) {
      await updateUser(user.id, {
        displayName: formData.displayName,
        bio: formData.bio,
        email: formData.email,
      })
    }
  }

  if (!mounted || isLoading || !user) {
    return null
  }

  return (
    <div className="container mx-auto py-10">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">Manage your account settings and preferences.</p>
        </div>
        <Tabs defaultValue="general" className="space-y-6">
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
          </TabsList>
          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>Update your profile information.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="displayName">Display Name</Label>
                  <Input
                    id="displayName"
                    name="displayName"
                    value={formData.displayName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea id="bio" name="bio" value={formData.bio} onChange={handleInputChange} rows={4} />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSubmit}>Save Changes</Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Email</CardTitle>
                <CardDescription>Update your email address.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSubmit}>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>Configure how you receive notifications.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications via email.</p>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={formData.notifications.email}
                    onCheckedChange={(checked) => handleNotificationChange("email", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="marketing-notifications">Marketing Emails</Label>
                    <p className="text-sm text-muted-foreground">Receive marketing emails and offers.</p>
                  </div>
                  <Switch
                    id="marketing-notifications"
                    checked={formData.notifications.marketing}
                    onCheckedChange={(checked) => handleNotificationChange("marketing", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="social-notifications">Social Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications about follows, comments, etc.</p>
                  </div>
                  <Switch
                    id="social-notifications"
                    checked={formData.notifications.social}
                    onCheckedChange={(checked) => handleNotificationChange("social", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="security-notifications">Security Updates</Label>
                    <p className="text-sm text-muted-foreground">Receive security and account notifications.</p>
                  </div>
                  <Switch
                    id="security-notifications"
                    checked={formData.notifications.security}
                    onCheckedChange={(checked) => handleNotificationChange("security", checked)}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSubmit}>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="privacy" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Privacy</CardTitle>
                <CardDescription>Manage your privacy settings.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="profile-visibility">Profile Visibility</Label>
                  <select
                    id="profile-visibility"
                    className="w-full p-2 border rounded-md"
                    value={formData.privacy.profileVisibility}
                    onChange={(e) => handlePrivacyChange("profileVisibility", e.target.value)}
                  >
                    <option value="public">Public</option>
                    <option value="followers">Followers Only</option>
                    <option value="private">Private</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="activity-visibility">Activity Visibility</Label>
                  <select
                    id="activity-visibility"
                    className="w-full p-2 border rounded-md"
                    value={formData.privacy.activityVisibility}
                    onChange={(e) => handlePrivacyChange("activityVisibility", e.target.value)}
                  >
                    <option value="public">Public</option>
                    <option value="followers">Followers Only</option>
                    <option value="private">Private</option>
                  </select>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSubmit}>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="appearance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>Customize the appearance of the application.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Theme</Label>
                  <div className="flex space-x-4">
                    <Button variant="outline">Light</Button>
                    <Button variant="outline">Dark</Button>
                    <Button variant="outline">System</Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSubmit}>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

