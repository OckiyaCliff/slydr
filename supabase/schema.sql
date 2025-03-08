-- Create users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  wallet_address TEXT UNIQUE NOT NULL,
  username TEXT UNIQUE NOT NULL,
  display_name TEXT NOT NULL,
  bio TEXT,
  avatar_url TEXT,
  cover_image_url TEXT,
  role TEXT NOT NULL,
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  social_links JSONB DEFAULT '{}'::JSONB
);

-- Create contents table
CREATE TABLE contents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL NOT NULL,
  creator_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  category TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  media_transaction_id TEXT NOT NULL,
  thumbnail_transaction_id TEXT NOT NULL,
  resale_rights BOOLEAN DEFAULT FALSE,
  resale_royalty INTEGER DEFAULT 0
);

-- Create transactions table
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  content_id UUID NOT NULL REFERENCES contents(id) ON DELETE CASCADE,
  seller_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  buyer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  price DECIMAL NOT NULL,
  transaction_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create follows table
CREATE TABLE follows (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  follower_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  following_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(follower_id, following_id)
);

-- Create content_views table for analytics
CREATE TABLE content_views (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  content_id UUID NOT NULL REFERENCES contents(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  ip_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_date DATE DEFAULT NOW(),  -- Fixed: Manually storing date
  UNIQUE(content_id, user_id, ip_hash, created_date) -- Fixed: Correct constraint
);

-- Create indexes for performance
CREATE INDEX idx_contents_creator_id ON contents(creator_id);
CREATE INDEX idx_transactions_content_id ON transactions(content_id);
CREATE INDEX idx_transactions_seller_id ON transactions(seller_id);
CREATE INDEX idx_transactions_buyer_id ON transactions(buyer_id);
CREATE INDEX idx_follows_follower_id ON follows(follower_id);
CREATE INDEX idx_follows_following_id ON follows(following_id);
CREATE INDEX idx_content_views_content_id ON content_views(content_id);
CREATE INDEX idx_content_views_user_id ON content_views(user_id);

-- Create functions for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at timestamps
CREATE TRIGGER update_users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contents_updated_at
BEFORE UPDATE ON contents
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Create RLS policies
-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE contents ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE follows ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_views ENABLE ROW LEVEL SECURITY;

-- Users policies (Fixed Type Casting)
CREATE POLICY "Users are viewable by everyone"
  ON users FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own profile"
  ON users FOR INSERT
  WITH CHECK (id = auth.uid()::UUID); -- ✅ Fixed: auth.uid() casted to UUID

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  USING (id = auth.uid()::UUID); -- ✅ Fixed

-- Contents policies (Fixed Type Casting)
CREATE POLICY "Contents are viewable by everyone"
  ON contents FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own content"
  ON contents FOR INSERT
  WITH CHECK (creator_id = auth.uid()::UUID); -- ✅ Fixed

CREATE POLICY "Users can update own content"
  ON contents FOR UPDATE
  USING (creator_id = auth.uid()::UUID); -- ✅ Fixed

CREATE POLICY "Users can delete own content"
  ON contents FOR DELETE
  USING (creator_id = auth.uid()::UUID); -- ✅ Fixed

-- Transactions policies (Fixed Type Casting)
CREATE POLICY "Transactions are viewable by participants"
  ON transactions FOR SELECT
  USING (auth.uid()::UUID IN (seller_id, buyer_id)); -- ✅ Fixed

CREATE POLICY "Transactions can be inserted by authenticated users"
  ON transactions FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

-- Follows policies (Fixed Type Casting)
CREATE POLICY "Follows are viewable by everyone"
  ON follows FOR SELECT
  USING (true);

CREATE POLICY "Users can follow others"
  ON follows FOR INSERT
  WITH CHECK (follower_id = auth.uid()::UUID); -- ✅ Fixed

CREATE POLICY "Users can unfollow others"
  ON follows FOR DELETE
  USING (follower_id = auth.uid()::UUID); -- ✅ Fixed

-- Content views policies (Fixed Type Casting)
CREATE POLICY "Content views are viewable by content creators"
  ON content_views FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM contents c
      WHERE c.id = content_id AND c.creator_id = auth.uid()::UUID -- ✅ Fixed
    )
  );

CREATE POLICY "Anyone can insert content views"
  ON content_views FOR INSERT
  WITH CHECK (true);

