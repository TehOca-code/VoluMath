"use client"

import React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Edit, Trash2 } from "lucide-react"
import { Viewer3D } from "@/components/3d-viewer"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export default function MateriDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = React.use(params)
  const { user, loading } = useAuth()
  const router = useRouter()
  const [material, setMaterial] = useState<any>(null)
  const [creator, setCreator] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  useEffect(() => {
    const fetchMaterial = async () => {
      try {
        const { data } = await supabase.from("materi").select("*").eq("id", unwrappedParams.id).single()

        if (data) {
          setMaterial(data)

          // Fetch creator info
          if (data.created_by) {
            const { data: userData } = await supabase
              .from("users")
              .select("name, role")
              .eq("id", data.created_by)
              .single()

            setCreator(userData)
          }
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
  }, [unwrappedParams.id, router])

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      await supabase.from("materi").delete().eq("id", unwrappedParams.id)

      router.push("/materi")
    } catch (error) {
      console.error("Error deleting material:", error)
      setIsDeleting(false)
      setDeleteDialogOpen(false)
    }
  }

  const canEdit =
    user && material && (user.role === "admin" || (user.role === "dosen" && user.id === material.created_by))

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
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Kembali
        </Button>

        {canEdit && (
          <div className="flex space-x-2">
            <Button variant="outline" onClick={() => router.push(`/materi/${unwrappedParams.id}/edit`)}>
              <Edit className="mr-2 h-4 w-4" /> Edit
            </Button>
            <Button variant="destructive" onClick={() => setDeleteDialogOpen(true)}>
              <Trash2 className="mr-2 h-4 w-4" /> Hapus
            </Button>
          </div>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{material.title}</CardTitle>
          {creator && (
            <p className="text-sm text-muted-foreground">
              Dibuat oleh: {creator.name} ({creator.role})
            </p>
          )}
        </CardHeader>
        <CardContent className="space-y-6">
          {/* <div className="border rounded-md overflow-hidden">
            <Viewer3D />
          </div> */}

          <div className="prose max-w-none dark:prose-invert">
            {material.content.split("\n").map((paragraph: string, idx: number) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          {material.media_url && (
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-2">Media Tambahan</h3>
              {material.media_url.endsWith(".mp4") || material.media_url.endsWith(".webm") ? (
                <video src={material.media_url} controls className="w-full rounded-md" />
              ) : material.media_url.endsWith(".mp3") || material.media_url.endsWith(".wav") ? (
                <audio src={material.media_url} controls className="w-full" />
              ) : material.media_url.includes("youtube.com") || material.media_url.includes("youtu.be") ? (
                <iframe
                  src={`https://www.youtube.com/embed/${getYoutubeVideoId(material.media_url)}`}
                  className="w-full rounded-md"
                  style={{ height: '400px' }}
                  allowFullScreen
                  title="Media Tambahan"
                />
              ) : material.media_url.startsWith("http") ? (
                <iframe
                  src={material.media_url}
                  className="w-full rounded-md"
                  style={{ height: '400px' }} // Sesuaikan tinggi sesuai kebutuhan
                  allowFullScreen
                  title="Media Tambahan"
                />
              ) : (
                <img
                  src={material.media_url || "/placeholder.svg"}
                  alt={material.title}
                  className="w-full rounded-md"
                />
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {user.role === "mahasiswa" && (
        <Button onClick={() => alert('Fitur ini belum tersedia')}>Selesai Mempelajari Materi</Button>
      )}

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Materi</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin ingin menghapus materi ini? Tindakan ini tidak dapat dibatalkan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? "Menghapus..." : "Hapus"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

function getYoutubeVideoId(url: string) {
  const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);

  return (match && match[2].length === 11)
    ? match[2]
    : null;
}
