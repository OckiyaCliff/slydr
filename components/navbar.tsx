"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Search, Menu, Bell } from "lucide-react"
import ThemeToggle from "@/components/theme-toggle"
import WalletConnect from "@/components/wallet-connect"
import { useUser } from "@/context/user-context"

export default function Navbar() {
  const { user } = useUser()
  const isLoggedIn = !!user

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2 md:gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="grid gap-6 text-lg font-medium">
                <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
                  <span className="text-primary">Slydr</span>
                </Link>
                <Link href="/marketplace" className="hover:text-primary">
                  Marketplace
                </Link>
                <Link href="/creators" className="hover:text-primary">
                  Creators
                </Link>
                <Link href="/learn" className="hover:text-primary">
                  Learn
                </Link>
                <Link href="/about" className="hover:text-primary">
                  About
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
            <span className="text-primary">Slydr</span>
          </Link>
          <nav className="hidden md:flex gap-6 text-sm font-medium">
            <Link href="/marketplace" className="hover:text-primary transition-colors">
              Marketplace
            </Link>
            <Link href="/creators" className="hover:text-primary transition-colors">
              Creators
            </Link>
            <Link href="/learn" className="hover:text-primary transition-colors">
              Learn
            </Link>
            <Link href="/about" className="hover:text-primary transition-colors">
              About
            </Link>
          </nav>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search..." className="w-[200px] lg:w-[300px] pl-8" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>

          <ThemeToggle />

          {isLoggedIn && (
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>
          )}

          <WalletConnect />
        </div>
      </div>
    </header>
  )
}

