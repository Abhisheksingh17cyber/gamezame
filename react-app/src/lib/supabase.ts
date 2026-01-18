import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://ehviqqjhbrcszfkyozqq.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVodmlxcWpoYnJjc3pma3lvenFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc3OTM3MTksImV4cCI6MjA4MzM2OTcxOX0.8TlD3ybOwJ5z1ZawfCVACVJzxHNCPr_s_lW1w5S6ANs'

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

export type Game = {
  id: string
  title: string
  description: string | null
  category: string | null
  download_url: string | null
  image_url: string | null
  created_at: string
}

export type User = {
  id: string
  email: string
}
