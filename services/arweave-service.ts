import Arweave from "arweave"
import type { JWKInterface } from "arweave/node/lib/wallet"

// Initialize Arweave
const arweave = Arweave.init({
  host: "arweave.net",
  port: 443,
  protocol: "https",
  timeout: 20000,
  logging: false,
})

export interface ArweaveConfig {
  wallet?: JWKInterface
  appName: string
  appVersion: string
}

export class ArweaveService {
  private wallet: JWKInterface | undefined
  private appName: string
  private appVersion: string

  constructor(config: ArweaveConfig) {
    this.wallet = config.wallet
    this.appName = config.appName
    this.appVersion = config.appVersion
  }

  /**
   * Upload data to Arweave
   * @param data The data to upload (can be a file, text, or JSON)
   * @param contentType The MIME type of the content
   * @param tags Additional tags to add to the transaction
   * @returns The transaction ID
   */
  async uploadData(
    data: string | Buffer | object,
    contentType: string,
    tags: { name: string; value: string }[] = [],
  ): Promise<string> {
    if (!this.wallet) {
      throw new Error("Wallet not provided. Cannot upload data.")
    }

    // Convert data to the right format
    let formattedData: string | Buffer
    if (typeof data === "object" && !(data instanceof Buffer)) {
      formattedData = JSON.stringify(data)
      if (!contentType.includes("json")) {
        contentType = "application/json"
      }
    } else {
      formattedData = data as string | Buffer
    }

    // Create transaction
    const transaction = await arweave.createTransaction(
      {
        data: formattedData,
      },
      this.wallet,
    )

    // Set content type
    transaction.addTag("Content-Type", contentType)

    // Add app info tags
    transaction.addTag("App-Name", this.appName)
    transaction.addTag("App-Version", this.appVersion)

    // Add custom tags
    for (const tag of tags) {
      transaction.addTag(tag.name, tag.value)
    }

    // Sign transaction
    await arweave.transactions.sign(transaction, this.wallet)

    // Submit transaction
    const response = await arweave.transactions.post(transaction)

    if (response.status !== 200 && response.status !== 202) {
      throw new Error(`Failed to submit transaction: ${response.statusText}`)
    }

    return transaction.id
  }

  /**
   * Upload content metadata to Arweave
   * @param metadata The content metadata
   * @returns The transaction ID
   */
  async uploadContentMetadata(metadata: ContentMetadata): Promise<string> {
    return this.uploadData(metadata, "application/json", [
      { name: "Content-Type", value: "application/json" },
      { name: "Content-Id", value: metadata.id },
      { name: "Content-Title", value: metadata.title },
      { name: "Content-Creator", value: metadata.creator.id },
      { name: "Content-Type", value: metadata.category },
      { name: "Slydr-Content", value: "true" },
    ])
  }

  /**
   * Fetch data from Arweave by transaction ID
   * @param txId The transaction ID
   * @returns The data as a string or Buffer
   */
  async getData(txId: string): Promise<string> {
    try {
      const data = await arweave.transactions.getData(txId, {
        decode: true,
        string: true,
      })
      return data as string
    } catch (error) {
      console.error("Error fetching data from Arweave:", error)
      throw new Error(`Failed to fetch data: ${error}`)
    }
  }

  /**
   * Get the status of a transaction
   * @param txId The transaction ID
   * @returns The transaction status
   */
  async getTransactionStatus(txId: string): Promise<any> {
    try {
      const status = await arweave.transactions.getStatus(txId)
      return status
    } catch (error) {
      console.error("Error getting transaction status:", error)
      throw new Error(`Failed to get transaction status: ${error}`)
    }
  }

  /**
   * Generate a wallet key
   * @returns A new JWK wallet
   */
  static async generateWallet(): Promise<JWKInterface> {
    return await arweave.wallets.generate()
  }

  /**
   * Get the wallet address from a JWK
   * @param jwk The JWK wallet
   * @returns The wallet address
   */
  static async getWalletAddress(jwk: JWKInterface): Promise<string> {
    return await arweave.wallets.jwkToAddress(jwk)
  }

  /**
   * Get the balance of a wallet
   * @param address The wallet address
   * @returns The wallet balance in AR
   */
  async getWalletBalance(address: string): Promise<string> {
    const winstonBalance = await arweave.wallets.getBalance(address)
    return arweave.ar.winstonToAr(winstonBalance)
  }
}

// Define content metadata interface
export interface ContentMetadata {
  id: string
  title: string
  description: string
  price: number
  resaleRights: boolean
  resaleRoyalty: number
  creator: {
    id: string
    name: string
    username: string
  }
  category: string
  tags: string[]
  createdAt: string
  mediaTransactionId?: string
  thumbnailTransactionId?: string
}

// Create and export a singleton instance
export const arweaveService = new ArweaveService({
  appName: "Slydr",
  appVersion: "1.0.0",
})

// Add the missing uploadToArweave export
export const uploadToArweave = async (
  data: string | Buffer | object,
  contentType: string,
  wallet: JWKInterface,
  tags: { name: string; value: string }[] = [],
): Promise<string> => {
  const service = new ArweaveService({
    wallet,
    appName: "Slydr",
    appVersion: "1.0.0",
  })

  return await service.uploadData(data, contentType, tags)
}

