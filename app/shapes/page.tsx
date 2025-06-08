import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  ArrowLeft,
  CuboidIcon as Cube,
  Cylinder,
  Hexagon,
  Octagon,
  Search,
  SpaceIcon as Sphere,
  Triangle,
} from "lucide-react"

export default function ShapesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F38C0B]">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-[#01484C] p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <Link href="/">
            <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/10">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Kembali</span>
            </Button>
          </Link>
          <h1 className="text-xl font-bold text-white">Materi Ruang</h1>
        </div>
        <div className="mt-3 relative">
          <Input placeholder="Cari bangun ruang..." className="pl-10 rounded-full bg-white border-0" />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#01484C]/60" />
          <p className="text-[#E9E9E7] mt-2">Pelajari berbagai materi ruang dan sifat-sifatnya</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4">
        <div className="grid grid-cols-2 gap-4">
          <Link href="/shapes/cube">
            <Card className="h-full transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:border-t-4 hover:border-t-[#D24F01] bg-white shadow-lg">
              <CardContent className="p-4 flex flex-col items-center justify-center">
                <div className="h-16 w-16 rounded-full bg-[#129392]/20 flex items-center justify-center mb-3">
                  <Cube className="h-8 w-8 text-[#129392]" />
                </div>
                <h3 className="font-medium text-center text-[#01484C]">Kubus</h3>
              </CardContent>
            </Card>
          </Link>
          <Link href="/shapes/cuboid">
            <Card className="h-full transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:border-t-4 hover:border-t-[#129392] bg-white shadow-lg">
              <CardContent className="p-4 flex flex-col items-center justify-center">
                <div className="h-16 w-16 rounded-full bg-[#01484C]/20 flex items-center justify-center mb-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-[#01484C]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                    />
                  </svg>
                </div>
                <h3 className="font-medium text-center text-[#01484C]">Balok</h3>
              </CardContent>
            </Card>
          </Link>
          <Link href="/shapes/cylinder">
            <Card className="h-full transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:border-t-4 hover:border-t-[#D24F01] bg-white shadow-lg">
              <CardContent className="p-4 flex flex-col items-center justify-center">
                <div className="h-16 w-16 rounded-full bg-[#129392]/20 flex items-center justify-center mb-3">
                  <Cylinder className="h-8 w-8 text-[#129392]" />
                </div>
                <h3 className="font-medium text-center text-[#01484C]">Tabung</h3>
              </CardContent>
            </Card>
          </Link>
          <Link href="/shapes/sphere">
            <Card className="h-full transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:border-t-4 hover:border-t-[#129392] bg-white shadow-lg">
              <CardContent className="p-4 flex flex-col items-center justify-center">
                <div className="h-16 w-16 rounded-full bg-[#01484C]/20 flex items-center justify-center mb-3">
                  <Sphere className="h-8 w-8 text-[#01484C]" />
                </div>
                <h3 className="font-medium text-center text-[#01484C]">Bola</h3>
              </CardContent>
            </Card>
          </Link>
          <Link href="/shapes/cone">
            <Card className="h-full transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:border-t-4 hover:border-t-[#D24F01] bg-white shadow-lg">
              <CardContent className="p-4 flex flex-col items-center justify-center">
                <div className="h-16 w-16 rounded-full bg-[#129392]/20 flex items-center justify-center mb-3">
                  <Triangle className="h-8 w-8 text-[#129392]" />
                </div>
                <h3 className="font-medium text-center text-[#01484C]">Kerucut</h3>
              </CardContent>
            </Card>
          </Link>
          <Link href="/shapes/prism">
            <Card className="h-full transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:border-t-4 hover:border-t-[#129392] bg-white shadow-lg">
              <CardContent className="p-4 flex flex-col items-center justify-center">
                <div className="h-16 w-16 rounded-full bg-[#01484C]/20 flex items-center justify-center mb-3">
                  <Hexagon className="h-8 w-8 text-[#01484C]" />
                </div>
                <h3 className="font-medium text-center text-[#01484C]">Prisma</h3>
              </CardContent>
            </Card>
          </Link>
          <Link href="/shapes/pyramid">
            <Card className="h-full transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:border-t-4 hover:border-t-[#D24F01] bg-white shadow-lg">
              <CardContent className="p-4 flex flex-col items-center justify-center">
                <div className="h-16 w-16 rounded-full bg-[#129392]/20 flex items-center justify-center mb-3">
                  <Octagon className="h-8 w-8 text-[#129392]" />
                </div>
                <h3 className="font-medium text-center text-[#01484C]">Limas</h3>
              </CardContent>
            </Card>
          </Link>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="sticky bottom-0 bg-[#01484C] border-t border-[#129392]/30 p-2">
        <div className="flex items-center justify-around">
          <Link href="/" className="flex flex-col items-center p-2 text-[#E9E9E7]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <span className="text-xs">Beranda</span>
          </Link>
          <Link href="/shapes" className="flex flex-col items-center p-2 text-[#F38C0B]">
            <Cube className="h-6 w-6" />
            <span className="text-xs">Bangun</span>
          </Link>
          <Link href="/exercises" className="flex flex-col items-center p-2 text-[#E9E9E7]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <span className="text-xs">Latihan</span>
          </Link>
          <Link href="/profile" className="flex flex-col items-center p-2 text-[#E9E9E7]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <span className="text-xs">Profil</span>
          </Link>
        </div>
      </nav>
    </div>
  )
}
