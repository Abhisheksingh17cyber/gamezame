# GameZame Setup Guide

## ✅ Your website is now live at: https://gamezame.vercel.app

## 🚀 Quick Setup Steps

### Step 1: Run SQL Setup in Supabase

1. Go to [supabase.com/dashboard](https://supabase.com/dashboard)
2. Select your project (ehviqqjhbrcszfkyozqq)
3. Click on **SQL Editor** in the left sidebar
4. Copy and paste the entire contents of `supabase-setup.sql` 
5. Click **Run** to create all tables and policies

### Step 2: Disable Email Confirmation (Recommended for Testing)

1. In Supabase dashboard, go to **Authentication** → **Providers**
2. Scroll to **Email** section
3. Turn OFF "Confirm email"
4. Click **Save**

This allows you to sign up without needing to confirm your email.

### Step 3: Sign Up on Your Website

1. Go to https://gamezame.vercel.app
2. Enter your email and password (at least 6 characters)
3. Click "✨ Create Account"
4. You should see a success message

### Step 4: Make Yourself Admin

**Option A - Using Email (Easier):**
1. In Supabase dashboard, go to **SQL Editor**
2. Run this query (replace with YOUR email):
```sql
INSERT INTO admins (user_id)
SELECT id FROM auth.users WHERE email = 'your-email@example.com';
```

**Option B - Using User ID:**
1. In Supabase dashboard, go to **Authentication** → **Users**
2. Find your email and copy the UUID (user ID)
3. Go to **SQL Editor**
4. Run this query (replace with your UUID):
```sql
INSERT INTO admins (user_id) VALUES ('your-user-id-here');
```

### Step 5: Refresh and Start Adding Games!

1. Refresh your website at https://gamezame.vercel.app
2. You should now see the "Admin Panel" section
3. Start adding games with titles, descriptions, download URLs, and images!

---

## 🎨 Features of Your New Website

- ✨ Modern, premium design with animations
- 🎮 Beautiful game cards with hover effects
- 📱 Fully responsive on all devices
- 🔍 Search and filter functionality
- 🔐 Secure authentication with Supabase
- ⚡ Admin panel for managing games
- 🌈 Gradient backgrounds and smooth transitions

---

## 📝 Adding Games

Once you're an admin, you can add games by filling out the form:
- **Title**: Game name (required)
- **Description**: Brief description of the game
- **Download URL**: Link to download the game (required)
- **Image URL**: Game cover image (optional)
- **Category**: Select from Action, Adventure, RPG, etc.

---

## 🔧 Troubleshooting

### Can't Login/Signup?
- Make sure you ran the SQL setup script in Supabase
- Check that email confirmation is disabled (or confirm your email)
- Password must be at least 6 characters

### No Admin Panel Showing?
- Make sure you added yourself to the admins table using SQL
- Try logging out and logging back in
- Check browser console for errors (F12)

### Games Not Showing?
- Verify the SQL setup script created the games table
- Check the browser console for errors
- Try adding a test game through the admin panel

---

## 🎯 Next Steps

1. **Add Games**: Start populating your platform with games
2. **Customize**: Update colors, fonts, or content as needed
3. **Share**: Share your website URL with others!
4. **Monitor**: Check Vercel analytics to see your visitor stats

---

## 📞 Need Help?

Your Supabase project details:
- **URL**: https://ehviqqjhbrcszfkyozqq.supabase.co
- **Project ID**: ehviqqjhbrcszfkyozqq

Your website:
- **Live URL**: https://gamezame.vercel.app
- **GitHub Repo**: https://github.com/Abhisheksingh17cyber/gamezame

---

## ⚠️ Important Security Note

Your Supabase keys are currently visible in the code. This is OK for the anon key, but make sure:
1. NEVER share your service_role key publicly
2. The anon key is safe to expose in frontend code
3. Row Level Security (RLS) policies protect your data

---

Enjoy your new premium gaming platform! 🎮✨
