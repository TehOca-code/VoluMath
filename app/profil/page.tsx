"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogOut, Save } from "lucide-react"

export default function ProfilPage() {
  const { user, loading, signOut } = useAuth()
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [dashboard, setDashboard] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  useEffect(() => {
    if (user) {
      setName(user.name)
      setEmail(user.email)

      const fetchDashboard = async () => {
        try {
          const { data } = await supabase.from("dashboards").select("*").eq("user_id", user.id).single()

          setDashboard(data)
        } catch (error) {
          console.error("Error fetching dashboard:", error)
        }
      }

      fetchDashboard()
    }
  }, [user])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    setSuccess(null)

    // Validate passwords if changing
    if (password && password !== confirmPassword) {
      setError("Password dan konfirmasi password tidak cocok")
      setIsSubmitting(false)
      return
    }

    try {
      // Update user profile
      const { error: updateError } = await supabase.from("users").update({ name }).eq("id", user?.id)

      if (updateError) throw updateError

      // Update password if provided
      if (password) {
        const { error: passwordError } = await supabase.auth.updateUser({
          password,
        })

        if (passwordError) throw passwordError
      }

      setSuccess("Profil berhasil diperbarui")
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan saat memperbarui profil")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="container px-4 py-6 space-y-6">
      <h1 className="text-2xl font-bold">Profil Saya</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Informasi Profil</CardTitle>
            <CardDescription>Perbarui informasi profil Anda</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert className="bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-300">
                  <AlertDescription>{success}</AlertDescription>
                </Alert>
              )}

              <div className="flex justify-center mb-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="/placeholder.svg" alt={user.name} />
                  <AvatarFallback className="text-4xl">{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Nama</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} disabled />
                <p className="text-xs text-muted-foreground">Email tidak dapat diubah</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Peran</Label>
                <Input id="role" value={user.role} disabled />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password Baru (opsional)</Label>
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Konfirmasi Password Baru</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={!password}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button type="button" variant="outline" onClick={() => signOut()}>
                <LogOut className="mr-2 h-4 w-4" /> Keluar
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-background mr-2"></div>
                    Menyimpan...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" /> Simpan Perubahan
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Statistik Pembelajaran</CardTitle>
            <CardDescription>Progres dan aktivitas pembelajaran Anda</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Progres Pembelajaran</span>
                <span className="text-sm">{Math.round(dashboard?.progress || 0)}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{ width: `${dashboard?.progress || 0}%` }} />
              </div>
            </div>

            <div className="pt-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Login Terakhir</p>
                  <p className="text-sm text-muted-foreground">
                    {dashboard?.last_login ? new Date(dashboard.last_login).toLocaleString("id-ID") : "Belum ada data"}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Quiz Diselesaikan</p>
                  <p className="text-sm text-muted-foreground">0 quiz</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Materi Dipelajari</p>
                  <p className="text-sm text-muted-foreground">0 materi</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
