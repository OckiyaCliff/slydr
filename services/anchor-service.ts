import { Connection, PublicKey, SystemProgram } from "@solana/web3.js"
import { Program, AnchorProvider, BN } from "@project-serum/anchor"
import { idl } from "../programs/slydr-program"

export class AnchorService {
  private connection: Connection
  private provider: AnchorProvider | null = null
  private program: Program | null = null
  private programId: PublicKey

  constructor(
    rpcUrl = "https://api.devnet.solana.com",
    programIdString = "YOUR_PROGRAM_ID_HERE", // Replace with your deployed program ID
  ) {
    this.connection = new Connection(rpcUrl, "confirmed")
    this.programId = new PublicKey(programIdString)
  }

  /**
   * Initialize the provider and program with a wallet
   * @param wallet The wallet to use for transactions
   */
  initializeWithWallet(wallet: any) {
    // Create a provider with the wallet
    this.provider = new AnchorProvider(this.connection, wallet, { preflightCommitment: "confirmed" })

    // Create the program interface
    this.program = new Program(idl as any, this.programId, this.provider)
  }

  /**
   * Initialize the platform
   * @param authority The authority public key
   * @param platformFee The platform fee (in lamports)
   * @returns Transaction signature
   */
  async initializePlatform(authority: PublicKey, platformFee: number): Promise<string> {
    if (!this.program || !this.provider) {
      throw new Error("Program not initialized")
    }

    // Derive the platform PDA
    const [platformPda] = await PublicKey.findProgramAddress([Buffer.from("platform")], this.programId)

    // Call the initialize instruction
    const tx = await this.program.methods
      .initialize(new BN(platformFee))
      .accounts({
        platform: platformPda,
        authority,
        systemProgram: SystemProgram.programId,
      })
      .rpc()

    return tx
  }

  /**
   * Create new content
   * @param creator The creator's public key
   * @param contentId The content ID
   * @param arweaveId The Arweave transaction ID
   * @param price The content price (in lamports)
   * @param royaltyPercentage The royalty percentage (0-100)
   * @param rentalEnabled Whether rental is enabled
   * @param rentalPrice The rental price (in lamports)
   * @param rentalDuration The rental duration (in seconds)
   * @param subscriptionTier The subscription tier required (0 for none)
   * @returns Transaction signature
   */
  async createContent(
    creator: PublicKey,
    contentId: string,
    arweaveId: string,
    price: number,
    royaltyPercentage: number,
    rentalEnabled = false,
    rentalPrice = 0,
    rentalDuration = 0,
    subscriptionTier = 0,
  ): Promise<string> {
    if (!this.program || !this.provider) {
      throw new Error("Program not initialized")
    }

    // Derive the platform PDA
    const [platformPda] = await PublicKey.findProgramAddress([Buffer.from("platform")], this.programId)

    // Derive the content PDA
    const [contentPda] = await PublicKey.findProgramAddress(
      [Buffer.from("content"), Buffer.from(contentId)],
      this.programId,
    )

    // Call the createContent instruction
    const tx = await this.program.methods
      .createContent(
        contentId,
        arweaveId,
        new BN(price),
        royaltyPercentage,
        rentalEnabled,
        new BN(rentalPrice),
        new BN(rentalDuration),
        subscriptionTier,
      )
      .accounts({
        content: contentPda,
        creator,
        platform: platformPda,
        systemProgram: SystemProgram.programId,
      })
      .rpc()

    return tx
  }

  /**
   * Update existing content
   * @param creator The creator's public key
   * @param contentId The content ID
   * @param price Optional new price
   * @param active Optional new active status
   * @param rentalEnabled Optional new rental enabled status
   * @param rentalPrice Optional new rental price
   * @param rentalDuration Optional new rental duration
   * @param subscriptionTier Optional new subscription tier
   * @returns Transaction signature
   */
  async updateContent(
    creator: PublicKey,
    contentId: string,
    price?: number,
    active?: boolean,
    rentalEnabled?: boolean,
    rentalPrice?: number,
    rentalDuration?: number,
    subscriptionTier?: number,
  ): Promise<string> {
    if (!this.program || !this.provider) {
      throw new Error("Program not initialized")
    }

    // Derive the content PDA
    const [contentPda] = await PublicKey.findProgramAddress(
      [Buffer.from("content"), Buffer.from(contentId)],
      this.programId,
    )

    // Prepare optional arguments
    const priceOption = price !== undefined ? new BN(price) : null
    const activeOption = active !== undefined ? active : null
    const rentalEnabledOption = rentalEnabled !== undefined ? rentalEnabled : null
    const rentalPriceOption = rentalPrice !== undefined ? new BN(rentalPrice) : null
    const rentalDurationOption = rentalDuration !== undefined ? new BN(rentalDuration) : null
    const subscriptionTierOption = subscriptionTier !== undefined ? subscriptionTier : null

    // Call the updateContent instruction
    const tx = await this.program.methods
      .updateContent(
        priceOption,
        activeOption,
        rentalEnabledOption,
        rentalPriceOption,
        rentalDurationOption,
        subscriptionTierOption,
      )
      .accounts({
        content: contentPda,
        creator,
        systemProgram: SystemProgram.programId,
      })
      .rpc()

    return tx
  }

