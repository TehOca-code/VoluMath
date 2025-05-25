"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState, useRef } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

type User = {
  id: string
  name: string
  email: string
  role: "admin" | "dosen" | "mahasiswa"
  is_confirmed?: boolean
}

type AuthContextType = {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signUp: (
    name: string,
    email: string,
    password: string,
    role: "admin" | "dosen" | "mahasiswa",
  ) => Promise<{ error: any }>
  signOut: () => Promise<void>
  confirmUser?: (userId: string) => Promise<{ error: any }>
  rejectUser?: (userId: string) => Promise<{ error: any }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const authChecked = useRef(false)
  const initialLoadComplete = useRef(false)

  useEffect(() => {
    // Only run this effect once
    if (authChecked.current) return

    const getUser = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (session?.user) {
          const { data: userData } = await supabase.from("users").select("*").eq("id", session.user.id).single()

          if (userData) {
            // Update last_active timestamp
            await supabase.from("users").update({ last_active: new Date().toISOString() }).eq("id", userData.id)

            setUser({
              id: userData.id,
              name: userData.name,
              email: userData.email,
              role: userData.role,
              is_confirmed: userData.is_confirmed,
            })
          } else {
            // User exists in auth but not in our users table
            await supabase.auth.signOut()
            setUser(null)
          }
        } else {
          setUser(null)
        }
      } catch (error) {
        console.error("Error checking auth:", error)
        setUser(null)
      } finally {
        setLoading(false)
        authChecked.current = true
        initialLoadComplete.current = true
      }
    }

    getUser()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      // Skip the initial event as we already handled it above
      if (!initialLoadComplete.current) return

      if (event === "SIGNED_IN" && session?.user) {
        const { data: userData } = await supabase.from("users").select("*").eq("id", session.user.id).single()

        if (userData) {
          // Update last_active timestamp
          await supabase.from("users").update({ last_active: new Date().toISOString() }).eq("id", userData.id)

          setUser({
            id: userData.id,
            name: userData.name,
            email: userData.email,
            role: userData.role,
            is_confirmed: userData.is_confirmed,
          })
        }
      } else if (event === "SIGNED_OUT") {
        setUser(null)
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [router])

  const signIn = async (email: string, password: string) => {
    setLoading(true)
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (!error) {
        const { data: userData } = await supabase.from("users").select("*").eq("email", email).single()

        if (userData) {
          if (!userData.is_confirmed && userData.role !== "admin") {
            await supabase.auth.signOut()
            setUser(null)
            return { error: { message: "Akun Anda belum dikonfirmasi oleh admin. Silakan tunggu konfirmasi." } }
          }

          // Update last_active timestamp
          await supabase.from("users").update({ last_active: new Date().toISOString() }).eq("id", userData.id)

          setUser({
            id: userData.id,
            name: userData.name,
            email: userData.email,
            role: userData.role,
            is_confirmed: userData.is_confirmed,
          })

          // Update dashboard last_login
          await supabase.from("dashboards").update({ last_login: new Date().toISOString() }).eq("user_id", userData.id)
        }
      }

      return { error }
    } finally {
      setLoading(false)
    }
  }

  const signUp = async (name: string, email: string, password: string, role: "admin" | "dosen" | "mahasiswa") => {
    setLoading(true)
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })

      if (!error && data.user) {
        // Create a record in our users table
        const { error: insertError } = await supabase.from("users").insert([
          {
            id: data.user.id,
            name,
            email,
            password: "hashed_in_supabase", // Password is handled by Supabase Auth
            role,
            is_confirmed: role === "admin", // Auto-confirm admins
            last_active: new Date().toISOString(),
          },
        ])

        // Create a dashboard entry for the user
        if (!insertError) {
          await supabase.from("dashboards").insert([
            {
              user_id: data.user.id,
              last_login: new Date().toISOString(),
              progress: 0,
            },
          ])
        }

        // If not admin, sign out immediately as they need confirmation
        if (role !== "admin") {
          await supabase.auth.signOut()
          setUser(null)
        } else {
          setUser({
            id: data.user.id,
            name,
            email,
            role,
            is_confirmed: true,
          })
        }

        return { error: insertError }
      }

      return { error }
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    setLoading(true)
    try {
      await supabase.auth.signOut()
      setUser(null)
      router.push("/login")
    } finally {
      setLoading(false)
    }
  }

  const confirmUser = async (userId: string) => {
    try {
      const { error } = await supabase.from("users").update({ is_confirmed: true }).eq("id", userId)

      return { error }
    } catch (err) {
      return { error: err }
    }
  }

  const rejectUser = async (userId: string) => {
    try {
      const { error } = await supabase.from("users").delete().eq("id", userId)

      return { error }
    } catch (err) {
      return { error: err }
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn,
        signUp,
        signOut,
        confirmUser,
        rejectUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
