"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BookOpen, Plus, Search } from "lucide-react"

export default function MateriPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [materials, setMaterials] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const { data } = await supabase.from("materi").select("*").order("title", { ascending: true })

        setMaterials(data || [])
      } catch (error) {
        console.error("Error fetching materials:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMaterials()
  }, [])

  const filteredMaterials = materials.filter(
    (material) =>
      material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.content.toLowerCase().includes(searchQuery.toLowerCase()),
  )

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
        <h1 className="text-2xl font-bold">Materi Pembelajaran</h1>
        {(user.role === "admin" || user.role === "dosen") && (
          <Button onClick={() => router.push("/materi/tambah")}>
            <Plus className="mr-2 h-4 w-4" /> Tambah Materi
          </Button>
        )}
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Cari materi..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : filteredMaterials.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredMaterials.map((material) => (
            <Card key={material.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle>{material.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-3">{material.content}</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => router.push(`/materi/${material.id}`)}>
                  <BookOpen className="mr-2 h-4 w-4" /> Baca Materi
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <BookOpen className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium">Tidak ada materi ditemukan</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            {searchQuery ? "Coba kata kunci lain" : "Belum ada materi yang tersedia"}
          </p>
        </div>
      )}
    </div>
  )
}