  /**
   * Purchase content
   * @param buyer The buyer's public key
   * @param contentId The content ID
   * @returns Transaction signature
   */
  async purchaseContent(buyer: PublicKey, contentId: string): Promise<string> {
    if (!this.program || !this.provider) {
      throw new Error("Program not initialized")
    }

    // Derive the platform PDA
    const [platformPda] = await PublicKey.findProgramAddress([Buffer.from("platform")], this.programId)

    // Derive the content PDA
    const [contentPda] = await PublicKey.findProgramAddress(
      [Buffer.from("content"), Buffer.from(contentId)],
      this.programId,
    )

    // Get content data to find the creator
    const contentAccount = await this.program.account.content.fetch(contentPda)
    const creator = contentAccount.creator

    // Derive the purchase PDA
    const [purchasePda] = await PublicKey.findProgramAddress(
      [Buffer.from("purchase"), buyer.toBuffer(), contentPda.toBuffer()],
      this.programId,
    )

    // Call the purchaseContent instruction
    const tx = await this.program.methods
      .purchaseContent()
      .accounts({
        content: contentPda,
        buyer,
        creator,
        platform: platformPda,
        purchase: purchasePda,
        systemProgram: SystemProgram.programId,
      })
      .rpc()

    return tx
  }

  /**
   * Rent content
   * @param renter The renter's public key
   * @param contentId The content ID
   * @returns Transaction signature
   */
  async rentContent(renter: PublicKey, contentId: string): Promise<string> {
    if (!this.program || !this.provider) {
      throw new Error("Program not initialized")
    }

    // Derive the platform PDA
    const [platformPda] = await PublicKey.findProgramAddress([Buffer.from("platform")], this.programId)

    // Derive the content PDA
    const [contentPda] = await PublicKey.findProgramAddress(
      [Buffer.from("content"), Buffer.from(contentId)],
      this.programId,
    )

    // Get content data to find the creator
    const contentAccount = await this.program.account.content.fetch(contentPda)
    const creator = contentAccount.creator

    // Derive the rental PDA
    const [rentalPda] = await PublicKey.findProgramAddress(
      [Buffer.from("rental"), renter.toBuffer(), contentPda.toBuffer()],
      this.programId,
    )

    // Call the rentContent instruction
    const tx = await this.program.methods
      .rentContent()
      .accounts({
        content: contentPda,
        renter,
        creator,
        platform: platformPda,
        rental: rentalPda,
        systemProgram: SystemProgram.programId,
      })
      .rpc()

    return tx
  }

  /**
   * Subscribe to a tier
   * @param subscriber The subscriber's public key
   * @param tier The subscription tier (1-3)
   * @returns Transaction signature
   */
  async subscribe(subscriber: PublicKey, tier: number): Promise<string> {
    if (!this.program || !this.provider) {
      throw new Error("Program not initialized")
    }

    // Derive the platform PDA
    const [platformPda] = await PublicKey.findProgramAddress([Buffer.from("platform")], this.programId)

    // Derive the subscription PDA
    const [subscriptionPda] = await PublicKey.findProgramAddress(
      [Buffer.from("subscription"), subscriber.toBuffer()],
      this.programId,
    )

    // Call the subscribe instruction
    const tx = await this.program.methods
      .subscribe(tier)
      .accounts({
        subscriber,
        platform: platformPda,
        subscription: subscriptionPda,
        systemProgram: SystemProgram.programId,
      })
      .rpc()

    return tx
  }

  /**
   * Resell content
   * @param seller The seller's public key
   * @param buyer The buyer's public key
   * @param contentId The content ID
   * @param price The resale price (in lamports)
   * @returns Transaction signature
   */
  async resellContent(seller: PublicKey, buyer: PublicKey, contentId: string, price: number): Promise<string> {
    if (!this.program || !this.provider) {
      throw new Error("Program not initialized")
    }

    // Derive the platform PDA
    const [platformPda] = await PublicKey.findProgramAddress([Buffer.from("platform")], this.programId)

    // Derive the content PDA
    const [contentPda] = await PublicKey.findProgramAddress(
      [Buffer.from("content"), Buffer.from(contentId)],
      this.programId,
    )

    // Get content data to find the creator
    const contentAccount = await this.program.account.content.fetch(contentPda)
    const creator = contentAccount.creator

    // Derive the seller's purchase PDA
    const [sellerPurchasePda] = await PublicKey.findProgramAddress(
      [Buffer.from("purchase"), seller.toBuffer(), contentPda.toBuffer()],
      this.programId,
    )

    // Derive the buyer's purchase PDA
    const [buyerPurchasePda] = await PublicKey.findProgramAddress(
      [Buffer.from("purchase"), buyer.toBuffer(), contentPda.toBuffer()],
      this.programId,
    )

    // Call the resellContent instruction
    const tx = await this.program.methods
      .resellContent(new BN(price))
      .accounts({
        content: contentPda,
        seller,
        buyer,
        creator,
        platform: platformPda,
        sellerPurchase: sellerPurchasePda,
        buyerPurchase: buyerPurchasePda,
        systemProgram: SystemProgram.programId,
      })
      .rpc()

    return tx
  }

