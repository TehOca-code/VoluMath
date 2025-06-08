import { supabase } from "./supabase"
import type { UserProfile, UserRole, UserStatus } from "@/types/user"

// Fungsi untuk mendaftar pengguna baru dengan password
export async function registerUser(email: string, fullName: string, phone: string, password: string) {
  try {
    // Daftarkan pengguna di Supabase Auth dengan password yang diberikan
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    })

    if (authError) throw authError

    if (authData.user) {
      // Buat profil pengguna di database
      const { error: profileError } = await supabase.from("user_profiles").insert({
        user_id: authData.user.id,
        email: email,
        full_name: fullName,
        phone: phone,
        role: "user" as UserRole,
        status: "pending" as UserStatus,
      })

      if (profileError) throw profileError

      return { success: true, user: authData.user }
    }
  } catch (error) {
    console.error("Error registering user:", error)
    return { success: false, error }
  }
}

// Fungsi untuk login dengan email dan password
export async function loginWithEmailPassword(email: string, password: string) {
  try {
    // Lakukan login
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      console.error("Login error:", error)
      return {
        success: false,
        message:
          error.message === "Invalid login credentials" ? "Email atau password salah" : "Terjadi kesalahan saat login",
      }
    }

    if (data.user && data.session) {
      // Check if user profile exists and is approved
      const { data: profile, error: profileError } = await supabase
        .from("user_profiles")
        .select("status, role")
        .eq("user_id", data.user.id)
        .single()

      if (profileError) {
        console.error("Profile check error:", profileError)
        // Jika profil tidak ditemukan, logout user
        await supabase.auth.signOut()
        return {
          success: false,
          message: "Profil pengguna tidak ditemukan. Silakan hubungi admin.",
        }
      }

      if (profile?.status === "pending") {
        // Sign out the user if not approved
        await supabase.auth.signOut()
        return {
          success: false,
          message: "Akun Anda masih menunggu persetujuan admin.",
        }
      }

      if (profile?.status === "rejected") {
        // Sign out the user if rejected
        await supabase.auth.signOut()
        return {
          success: false,
          message: "Pendaftaran Anda telah ditolak. Silakan hubungi admin.",
        }
      }

      // Jika semua validasi berhasil, return success
      return {
        success: true,
        message: "Login berhasil!",
        user: data.user,
        session: data.session,
      }
    }

    return {
      success: false,
      message: "Terjadi kesalahan yang tidak diketahui",
    }
  } catch (error) {
    console.error("Unexpected login error:", error)
    return {
      success: false,
      message: "Terjadi kesalahan. Silakan coba lagi.",
    }
  }
}

// Fungsi untuk login dengan magic link
export async function loginWithMagicLink(email: string) {
  try {
    // Periksa apakah pengguna sudah terdaftar dan statusnya
    const { data: profiles, error: profileError } = await supabase
      .from("user_profiles")
      .select("*")
      .eq("email", email)
      .single()

    if (profileError && profileError.code !== "PGRST116") {
      throw profileError
    }

    // Jika pengguna ditemukan, periksa statusnya
    if (profiles) {
      if (profiles.status === "pending") {
        return { success: false, message: "Akun Anda masih menunggu persetujuan admin." }
      }
      if (profiles.status === "rejected") {
        return { success: false, message: "Pendaftaran Anda telah ditolak. Silakan hubungi admin." }
      }
    }

    // Kirim magic link
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) throw error

    return { success: true, message: "Link masuk telah dikirim ke email Anda." }
  } catch (error) {
    console.error("Error sending magic link:", error)
    return { success: false, error }
  }
}

// Fungsi untuk membuat admin user otomatis jika belum ada
export async function createAdminIfNotExists() {
  try {
    // Cek apakah admin sudah ada
    const { data: existingAdmin } = await supabase
      .from("user_profiles")
      .select("*")
      .eq("email", "admin@kubika.com")
      .single()

    if (existingAdmin) {
      return { success: true, message: "Admin already exists" }
    }

    // Buat admin user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: "admin@kubika.com",
      password: "Admin123!@#",
    })

    if (authError) throw authError

    if (authData.user) {
      // Buat profil admin
      const { error: profileError } = await supabase.from("user_profiles").insert({
        user_id: authData.user.id,
        email: "admin@kubika.com",
        full_name: "Administrator",
        phone: "000-000-0000",
        role: "admin" as UserRole,
        status: "approved" as UserStatus,
      })

      if (profileError) throw profileError
      return { success: true, message: "Admin created successfully" }
    }
  } catch (error) {
    console.error("Error creating admin:", error)
    return { success: false, error }
  }
}

// Fungsi untuk login admin dengan email dan password
export async function loginAdmin(email: string, password: string) {
  try {
    // Jika email adalah admin@kubika.com, coba buat admin dulu jika belum ada
    if (email === "admin@kubika.com") {
      await createAdminIfNotExists()
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      // Jika login gagal dan email adalah admin, coba buat admin lagi
      if (email === "admin@kubika.com" && error.message.includes("Invalid login credentials")) {
        const createResult = await createAdminIfNotExists()
        if (createResult.success) {
          // Coba login lagi setelah membuat admin
          const { data: retryData, error: retryError } = await supabase.auth.signInWithPassword({
            email,
            password,
          })
          if (retryError) throw retryError
          const data = retryData
        } else {
          throw error
        }
      } else {
        throw error
      }
    }

    // Periksa apakah pengguna adalah admin
    if (data?.user) {
      const { data: profile, error: profileError } = await supabase
        .from("user_profiles")
        .select("*")
        .eq("user_id", data.user.id)
        .single()

      if (profileError) {
        // Jika profil tidak ditemukan, buat profil admin
        if (email === "admin@kubika.com") {
          const { error: createProfileError } = await supabase.from("user_profiles").insert({
            user_id: data.user.id,
            email: "admin@kubika.com",
            full_name: "Administrator",
            phone: "000-000-0000",
            role: "admin" as UserRole,
            status: "approved" as UserStatus,
          })

          if (createProfileError) throw createProfileError
          return { success: true, user: data.user }
        }
        throw profileError
      }

      if (profile.role !== "admin") {
        await supabase.auth.signOut()
        return { success: false, message: "Anda tidak memiliki akses admin." }
      }

      return { success: true, user: data.user }
    }
  } catch (error) {
    console.error("Error logging in admin:", error)
    return { success: false, error }
  }
}

// Fungsi untuk logout
export async function logout() {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    return { success: true }
  } catch (error) {
    console.error("Error logging out:", error)
    return { success: false, error }
  }
}

// Fungsi untuk mendapatkan pengguna saat ini
export async function getCurrentUser() {
  try {
    const { data, error } = await supabase.auth.getUser()
    if (error) throw error
    return data.user
  } catch (error) {
    console.error("Error getting current user:", error)
    return null
  }
}

// Fungsi untuk mendapatkan profil pengguna saat ini
export async function getCurrentUserProfile() {
  try {
    const user = await getCurrentUser()
    if (!user) return null

    const { data, error } = await supabase.from("user_profiles").select("*").eq("user_id", user.id).single()

    if (error) throw error
    return data as UserProfile
  } catch (error) {
    console.error("Error getting user profile:", error)
    return null
  }
}

// Fungsi untuk menghasilkan password acak
function generateRandomPassword() {
  return Math.random().toString(36).slice(-10) + Math.random().toString(36).slice(-10)
}
