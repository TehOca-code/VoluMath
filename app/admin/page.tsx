"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { UserCheck, Users, ShieldCheck, GraduationCap, BookOpen, BarChart3, Clock, UserPlus } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { formatDistanceToNow } from "date-fns"
import { id } from "date-fns/locale"

export default function AdminDashboardPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [stats, setStats] = useState({
    pendingUsers: 0,
    activeUsers: 0,
    totalUsers: 0,
    adminCount: 0,
    dosenCount: 0,
    mahasiswaCount: 0,
    recentUsers: [] as any[],
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!loading && (!user || user.role !== "admin")) {
      router.replace("/")
      return
    }

    if (user && user.role === "admin") {
      fetchStats()
    }
  }, [user, loading, router])

  const fetchStats = async () => {
    setIsLoading(true)
    try {
      // Get pending users count
      const { count: pendingCount } = await supabase
        .from("users")
        .select("*", { count: "exact", head: true })
        .eq("is_confirmed", false)

      // Get active users count
      const { count: activeCount } = await supabase
        .from("users")
        .select("*", { count: "exact", head: true })
        .eq("is_confirmed", true)

      // Get total users count
      const { count: totalUsersCount } = await supabase.from("users").select("*", { count: "exact", head: true })

      // Get admin users count
      const { count: adminCount } = await supabase
        .from("users")
        .select("*", { count: "exact", head: true })
        .eq("role", "admin")

      // Get dosen users count
      const { count: dosenCount } = await supabase
        .from("users")
        .select("*", { count: "exact", head: true })
        .eq("role", "dosen")

      // Get mahasiswa users count
      const { count: mahasiswaCount } = await supabase
        .from("users")
        .select("*", { count: "exact", head: true })
        .eq("role", "mahasiswa")

      // Get recent users
      const { data: recentUsers } = await supabase
        .from("users")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5)

      setStats({
        pendingUsers: pendingCount || 0,
        activeUsers: activeCount || 0,
        totalUsers: totalUsersCount || 0,
        adminCount: adminCount || 0,
        dosenCount: dosenCount || 0,
        mahasiswaCount: mahasiswaCount || 0,
        recentUsers: recentUsers || [],
      })
    } catch (err) {
      console.error("Error fetching stats:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "admin":
        return "destructive"
      case "dosen":
        return "default"
      case "mahasiswa":
        return "secondary"
      default:
        return "outline"
    }
  }

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (user.role !== "admin") {
    return (
      <div className="container px-4 py-6">
        <Alert variant="destructive">
          <AlertDescription>Anda tidak memiliki akses ke halaman ini</AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="container px-4 py-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Ringkasan</h1>
          <p className="text-muted-foreground">Pantau dan kelola akun pengguna</p>
        </div>
        <Button onClick={() => router.push("/admin/users")}>
          <Users className="mr-2 h-4 w-4" />
          Pengguna
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20 border-blue-200 dark:border-blue-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center text-blue-700 dark:text-blue-400">
              <Users className="h-5 w-5 mr-2" />
              Total Pengguna
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-blue-700 dark:text-blue-400">
              {isLoading ? "..." : stats.totalUsers}
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              <Badge
                variant="outline"
                className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800"
              >
                Aktif: {isLoading ? "..." : stats.activeUsers}
              </Badge>
              <Badge
                variant="outline"
                className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800"
              >
                Menunggu: {isLoading ? "..." : stats.pendingUsers}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950/20 dark:to-amber-900/20 border-amber-200 dark:border-amber-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center text-amber-700 dark:text-amber-400">
              <UserCheck className="h-5 w-5 mr-2" />
              Menunggu Konfirmasi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-amber-700 dark:text-amber-400">
              {isLoading ? "..." : stats.pendingUsers}
            </div>
            {stats.pendingUsers > 0 ? (
              <Button
                variant="outline"
                className="mt-3 border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-400 hover:bg-amber-200 dark:hover:bg-amber-900/50"
                onClick={() => router.push("/admin/users")}
              >
                Konfirmasi Pengguna
              </Button>
            ) : (
              <p className="text-sm text-amber-600 dark:text-amber-500 mt-3">
                Tidak ada pengguna yang menunggu konfirmasi
              </p>
            )}
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20 border-green-200 dark:border-green-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center text-green-700 dark:text-green-400">
              <UserPlus className="h-5 w-5 mr-2" />
              Pengguna Aktif
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-green-700 dark:text-green-400">
              {isLoading ? "..." : stats.activeUsers}
            </div>
            <Button
              variant="outline"
              className="mt-3 border-green-300 dark:border-green-700 text-green-700 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/50"
              onClick={() => router.push("/admin/users")}
            >
              Lihat Pengguna
            </Button>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="distribution" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="distribution" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            <span>Distribusi Peran</span>
          </TabsTrigger>
          <TabsTrigger value="recent" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>Aktivitas Terbaru</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="distribution" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Distribusi Peran Pengguna</CardTitle>
              <CardDescription>Jumlah pengguna berdasarkan peran dalam sistem</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="border-2 border-destructive/20 bg-destructive/5">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="bg-destructive/10 p-3 rounded-full">
                        <ShieldCheck className="h-6 w-6 text-destructive" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-destructive/70">Admin</p>
                        <p className="text-3xl font-bold text-destructive">{isLoading ? "..." : stats.adminCount}</p>
                      </div>
                    </div>
                    <div className="mt-4 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-destructive"
                        style={{
                          width: `${stats.totalUsers ? (stats.adminCount / stats.totalUsers) * 100 : 0}%`,
                        }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      {stats.totalUsers
                        ? `${((stats.adminCount / stats.totalUsers) * 100).toFixed(1)}% dari total pengguna`
                        : "0% dari total pengguna"}
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-primary/20 bg-primary/5">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="bg-primary/10 p-3 rounded-full">
                        <BookOpen className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-primary/70">Dosen</p>
                        <p className="text-3xl font-bold text-primary">{isLoading ? "..." : stats.dosenCount}</p>
                      </div>
                    </div>
                    <div className="mt-4 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary"
                        style={{
                          width: `${stats.totalUsers ? (stats.dosenCount / stats.totalUsers) * 100 : 0}%`,
                        }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      {stats.totalUsers
                        ? `${((stats.dosenCount / stats.totalUsers) * 100).toFixed(1)}% dari total pengguna`
                        : "0% dari total pengguna"}
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-secondary/20 bg-secondary/5">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="bg-secondary/10 p-3 rounded-full">
                        <GraduationCap className="h-6 w-6 text-secondary-foreground" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-secondary-foreground/70">Mahasiswa</p>
                        <p className="text-3xl font-bold text-secondary-foreground">
                          {isLoading ? "..." : stats.mahasiswaCount}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-secondary"
                        style={{
                          width: `${stats.totalUsers ? (stats.mahasiswaCount / stats.totalUsers) * 100 : 0}%`,
                        }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      {stats.totalUsers
                        ? `${((stats.mahasiswaCount / stats.totalUsers) * 100).toFixed(1)}% dari total pengguna`
                        : "0% dari total pengguna"}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recent" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Aktivitas Pendaftaran Terbaru</CardTitle>
              <CardDescription>Pengguna yang baru mendaftar dalam sistem</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                </div>
              ) : stats.recentUsers.length > 0 ? (
                <div className="space-y-4">
                  {stats.recentUsers.map((recentUser) => (
                    <div
                      key={recentUser.id}
                      className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                    >
                      <div className="flex items-center gap-3 mb-2 sm:mb-0">
                        <div className="bg-primary/10 h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="font-semibold text-primary">{recentUser.name.charAt(0).toUpperCase()}</span>
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium truncate">{recentUser.name}</p>
                          <p className="text-sm text-muted-foreground truncate">{recentUser.email}</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 ml-13 sm:ml-0">
                        <Badge variant={getRoleBadgeVariant(recentUser.role)}>{recentUser.role}</Badge>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {formatDistanceToNow(new Date(recentUser.created_at), {
                            addSuffix: true,
                            locale: id,
                          })}
                        </span>
                        {!recentUser.is_confirmed && (
                          <Badge
                            variant="outline"
                            className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800"
                          >
                            Menunggu
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}

                  <div className="flex justify-center mt-4">
                    <Button variant="outline" onClick={() => router.push("/admin/users")}>
                      Lihat Semua Pengguna
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Users className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">Belum ada aktivitas pendaftaran</h3>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {stats.pendingUsers > 0 && (
        <Card className="border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/20">
          <CardHeader>
            <CardTitle className="flex items-center text-amber-700 dark:text-amber-400">
              <UserCheck className="h-5 w-5 mr-2" />
              Perhatian: Pendaftaran Menunggu Konfirmasi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <p className="text-amber-700 dark:text-amber-400">
                Terdapat <span className="font-bold">{stats.pendingUsers}</span> pengguna yang menunggu konfirmasi
                pendaftaran.
              </p>
              <Button
                className="bg-amber-600 hover:bg-amber-700 text-white"
                onClick={() => router.push("/admin/users")}
              >
                Konfirmasi Sekarang
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
