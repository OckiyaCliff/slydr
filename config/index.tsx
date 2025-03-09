import { cookieStorage, createStorage } from "@wagmi/core"
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi"
import { mainnet, arbitrum } from "viem/chains"

// Get projectId from https://cloud.reown.com
export const projectId = "62fd76ea5d83dd41321986f56eab4a4a"

if (!projectId) {
  throw new Error("Project ID is not defined")
}

export const networks = [mainnet, arbitrum]

//Set up the Wagmi Adapter (Config)
export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
  projectId,
  chains: networks,
})

export const config = wagmiAdapter.wagmiConfig

