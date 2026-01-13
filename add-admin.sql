-- Add abhiisingh240@gmail.com as admin
-- INSTRUCTIONS:
-- 1. Go to: https://supabase.com/dashboard/project/ehviqqjhbrcszfkyozqq/sql/new
-- 2. Copy and paste the SQL below
-- 3. Click "Run" button
-- 4. Go back to https://gamezame.vercel.app and refresh the page
-- 5. You'll see the Admin Panel!
-- Your User ID: e0af45e7-d800-426a-af5c-11ac2f2bc8e7
INSERT INTO
    admins (user_id)
VALUES
    ('e0af45e7-d800-426a-af5c-11ac2f2bc8e7') ON CONFLICT (user_id) DO NOTHING;