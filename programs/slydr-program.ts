// This file represents the Anchor program structure
// In a real project, this would be in a separate Anchor workspace

export const idl = {
  version: "0.1.0",
  name: "slydr_program",
  instructions: [
    {
      name: "initialize",
      accounts: [
        {
          name: "platform",
          isMut: true,
          isSigner: false,
        },
        {
          name: "authority",
          isMut: true,
          isSigner: true,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "platformFee",
          type: "u64",
        },
      ],
    },
    {
      name: "createContent",
      accounts: [
        {
          name: "content",
          isMut: true,
          isSigner: false,
        },
        {
          name: "creator",
          isMut: true,
          isSigner: true,
        },
        {
          name: "platform",
          isMut: true,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "contentId",
          type: "string",
        },
        {
          name: "arweaveId",
          type: "string",
        },
        {
          name: "price",
          type: "u64",
        },
        {
          name: "royaltyPercentage",
          type: "u8",
        },
        {
          name: "rentalEnabled",
          type: "bool",
        },
        {
          name: "rentalPrice",
          type: "u64",
        },
        {
          name: "rentalDuration",
          type: "i64",
        },
        {
          name: "subscriptionTier",
          type: "u8",
        },
      ],
    },
    {
      name: "updateContent",
      accounts: [
        {
          name: "content",
          isMut: true,
          isSigner: false,
        },
        {
          name: "creator",
          isMut: true,
          isSigner: true,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "price",
          type: { option: "u64" },
        },
        {
          name: "active",
          type: { option: "bool" },
        },
        {
          name: "rentalEnabled",
          type: { option: "bool" },
        },
        {
          name: "rentalPrice",
          type: { option: "u64" },
        },
        {
          name: "rentalDuration",
          type: { option: "i64" },
        },
        {
          name: "subscriptionTier",
          type: { option: "u8" },
        },
      ],
    },
    {
      name: "purchaseContent",
      accounts: [
        {
          name: "content",
          isMut: true,
          isSigner: false,
        },
        {
          name: "buyer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "creator",
          isMut: true,
          isSigner: false,
        },
        {
          name: "platform",
          isMut: true,
          isSigner: false,
        },
        {
          name: "purchase",
          isMut: true,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "rentContent",
      accounts: [
        {
          name: "content",
          isMut: true,
          isSigner: false,
        },
        {
          name: "renter",
          isMut: true,
          isSigner: true,
        },
        {
          name: "creator",
          isMut: true,
          isSigner: false,
        },
        {
          name: "platform",
          isMut: true,
          isSigner: false,
        },
        {
          name: "rental",
          isMut: true,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "subscribe",
      accounts: [
        {
          name: "subscriber",
          isMut: true,
          isSigner: true,
        },
        {
          name: "platform",
          isMut: true,
          isSigner: false,
        },
        {
          name: "subscription",
          isMut: true,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "tier",
          type: "u8",
        },
      ],
    },
    {
      name: "resellContent",
      accounts: [
        {
          name: "content",
          isMut: true,
          isSigner: false,
        },
        {
          name: "seller",
          isMut: true,
          isSigner: true,
        },
        {
          name: "buyer",
          isMut: true,
          isSigner: false,
        },
        {
          name: "creator",
          isMut: true,
          isSigner: false,
        },
        {
          name: "platform",
          isMut: true,
          isSigner: false,
        },
        {
          name: "sellerPurchase",
          isMut: false,
          isSigner: false,
        },
        {
          name: "buyerPurchase",
          isMut: true,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "price",
          type: "u64",
        },
      ],
    },
  ],
  accounts: [
    {
      name: "Platform",
      type: {
        kind: "struct",
        fields: [
          {
            name: "authority",
            type: "publicKey",
          },
          {
            name: "platformFee",
            type: "u64",
          },
          {
            name: "totalContentCount",
            type: "u64",
          },
          {
            name: "totalSalesVolume",
            type: "u64",
          },
        ],
      },
    },
    {
      name: "Content",
      type: {
        kind: "struct",
        fields: [
          {
            name: "id",
            type: "string",
          },
          {
            name: "creator",
            type: "publicKey",
          },
          {
            name: "arweaveId",
            type: "string",
          },
          {
            name: "price",
            type: "u64",
          },
          {
            name: "royaltyPercentage",
            type: "u8",
          },
          {
            name: "salesCount",
            type: "u64",
          },
          {
            name: "active",
            type: "bool",
          },
          {
            name: "createdAt",
            type: "i64",
          },
          {
            name: "rentalEnabled",
            type: "bool",
          },
          {
            name: "rentalPrice",
            type: "u64",
          },
          {
            name: "rentalDuration",
            type: "i64",
          },
          {
            name: "subscriptionTier",
            type: "u8",
          },
        ],
      },
    },
    {
      name: "Purchase",
      type: {
        kind: "struct",
        fields: [
          {
            name: "buyer",
            type: "publicKey",
          },
          {
            name: "content",
            type: "publicKey",
          },
          {
            name: "price",
            type: "u64",
          },
          {
            name: "timestamp",
            type: "i64",
          },
          {
            name: "resaleRights",
            type: "bool",
          },
          {
            name: "purchaseType",
            type: {
              defined: "PurchaseType",
            },
          },
          {
            name: "expiration",
            type: { option: "i64" },
          },
        ],
      },
    },
    {
      name: "Subscription",
      type: {
        kind: "struct",
        fields: [
          {
            name: "subscriber",
            type: "publicKey",
          },
          {
            name: "tier",
            type: "u8",
          },
          {
            name: "startTime",
            type: "i64",
          },
          {
            name: "expirationTime",
            type: "i64",
          },
          {
            name: "active",
            type: "bool",
          },
        ],
      },
    },
  ],
  types: [
    {
      name: "PurchaseType",
      type: {
        kind: "enum",
        variants: [
          {
            name: "FullPurchase",
          },
          {
            name: "Rental",
          },
        ],
      },
    },
  ],
  events: [
    {
      name: "PlatformInitialized",
      fields: [
        {
          name: "authority",
          type: "publicKey",
          index: false,
        },
        {
          name: "platformFee",
          type: "u64",
          index: false,
        },
        {
          name: "timestamp",
          type: "i64",
          index: false,
        },
      ],
    },
    {
      name: "ContentCreated",
      fields: [
        {
          name: "contentId",
          type: "string",
          index: false,
        },
        {
          name: "creator",
          type: "publicKey",
          index: false,
        },
        {
          name: "price",
          type: "u64",
          index: false,
        },
        {
          name: "royaltyPercentage",
          type: "u8",
          index: false,
        },
        {
          name: "rentalEnabled",
          type: "bool",
          index: false,
        },
        {
          name: "subscriptionTier",
          type: "u8",
          index: false,
        },
        {
          name: "timestamp",
          type: "i64",
          index: false,
        },
      ],
    },
    {
      name: "ContentUpdated",
      fields: [
        {
          name: "contentId",
          type: "string",
          index: false,
        },
        {
          name: "creator",
          type: "publicKey",
          index: false,
        },
        {
          name: "price",
          type: "u64",
          index: false,
        },
        {
          name: "active",
          type: "bool",
          index: false,
        },
        {
          name: "rentalEnabled",
          type: "bool",
          index: false,
        },
        {
          name: "timestamp",
          type: "i64",
          index: false,
        },
      ],
    },
    {
      name: "ContentPurchased",
      fields: [
        {
          name: "contentId",
          type: "string",
          index: false,
        },
        {
          name: "buyer",
          type: "publicKey",
          index: false,
        },
        {
          name: "creator",
          type: "publicKey",
          index: false,
        },
        {
          name: "price",
          type: "u64",
          index: false,
        },
        {
          name: "timestamp",
          type: "i64",
          index: false,
        },
      ],
    },
    {
      name: "ContentRented",
      fields: [
        {
          name: "contentId",
          type: "string",
          index: false,
        },
        {
          name: "renter",
          type: "publicKey",
          index: false,
        },
        {
          name: "creator",
          type: "publicKey",
          index: false,
        },
        {
          name: "price",
          type: "u64",
          index: false,
        },
        {
          name: "expiration",
          type: "i64",
          index: false,
        },
        {
          name: "timestamp",
          type: "i64",
          index: false,
        },
      ],
    },
    {
      name: "ContentResold",
      fields: [
        {
          name: "contentId",
          type: "string",
          index: false,
        },
        {
          name: "seller",
          type: "publicKey",
          index: false,
        },
        {
          name: "buyer",
          type: "publicKey",
          index: false,
        },
        {
          name: "creator",
          type: "publicKey",
          index: false,
        },
        {
          name: "price",
          type: "u64",
          index: false,
        },
        {
          name: "royaltyAmount",
          type: "u64",
          index: false,
        },
        {
          name: "timestamp",
          type: "i64",
          index: false,
        },
      ],
    },
    {
      name: "SubscriptionCreated",
      fields: [
        {
          name: "subscriber",
          type: "publicKey",
          index: false,
        },
        {
          name: "tier",
          type: "u8",
          index: false,
        },
        {
          name: "price",
          type: "u64",
          index: false,
        },
        {
          name: "expiration",
          type: "i64",
          index: false,
        },
        {
          name: "timestamp",
          type: "i64",
          index: false,
        },
      ],
    },
  ],
  errors: [
    {
      code: 6000,
      name: "InvalidRoyaltyPercentage",
      msg: "Royalty percentage must be between 0 and 100",
    },
    {
      code: 6001,
      name: "InsufficientFunds",
      msg: "Insufficient funds to complete the purchase",
    },
    {
      code: 6002,
      name: "NotAuthorized",
      msg: "Not authorized to perform this action",
    },
    {
      code: 6003,
      name: "ContentNotActive",
      msg: "Content is not active",
    },
    {
      code: 6004,
      name: "NoResaleRights",
      msg: "No resale rights for this content",
    },
    {
      code: 6005,
      name: "InvalidContentId",
      msg: "Content ID cannot be empty",
    },
    {
      code: 6006,
      name: "InvalidArweaveId",
      msg: "Arweave ID cannot be empty",
    },
    {
      code: 6007,
      name: "InvalidPrice",
      msg: "Price must be greater than 0",
    },
    {
      code: 6008,
      name: "InvalidFeeAmount",
      msg: "Platform fee must be greater than 0",
    },
    {
      code: 6009,
      name: "RentalNotEnabled",
      msg: "Rental is not enabled for this content",
    },
    {
      code: 6010,
      name: "InvalidRentalPrice",
      msg: "Rental price must be greater than 0",
    },
    {
      code: 6011,
      name: "InvalidRentalDuration",
      msg: "Rental duration must be greater than 0",
    },
    {
      code: 6012,
      name: "PurchaseExpired",
      msg: "Purchase has expired",
    },
    {
      code: 6013,
      name: "InvalidSubscriptionTier",
      msg: "Invalid subscription tier",
    },
  ],
}

