-- GameZame Database Setup Script
-- Run this in Supabase SQL Editor after creating your project
-- Step 1: Create Games Table
CREATE TABLE
    IF NOT EXISTS games (
        id UUID DEFAULT uuid_generate_v4 () PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT,
        download_url TEXT NOT NULL,
        image_url TEXT,
        category TEXT,
        created_at TIMESTAMP DEFAULT NOW ()
    );

-- Step 2: Create Admins Table
CREATE TABLE
    IF NOT EXISTS admins (
        user_id UUID REFERENCES auth.users (id) PRIMARY KEY,
        created_at TIMESTAMP DEFAULT NOW ()
    );

-- Step 3: Enable Row Level Security
ALTER TABLE games ENABLE ROW LEVEL SECURITY;

ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

-- Step 4: Create Policies for Games Table
-- Policy: Anyone can view games
CREATE POLICY "Anyone can view games" ON games FOR
SELECT
    USING (true);

-- Policy: Only admins can insert games
CREATE POLICY "Admins can insert games" ON games FOR INSERT
WITH
    CHECK (
        auth.uid () IN (
            SELECT
                user_id
            FROM
                admins
        )
    );

-- Policy: Only admins can update games
CREATE POLICY "Admins can update games" ON games FOR
UPDATE USING (
    auth.uid () IN (
        SELECT
            user_id
        FROM
            admins
    )
);

-- Policy: Only admins can delete games
CREATE POLICY "Admins can delete games" ON games FOR DELETE USING (
    auth.uid () IN (
        SELECT
            user_id
        FROM
            admins
    )
);

-- Step 5: Create Policy for Admins Table
-- Policy: Only admins can view admin list
CREATE POLICY "Admins can view admins" ON admins FOR
SELECT
    USING (
        auth.uid () IN (
            SELECT
                user_id
            FROM
                admins
        )
    );

-- Step 6: Add yourself as admin (REPLACE WITH YOUR EMAIL)
-- After signing up on your site, run this query with your user ID:
-- You can find your user ID in: Authentication → Users → Copy ID
-- INSERT INTO admins (user_id) VALUES ('your-user-id-here');
-- Or if you know your email:
-- INSERT INTO admins (user_id)
-- SELECT id FROM auth.users WHERE email = 'your-email@example.com';