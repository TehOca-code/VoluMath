import { createClient } from "@supabase/supabase-js"

// Hardcode API keys untuk memastikan tidak ada masalah dengan environment variables
const supabaseUrl = "https://mroeadpzuyjfoswxrydr.supabase.co"
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1yb2VhZHB6dXlqZm9zd3hyeWRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYzNDQyODMsImV4cCI6MjA2MTkyMDI4M30._pFEH5_4BZGEGQr_L-cmndBrNhoofvbVh87vkbz9Deg"

// Validasi bahwa keys tidak kosong
if (!supabaseUrl) {
  throw new Error("Supabase URL is required")
}

if (!supabaseAnonKey) {
  throw new Error("Supabase Anon Key is required")
}

// Client untuk operasi umum
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Client untuk operasi admin (fallback jika service role key tidak ada)
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ""
export const supabaseAdmin = serviceRoleKey
  ? createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })
  : null

// Fungsi untuk validasi koneksi
export async function validateSupabaseConnection() {
  try {
    const { error } = await supabase.from("user_profiles").select("count", { count: "exact", head: true })
    return { success: !error, error }
  } catch (error) {
    return { success: false, error }
  }
}
