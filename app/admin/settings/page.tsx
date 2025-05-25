"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Save, RefreshCw, Database, Shield, Bell } from "lucide-react"

export default function AdminSettingsPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)

  if (!user || user.role !== "admin") {
    return (
      <div className="container px-4 py-6">
        <Alert variant="destructive">
          <AlertDescription>Anda tidak memiliki akses ke halaman ini</AlertDescription>
        </Alert>
      </div>
    )
  }

  const handleSave = () => {
    setIsSubmitting(true)
    // Simulate saving
    setTimeout(() => {
      setIsSubmitting(false)
      setSuccess("Pengaturan berhasil disimpan")
      setTimeout(() => setSuccess(null), 3000)
    }, 1000)
  }

  return (
    <div className="container px-4 py-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Pengaturan Aplikasi</h1>
        <p className="text-muted-foreground">Konfigurasi dan preferensi aplikasi</p>
      </div>

      {success && (
        <Alert className="bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-300">
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="general">Umum</TabsTrigger>
          <TabsTrigger value="security">Keamanan</TabsTrigger>
          <TabsTrigger value="notifications">Notifikasi</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Pengaturan Sistem
              </CardTitle>
              <CardDescription>Konfigurasi dasar aplikasi</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="app-name">Nama Aplikasi</Label>
                <Input id="app-name" defaultValue="Matematika 3D" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="app-description">Deskripsi Aplikasi</Label>
                <Input id="app-description" defaultValue="Aplikasi pembelajaran matematika bangun ruang 3D" />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="maintenance-mode">Mode Pemeliharaan</Label>
                  <p className="text-sm text-muted-foreground">
                    Nonaktifkan akses pengguna saat melakukan pemeliharaan
                  </p>
                </div>
                <Switch id="maintenance-mode" />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-backup">Backup Otomatis</Label>
                  <p className="text-sm text-muted-foreground">Backup database secara otomatis setiap hari</p>
                </div>
                <Switch id="auto-backup" defaultChecked />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Menyimpan...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Simpan Pengaturan
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Pengaturan Keamanan
              </CardTitle>
              <CardDescription>Konfigurasi keamanan aplikasi</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-approve">Persetujuan Otomatis</Label>
                  <p className="text-sm text-muted-foreground">Setujui pendaftaran pengguna secara otomatis</p>
                </div>
                <Switch id="auto-approve" />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="two-factor">Autentikasi Dua Faktor</Label>
                  <p className="text-sm text-muted-foreground">Wajibkan autentikasi dua faktor untuk admin</p>
                </div>
                <Switch id="two-factor" defaultChecked />
              </div>

              <div className="space-y-2">
                <Label htmlFor="session-timeout">Batas Waktu Sesi (menit)</Label>
                <Input id="session-timeout" type="number" defaultValue="60" />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Menyimpan...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Simpan Pengaturan
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Pengaturan Notifikasi
              </CardTitle>
              <CardDescription>Konfigurasi notifikasi sistem</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="new-user">Notifikasi Pengguna Baru</Label>
                  <p className="text-sm text-muted-foreground">Dapatkan notifikasi saat pengguna baru mendaftar</p>
                </div>
                <Switch id="new-user" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="system-alerts">Peringatan Sistem</Label>
                  <p className="text-sm text-muted-foreground">Dapatkan notifikasi untuk peringatan sistem penting</p>
                </div>
                <Switch id="system-alerts" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications">Notifikasi Email</Label>
                  <p className="text-sm text-muted-foreground">Kirim notifikasi melalui email</p>
                </div>
                <Switch id="email-notifications" defaultChecked />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Menyimpan...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Simpan Pengaturan
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
