import { supabase } from "./supabase"
import type { UserProfile, UserStatus } from "@/types/user"

// Fungsi untuk mendapatkan semua pengguna dengan status pending
export async function getPendingUsers() {
  try {
    const { data, error } = await supabase
      .from("user_profiles")
      .select("*")
      .eq("status", "pending")
      .order("created_at", { ascending: false })

    if (error) throw error
    return data as UserProfile[]
  } catch (error) {
    console.error("Error getting pending users:", error)
    return []
  }
}

// Fungsi untuk mendapatkan semua pengguna yang sudah disetujui
export async function getApprovedUsers() {
  try {
    const { data, error } = await supabase
      .from("user_profiles")
      .select("*")
      .eq("status", "approved")
      .order("created_at", { ascending: false })

    if (error) throw error
    return data as UserProfile[]
  } catch (error) {
    console.error("Error getting approved users:", error)
    return []
  }
}

// Fungsi untuk menyetujui pendaftaran pengguna
export async function approveUser(userId: string) {
  try {
    const { error } = await supabase
      .from("user_profiles")
      .update({ status: "approved" as UserStatus })
      .eq("user_id", userId)

    if (error) throw error
    return { success: true }
  } catch (error) {
    console.error("Error approving user:", error)
    return { success: false, error }
  }
}

// Fungsi untuk menolak pendaftaran pengguna
export async function rejectUser(userId: string) {
  try {
    const { error } = await supabase
      .from("user_profiles")
      .update({ status: "rejected" as UserStatus })
      .eq("user_id", userId)

    if (error) throw error
    return { success: true }
  } catch (error) {
    console.error("Error rejecting user:", error)
    return { success: false, error }
  }
}

// Fungsi untuk mengaktifkan/menonaktifkan pengguna
export async function toggleUserActive(userId: string, isActive: boolean) {
  try {
    // Di sini kita bisa menggunakan kolom is_active di tabel user_profiles
    // atau menggunakan fitur Supabase Auth untuk menonaktifkan pengguna
    const { error } = await supabase.from("user_profiles").update({ is_active: isActive }).eq("user_id", userId)

    if (error) throw error
    return { success: true }
  } catch (error) {
    console.error("Error toggling user active status:", error)
    return { success: false, error }
  }
}
