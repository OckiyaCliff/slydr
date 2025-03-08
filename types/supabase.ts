export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          wallet_address: string
          username: string
          display_name: string
          bio: string | null
          avatar_url: string | null
          cover_image_url: string | null
          role: string
          is_verified: boolean
          created_at: string
          updated_at: string
          social_links: Json | null
        }
        Insert: {
          id?: string
          wallet_address: string
          username: string
          display_name: string
          bio?: string | null
          avatar_url?: string | null
          cover_image_url?: string | null
          role: string
          is_verified?: boolean
          created_at?: string
          updated_at?: string
          social_links?: Json | null
        }
        Update: {
          id?: string
          wallet_address?: string
          username?: string
          display_name?: string
          bio?: string | null
          avatar_url?: string | null
          cover_image_url?: string | null
          role?: string
          is_verified?: boolean
          created_at?: string
          updated_at?: string
          social_links?: Json | null
        }
      }
      contents: {
        Row: {
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
        }
        Insert: {
          id?: string
          title: string
          description: string
          price: number
          creator_id: string
          category: string
          tags: string[]
          created_at?: string
          updated_at?: string
          media_transaction_id: string
          thumbnail_transaction_id: string
          resale_rights: boolean
          resale_royalty: number
        }
        Update: {
          id?: string
          title?: string
          description?: string
          price?: number
          creator_id?: string
          category?: string
          tags?: string[]
          created_at?: string
          updated_at?: string
          media_transaction_id?: string
          thumbnail_transaction_id?: string
          resale_rights?: boolean
          resale_royalty?: number
        }
      }
      transactions: {
        Row: {
          id: string
          content_id: string
          seller_id: string
          buyer_id: string
          price: number
          transaction_hash: string
          created_at: string
        }
        Insert: {
          id?: string
          content_id: string
          seller_id: string
          buyer_id: string
          price: number
          transaction_hash: string
          created_at?: string
        }
        Update: {
          id?: string
          content_id?: string
          seller_id?: string
          buyer_id?: string
          price?: number
          transaction_hash?: string
          created_at?: string
        }
      }
      follows: {
        Row: {
          id: string
          follower_id: string
          following_id: string
          created_at: string
        }
        Insert: {
          id?: string
          follower_id: string
          following_id: string
          created_at?: string
        }
        Update: {
          id?: string
          follower_id?: string
          following_id?: string
          created_at?: string
        }
      }
      content_views: {
        Row: {
          id: string
          content_id: string
          user_id: string | null
          ip_hash: string
          created_at: string
        }
        Insert: {
          id?: string
          content_id: string
          user_id?: string | null
          ip_hash: string
          created_at?: string
        }
        Update: {
          id?: string
          content_id?: string
          user_id?: string | null
          ip_hash?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

