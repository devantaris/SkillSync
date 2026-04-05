-- SkillSync Database Schema
-- Run this in Supabase SQL Editor

-- ============================================
-- PROFILES
-- ============================================
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL DEFAULT '',
  email TEXT NOT NULL DEFAULT '',
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view all profiles" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = user_id);

-- ============================================
-- CREDITS
-- ============================================
CREATE TABLE IF NOT EXISTS credits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  balance INTEGER NOT NULL DEFAULT 100,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE credits ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own credits" ON credits FOR SELECT USING (auth.uid() = user_id);

-- ============================================
-- TRANSACTIONS
-- ============================================
CREATE TABLE IF NOT EXISTS transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('earn', 'spend')),
  amount INTEGER NOT NULL CHECK (amount > 0),
  description TEXT NOT NULL DEFAULT '',
  course_id UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own transactions" ON transactions FOR SELECT USING (auth.uid() = user_id);

-- ============================================
-- COURSES
-- ============================================
CREATE TABLE IF NOT EXISTS courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  short_description TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  video_url TEXT,
  skill_tags TEXT[] NOT NULL DEFAULT '{}',
  level TEXT NOT NULL DEFAULT 'Beginner' CHECK (level IN ('Beginner', 'Intermediate', 'Advanced')),
  credit_cost INTEGER NOT NULL DEFAULT 50 CHECK (credit_cost >= 10 AND credit_cost <= 500),
  ai_score INTEGER,
  ai_feedback JSONB,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'pending_review', 'approved', 'rejected')),
  enrolled_count INTEGER NOT NULL DEFAULT 0,
  curriculum JSONB NOT NULL DEFAULT '[]',
  learnings JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view approved courses" ON courses FOR SELECT USING (status = 'approved' OR auth.uid() = creator_id);
CREATE POLICY "Users can create courses" ON courses FOR INSERT WITH CHECK (auth.uid() = creator_id);
CREATE POLICY "Users can update own courses" ON courses FOR UPDATE USING (auth.uid() = creator_id);
CREATE POLICY "Users can delete own courses" ON courses FOR DELETE USING (auth.uid() = creator_id);

-- ============================================
-- SKILLS
-- ============================================
CREATE TABLE IF NOT EXISTS skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  level TEXT NOT NULL DEFAULT 'Beginner' CHECK (level IN ('Beginner', 'Intermediate', 'Advanced', 'Expert')),
  score INTEGER NOT NULL DEFAULT 30 CHECK (score >= 0 AND score <= 100),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, name)
);

ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own skills" ON skills FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own skills" ON skills FOR ALL USING (auth.uid() = user_id);

-- ============================================
-- ENROLLMENTS
-- ============================================
CREATE TABLE IF NOT EXISTS enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  progress INTEGER NOT NULL DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, course_id)
);

ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own enrollments" ON enrollments FOR SELECT USING (auth.uid() = user_id);

-- ============================================
-- PAYMENTS
-- ============================================
CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  razorpay_order_id TEXT,
  razorpay_payment_id TEXT,
  amount_inr INTEGER NOT NULL,
  credits INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own payments" ON payments FOR SELECT USING (auth.uid() = user_id);

-- ============================================
-- AUTO-CREATE PROFILE + CREDITS ON SIGNUP
-- ============================================
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Create profile
  INSERT INTO profiles (user_id, name, email, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    NEW.email,
    NEW.raw_user_meta_data->>'avatar_url'
  );

  -- Create credit balance with 100 starter credits
  INSERT INTO credits (user_id, balance) VALUES (NEW.id, 100);

  -- Add welcome transaction
  INSERT INTO transactions (user_id, type, amount, description)
  VALUES (NEW.id, 'earn', 100, 'Welcome bonus — 100 starter credits');

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop existing trigger if exists, then create
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX IF NOT EXISTS idx_courses_creator ON courses(creator_id);
CREATE INDEX IF NOT EXISTS idx_courses_status ON courses(status);
CREATE INDEX IF NOT EXISTS idx_transactions_user ON transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_date ON transactions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_enrollments_user ON enrollments(user_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_course ON enrollments(course_id);
CREATE INDEX IF NOT EXISTS idx_skills_user ON skills(user_id);
