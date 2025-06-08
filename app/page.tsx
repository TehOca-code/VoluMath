"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Trophy, User, Home, Shapes, Dumbbell } from "lucide-react"
import { LearningProgress } from "@/components/learning-progress"

export default function HomePage() {
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Test koneksi Supabase saat halaman dimuat
    const testConnection = async () => {
      try {
        // Import supabase secara dinamis untuk menangani error
        const { supabase } = await import("@/lib/supabase")
        await supabase.from("user_profiles").select("count", { count: "exact", head: true })
      } catch (err) {
        console.error("Supabase connection error:", err)
        setError("Koneksi database sedang bermasalah. Beberapa fitur mungkin tidak tersedia.")
      }
    }

    testConnection()
  }, [])

  return (
    <div className="min-h-screen bg-[#F38C0B]">
      {/* Header */}
      <header className="bg-[#01484C] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-white">VoluMath</h1>
              </div>
            </div>
            <nav className="flex space-x-8">
              <Link
                href="/profile"
                className="text-[#E9E9E7] hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Profil
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Error Banner */}
      {error && (
        <div className="bg-white/10 border-l-4 border-white p-4">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-[#01484C]">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Welcome Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-[#01484C] mb-4">Selamat Datang di VoluMath</h1>
            <p className="text-xl text-[#01484C] max-w-2xl mx-auto">
              Platform pembelajaran interaktif untuk memahami materi ruang dengan mudah dan menyenangkan
            </p>
          </div>

          {/* Learning Progress */}
          <div className="mb-12">
            <LearningProgress />
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="hover:shadow-lg hover:border-t-4 hover:border-t-[#D24F01] transition-all duration-300 bg-white shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-[#129392]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shapes className="w-8 h-8 text-[#129392]" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-[#01484C]">Materi Ruang</h3>
                <p className="text-[#01484C] mb-4">
                  Pelajari berbagai bentuk materi ruang dengan penjelasan lengkap dan visual menarik
                </p>
                <Link href="/shapes">
                  <Button className="w-full bg-[#01484C] hover:bg-[#01484C]/90 text-white">Mulai Belajar</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg hover:border-t-4 hover:border-t-[#129392] transition-all duration-300 bg-white shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-[#F38C0B]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Dumbbell className="w-8 h-8 text-[#F38C0B]" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-[#01484C]">Latihan Soal</h3>
                <p className="text-[#01484C] mb-4">
                  Uji pemahaman dengan berbagai soal latihan yang interaktif dan menantang
                </p>
                <Link href="/exercises">
                  <Button className="w-full bg-[#129392] hover:bg-[#129392]/90 text-white">Mulai Latihan</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg hover:border-t-4 hover:border-t-[#D24F01] transition-all duration-300 bg-white shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-[#01484C]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy className="w-8 h-8 text-[#01484C]" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-[#01484C]">Progres Belajar</h3>
                <p className="text-[#01484C] mb-4">
                  Pantau kemajuan belajar dan raih pencapaian dalam perjalanan pembelajaran
                </p>
                <Link href="/profile">
                  <Button className="w-full bg-[#01484C] hover:bg-[#01484C]/90 text-white">Lihat Progres</Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Quick Access */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-[#01484C] mb-6">Akses Cepat</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link
                href="/shapes/cube"
                className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="w-12 h-12 bg-[#129392]/20 rounded-lg flex items-center justify-center mb-2">
                  <BookOpen className="w-6 h-6 text-[#129392]" />
                </div>
                <span className="text-sm font-medium text-[#01484C]">Kubus</span>
              </Link>

              <Link
                href="/shapes/cuboid"
                className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="w-12 h-12 bg-[#129392]/20 rounded-lg flex items-center justify-center mb-2">
                  <BookOpen className="w-6 h-6 text-[#129392]" />
                </div>
                <span className="text-sm font-medium text-[#01484C]">Balok</span>
              </Link>

              <Link
                href="/shapes/cylinder"
                className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="w-12 h-12 bg-[#129392]/20 rounded-lg flex items-center justify-center mb-2">
                  <BookOpen className="w-6 h-6 text-[#129392]" />
                </div>
                <span className="text-sm font-medium text-[#01484C]">Tabung</span>
              </Link>

              <Link
                href="/shapes/sphere"
                className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="w-12 h-12 bg-[#129392]/20 rounded-lg flex items-center justify-center mb-2">
                  <BookOpen className="w-6 h-6 text-[#129392]" />
                </div>
                <span className="text-sm font-medium text-[#01484C]">Bola</span>
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[#01484C] border-t border-[#129392]/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-around py-2">
            <Link href="/" className="flex flex-col items-center py-2 px-3 text-[#F38C0B]">
              <Home className="w-6 h-6" />
              <span className="text-xs mt-1">Beranda</span>
            </Link>
            <Link href="/shapes" className="flex flex-col items-center py-2 px-3 text-[#E9E9E7] hover:text-white">
              <Shapes className="w-6 h-6" />
              <span className="text-xs mt-1">Materi</span>
            </Link>
            <Link href="/exercises" className="flex flex-col items-center py-2 px-3 text-[#E9E9E7] hover:text-white">
              <Dumbbell className="w-6 h-6" />
              <span className="text-xs mt-1">Latihan</span>
            </Link>
            <Link href="/profile" className="flex flex-col items-center py-2 px-3 text-[#E9E9E7] hover:text-white">
              <User className="w-6 h-6" />
              <span className="text-xs mt-1">Profil</span>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  )
}
