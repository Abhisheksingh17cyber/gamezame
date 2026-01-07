# GameZame - Free Game Download Platform 🎮

A modern, full-featured game download platform built with Supabase backend and vanilla JavaScript.

## Features ✨

- 🔐 User Authentication (Sign up/Login)
- 🎮 Browse & Download Free Games
- 🔍 Search & Filter by Category
- ⚡ Admin Panel for Game Management
- 📱 Fully Responsive Design
- 🚀 Zero Backend Coding Required

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript (Vanilla)
- **Backend**: Supabase (PostgreSQL + Auth)
- **Hosting**: Vercel/Netlify (Free tier)

## Quick Start 🚀

### 1. Set Up Supabase

1. Go to [supabase.com](https://supabase.com) and create an account
2. Create a new project (choose free tier)
3. Wait for database initialization (~2 minutes)
4. Go to **Settings → API** and copy:
   - Project URL
   - Anon/Public Key

### 2. Create Database Tables

In Supabase dashboard, go to **SQL Editor** and run:

```sql
-- Games table
CREATE TABLE games (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  download_url TEXT NOT NULL,
  image_url TEXT,
  category TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Admins table
CREATE TABLE admins (
  user_id UUID REFERENCES auth.users(id) PRIMARY KEY,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 3. Set Up Row Level Security (RLS)

```sql
-- Enable RLS
ALTER TABLE games ENABLE ROW LEVEL SECURITY;
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

-- Anyone can read games
CREATE POLICY "Anyone can view games" ON games
  FOR SELECT USING (true);

-- Only admins can manage games
CREATE POLICY "Admins can manage games" ON games
  FOR ALL USING (
    auth.uid() IN (SELECT user_id FROM admins)
  );

-- Only admins can view admin table
CREATE POLICY "Admins can view admins" ON admins
  FOR SELECT USING (
    auth.uid() IN (SELECT user_id FROM admins)
  );
```

### 4. Configure the App

1. Open `app.js`
2. Replace the credentials:
```javascript
const SUPABASE_URL = 'your-project-url'
const SUPABASE_KEY = 'your-anon-key'
```

### 5. Make Yourself Admin

1. Sign up on your website
2. Go to Supabase **Authentication → Users**
3. Copy your User ID
4. Run in SQL Editor:
```sql
INSERT INTO admins (user_id) VALUES ('your-user-id-here');
```

### 6. Deploy to Vercel (Free)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or use Netlify by dragging the folder to [netlify.com](https://netlify.com)

## Free Game Resources 🎯

- **RAWG.io API** - 20,000 requests/month
- **IGDB API** - Free tier available
- **Archive.org** - Public domain games
- **Itch.io** - Indie games (many free)
- **GitHub** - Open source games

## Project Structure

```
gamezame/
├── index.html       # Main HTML structure
├── app.js          # JavaScript logic + Supabase integration
├── style.css       # Styling
├── package.json    # Dependencies
├── .gitignore      # Git ignore rules
└── README.md       # This file
```

## Free Tier Limits 💰

- **Supabase**: 50,000 monthly active users, 500MB database
- **Vercel**: 100GB bandwidth/month
- **Netlify**: 100GB bandwidth/month
- **Total Cost**: $0/month

## Features Breakdown

### For Users
- Browse game library
- Search games by title/description
- Filter by category
- Download games directly

### For Admins
- Add new games with details
- Upload game images
- Categorize games
- Delete games
- Manage entire library

## Customization

### Categories
Edit categories in `index.html` (lines with `<select id="category">`)

### Styling
Modify colors in `style.css` `:root` section:
```css
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    /* Add your colors */
}
```

## Security Notes 🔒

- ✅ Row Level Security (RLS) enabled
- ✅ Only admins can add/delete games
- ✅ User authentication required
- ✅ Secure file uploads via URLs
- ✅ No sensitive data exposed

## Support & Contribution

Found a bug or want to contribute? Feel free to:
1. Fork the repository
2. Create a feature branch
3. Submit a pull request

## License

MIT License - Free to use for personal and commercial projects

---

**Made with ❤️ for the gaming community**

🔗 [Live Demo](#) | 📧 [Contact](#) | ⭐ [Star on GitHub](#)