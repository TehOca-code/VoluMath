"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, LogIn, UserPlus, ShieldCheck, User, Mail, Phone, LogOut, Settings, AlertCircle } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { logout } from "@/lib/auth"

export default function ProfilePage() {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  // Fetch user and profile directly in the component
  useEffect(() => {
    async function fetchUserAndProfile() {
      try {
        setIsLoading(true)
        setError(null)

        // Get current session
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession()

        if (sessionError) {
          throw new Error(`Session error: ${sessionError.message}`)
        }

        // If no session, set loading to false and return
        if (!sessionData.session) {
          console.log("No active session found")
          setUser(null)
          setProfile(null)
          setIsLoading(false)
          return
        }

        // Set user from session
        const currentUser = sessionData.session.user
        setUser(currentUser)
        console.log("User found:", currentUser.email)

        // Fetch user profile
        const { data: profileData, error: profileError } = await supabase
          .from("user_profiles")
          .select("*")
          .eq("user_id", currentUser.id)
          .single()

        if (profileError) {
          console.error("Error fetching profile:", profileError)
          setProfile(null)
          // Don't throw error here, we'll show UI without profile
        } else {
          console.log("Profile found:", profileData)
          setProfile(profileData)
        }
      } catch (err) {
        console.error("Error in fetchUserAndProfile:", err)
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserAndProfile()
  }, [])

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      await logout()
      // Refresh halaman untuk memastikan auth state terupdate
      window.location.href = "/profile"
    } catch (error) {
      console.error("Error logging out:", error)
      setIsLoggingOut(false)
    }
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-[#F38C0B]">
        <header className="sticky top-0 z-10 bg-[#01484C] p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-[#129392]">
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">Kembali</span>
              </Button>
            </Link>
            <h1 className="text-xl font-bold text-white">VoluMath</h1>
          </div>
        </header>

        <main className="flex-1 p-4 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-white">Memuat profil...</p>
          </div>
        </main>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col min-h-screen bg-[#F38C0B]">
        <header className="sticky top-0 z-10 bg-[#01484C] p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-[#129392]">
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">Kembali</span>
              </Button>
            </Link>
            <h1 className="text-xl font-bold text-white">Kubika</h1>
          </div>
        </header>

        <main className="flex-1 p-4">
          <Card className="bg-white shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="flex justify-center mb-4">
                <AlertCircle className="h-12 w-12 text-red-500" />
              </div>
              <h2 className="text-xl font-bold mb-2 text-[#01484C]">Terjadi Kesalahan</h2>
              <p className="text-[#01484C] mb-6">
                Maaf, terjadi kesalahan saat memuat profil Anda. Silakan coba lagi nanti.
              </p>
              <Button onClick={() => window.location.reload()} className="bg-[#01484C] hover:bg-[#129392] text-white">
                Coba Lagi
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    )
  }

  // Jika user sudah login, tampilkan halaman profile
  if (user) {
    return (
      <div className="flex flex-col min-h-screen bg-[#F38C0B]">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-[#01484C] p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-[#129392]">
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">Kembali</span>
              </Button>
            </Link>
            <h1 className="text-xl font-bold text-white">Profil Saya</h1>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-4">
          {/* Profile Avatar */}
          <div className="flex justify-center mb-8">
            <div className="h-24 w-24 rounded-full bg-white/20 flex items-center justify-center">
              <User className="h-12 w-12 text-white" />
            </div>
          </div>

          {/* Profile Info Card */}
          <Card className="mb-6 bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-[#01484C] flex items-center gap-2">
                <User className="h-5 w-5" />
                Informasi Profil
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {profile ? (
                <>
                  <div className="flex items-center gap-3">
                    <User className="h-5 w-5 text-[#129392]" />
                    <div>
                      <p className="text-sm text-gray-500">Nama Lengkap</p>
                      <p className="font-medium text-[#01484C]">{profile.full_name || "Belum diatur"}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-[#129392]" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium text-[#01484C]">{profile.email || user.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-[#129392]" />
                    <div>
                      <p className="text-sm text-gray-500">Nomor Telepon</p>
                      <p className="font-medium text-[#01484C]">{profile.phone || "Belum diatur"}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Settings className="h-5 w-5 text-[#129392]" />
                    <div>
                      <p className="text-sm text-gray-500">Status Akun</p>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          profile.status === "approved"
                            ? "bg-green-100 text-green-800"
                            : profile.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {profile.status === "approved"
                          ? "Disetujui"
                          : profile.status === "pending"
                            ? "Menunggu Persetujuan"
                            : "Ditolak"}
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-4">
                  <p className="text-[#01484C]">Data profil tidak ditemukan.</p>
                  <p className="text-sm text-gray-500 mt-1">Email: {user.email}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white"
            >
              <LogOut className="h-5 w-5" />
              <span>{isLoggingOut ? "Keluar..." : "Keluar"}</span>
            </Button>
          </div>
        </main>

        {/* Bottom Navigation */}
        <nav className="sticky bottom-0 bg-[#01484C] border-t border-gray-200 p-2">
          <div className="flex items-center justify-around">
            <Link href="/" className="flex flex-col items-center p-2 text-[#E9E9E7]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              <span className="text-xs">Beranda</span>
            </Link>
            <Link href="/shapes" className="flex flex-col items-center p-2 text-[#E9E9E7]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
              <span className="text-xs">Bangun</span>
            </Link>
            <Link href="/exercises" className="flex flex-col items-center p-2 text-[#E9E9E7]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              <span className="text-xs">Latihan</span>
            </Link>
            <Link href="/profile" className="flex flex-col items-center p-2 text-[#F38C0B]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span className="text-xs">Profil</span>
            </Link>
          </div>
        </nav>
      </div>
    )
  }

  // Jika user belum login, tampilkan form login/register
  return (
    <div className="flex flex-col min-h-screen bg-[#F38C0B]">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-[#01484C] p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <Link href="/">
            <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-[#129392]">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Kembali</span>
            </Button>
          </Link>
          <h1 className="text-xl font-bold text-white">Kubika</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4">
        <div className="flex justify-center mb-8">
          <div className="h-24 w-24 rounded-full bg-white/20 flex items-center justify-center">
            <User className="h-12 w-12 text-white" />
          </div>
        </div>

        <Card className="mb-4 bg-white shadow-lg">
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-bold mb-2 text-[#01484C]">Selamat Datang</h2>
            <p className="text-[#01484C] mb-6">
              Silakan masuk atau daftar untuk melacak kemajuan belajar dan menyimpan pencapaian Anda.
            </p>

            <div className="space-y-3">
              <Link href="/profile/login" className="w-full">
                <Button
                  className="w-full flex items-center justify-center gap-2 bg-[#01484C] hover:bg-[#129392] text-white"
                  size="lg"
                >
                  <LogIn className="h-5 w-5" />
                  <span>Masuk</span>
                </Button>
              </Link>

              <Link href="/profile/register" className="w-full">
                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2 border-[#129392] text-[#129392] hover:bg-[#129392]/10"
                  size="lg"
                >
                  <UserPlus className="h-5 w-5" />
                  <span>Daftar</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6">
          <Link href="/profile/admin-login">
            <Button
              variant="ghost"
              className="w-full flex items-center justify-center gap-2 text-[#01484C] bg-white/10 hover:bg-white/20"
            >
              <ShieldCheck className="h-5 w-5" />
              <span>Masuk sebagai Admin</span>
            </Button>
          </Link>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="sticky bottom-0 bg-[#01484C] border-t border-gray-200 p-2">
        <div className="flex items-center justify-around">
          <Link href="/" className="flex flex-col items-center p-2 text-[#E9E9E7]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <span className="text-xs">Beranda</span>
          </Link>
          <Link href="/shapes" className="flex flex-col items-center p-2 text-[#E9E9E7]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
            <span className="text-xs">Bangun</span>
          </Link>
          <Link href="/exercises" className="flex flex-col items-center p-2 text-[#E9E9E7]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <span className="text-xs">Latihan</span>
          </Link>
          <Link href="/profile" className="flex flex-col items-center p-2 text-[#F38C0B]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <span className="text-xs">Profil</span>
          </Link>
        </div>
      </nav>
    </div>
  )
}
