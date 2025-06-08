"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, BookOpen, Calculator, Cylinder, FileText, Video } from "lucide-react"
import { YouTubeEmbed } from "@/components/youtube-embed"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@/components/ui/breadcrumb"

export default function CylinderDetailPage() {
  const [radius, setRadius] = useState("7")
  const [height, setHeight] = useState("10")

  const r = Number.parseFloat(radius) || 0
  const h = Number.parseFloat(height) || 0
  const pi = Math.PI

  const volume = pi * r * r * h
  const surfaceArea = 2 * pi * r * (r + h)
  const lateralArea = 2 * pi * r * h
  const baseArea = pi * r * r

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <Link href="/shapes">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Kembali</span>
            </Button>
          </Link>
          <h1 className="text-xl font-bold">Tabung</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4">
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink href="/shapes">Materi Ruang</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        <div className="flex justify-center mb-6">
          <div className="relative h-48 w-48">
            <Image
              src="/placeholder.svg?height=192&width=192"
              alt="Tabung"
              width={192}
              height={192}
              className="object-contain"
            />
            <div className="absolute inset-0 flex items-center justify-center text-green-800 font-bold">Tabung</div>
          </div>
        </div>

        <Tabs defaultValue="penjelasan" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-4">
            <TabsTrigger value="penjelasan" className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              <span>Penjelasan</span>
            </TabsTrigger>
            <TabsTrigger value="rumus" className="flex items-center gap-1">
              <FileText className="h-4 w-4" />
              <span>Rumus</span>
            </TabsTrigger>
            <TabsTrigger value="kalkulator" className="flex items-center gap-1">
              <Calculator className="h-4 w-4" />
              <span>Kalkulator</span>
            </TabsTrigger>
            <TabsTrigger value="video" className="flex items-center gap-1">
              <Video className="h-4 w-4" />
              <span>Video</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="penjelasan">
            <Card>
              <CardContent className="p-4 space-y-4">
                <h2 className="text-lg font-semibold">Apa itu Tabung?</h2>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 mb-4">
                      Tabung (silinder) adalah bangun ruang tiga dimensi yang dibatasi oleh dua bidang berbentuk
                      lingkaran yang sejajar dan kongruen sebagai alas dan tutup, serta sebuah bidang lengkung yang
                      mengelilinginya. Tabung merupakan bangun ruang yang memiliki 3 sisi dan 2 rusuk.
                    </p>

                    <div className="relative h-40 w-full md:hidden mb-4">
                      <Image
                        src="/placeholder.svg?height=160&width=320"
                        alt="Bagian-bagian Tabung"
                        width={320}
                        height={160}
                        className="object-contain"
                      />
                    </div>

                    <h3 className="font-medium mt-4">Sifat-sifat Tabung:</h3>
                    <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                      <li>
                        Memiliki 3 sisi: 2 sisi berbentuk lingkaran dan 1 sisi berbentuk persegi panjang yang melingkar
                        (selimut)
                      </li>
                      <li>Memiliki 2 rusuk berbentuk lingkaran</li>
                      <li>Tidak memiliki titik sudut</li>
                      <li>Memiliki 1 simetri putar dan tak hingga simetri lipat</li>
                      <li>Jika diiris tegak lurus dengan alas, penampangnya berbentuk persegi panjang</li>
                      <li>Jika diiris sejajar dengan alas, penampangnya berbentuk lingkaran</li>
                    </ul>
                  </div>
                  <div className="hidden md:block flex-1">
                    <div className="relative h-full w-full">
                      <Image
                        src="/placeholder.svg?height=300&width=300"
                        alt="Bagian-bagian Tabung"
                        width={300}
                        height={300}
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>

                <h3 className="font-medium mt-4">Bagian-bagian Tabung:</h3>
                <div className="space-y-2 text-sm text-gray-700">
                  <p>
                    <strong>Alas dan Tutup:</strong> Berbentuk lingkaran dengan jari-jari r.
                  </p>
                  <p>
                    <strong>Selimut:</strong> Bidang lengkung yang mengelilingi tabung, jika dibuka akan berbentuk
                    persegi panjang.
                  </p>
                  <p>
                    <strong>Jari-jari (r):</strong> Jarak dari pusat lingkaran ke tepi lingkaran pada alas atau tutup
                    tabung.
                  </p>
                  <p>
                    <strong>Tinggi (t):</strong> Jarak antara alas dan tutup tabung.
                  </p>
                  <p>
                    <strong>Diameter (d):</strong> Garis lurus yang melalui pusat lingkaran dan menghubungkan dua titik
                    pada lingkaran. Diameter = 2 × jari-jari.
                  </p>
                  <p>
                    <strong>Sumbu:</strong> Garis yang menghubungkan pusat alas dan pusat tutup tabung.
                  </p>
                </div>

                <h3 className="font-medium mt-4">Contoh Tabung dalam Kehidupan Sehari-hari:</h3>
                <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                  <li>Kaleng minuman</li>
                  <li>Drum</li>
                  <li>Pipa air</li>
                  <li>Tabung gas</li>
                  <li>Gelas</li>
                  <li>Termos</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rumus">
            <Card>
              <CardContent className="p-4 space-y-4">
                <h2 className="text-lg font-semibold">Rumus Tabung</h2>

                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <h3 className="font-medium">Volume Tabung</h3>
                    <div className="mt-1 text-center font-mono text-lg">V = π × r² × t</div>
                    <p className="text-xs text-gray-600 mt-1">Dimana π = 3,14 atau 22/7, r = jari-jari, t = tinggi</p>
                  </div>

                  <div className="p-3 bg-green-50 rounded-lg">
                    <h3 className="font-medium">Luas Permukaan Tabung</h3>
                    <div className="mt-1 text-center font-mono text-lg">LP = 2 × π × r × (r + t)</div>
                    <p className="text-xs text-gray-600 mt-1">Dimana π = 3,14 atau 22/7, r = jari-jari, t = tinggi</p>
                  </div>

                  <div className="p-3 bg-purple-50 rounded-lg">
                    <h3 className="font-medium">Luas Selimut Tabung</h3>
                    <div className="mt-1 text-center font-mono text-lg">
                      L<sub>selimut</sub> = 2 × π × r × t
                    </div>
                    <p className="text-xs text-gray-600 mt-1">Dimana π = 3,14 atau 22/7, r = jari-jari, t = tinggi</p>
                  </div>

                  <div className="p-3 bg-yellow-50 rounded-lg">
                    <h3 className="font-medium">Luas Alas/Tutup Tabung</h3>
                    <div className="mt-1 text-center font-mono text-lg">
                      L<sub>alas/tutup</sub> = π × r²
                    </div>
                    <p className="text-xs text-gray-600 mt-1">Dimana π = 3,14 atau 22/7, r = jari-jari</p>
                  </div>
                </div>

                <h3 className="font-medium mt-4">Contoh Soal:</h3>
                <div className="space-y-4">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="font-medium">Soal 1:</p>
                    <p className="text-sm text-gray-700 mt-1">
                      Sebuah tabung memiliki jari-jari 7 cm dan tinggi 10 cm. Hitunglah volume tabung tersebut! (π =
                      22/7)
                    </p>
                    <div className="mt-2 p-2 bg-white rounded border">
                      <p className="text-sm font-medium">Penyelesaian:</p>
                      <p className="text-sm">
                        Volume tabung = π × r² × t
                        <br />= 22/7 × 7² × 10
                        <br />= 22/7 × 49 × 10
                        <br />= 22 × 7 × 10
                        <br />= 1.540 cm<sup>3</sup>
                      </p>
                    </div>
                  </div>

                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="font-medium">Soal 2:</p>
                    <p className="text-sm text-gray-700 mt-1">
                      Sebuah tabung memiliki jari-jari 14 cm dan tinggi 20 cm. Hitunglah luas permukaan tabung tersebut!
                      (π = 22/7)
                    </p>
                    <div className="mt-2 p-2 bg-white rounded border">
                      <p className="text-sm font-medium">Penyelesaian:</p>
                      <p className="text-sm">
                        Luas permukaan tabung = 2 × π × r × (r + t)
                        <br />= 2 × 22/7 × 14 × (14 + 20)
                        <br />= 2 × 22/7 × 14 × 34
                        <br />= 2 × 22 × 2 × 34
                        <br />= 2.992 cm<sup>2</sup>
                      </p>
                    </div>
                  </div>

                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="font-medium">Soal 3:</p>
                    <p className="text-sm text-gray-700 mt-1">
                      Sebuah tabung memiliki luas alas 154 cm<sup>2</sup> dan tinggi 15 cm. Hitunglah volume tabung
                      tersebut! (π = 22/7)
                    </p>
                    <div className="mt-2 p-2 bg-white rounded border">
                      <p className="text-sm font-medium">Penyelesaian:</p>
                      <p className="text-sm">
                        Luas alas = π × r²
                        <br />
                        154 = 22/7 × r²
                        <br />
                        r² = 154 × 7/22
                        <br />
                        r² = 49
                        <br />r = 7 cm
                        <br />
                        <br />
                        Volume tabung = π × r² × t
                        <br />= 22/7 × 49 × 15
                        <br />= 22 × 7 × 15
                        <br />= 2.310 cm<sup>3</sup>
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="kalkulator">
            <Card>
              <CardContent className="p-4 space-y-4">
                <h2 className="text-lg font-semibold">Kalkulator Tabung</h2>

                <div className="space-y-3">
                  <div className="space-y-2">
                    <label htmlFor="radius" className="text-sm font-medium">
                      Jari-jari (r)
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        id="radius"
                        type="number"
                        value={radius}
                        onChange={(e) => setRadius(e.target.value)}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                      <span className="text-sm">cm</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="height" className="text-sm font-medium">
                      Tinggi (t)
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        id="height"
                        type="number"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                      <span className="text-sm">cm</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3 mt-4">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <h3 className="font-medium">Volume Tabung</h3>
                      <div className="mt-1 text-center font-mono text-lg">
                        {volume.toFixed(2)} cm<sup>3</sup>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">
                        V = π × {r}² × {h} = {volume.toFixed(2)} cm<sup>3</sup>
                      </p>
                    </div>

                    <div className="p-3 bg-green-50 rounded-lg">
                      <h3 className="font-medium">Luas Permukaan Tabung</h3>
                      <div className="mt-1 text-center font-mono text-lg">
                        {surfaceArea.toFixed(2)} cm<sup>2</sup>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">
                        LP = 2 × π × {r} × ({r} + {h}) = {surfaceArea.toFixed(2)} cm<sup>2</sup>
                      </p>
                    </div>

                    <div className="p-3 bg-purple-50 rounded-lg">
                      <h3 className="font-medium">Luas Selimut Tabung</h3>
                      <div className="mt-1 text-center font-mono text-lg">
                        {lateralArea.toFixed(2)} cm<sup>2</sup>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">
                        L<sub>selimut</sub> = 2 × π × {r} × {h} = {lateralArea.toFixed(2)} cm<sup>2</sup>
                      </p>
                    </div>

                    <div className="p-3 bg-yellow-50 rounded-lg">
                      <h3 className="font-medium">Luas Alas/Tutup Tabung</h3>
                      <div className="mt-1 text-center font-mono text-lg">
                        {baseArea.toFixed(2)} cm<sup>2</sup>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">
                        L<sub>alas/tutup</sub> = π × {r}² = {baseArea.toFixed(2)} cm<sup>2</sup>
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="video">
            <Card>
              <CardContent className="p-4 space-y-4">
                <h2 className="text-lg font-semibold">Video Pembelajaran Tabung</h2>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Penjelasan Tabung dan Sifat-sifatnya</h3>
                    <YouTubeEmbed videoId="XNmQr6hEoGw" title="Penjelasan Tabung dan Sifat-sifatnya" />
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Cara Menghitung Volume dan Luas Permukaan Tabung</h3>
                    <YouTubeEmbed videoId="ZfzLMpqIS7g" title="Cara Menghitung Volume dan Luas Permukaan Tabung" />
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Contoh Soal Tabung</h3>
                    <YouTubeEmbed videoId="Rl9LnUVDQKY" title="Contoh Soal Tabung" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-6">
          <Link href="/exercises">
            <Button className="w-full" size="lg">
              Latihan Soal Tabung
            </Button>
          </Link>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="sticky bottom-0 bg-white border-t border-gray-200 p-2">
        <div className="flex items-center justify-around">
          <Link href="/" className="flex flex-col items-center p-2 text-gray-500">
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
          <Link href="/shapes" className="flex flex-col items-center p-2 text-blue-600">
            <Cylinder className="h-6 w-6" />
            <span className="text-xs">Bangun</span>
          </Link>
          <Link href="/exercises" className="flex flex-col items-center p-2 text-gray-500">
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
          <Link href="/profile" className="flex flex-col items-center p-2 text-gray-500">
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
