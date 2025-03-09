"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useWallet } from "@/context/wallet-context"

export function ConnectWalletCTA() {
  const { connected } = useWallet()

  return (
    <Button className="w-full" asChild>
      <Link href={connected ? "/marketplace" : "/dashboard"}>
        {connected ? "Explore Marketplace" : "Connect Wallet"}
      </Link>
    </Button>
  )
}

