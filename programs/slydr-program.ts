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
          isMut: false,
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
        ],
      },
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
  ],
}

