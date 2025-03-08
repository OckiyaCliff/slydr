"use client"

import { useState, useEffect } from "react"
import { useUser } from "@/context/user-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default function AdminDashboard() {
  const { user } = useUser()
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalContent: 0,
    totalTransactions: 0,
    activeUsers: 0,
  })
  const [isAdmin, setIsAdmin] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if current user is an admin
    if (user) {
      setIsAdmin(user.role === "admin")
    }

    // Fetch stats if user is admin
    if (user?.role === "admin") {
      fetchStats()
    }

    setIsLoading(false)
  }, [user])

  const fetchStats = async () => {
    try {
      // In a real implementation, you would fetch these from your API
      // For now, we'll use placeholder data
      setStats({
        totalUsers: 0,
        totalContent: 0,
        totalTransactions: 0,
        activeUsers: 0,
      })
    } catch (error) {
      console.error("Error fetching admin stats:", error)
    }
  }

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  if (!isAdmin) {
    return (
      <div className="container mx-auto py-10">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Access Denied</AlertTitle>
          <AlertDescription>You do not have permission to access the admin dashboard.</AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.totalUsers}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Content Items</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.totalContent}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.totalTransactions}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.activeUsers}</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="users">
        <TabsList className="mb-4">
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Manage users, verify creators, and handle user reports.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>No users to display. Connect your database to see real user data.</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="mr-2">
                Export Users
              </Button>
              <Button>Add Admin User</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="content">
          <Card>
            <CardHeader>
              <CardTitle>Content Management</CardTitle>
              <CardDescription>Review, approve, or remove content from the platform.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>No content to display. Connect your database to see real content data.</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline">Export Content</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="transactions">
          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
              <CardDescription>View and manage all transactions on the platform.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>No transactions to display. Connect your database to see real transaction data.</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline">Export Transactions</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Platform Settings</CardTitle>
              <CardDescription>Configure platform-wide settings and features.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Database Management</h3>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    Clean Test Data
                  </Button>
                  <Button variant="outline" size="sm">
                    Backup Database
                  </Button>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Feature Toggles</h3>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    Toggle AI Features
                  </Button>
                  <Button variant="outline" size="sm">
                    Toggle Marketplace
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

