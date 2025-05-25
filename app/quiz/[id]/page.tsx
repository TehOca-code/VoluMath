"use client"

import { Label } from "@/components/ui/label"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Check, FileQuestion, X } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Viewer3D } from "@/components/3d-viewer"

export default function QuizDetailPage({ params }: { params: { id: string } }) {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [quiz, setQuiz] = useState<any>(null)
  const [answer, setAnswer] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [previousAnswer, setPreviousAnswer] = useState<any>(null)

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const { data } = await supabase.from("quizzes").select("*").eq("id", params.id).single()

        if (data) {
          setQuiz(data)

          // Check if user has already answered this quiz
          if (user) {
            const { data: answerData } = await supabase
              .from("quiz_answers")
              .select("*")
              .eq("quiz_id", params.id)
              .eq("student_id", user.id)
              .single()

            if (answerData) {
              setPreviousAnswer(answerData)
              setAnswer(answerData.answer || "")
              setSubmitted(true)
            }
          }
        } else {
          router.push("/quiz")
        }
      } catch (error) {
        console.error("Error fetching quiz:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchQuiz()
  }, [params.id, router, user])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      // For simplicity, we'll just mark the answer as correct if it contains certain keywords
      // In a real app, you'd have a more sophisticated answer checking mechanism
      const isCorrect =
        answer.toLowerCase().includes("benar") ||
        answer.toLowerCase().includes("correct") ||
        answer.toLowerCase().includes("ya")

      const { error } = await supabase.from("quiz_answers").insert([
        {
          quiz_id: params.id,
          student_id: user?.id,
          answer,
          is_correct: isCorrect,
        },
      ])

      if (error) {
        throw error
      }

      // Create a notification for the user
      await supabase.from("notifications").insert([
        {
          user_id: user?.id,
          message: `Anda telah menyelesaikan quiz "${quiz.question.substring(0, 30)}..."`,
          is_read: false,
        },
      ])

      setSubmitted(true)
      setPreviousAnswer({
        answer,
        is_correct: isCorrect,
      })
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan saat menyimpan jawaban")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading || !user || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!quiz) {
    return (
      <div className="container px-4 py-6">
        <div className="text-center py-12">
          <h3 className="mt-4 text-lg font-medium">Quiz tidak ditemukan</h3>
          <Button variant="link" onClick={() => router.push("/quiz")}>
            Kembali ke daftar quiz
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container px-4 py-6 space-y-6">
      <div className="flex items-center">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Kembali
        </Button>
        <h1 className="text-2xl font-bold ml-4">Quiz</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileQuestion className="h-5 w-5" />
            Pertanyaan
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {submitted && (
            <Alert
              className={
                previousAnswer?.is_correct
                  ? "bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-300"
                  : "bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-300"
              }
            >
              <div className="flex items-center">
                {previousAnswer?.is_correct ? <Check className="h-4 w-4 mr-2" /> : <X className="h-4 w-4 mr-2" />}
                <AlertDescription>
                  {previousAnswer?.is_correct ? "Jawaban Anda benar!" : "Jawaban Anda kurang tepat. Silakan coba lagi."}
                </AlertDescription>
              </div>
            </Alert>
          )}

          <p className="text-lg">{quiz.question}</p>

          {quiz.media_url && (
            <div className="mt-4">
              {quiz.type === "gambar" ? (
                <img
                  src={quiz.media_url || "/placeholder.svg"}
                  alt="Quiz media"
                  className="w-full max-h-96 object-contain rounded-md"
                />
              ) : quiz.type === "video" ? (
                <video src={quiz.media_url} controls className="w-full rounded-md" />
              ) : quiz.type === "audio" ? (
                <audio src={quiz.media_url} controls className="w-full" />
              ) : null}
            </div>
          )}

          <div className="border rounded-md overflow-hidden mt-4">
            <Viewer3D />
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-2 mt-6">
              <Label htmlFor="answer">Jawaban Anda</Label>
              <Textarea
                id="answer"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                rows={4}
                required
                disabled={submitted}
                placeholder="Tulis jawaban Anda di sini..."
              />
            </div>

            {!submitted && (
              <Button type="submit" className="w-full mt-4" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-background mr-2"></div>
                    Mengirim...
                  </>
                ) : (
                  "Kirim Jawaban"
                )}
              </Button>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
