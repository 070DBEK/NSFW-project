-- Enable the pgcrypto extension to generate random UUIDs
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  gems INTEGER DEFAULT 100,
  subscription_tier TEXT DEFAULT 'free',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create characters table
CREATE TABLE IF NOT EXISTS characters (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  personality TEXT NOT NULL,
  avatar_url TEXT,
  mood TEXT DEFAULT 'friendly',
  is_premium BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create conversations table
CREATE TABLE IF NOT EXISTS conversations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  character_id UUID REFERENCES characters(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  sender TEXT NOT NULL CHECK (sender IN ('user', 'character')),
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_character_relationships table
CREATE TABLE IF NOT EXISTS user_character_relationships (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  character_id UUID REFERENCES characters(id) ON DELETE CASCADE,
  affection_level INTEGER DEFAULT 0,
  last_interaction TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, character_id)
);

-- Create generated_images table
CREATE TABLE IF NOT EXISTS generated_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  character_id UUID REFERENCES characters(id),
  prompt TEXT NOT NULL,
  image_url TEXT NOT NULL,
  is_public BOOLEAN DEFAULT FALSE,
  likes_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default characters
INSERT INTO characters (name, title, personality, avatar_url, mood, is_premium) VALUES
('Luna', 'Mystical Advisor', 'Wise, mystical, caring, and always ready to help with deep questions about life and spirituality.', '/placeholder.svg?height=100&width=100', 'friendly', FALSE),
('Aria', 'Romantic Partner', 'Sweet, romantic, understanding, and deeply caring about your emotions and feelings.', '/placeholder.svg?height=100&width=100', 'loving', TRUE),
('Rex', 'Adventure Guide', 'Brave, strong, loyal, and always ready for any adventure or challenge.', '/placeholder.svg?height=100&width=100', 'confident', FALSE),
('Sakura', 'Anime Companion', 'Cheerful, energetic, cute, and always excited to talk about anime, manga, and Japanese culture.', '/placeholder.svg?height=100&width=100', 'excited', TRUE),
('Viktor', 'Dark Romance', 'Mysterious, charming, intense, perfect for those who love dark romance and mystery.', '/placeholder.svg?height=100&width=100', 'mysterious', TRUE),
('Zara', 'Sci-Fi Explorer', 'Intelligent, curious, futuristic, loves to discuss science, technology, and space exploration.', '/placeholder.svg?height=100&width=100', 'curious', FALSE);

-- Create RLS policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_character_relationships ENABLE ROW LEVEL SECURITY;
ALTER TABLE generated_images ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Conversations policies
CREATE POLICY "Users can view own conversations" ON conversations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own conversations" ON conversations FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Messages policies
CREATE POLICY "Users can view messages in own conversations" ON messages FOR SELECT USING (
  EXISTS (SELECT 1 FROM conversations WHERE conversations.id = messages.conversation_id AND conversations.user_id = auth.uid())
);
CREATE POLICY "Users can create messages in own conversations" ON messages FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM conversations WHERE conversations.id = messages.conversation_id AND conversations.user_id = auth.uid())
);

-- User character relationships policies
CREATE POLICY "Users can view own relationships" ON user_character_relationships FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own relationships" ON user_character_relationships FOR ALL USING (auth.uid() = user_id);

-- Generated images policies
CREATE POLICY "Users can view own images" ON generated_images FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can view public images" ON generated_images FOR SELECT USING (is_public = TRUE);
CREATE POLICY "Users can create own images" ON generated_images FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username, full_name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', NEW.email),
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user registration
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
