export interface ContentItem {
  id: string
  title: string
  description: string
  price: number
  creator_id: string
  category: string
  tags: string[]
  created_at: string
  updated_at: string
  media_transaction_id: string
  thumbnail_transaction_id: string
  resale_rights: boolean
  resale_royalty: number
  creator: {
    id: string
    username: string
    display_name: string
    avatar_url: string | null
    role: string
  }
}

