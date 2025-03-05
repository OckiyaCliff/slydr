"use client"

import { useState } from "react"
import { useWallet } from "@/context/wallet-context"
import { useUser } from "@/context/user-context"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Wallet, LogOut, User, Settings, CreditCard } from "lucide-react"
import Link from "next/link"

export default function WalletConnect() {
  const { connected, publicKey, wallets, select, connect, disconnect } = useWallet()
  const { user, login, logout } = useUser()
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleConnect = async (walletName: string) => {
    select(walletName)
    try {
      await login()
      setIsDialogOpen(false)
    } catch (error) {
      console.error("Failed to connect wallet:", error)
    }
  }

  const handleDisconnect = () => {
    logout()
  }

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`
  }

  if (connected && publicKey) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={user?.avatar || ""} alt={user?.displayName || "User"} />
              <AvatarFallback>{user?.displayName?.charAt(0) || "U"}</AvatarFallback>
            </Avatar>
            <span className="hidden md:inline">{truncateAddress(publicKey.toString())}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/profile" className="flex items-center gap-2 cursor-pointer">
              <User className="h-4 w-4" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/dashboard" className="flex items-center gap-2 cursor-pointer">
              <CreditCard className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/settings" className="flex items-center gap-2 cursor-pointer">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleDisconnect} className="flex items-center gap-2 cursor-pointer">
            <LogOut className="h-4 w-4" />
            <span>Disconnect</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button className="flex items-center gap-2">
            <Wallet className="h-4 w-4" />
            <span>Connect Wallet</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Connect your wallet</DialogTitle>
            <DialogDescription>
              Connect your Solana wallet to access Slydr's features and manage your digital assets.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {wallets.map((wallet) => (
              <Button
                key={wallet.name}
                variant="outline"
                className="flex items-center justify-between w-full p-4"
                onClick={() => handleConnect(wallet.name)}
              >
                <span>{wallet.name}</span>
                <Wallet className="h-5 w-5" />
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

