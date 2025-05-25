"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Save } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function TambahQuizPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [question, setQuestion] = useState("")
  const [type, setType] = useState<"audio" | "gambar" | "video" | "teks">("teks")
  const [mediaUrl, setMediaUrl] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    } else if (!loading && user && user.role !== "admin" && user.role !== "dosen") {
      router.push("/quiz")
    }
  }, [user, loading, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const { error } = await supabase.from("quizzes").insert([
        {
          question,
          type,
          media_url: mediaUrl || null,
          created_by: user?.id,
        },
      ])

      if (error) {
        throw error
      }

      router.push("/quiz")
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan saat menyimpan quiz")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading || !user || (user.role !== "admin" && user.role !== "dosen")) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="container px-4 py-6 space-y-6">
      <div className="flex items-center">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Kembali
        </Button>
        <h1 className="text-2xl font-bold ml-4">Tambah Quiz Baru</h1>
      </div>

      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Informasi Quiz</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="question">Pertanyaan</Label>
              <Textarea
                id="question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                rows={4}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Tipe Quiz</Label>
              <Select value={type} onValueChange={(value: "audio" | "gambar" | "video" | "teks") => setType(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih tipe quiz" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="teks">Teks</SelectItem>
                  <SelectItem value="gambar">Gambar</SelectItem>
                  <SelectItem value="audio">Audio</SelectItem>
                  <SelectItem value="video">Video</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {type !== "teks" && (
              <div className="space-y-2">
                <Label htmlFor="mediaUrl">URL Media</Label>
                <Input
                  id="mediaUrl"
                  value={mediaUrl}
                  onChange={(e) => setMediaUrl(e.target.value)}
                  placeholder={`URL ${type}...`}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  {type === "gambar" && "Masukkan URL gambar (JPG, PNG, GIF)"}
                  {type === "audio" && "Masukkan URL audio (MP3, WAV)"}
                  {type === "video" && "Masukkan URL video (MP4, WebM)"}
                </p>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-background mr-2"></div>
                  Menyimpan...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" /> Simpan Quiz
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
