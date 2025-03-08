"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, Menu, Bell, ChevronDown, User, LogOut, Settings, LayoutDashboard } from "lucide-react"
import ThemeToggle from "@/components/theme-toggle"
import WalletConnect from "@/components/wallet-connect"
import { useUser } from "@/context/user-context"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

export default function Navbar() {
  const { user, logout } = useUser()
  const pathname = usePathname()
  const isLoggedIn = !!user
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchActive, setSearchActive] = useState(false)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Main navigation items
  const mainNavItems = [
    { href: "/marketplace", label: "Marketplace" },
    { href: "/creators", label: "Creators" },
    { href: "/learn", label: "Learn" },
  ]

  // Resource navigation items for dropdown
  const resourceItems = [
    { href: "/resources", label: "Resources" },
    { href: "/docs", label: "Documentation" },
    { href: "/guides", label: "Guides" },
    { href: "/faq", label: "FAQ" },
    { href: "/support", label: "Support" },
  ]

  const aboutItems = [
    { href: "/about", label: "About" },
    { href: "/team", label: "Team" },
    { href: "/careers", label: "Careers" },
  ]

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user) return "UN"
    return user.displayName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-200",
        isScrolled && "shadow-sm",
      )}
    >
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
              <div className="grid gap-6 text-lg font-medium">
                <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
                  <span className="text-primary">Slydr</span>
                </Link>

                {/* Mobile main navigation */}
                {mainNavItems.map((item) => (
                  <SheetClose asChild key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "transition-colors hover:text-primary",
                        pathname === item.href && "text-primary font-semibold",
                      )}
                    >
                      {item.label}
                    </Link>
                  </SheetClose>
                ))}

                {/* Mobile resources section */}
                <div className="space-y-3 pt-3 border-t">
                  <p className="text-sm font-semibold text-muted-foreground">Resources</p>
                  {resourceItems.map((item) => (
                    <SheetClose asChild key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          "block transition-colors hover:text-primary text-base",
                          pathname === item.href && "text-primary font-semibold",
                        )}
                      >
                        {item.label}
                      </Link>
                    </SheetClose>
                  ))}
                </div>

                {/* Mobile about section */}
                <div className="space-y-3 pt-3 border-t">
                  <p className="text-sm font-semibold text-muted-foreground">About</p>
                  {aboutItems.map((item) => (
                    <SheetClose asChild key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          "block transition-colors hover:text-primary text-base",
                          pathname === item.href && "text-primary font-semibold",
                        )}
                      >
                        {item.label}
                      </Link>
                    </SheetClose>
                  ))}
                </div>

                {/* Mobile dashboard link - Only shown when logged in */}
                {isLoggedIn && (
                  <div className="pt-3 border-t">
                    <SheetClose asChild>
                      <Link
                        href="/dashboard"
                        className={cn(
                          "flex items-center gap-2 transition-colors hover:text-primary",
                          pathname === "/dashboard" && "text-primary font-semibold",
                        )}
                      >
                        <LayoutDashboard className="h-4 w-4" />
                        Dashboard
                      </Link>
                    </SheetClose>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>

          <Link href="/" className="flex items-center gap-2 text-xl font-bold">
            <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">Slydr</span>
          </Link>

          {/* Desktop main navigation */}
          <nav className="hidden md:flex gap-6 text-sm font-medium">
            {mainNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "transition-colors hover:text-primary relative py-2",
                  pathname === item.href
                    ? "text-primary after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary"
                    : "text-foreground/80",
                )}
              >
                {item.label}
              </Link>
            ))}

            {/* Resources dropdown - Hover version */}
            <div className="relative group">
              <button className="p-0 h-auto font-medium text-sm hover:bg-transparent flex items-center gap-1 py-2">
                <span
                  className={cn(
                    "transition-colors hover:text-primary flex items-center gap-1",
                    resourceItems.some((item) => pathname === item.href) && "text-primary",
                  )}
                >
                  Resources <ChevronDown className="h-4 w-4" />
                </span>
              </button>
              <div className="absolute left-0 top-full z-50 hidden group-hover:block pt-2">
                <div className="bg-background rounded-md border shadow-md w-48 p-2">
                  {resourceItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "block px-2 py-1.5 text-sm rounded-sm hover:bg-muted transition-colors",
                        pathname === item.href && "font-medium",
                      )}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* About dropdown - Hover version */}
            <div className="relative group">
              <button className="p-0 h-auto font-medium text-sm hover:bg-transparent flex items-center gap-1 py-2">
                <span
                  className={cn(
                    "transition-colors hover:text-primary flex items-center gap-1",
                    aboutItems.some((item) => pathname === item.href) && "text-primary",
                  )}
                >
                  About <ChevronDown className="h-4 w-4" />
                </span>
              </button>
              <div className="absolute left-0 top-full z-50 hidden group-hover:block pt-2">
                <div className="bg-background rounded-md border shadow-md w-48 p-2">
                  {aboutItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "block px-2 py-1.5 text-sm rounded-sm hover:bg-muted transition-colors",
                        pathname === item.href && "font-medium",
                      )}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </nav>
        </div>

        {/* Search bar - Desktop */}
        <div className="hidden md:flex items-center gap-2">
          <div className={cn("relative transition-all", searchActive ? "w-[350px]" : "w-[250px]")}>
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search content, creators..."
              className="pl-8"
              onFocus={() => setSearchActive(true)}
              onBlur={() => setSearchActive(false)}
            />
          </div>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>

          <ThemeToggle />

          {isLoggedIn && (
            <>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Notifications</span>
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary"></span>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2 h-9 px-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={user.avatar} alt={user.displayName} />
                      <AvatarFallback>{getUserInitials()}</AvatarFallback>
                    </Avatar>
                    <span className="hidden sm:inline-block font-normal truncate max-w-[100px]">
                      {user.displayName}
                    </span>
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard">
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        <span>Dashboard</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/profile">
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/settings">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}

          {!isLoggedIn && <WalletConnect />}
        </div>
      </div>
    </header>
  )
}

