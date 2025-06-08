"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, BookOpen, Calculator, FileText, SpaceIcon as Sphere, Video } from "lucide-react"
import { YouTubeEmbed } from "@/components/youtube-embed"
import { PDFDownload } from "@/components/pdf-download"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@/components/ui/breadcrumb"

export default function SphereDetailPage() {
  const [radius, setRadius] = useState("7")

  const r = Number.parseFloat(radius) || 0
  const pi = Math.PI

  const volume = (4 / 3) * pi * r ** 3
  const surfaceArea = 4 * pi * r ** 2
  const diameter = 2 * r
  const circumference = 2 * pi * r

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
          <h1 className="text-xl font-bold">Bola</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4">
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Beranda</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href="/shapes">Materi Ruang</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>Bola</BreadcrumbItem>
        </Breadcrumb>

        <div className="flex justify-center mb-6">
          <div className="relative h-48 w-48">
            <Image
              src="/placeholder.svg?height=192&width=192"
              alt="Bola"
              width={192}
              height={192}
              className="object-contain"
            />
            <div className="absolute inset-0 flex items-center justify-center text-red-800 font-bold">Bola</div>
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
                <h2 className="text-lg font-semibold">Apa itu Bola?</h2>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 mb-4">
                      Bola adalah bangun ruang tiga dimensi yang dibatasi oleh satu bidang lengkung yang semua titik
                      pada bidang tersebut berjarak sama dari titik pusat. Bola merupakan bentuk tiga dimensi dari
                      lingkaran.
                    </p>

                    <div className="relative h-40 w-full md:hidden mb-4">
                      <Image
                        src="/placeholder.svg?height=160&width=320"
                        alt="Bagian-bagian Bola"
                        width={320}
                        height={160}
                        className="object-contain"
                      />
                    </div>

                    <h3 className="font-medium mt-4">Sifat-sifat Bola:</h3>
                    <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                      <li>Memiliki 1 sisi lengkung tertutup</li>
                      <li>Tidak memiliki rusuk</li>
                      <li>Tidak memiliki titik sudut</li>
                      <li>Memiliki tak hingga simetri putar dan tak hingga simetri lipat</li>
                      <li>Jika diiris, penampangnya berbentuk lingkaran</li>
                      <li>Semua titik pada permukaan bola berjarak sama dari titik pusat</li>
                    </ul>
                  </div>
                  <div className="hidden md:block flex-1">
                    <div className="relative h-full w-full">
                      <Image
                        src="/placeholder.svg?height=300&width=300"
                        alt="Bagian-bagian Bola"
                        width={300}
                        height={300}
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>

                <h3 className="font-medium mt-4">Bagian-bagian Bola:</h3>
                <div className="space-y-2 text-sm text-gray-700">
                  <p>
                    <strong>Pusat Bola:</strong> Titik yang berjarak sama ke semua titik pada permukaan bola.
                  </p>
                  <p>
                    <strong>Jari-jari (r):</strong> Jarak dari pusat bola ke permukaan bola.
                  </p>
                  <p>
                    <strong>Diameter (d):</strong> Garis lurus yang melalui pusat bola dan menghubungkan dua titik pada
                    permukaan bola. Diameter = 2 × jari-jari.
                  </p>
                  <p>
                    <strong>Tali Busur:</strong> Garis lurus yang menghubungkan dua titik pada permukaan bola.
                  </p>
                  <p>
                    <strong>Lingkaran Besar:</strong> Lingkaran yang terbentuk dari irisan bola oleh bidang yang melalui
                    pusat bola.
                  </p>
                  <p>
                    <strong>Lingkaran Kecil:</strong> Lingkaran yang terbentuk dari irisan bola oleh bidang yang tidak
                    melalui pusat bola.
                  </p>
                </div>

                <h3 className="font-medium mt-4">Contoh Bola dalam Kehidupan Sehari-hari:</h3>
                <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                  <li>Bola sepak</li>
                  <li>Bola basket</li>
                  <li>Bola tenis</li>
                  <li>Bola biliar</li>
                  <li>Bola lampu</li>
                  <li>Planet dan benda langit</li>
                </ul>

                <div className="mt-4">
                  <PDFDownload url="#" title="Materi Lengkap Bola" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rumus">
            <Card>
              <CardContent className="p-4 space-y-4">
                <h2 className="text-lg font-semibold">Rumus Bola</h2>

                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <h3 className="font-medium">Volume Bola</h3>
                    <div className="mt-1 text-center font-mono text-lg">
                      V = (4/3) × π × r<sup>3</sup>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">Dimana π = 3,14 atau 22/7, r = jari-jari</p>
                  </div>

                  <div className="p-3 bg-green-50 rounded-lg">
                    <h3 className="font-medium">Luas Permukaan Bola</h3>
                    <div className="mt-1 text-center font-mono text-lg">
                      LP = 4 × π × r<sup>2</sup>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">Dimana π = 3,14 atau 22/7, r = jari-jari</p>
                  </div>

                  <div className="p-3 bg-purple-50 rounded-lg">
                    <h3 className="font-medium">Diameter Bola</h3>
                    <div className="mt-1 text-center font-mono text-lg">d = 2 × r</div>
                    <p className="text-xs text-gray-600 mt-1">Dimana r = jari-jari</p>
                  </div>

                  <div className="p-3 bg-yellow-50 rounded-lg">
                    <h3 className="font-medium">Keliling Lingkaran Besar</h3>
                    <div className="mt-1 text-center font-mono text-lg">K = 2 × π × r</div>
                    <p className="text-xs text-gray-600 mt-1">Dimana π = 3,14 atau 22/7, r = jari-jari</p>
                  </div>

                  <div className="p-3 bg-red-50 rounded-lg">
                    <h3 className="font-medium">Luas Lingkaran Besar</h3>
                    <div className="mt-1 text-center font-mono text-lg">
                      L = π × r<sup>2</sup>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">Dimana π = 3,14 atau 22/7, r = jari-jari</p>
                  </div>
                </div>

                <h3 className="font-medium mt-4">Contoh Soal:</h3>
                <div className="space-y-4">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="font-medium">Soal 1:</p>
                    <p className="text-sm text-gray-700 mt-1">
                      Sebuah bola memiliki jari-jari 7 cm. Hitunglah volume bola tersebut! (π = 22/7)
                    </p>
                    <div className="mt-2 p-2 bg-white rounded border">
                      <p className="text-sm font-medium">Penyelesaian:</p>
                      <p className="text-sm">
                        Volume bola = (4/3) × π × r<sup>3</sup>
                        <br />= (4/3) × 22/7 × 7<sup>3</sup>
                        <br />= (4/3) × 22/7 × 343
                        <br />= (4/3) × 22 × 49
                        <br />= 1.437,33 cm<sup>3</sup>
                      </p>
                    </div>
                  </div>

                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="font-medium">Soal 2:</p>
                    <p className="text-sm text-gray-700 mt-1">
                      Sebuah bola memiliki jari-jari 14 cm. Hitunglah luas permukaan bola tersebut! (π = 22/7)
                    </p>
                    <div className="mt-2 p-2 bg-white rounded border">
                      <p className="text-sm font-medium">Penyelesaian:</p>
                      <p className="text-sm">
                        Luas permukaan bola = 4 × π × r<sup>2</sup>
                        <br />= 4 × 22/7 × 14<sup>2</sup>
                        <br />= 4 × 22/7 × 196
                        <br />= 4 × 22 × 28
                        <br />= 2.464 cm<sup>2</sup>
                      </p>
                    </div>
                  </div>

                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="font-medium">Soal 3:</p>
                    <p className="text-sm text-gray-700 mt-1">
                      Sebuah bola memiliki luas permukaan 616 cm<sup>2</sup>. Hitunglah jari-jari dan volume bola
                      tersebut! (π = 22/7)
                    </p>
                    <div className="mt-2 p-2 bg-white rounded border">
                      <p className="text-sm font-medium">Penyelesaian:</p>
                      <p className="text-sm">
                        Luas permukaan bola = 4 × π × r<sup>2</sup>
                        <br />
                        616 = 4 × 22/7 × r<sup>2</sup>
                        <br />r<sup>2</sup> = 616 × 7 / (4 × 22)
                        <br />r<sup>2</sup> = 616 × 7 / 88
                        <br />r<sup>2</sup> = 49
                        <br />r = 7 cm
                        <br />
                        <br />
                        Volume bola = (4/3) × π × r<sup>3</sup>
                        <br />= (4/3) × 22/7 × 7<sup>3</sup>
                        <br />= (4/3) × 22/7 × 343
                        <br />= (4/3) × 22 × 49
                        <br />= 1.437,33 cm<sup>3</sup>
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
                <h2 className="text-lg font-semibold">Kalkulator Bola</h2>

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

                  <div className="grid grid-cols-1 gap-3 mt-4">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <h3 className="font-medium">Volume Bola</h3>
                      <div className="mt-1 text-center font-mono text-lg">
                        {volume.toFixed(2)} cm<sup>3</sup>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">
                        V = (4/3) × π × {r}
                        <sup>3</sup> = {volume.toFixed(2)} cm<sup>3</sup>
                      </p>
                    </div>

                    <div className="p-3 bg-green-50 rounded-lg">
                      <h3 className="font-medium">Luas Permukaan Bola</h3>
                      <div className="mt-1 text-center font-mono text-lg">
                        {surfaceArea.toFixed(2)} cm<sup>2</sup>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">
                        LP = 4 × π × {r}
                        <sup>2</sup> = {surfaceArea.toFixed(2)} cm<sup>2</sup>
                      </p>
                    </div>

                    <div className="p-3 bg-purple-50 rounded-lg">
                      <h3 className="font-medium">Diameter Bola</h3>
                      <div className="mt-1 text-center font-mono text-lg">{diameter.toFixed(2)} cm</div>
                      <p className="text-xs text-gray-600 mt-1">
                        d = 2 × {r} = {diameter.toFixed(2)} cm
                      </p>
                    </div>

                    <div className="p-3 bg-yellow-50 rounded-lg">
                      <h3 className="font-medium">Keliling Lingkaran Besar</h3>
                      <div className="mt-1 text-center font-mono text-lg">{circumference.toFixed(2)} cm</div>
                      <p className="text-xs text-gray-600 mt-1">
                        K = 2 × π × {r} = {circumference.toFixed(2)} cm
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
                <h2 className="text-lg font-semibold">Video Pembelajaran Bola</h2>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Penjelasan Bola dan Sifat-sifatnya</h3>
                    <YouTubeEmbed videoId="XNmQr6hEoGw" title="Penjelasan Bola dan Sifat-sifatnya" />
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Cara Menghitung Volume dan Luas Permukaan Bola</h3>
                    <YouTubeEmbed videoId="ZfzLMpqIS7g" title="Cara Menghitung Volume dan Luas Permukaan Bola" />
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Contoh Soal Bola</h3>
                    <YouTubeEmbed videoId="Rl9LnUVDQKY" title="Contoh Soal Bola" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-6">
          <Link href="/exercises">
            <Button className="w-full" size="lg">
              Latihan Soal Bola
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
            <Sphere className="h-6 w-6" />
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
