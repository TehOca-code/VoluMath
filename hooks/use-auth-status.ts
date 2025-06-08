"use client"

import { useState, useEffect } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import type { User } from "@supabase/supabase-js"
import type { UserProfile } from "@/types/user"

export function useAuthStatus() {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const supabase = createClientComponentClient()

  useEffect(() => {
    // Function to fetch user profile
    async function fetchUserProfile(userId: string) {
      try {
        const { data, error } = await supabase.from("user_profiles").select("*").eq("user_id", userId).single()

        if (error) {
          console.error("Error fetching user profile:", error)
          return null
        }

        return data as UserProfile
      } catch (err) {
        console.error("Error in fetchUserProfile:", err)
        return null
      }
    }

    // Set up auth state listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setLoading(true)

      try {
        if (session?.user) {
          setUser(session.user)
          const userProfile = await fetchUserProfile(session.user.id)
          setProfile(userProfile)
        } else {
          setUser(null)
          setProfile(null)
        }
      } catch (err) {
        console.error("Error in auth state change:", err)
        setError(err instanceof Error ? err : new Error(String(err)))
      } finally {
        setLoading(false)
      }
    })

    // Initial auth check
    async function checkAuth() {
      try {
        setLoading(true)
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (session?.user) {
          setUser(session.user)
          const userProfile = await fetchUserProfile(session.user.id)
          setProfile(userProfile)
        }
      } catch (err) {
        console.error("Error checking auth:", err)
        setError(err instanceof Error ? err : new Error(String(err)))
      } finally {
        setLoading(false)
      }
    }

    checkAuth()

    // Cleanup subscription
    return () => {
      subscription.unsubscribe()
    }
  }, [supabase])

  return { user, profile, loading, error }
}
