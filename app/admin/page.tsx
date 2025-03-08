import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Database Setup</CardTitle>
            <CardDescription>Create database schema</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Set up the database schema with all required tables, indexes, and functions.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild>
              <Link href="/admin/setup">Go to Setup</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Seed Database</CardTitle>
            <CardDescription>Add test data</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Populate your database with test users, content, and relationships.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild>
              <Link href="/admin/seed">Go to Seed</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Database Manager</CardTitle>
            <CardDescription>View and manage data</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Browse, search, and manage data in your database tables.</p>
          </CardContent>
          <CardFooter>
            <Button asChild>
              <Link href="/admin/database">Go to Manager</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Connection Test</CardTitle>
            <CardDescription>Test Supabase connection</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Verify that your application can connect to Supabase correctly.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild>
              <Link href="/admin/supabase-test">Go to Test</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

