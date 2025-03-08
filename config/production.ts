// Production configuration settings

export const config = {
  // Base URL for the application
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || "https://slydr.vercel.app",

  // Feature flags
  features: {
    enableAI: true,
    enableResaleRights: true,
    enableFollowing: true,
  },

  // Content settings
  content: {
    maxFileSize: 100 * 1024 * 1024, // 100MB
    allowedFileTypes: [
      "image/jpeg",
      "image/png",
      "image/gif",
      "audio/mpeg",
      "audio/wav",
      "video/mp4",
      "application/pdf",
    ],
    thumbnailDimensions: {
      width: 800,
      height: 600,
    },
  },

  // Blockchain settings
  blockchain: {
    network: "mainnet", // 'mainnet' or 'devnet'
    clusterApiUrl: "https://api.mainnet-beta.solana.com",
    confirmationStrategy: {
      maxRetries: 30,
      skipPreflight: true,
    },
  },

  // Analytics
  analytics: {
    enabled: true,
    anonymizeIp: true,
  },
}

