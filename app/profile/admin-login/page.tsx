"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, ShieldCheck, UserPlus } from "lucide-react"
import { loginAdmin, createAdminIfNotExists } from "@/lib/auth"

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("admin@kubika.com")
  const [password, setPassword] = useState("Admin123!@#")
  const [isLoading, setIsLoading] = useState(false)
  const [isCreatingAdmin, setIsCreatingAdmin] = useState(false)
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage("")

    try {
      const result = await loginAdmin(email, password)

      if (result.success) {
        router.push("/admin/dashboard")
      } else {
        setMessage(result.message || "Email atau password salah. Silakan coba lagi.")
      }
    } catch (error) {
      console.error("Error logging in:", error)
      setMessage("Terjadi kesalahan. Silakan coba lagi.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateAdmin = async () => {
    setIsCreatingAdmin(true)
    setMessage("")

    try {
      const result = await createAdminIfNotExists()
      if (result.success) {
        setMessage("Admin berhasil dibuat! Silakan login dengan kredensial default.")
      } else {
        setMessage("Gagal membuat admin. Silakan coba lagi.")
      }
    } catch (error) {
      console.error("Error creating admin:", error)
      setMessage("Terjadi kesalahan saat membuat admin.")
    } finally {
      setIsCreatingAdmin(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <Link href="/profile">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Kembali</span>
            </Button>
          </Link>
          <h1 className="text-xl font-bold">Admin Login</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <div className="flex items-center justify-center mb-4">
              <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
                <ShieldCheck className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <CardTitle className="text-center">Login Admin</CardTitle>
            <CardDescription className="text-center">Masuk sebagai administrator aplikasi</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@kubika.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {message && (
                <div
                  className={`p-3 rounded-md ${
                    message.includes("berhasil") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}
                >
                  {message}
                </div>
              )}

              <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-md">
                <strong>Kredensial Default:</strong>
                <br />
                Email: admin@kubika.com
                <br />
                Password: Admin123!@#
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Memproses..." : "Login"}
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={handleCreateAdmin}
                disabled={isCreatingAdmin}
              >
                <UserPlus className="h-4 w-4 mr-2" />
                {isCreatingAdmin ? "Membuat Admin..." : "Buat Admin Baru"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </main>

      {/* Bottom Navigation */}
      <nav className="sticky bottom-0 bg-white border-t border-gray-200 p-2">
        <div className="flex items-center justify-around">
          <Link href="/" className="flex flex-col items-center p-2 text-gray-500">
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
          <Link href="/shapes" className="flex flex-col items-center p-2 text-gray-500">
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
            <span className="text-xs">Materi</span>
          </Link>
          <Link href="/exercises" className="flex flex-col items-center p-2 text-gray-500">
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
          <Link href="/profile" className="flex flex-col items-center p-2 text-blue-600">
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
