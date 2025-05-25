"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FileQuestion, Plus, Search } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function QuizPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [quizzes, setQuizzes] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const { data } = await supabase.from("quizzes").select("*").order("created_at", { ascending: false })

        setQuizzes(data || [])
      } catch (error) {
        console.error("Error fetching quizzes:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchQuizzes()
  }, [])

  const filteredQuizzes = quizzes.filter((quiz) => quiz.question.toLowerCase().includes(searchQuery.toLowerCase()))

  const getQuizTypeLabel = (type: string) => {
    switch (type) {
      case "audio":
        return "Audio"
      case "gambar":
        return "Gambar"
      case "video":
        return "Video"
      case "teks":
        return "Teks"
      default:
        return type
    }
  }

  const getQuizTypeBadgeVariant = (type: string) => {
    switch (type) {
      case "audio":
        return "default"
      case "gambar":
        return "secondary"
      case "video":
        return "destructive"
      case "teks":
        return "outline"
      default:
        return "default"
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
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Quiz</h1>
        {(user.role === "admin" || user.role === "dosen") && (
          <Button onClick={() => router.push("/quiz/tambah")}>
            <Plus className="mr-2 h-4 w-4" /> Tambah Quiz
          </Button>
        )}
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Cari quiz..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : filteredQuizzes.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredQuizzes.map((quiz) => (
            <Card key={quiz.id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{quiz.question.substring(0, 50)}...</CardTitle>
                  <Badge variant={getQuizTypeBadgeVariant(quiz.type)}>{getQuizTypeLabel(quiz.type)}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                {quiz.media_url && (
                  <div className="mb-4">
                    {quiz.type === "gambar" ? (
                      <img
                        src={quiz.media_url || "/placeholder.svg"}
                        alt="Quiz media"
                        className="w-full h-32 object-cover rounded-md"
                      />
                    ) : quiz.type === "video" ? (
                      <div className="relative h-32 bg-muted rounded-md flex items-center justify-center">
                        <FileQuestion className="h-10 w-10 text-muted-foreground" />
                        <span className="absolute bottom-2 right-2 text-xs bg-background/80 px-2 py-1 rounded">
                          Video Quiz
                        </span>
                      </div>
                    ) : quiz.type === "audio" ? (
                      <div className="relative h-32 bg-muted rounded-md flex items-center justify-center">
                        <FileQuestion className="h-10 w-10 text-muted-foreground" />
                        <span className="absolute bottom-2 right-2 text-xs bg-background/80 px-2 py-1 rounded">
                          Audio Quiz
                        </span>
                      </div>
                    ) : null}
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => router.push(`/quiz/${quiz.id}`)}>
                  <FileQuestion className="mr-2 h-4 w-4" /> Kerjakan Quiz
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <FileQuestion className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium">Tidak ada quiz ditemukan</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            {searchQuery ? "Coba kata kunci lain" : "Belum ada quiz yang tersedia"}
          </p>
        </div>
      )}
    </div>
  )
}
