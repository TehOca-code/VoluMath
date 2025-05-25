"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { supabase } from "@/lib/supabase"
import { BookOpen, FileQuestion } from "lucide-react"

export default function HomePage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [dashboard, setDashboard] = useState<any>(null)
  const [recentMaterials, setRecentMaterials] = useState<any[]>([])
  const [dashboardLoading, setDashboardLoading] = useState(true)

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login")
      return
    }

    if (user) {
      const fetchDashboard = async () => {
        try {
          // Get dashboard data
          const { data } = await supabase.from("dashboards").select("*").eq("user_id", user.id).single()
          setDashboard(data)

          // Get recent materials
          const { data: materiData } = await supabase
            .from("materi")
            .select("*")
            .order("created_at", { ascending: false })
            .limit(3)

          setRecentMaterials(materiData || [])
        } catch (error) {
          console.error("Error fetching dashboard:", error)
        } finally {
          setDashboardLoading(false)
        }
      }

      fetchDashboard()
    }
  }, [user, loading, router])

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (dashboardLoading) {
    return (
      <div className="container px-4 py-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-24 bg-gray-200 rounded"></div>
            <div className="h-24 bg-gray-200 rounded"></div>
          </div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="container px-4 py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Selamat Datang, {user.name}</h1>
      </div>

      {user.role === "mahasiswa" && (
        <Card>
        <CardHeader className="pb-2">
          <CardTitle>Progress Pembelajaran</CardTitle>
          <CardDescription>
            Anda telah menyelesaikan {Math.round(dashboard?.progress || 0)}% dari materi
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={dashboard?.progress || 0} className="h-2" />
        </CardContent>
      </Card>
      )}

      <div className="grid grid-cols-2 gap-4">
        <Card className="col-span-1">
          <CardHeader className="pb-2">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Materi</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{recentMaterials.length}</div>
            <p className="text-sm text-muted-foreground">Materi tersedia</p>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader className="pb-2">
            <div className="flex items-center space-x-2">
              <FileQuestion className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Quiz</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">0</div>
            <p className="text-sm text-muted-foreground">Quiz diselesaikan</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Materi Terbaru</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {recentMaterials.length > 0 ? (
            recentMaterials.map((materi) => (
              <div
                key={materi.id}
                className="flex items-center p-3 rounded-lg border hover:bg-accent cursor-pointer"
                onClick={() => router.push(`/materi/${materi.id}`)}
              >
                <BookOpen className="h-5 w-5 mr-3 text-primary" />
                <div>
                  <h3 className="font-medium">{materi.title}</h3>
                  <p className="text-sm text-muted-foreground truncate">{materi.content.substring(0, 60)}...</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-muted-foreground py-4">Belum ada materi tersedia</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
