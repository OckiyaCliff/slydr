"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { Connection, type PublicKey, type Transaction } from "@solana/web3.js"
import { PhantomWalletAdapter, SolflareWalletAdapter } from "@solana/wallet-adapter-wallets"
import type { WalletAdapter, WalletError } from "@solana/wallet-adapter-base"

// Define the network and RPC endpoint
const SOLANA_NETWORK = "devnet"
const SOLANA_RPC_ENDPOINT = "https://api.devnet.solana.com"

// Define the wallet context type
interface WalletContextType {
  connected: boolean
  publicKey: PublicKey | null
  wallet: WalletAdapter | null
  wallets: WalletAdapter[]
  connecting: boolean
  disconnecting: boolean
  select: (walletName: string) => void
  connect: () => Promise<void>
  disconnect: () => Promise<void>
  signTransaction: (transaction: Transaction) => Promise<Transaction>
  signAllTransactions: (transactions: Transaction[]) => Promise<Transaction[]>
  signMessage: (message: Uint8Array) => Promise<Uint8Array>
}

// Create the wallet context
const WalletContext = createContext<WalletContextType | undefined>(undefined)

// Create a provider component
export function WalletProvider({ children }: { children: ReactNode }) {
  const [connection] = useState(new Connection(SOLANA_RPC_ENDPOINT))
  const [wallets] = useState([new PhantomWalletAdapter(), new SolflareWalletAdapter()])
  const [wallet, setWallet] = useState<WalletAdapter | null>(null)
  const [connected, setConnected] = useState(false)
  const [publicKey, setPublicKey] = useState<PublicKey | null>(null)
  const [connecting, setConnecting] = useState(false)
  const [disconnecting, setDisconnecting] = useState(false)

  // Handle wallet events
  useEffect(() => {
    if (!wallet) return

    function onConnect() {
      if (wallet.publicKey) {
        setPublicKey(wallet.publicKey)
        setConnected(true)
      }
      setConnecting(false)
    }

    function onDisconnect() {
      setPublicKey(null)
      setConnected(false)
      setDisconnecting(false)
    }

    function onError(error: WalletError) {
      console.error(error)
      setConnecting(false)
      setDisconnecting(false)
    }

    wallet.on("connect", onConnect)
    wallet.on("disconnect", onDisconnect)
    wallet.on("error", onError)

    return () => {
      wallet.off("connect", onConnect)
      wallet.off("disconnect", onDisconnect)
      wallet.off("error", onError)
    }
  }, [wallet])

  // Select a wallet by name
  const select = (walletName: string) => {
    const selectedWallet = wallets.find((w) => w.name === walletName) || null
    setWallet(selectedWallet)
  }

  // Connect to the selected wallet
  const connect = async () => {
    if (!wallet) return
    setConnecting(true)
    try {
      await wallet.connect()
    } catch (error) {
      console.error(error)
      setConnecting(false)
    }
  }

  // Disconnect from the wallet
  const disconnect = async () => {
    if (!wallet) return
    setDisconnecting(true)
    try {
      await wallet.disconnect()
    } catch (error) {
      console.error(error)
      setDisconnecting(false)
    }
  }

  // Sign a transaction
  const signTransaction = async (transaction: Transaction): Promise<Transaction> => {
    if (!wallet || !wallet.signTransaction) {
      throw new Error("Wallet does not support transaction signing")
    }
    return wallet.signTransaction(transaction)
  }

  // Sign multiple transactions
  const signAllTransactions = async (transactions: Transaction[]): Promise<Transaction[]> => {
    if (!wallet || !wallet.signAllTransactions) {
      throw new Error("Wallet does not support signing multiple transactions")
    }
    return wallet.signAllTransactions(transactions)
  }

  // Sign a message
  const signMessage = async (message: Uint8Array): Promise<Uint8Array> => {
    if (!wallet || !wallet.signMessage) {
      throw new Error("Wallet does not support message signing")
    }
    return wallet.signMessage(message)
  }

  return (
    <WalletContext.Provider
      value={{
        connected,
        publicKey,
        wallet,
        wallets,
        connecting,
        disconnecting,
        select,
        connect,
        disconnect,
        signTransaction,
        signAllTransactions,
        signMessage,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}

// Create a hook to use the wallet context
export function useWallet() {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider")
  }
  return context
}

