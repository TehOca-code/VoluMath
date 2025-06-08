import { createClient } from "@supabase/supabase-js"

// API keys yang Anda berikan
const supabaseUrl = "https://mroeadpzuyjfoswxrydr.supabase.co"
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1yb2VhZHB6dXlqZm9zd3hyeWRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYzNDQyODMsImV4cCI6MjA2MTkyMDI4M30._pFEH5_4BZGEGQr_L-cmndBrNhoofvbVh87vkbz9Deg"

// Buat client Supabase
const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function testConnection() {
  try {
    console.log("🔄 Testing Supabase connection...")
    console.log("URL:", supabaseUrl)
    console.log("Anon Key:", supabaseAnonKey.substring(0, 20) + "...")

    // Test 1: Cek koneksi dasar
    const { data, error } = await supabase.from("user_profiles").select("count", { count: "exact", head: true })

    if (error) {
      console.error("❌ Connection test failed:", error.message)

      // Jika tabel belum ada, itu normal
      if (error.message.includes("relation") && error.message.includes("does not exist")) {
        console.log("ℹ️  Tables don't exist yet. This is normal if migrations haven't been run.")
        console.log("✅ Supabase connection is working, but database needs to be set up.")
      }
    } else {
      console.log("✅ Supabase connection successful!")
      console.log("📊 User profiles table exists and is accessible")
    }

    // Test 2: Cek auth
    console.log("\n🔄 Testing Supabase Auth...")
    const { data: authData, error: authError } = await supabase.auth.getSession()

    if (authError) {
      console.error("❌ Auth test failed:", authError.message)
    } else {
      console.log("✅ Supabase Auth is working!")
      console.log("Session:", authData.session ? "Active" : "No active session")
    }

    // Test 3: Cek storage (jika ada)
    console.log("\n🔄 Testing Supabase Storage...")
    const { data: buckets, error: storageError } = await supabase.storage.listBuckets()

    if (storageError) {
      console.log("ℹ️  Storage test:", storageError.message)
    } else {
      console.log("✅ Supabase Storage is accessible!")
      console.log("Buckets:", buckets?.length || 0)
    }
  } catch (error) {
    console.error("❌ Unexpected error:", error)
  }
}

// Jalankan test
testConnection()
