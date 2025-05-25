"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { BarChart, LineChart, PieChart, Activity, Users, Clock } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AdminStatsPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeToday: 0,
    activeThisWeek: 0,
    totalMaterials: 0,
    totalQuizzes: 0,
    completedQuizzes: 0,
    averageScore: 0,
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
      // Get total users count
      const { count: totalUsersCount } = await supabase.from("users").select("*", { count: "exact", head: true })

      // Get users active today
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      const { count: activeTodayCount } = await supabase
        .from("users")
        .select("*", { count: "exact", head: true })
        .gte("last_active", today.toISOString())

      // Get users active this week
      const lastWeek = new Date()
      lastWeek.setDate(lastWeek.getDate() - 7)
      const { count: activeWeekCount } = await supabase
        .from("users")
        .select("*", { count: "exact", head: true })
        .gte("last_active", lastWeek.toISOString())

      // Get total materials
      const { count: materialsCount } = await supabase.from("materi").select("*", { count: "exact", head: true })

      // Get total quizzes
      const { count: quizzesCount } = await supabase.from("quizzes").select("*", { count: "exact", head: true })

      // Get completed quizzes
      const { count: completedCount } = await supabase.from("quiz_answers").select("*", { count: "exact", head: true })

      setStats({
        totalUsers: totalUsersCount || 0,
        activeToday: activeTodayCount || 0,
        activeThisWeek: activeWeekCount || 0,
        totalMaterials: materialsCount || 0,
        totalQuizzes: quizzesCount || 0,
        completedQuizzes: completedCount || 0,
        averageScore: 0, // Would need more complex query
      })
    } catch (err) {
      console.error("Error fetching stats:", err)
    } finally {
      setIsLoading(false)
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
      <div>
        <h1 className="text-2xl font-bold">Statistik Aplikasi</h1>
        <p className="text-muted-foreground">Analisis penggunaan dan performa aplikasi</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Users className="h-5 w-5 mr-2 text-primary" />
              Pengguna Aktif
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">
              {isLoading ? "..." : stats.activeToday}
              <span className="text-sm font-normal text-muted-foreground ml-2">hari ini</span>
            </div>
            <div className="text-sm text-muted-foreground mt-2">
              {isLoading ? "..." : stats.activeThisWeek} aktif minggu ini
            </div>
            <div className="mt-4 h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary"
                style={{
                  width: `${stats.totalUsers ? (stats.activeThisWeek / stats.totalUsers) * 100 : 0}%`,
                }}
              />
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {stats.totalUsers
                ? `${((stats.activeThisWeek / stats.totalUsers) * 100).toFixed(1)}% dari total pengguna`
                : "0% dari total pengguna"}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Activity className="h-5 w-5 mr-2 text-primary" />
              Aktivitas Pembelajaran
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">
              {isLoading ? "..." : stats.completedQuizzes}
              <span className="text-sm font-normal text-muted-foreground ml-2">quiz selesai</span>
            </div>
            <div className="text-sm text-muted-foreground mt-2">
              {isLoading ? "..." : stats.totalQuizzes} total quiz tersedia
            </div>
            <div className="mt-4 h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary"
                style={{
                  width: `${stats.totalQuizzes ? (stats.completedQuizzes / (stats.totalQuizzes * stats.totalUsers)) * 100 : 0}%`,
                }}
              />
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {stats.totalQuizzes && stats.totalUsers
                ? `${((stats.completedQuizzes / (stats.totalQuizzes * stats.totalUsers)) * 100).toFixed(1)}% tingkat penyelesaian`
                : "0% tingkat penyelesaian"}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Clock className="h-5 w-5 mr-2 text-primary" />
              Waktu Pembelajaran
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">
              0<span className="text-sm font-normal text-muted-foreground ml-2">menit/pengguna</span>
            </div>
            <div className="text-sm text-muted-foreground mt-2">Rata-rata waktu belajar per pengguna</div>
            <div className="mt-4 h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary"
                style={{
                  width: "0%",
                }}
              />
            </div>
            <div className="text-xs text-muted-foreground mt-1">Fitur pengukuran waktu belum diimplementasikan</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="users" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>Pengguna</span>
          </TabsTrigger>
          <TabsTrigger value="content" className="flex items-center gap-2">
            <BarChart className="h-4 w-4" />
            <span>Konten</span>
          </TabsTrigger>
          <TabsTrigger value="performance" className="flex items-center gap-2">
            <LineChart className="h-4 w-4" />
            <span>Performa</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Statistik Pengguna</CardTitle>
              <CardDescription>Analisis pengguna dan aktivitas mereka</CardDescription>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center">
              <div className="text-center">
                <PieChart className="h-16 w-16 mx-auto text-muted-foreground" />
                <p className="mt-4 text-muted-foreground">Visualisasi data pengguna akan ditampilkan di sini</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Statistik Konten</CardTitle>
              <CardDescription>Analisis materi dan quiz</CardDescription>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center">
              <div className="text-center">
                <BarChart className="h-16 w-16 mx-auto text-muted-foreground" />
                <p className="mt-4 text-muted-foreground">Visualisasi data konten akan ditampilkan di sini</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Statistik Performa</CardTitle>
              <CardDescription>Analisis performa aplikasi</CardDescription>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center">
              <div className="text-center">
                <LineChart className="h-16 w-16 mx-auto text-muted-foreground" />
                <p className="mt-4 text-muted-foreground">Visualisasi data performa akan ditampilkan di sini</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
