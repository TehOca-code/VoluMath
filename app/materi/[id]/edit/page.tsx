"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import { Editor } from "@tiptap/react"
import { useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { FormControl, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

export default function MateriEditPage({ params }: { params: { id: string } }) {
  const { id } = params
  const { user, loading } = useAuth()
  const router = useRouter()
  const [material, setMaterial] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [mediaUrl, setMediaUrl] = useState("")

  const editor = useEditor({
    extensions: [StarterKit],
    content: content,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML())
    },
  })

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  useEffect(() => {
    const fetchMaterial = async () => {
      try {
        const { data } = await supabase.from("materi").select("*").eq("id", id).single()

        if (data) {
          setMaterial(data)
          setTitle(data.title)
          setContent(data.content)
          setMediaUrl(data.media_url || "")
        } else {
          router.push("/materi")
        }
      } catch (error) {
        console.error("Error fetching material:", error)
        router.push("/materi")
      } finally {
        setIsLoading(false)
      }
    }

    fetchMaterial()
  }, [id, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await supabase.from("materi").update({ title, content, media_url: mediaUrl }).eq("id", id)
      router.push(`/materi/${id}`)
    } catch (error) {
      console.error("Error updating material:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (loading || !user || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!material) {
    return (
      <div className="container px-4 py-6">
        <div className="text-center py-12">
          <h3 className="mt-4 text-lg font-medium">Materi tidak ditemukan</h3>
          <Button variant="link" onClick={() => router.push("/materi")}>
            Kembali ke daftar materi
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container px-4 py-6 space-y-6">
      <Button variant="ghost" onClick={() => router.back()}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Kembali
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Edit Materi</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-2">
              <FormLabel htmlFor="title">Judul</FormLabel>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Judul materi"
                required
              />
            </div>

            <div className="grid gap-2">
              <FormLabel htmlFor="content">Konten</FormLabel>
              {editor && (
                <EditorContent editor={editor} />
              )}
            </div>

            <div className="grid gap-2">
              <FormLabel htmlFor="media_url">Media URL</FormLabel>
              <Input
                id="media_url"
                type="url"
                value={mediaUrl}
                onChange={(e) => setMediaUrl(e.target.value)}
                placeholder="URL media (gambar, video, audio)"
              />
            </div>

            <Button type="submit">Simpan Perubahan</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

import { EditorContent } from "@tiptap/react"