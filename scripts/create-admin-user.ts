import { createClient } from "@supabase/supabase-js"

// Menggunakan environment variables yang sudah tersedia
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Buat client dengan service role key untuk operasi admin
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

async function createAdminUser() {
  try {
    console.log("Creating admin user...")

    // Data admin user
    const adminEmail = "admin@kubika.com"
    const adminPassword = "Admin123!@#"
    const adminFullName = "Administrator Kubika"

    // 1. Buat user di Supabase Auth
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email: adminEmail,
      password: adminPassword,
      email_confirm: true,
      user_metadata: {
        full_name: adminFullName,
      },
    })

    if (authError) {
      console.error("Error creating auth user:", authError)
      return
    }

    console.log("Auth user created:", authData.user?.id)

    // 2. Tambahkan profil admin ke database
    const { error: profileError } = await supabaseAdmin.from("user_profiles").insert({
      user_id: authData.user!.id,
      email: adminEmail,
      full_name: adminFullName,
      phone: "+62812345678",
      role: "admin",
      status: "approved",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })

    if (profileError) {
      console.error("Error creating user profile:", profileError)
      return
    }

    console.log("✅ Admin user created successfully!")
    console.log("Email:", adminEmail)
    console.log("Password:", adminPassword)
    console.log("Please change the password after first login.")
  } catch (error) {
    console.error("Unexpected error:", error)
  }
}

// Jalankan script
createAdminUser()
