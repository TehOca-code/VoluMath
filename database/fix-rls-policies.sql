-- Fix RLS Policies untuk mengatasi infinite recursion
-- Jalankan script ini di Supabase SQL Editor

-- Drop existing policies yang bermasalah
DROP POLICY IF EXISTS "Users can read their own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON user_profiles;
DROP POLICY IF EXISTS "Admins can read all profiles" ON user_profiles;
DROP POLICY IF EXISTS "Admins can update all profiles" ON user_profiles;
DROP POLICY IF EXISTS "Admins can insert profiles" ON user_profiles;

-- Buat policies baru yang tidak menyebabkan infinite recursion
CREATE POLICY "Users can read their own profile" ON user_profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = user_id);

-- Policy untuk insert - allow semua authenticated users untuk insert profile mereka sendiri
CREATE POLICY "Users can insert their own profile" ON user_profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policy khusus untuk admin - menggunakan JWT claims instead of table lookup
CREATE POLICY "Service role can manage all profiles" ON user_profiles
  FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

-- Temporary policy untuk allow registration tanpa admin check
CREATE POLICY "Allow registration" ON user_profiles
  FOR INSERT WITH CHECK (true);

-- Update policies untuk tabel lain juga
DROP POLICY IF EXISTS "Admins can read all progress" ON learning_progress;
CREATE POLICY "Service role can read all progress" ON learning_progress
  FOR SELECT USING (auth.jwt() ->> 'role' = 'service_role');

DROP POLICY IF EXISTS "Admins can read all quiz sessions" ON quiz_sessions;
CREATE POLICY "Service role can read all quiz sessions" ON quiz_sessions
  FOR SELECT USING (auth.jwt() ->> 'role' = 'service_role');

DROP POLICY IF EXISTS "Admins can read all quiz answers" ON quiz_answers;
CREATE POLICY "Service role can read all quiz answers" ON quiz_answers
  FOR SELECT USING (auth.jwt() ->> 'role' = 'service_role');

DROP POLICY IF EXISTS "Admins can read all achievements" ON user_achievements;
CREATE POLICY "Service role can read all achievements" ON user_achievements
  FOR SELECT USING (auth.jwt() ->> 'role' = 'service_role');

DROP POLICY IF EXISTS "Admins can read all streaks" ON study_streaks;
CREATE POLICY "Service role can read all streaks" ON study_streaks
  FOR SELECT USING (auth.jwt() ->> 'role' = 'service_role');

DROP POLICY IF EXISTS "Admins can read all feedback" ON feedback;
CREATE POLICY "Service role can read all feedback" ON feedback
  FOR SELECT USING (auth.jwt() ->> 'role' = 'service_role');

DROP POLICY IF EXISTS "Admins can update feedback" ON feedback;
CREATE POLICY "Service role can update feedback" ON feedback
  FOR UPDATE USING (auth.jwt() ->> 'role' = 'service_role');

DROP POLICY IF EXISTS "Admins can read all views" ON content_views;
CREATE POLICY "Service role can read all views" ON content_views
  FOR SELECT USING (auth.jwt() ->> 'role' = 'service_role');