  /**
   * Get content details
   * @param contentId The content ID
   * @returns Content account data
   */
  async getContentDetails(contentId: string): Promise<any> {
    if (!this.program) {
      throw new Error("Program not initialized")
    }

    // Derive the content PDA
    const [contentPda] = await PublicKey.findProgramAddress(
      [Buffer.from("content"), Buffer.from(contentId)],
      this.programId,
    )

    // Fetch the content account
    return await this.program.account.content.fetch(contentPda)
  }

  /**
   * Get all content by creator
   * @param creator The creator's public key
   * @returns Array of content accounts
   */
  async getContentByCreator(creator: PublicKey): Promise<any[]> {
    if (!this.program) {
      throw new Error("Program not initialized")
    }

    // Fetch all content accounts by creator
    const contentAccounts = await this.program.account.content.all([
      {
        memcmp: {
          offset: 8 + 32, // After discriminator and id
          bytes: creator.toBase58(),
        },
      },
    ])

    return contentAccounts
  }

  /**
   * Get purchase details
   * @param buyer The buyer's public key
   * @param contentId The content ID
   * @returns Purchase account data
   */
  async getPurchaseDetails(buyer: PublicKey, contentId: string): Promise<any> {
    if (!this.program) {
      throw new Error("Program not initialized")
    }

    // Derive the content PDA
    const [contentPda] = await PublicKey.findProgramAddress(
      [Buffer.from("content"), Buffer.from(contentId)],
      this.programId,
    )

    // Derive the purchase PDA
    const [purchasePda] = await PublicKey.findProgramAddress(
      [Buffer.from("purchase"), buyer.toBuffer(), contentPda.toBuffer()],
      this.programId,
    )

    // Fetch the purchase account
    return await this.program.account.purchase.fetch(purchasePda)
  }

  /**
   * Get rental details
   * @param renter The renter's public key
   * @param contentId The content ID
   * @returns Rental account data
   */
  async getRentalDetails(renter: PublicKey, contentId: string): Promise<any> {
    if (!this.program) {
      throw new Error("Program not initialized")
    }

    // Derive the content PDA
    const [contentPda] = await PublicKey.findProgramAddress(
      [Buffer.from("content"), Buffer.from(contentId)],
      this.programId,
    )

    // Derive the rental PDA
    const [rentalPda] = await PublicKey.findProgramAddress(
      [Buffer.from("rental"), renter.toBuffer(), contentPda.toBuffer()],
      this.programId,
    )

    // Fetch the rental account
    return await this.program.account.purchase.fetch(rentalPda)
  }

  /**
   * Get subscription details
   * @param subscriber The subscriber's public key
   * @returns Subscription account data
   */
  async getSubscriptionDetails(subscriber: PublicKey): Promise<any> {
    if (!this.program) {
      throw new Error("Program not initialized")
    }

    // Derive the subscription PDA
    const [subscriptionPda] = await PublicKey.findProgramAddress(
      [Buffer.from("subscription"), subscriber.toBuffer()],
      this.programId,
    )

    // Fetch the subscription account
    return await this.program.account.subscription.fetch(subscriptionPda)
  }

  /**
   * Get all purchases by buyer
   * @param buyer The buyer's public key
   * @returns Array of purchase accounts
   */
  async getPurchasesByBuyer(buyer: PublicKey): Promise<any[]> {
    if (!this.program) {
      throw new Error("Program not initialized")
    }

    // Fetch all purchase accounts by buyer
    const purchaseAccounts = await this.program.account.purchase.all([
      {
        memcmp: {
          offset: 8, // After discriminator
          bytes: buyer.toBase58(),
        },
      },
    ])

    return purchaseAccounts
  }

  /**
   * Check if a subscription is active and valid for a given tier
   * @param subscriber The subscriber's public key
   * @param requiredTier The required subscription tier
   * @returns Boolean indicating if the subscription is valid
   */
  async isSubscriptionValid(subscriber: PublicKey, requiredTier: number): Promise<boolean> {
    try {
      const subscription = await this.getSubscriptionDetails(subscriber)

      // Check if subscription is active
      if (!subscription.active) {
        return false
      }

      // Check if subscription has expired
      const currentTime = Math.floor(Date.now() / 1000)
      if (currentTime > subscription.expirationTime.toNumber()) {
        return false
      }

      // Check if subscription tier is sufficient
      return subscription.tier >= requiredTier
    } catch (error) {
      // If subscription doesn't exist or there's an error
      return false
    }
  }
}

// Create and export a singleton instance
export const anchorService = new AnchorService()

