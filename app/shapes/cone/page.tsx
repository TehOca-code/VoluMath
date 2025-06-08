"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, BookOpen, Calculator, FileText, Triangle, Video } from "lucide-react"
import { YouTubeEmbed } from "@/components/youtube-embed"
import { PDFDownload } from "@/components/pdf-download"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@/components/ui/breadcrumb"

export default function ConeDetailPage() {
  const [radius, setRadius] = useState("6")
  const [height, setHeight] = useState("8")

  const r = Number.parseFloat(radius) || 0
  const h = Number.parseFloat(height) || 0
  const pi = Math.PI

  const slantHeight = Math.sqrt(r ** 2 + h ** 2)
  const volume = (1 / 3) * pi * r ** 2 * h
  const surfaceArea = pi * r * (r + slantHeight)
  const lateralArea = pi * r * slantHeight
  const baseArea = pi * r ** 2

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
          <h1 className="text-xl font-bold">Kerucut</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4">
        {/* <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink href="/shapes">Materi Ruang</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb> */}

        <div className="flex justify-center mb-6">
          <div className="relative h-48 w-48">
            <Image
              src="https://png.pngtree.com/png-clipart/20230823/original/pngtree-conoid-diagram-shape-oval-cone-picture-image_8235283.png"
              alt="Kerucut"
              width={192}
              height={192}
              className="object-contain"
            />
            {/* <div className="absolute inset-0 flex items-center justify-center text-yellow-800 font-bold">Kerucut</div> */}
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
                <h2 className="text-lg font-semibold">Apa itu Kerucut?</h2>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 mb-4">
                      Kerucut adalah bangun ruang tiga dimensi yang dibatasi oleh sebuah sisi alas berbentuk lingkaran
                      dan sebuah sisi lengkung yang mengerucut ke satu titik puncak. Kerucut merupakan limas dengan alas
                      berbentuk lingkaran.
                    </p>

                    <div className="relative h-40 w-full md:hidden mb-4">
                      <Image
                        src="https://png.pngtree.com/png-clipart/20230823/original/pngtree-conoid-diagram-shape-oval-cone-picture-image_8235283.png"
                        alt="Bagian-bagian Kerucut"
                        width={320}
                        height={160}
                        className="object-contain"
                      />
                    </div>

                    <h3 className="font-medium mt-4">Sifat-sifat Kerucut:</h3>
                    <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                      <li>Memiliki 2 sisi: 1 sisi berbentuk lingkaran dan 1 sisi lengkung (selimut)</li>
                      <li>Memiliki 1 rusuk berbentuk lingkaran</li>
                      <li>Memiliki 1 titik sudut (puncak)</li>
                      <li>Memiliki 1 simetri putar dan tak hingga simetri lipat</li>
                      <li>Jika diiris tegak lurus dengan alas, penampangnya berbentuk segitiga</li>
                      <li>Jika diiris sejajar dengan alas, penampangnya berbentuk lingkaran</li>
                    </ul>
                  </div>
                  <div className="hidden md:block flex-1">
                    <div className="relative h-full w-full">
                      <Image
                        src="https://png.pngtree.com/png-clipart/20230823/original/pngtree-conoid-diagram-shape-oval-cone-picture-image_8235283.png"
                        alt="Bagian-bagian Kerucut"
                        width={300}
                        height={300}
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>

                <h3 className="font-medium mt-4">Bagian-bagian Kerucut:</h3>
                <div className="space-y-2 text-sm text-gray-700">
                  <p>
                    <strong>Alas:</strong> Berbentuk lingkaran dengan jari-jari r.
                  </p>
                  <p>
                    <strong>Selimut:</strong> Bidang lengkung yang mengelilingi kerucut, jika dibuka akan berbentuk
                    juring lingkaran.
                  </p>
                  <p>
                    <strong>Titik Puncak:</strong> Titik tertinggi pada kerucut.
                  </p>
                  <p>
                    <strong>Jari-jari (r):</strong> Jarak dari pusat lingkaran ke tepi lingkaran pada alas kerucut.
                  </p>
                  <p>
                    <strong>Tinggi (t):</strong> Jarak tegak lurus dari titik puncak ke alas kerucut.
                  </p>
                  <p>
                    <strong>Garis Pelukis (s):</strong> Jarak dari titik puncak ke tepi alas kerucut. Juga disebut
                    sebagai panjang sisi miring atau apotema.
                  </p>
                  <p>
                    <strong>Sumbu:</strong> Garis yang menghubungkan titik puncak dengan pusat alas kerucut.
                  </p>
                </div>

                <h3 className="font-medium mt-4">Contoh Kerucut dalam Kehidupan Sehari-hari:</h3>
                <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                  <li>Topi ulang tahun</li>
                  <li>Corong</li>
                  <li>Es krim cone</li>
                  <li>Traffic cone (kerucut lalu lintas)</li>
                  <li>Atap menara</li>
                </ul>

                <div className="mt-4">
                  <PDFDownload url="#" title="Materi Lengkap Kerucut" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rumus">
            <Card>
              <CardContent className="p-4 space-y-4">
                <h2 className="text-lg font-semibold">Rumus Kerucut</h2>

                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <h3 className="font-medium">Volume Kerucut</h3>
                    <div className="mt-1 text-center font-mono text-lg">
                      V = (1/3) × π × r<sup>2</sup> × t
                    </div>
                    <p className="text-xs text-gray-600 mt-1">Dimana π = 3,14 atau 22/7, r = jari-jari, t = tinggi</p>
                  </div>

                  <div className="p-3 bg-green-50 rounded-lg">
                    <h3 className="font-medium">Luas Permukaan Kerucut</h3>
                    <div className="mt-1 text-center font-mono text-lg">
                      LP = π × r × (r + s) = π × r<sup>2</sup> + π × r × s
                    </div>
                    <p className="text-xs text-gray-600 mt-1">
                      Dimana π = 3,14 atau 22/7, r = jari-jari, s = garis pelukis
                    </p>
                  </div>

                  <div className="p-3 bg-purple-50 rounded-lg">
                    <h3 className="font-medium">Luas Selimut Kerucut</h3>
                    <div className="mt-1 text-center font-mono text-lg">
                      L<sub>selimut</sub> = π × r × s
                    </div>
                    <p className="text-xs text-gray-600 mt-1">
                      Dimana π = 3,14 atau 22/7, r = jari-jari, s = garis pelukis
                    </p>
                  </div>

                  <div className="p-3 bg-yellow-50 rounded-lg">
                    <h3 className="font-medium">Luas Alas Kerucut</h3>
                    <div className="mt-1 text-center font-mono text-lg">
                      L<sub>alas</sub> = π × r<sup>2</sup>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">Dimana π = 3,14 atau 22/7, r = jari-jari</p>
                  </div>

                  <div className="p-3 bg-red-50 rounded-lg">
                    <h3 className="font-medium">Panjang Garis Pelukis</h3>
                    <div className="mt-1 text-center font-mono text-lg">
                      s = √(r<sup>2</sup> + t<sup>2</sup>)
                    </div>
                    <p className="text-xs text-gray-600 mt-1">Dimana r = jari-jari, t = tinggi</p>
                  </div>
                </div>

                <h3 className="font-medium mt-4">Contoh Soal:</h3>
                <div className="space-y-4">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="font-medium">Soal 1:</p>
                    <p className="text-sm text-gray-700 mt-1">
                      Sebuah kerucut memiliki jari-jari 6 cm dan tinggi 8 cm. Hitunglah volume kerucut tersebut! (π =
                      3,14)
                    </p>
                    <div className="mt-2 p-2 bg-white rounded border">
                      <p className="text-sm font-medium">Penyelesaian:</p>
                      <p className="text-sm">
                        Volume kerucut = (1/3) × π × r<sup>2</sup> × t
                        <br />= (1/3) × 3,14 × 6<sup>2</sup> × 8
                        <br />= (1/3) × 3,14 × 36 × 8
                        <br />= (1/3) × 904,32
                        <br />= 301,44 cm<sup>3</sup>
                      </p>
                    </div>
                  </div>

                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="font-medium">Soal 2:</p>
                    <p className="text-sm text-gray-700 mt-1">
                      Sebuah kerucut memiliki jari-jari 5 cm dan tinggi 12 cm. Hitunglah luas permukaan kerucut
                      tersebut! (π = 3,14)
                    </p>
                    <div className="mt-2 p-2 bg-white rounded border">
                      <p className="text-sm font-medium">Penyelesaian:</p>
                      <p className="text-sm">
                        Garis pelukis (s) = √(r<sup>2</sup> + t<sup>2</sup>)
                        <br />= √(5<sup>2</sup> + 12<sup>2</sup>)
                        <br />= √(25 + 144)
                        <br />= √169
                        <br />= 13 cm
                        <br />
                        <br />
                        Luas permukaan kerucut = π × r × (r + s)
                        <br />= 3,14 × 5 × (5 + 13)
                        <br />= 3,14 × 5 × 18
                        <br />= 282,6 cm<sup>2</sup>
                      </p>
                    </div>
                  </div>

                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="font-medium">Soal 3:</p>
                    <p className="text-sm text-gray-700 mt-1">
                      Sebuah kerucut memiliki luas alas 154 cm<sup>2</sup> dan tinggi 15 cm. Hitunglah volume kerucut
                      tersebut! (π = 22/7)
                    </p>
                    <div className="mt-2 p-2 bg-white rounded border">
                      <p className="text-sm font-medium">Penyelesaian:</p>
                      <p className="text-sm">
                        Luas alas = π × r<sup>2</sup>
                        <br />
                        154 = 22/7 × r<sup>2</sup>
                        <br />r<sup>2</sup> = 154 × 7/22
                        <br />r<sup>2</sup> = 49
                        <br />r = 7 cm
                        <br />
                        <br />
                        Volume kerucut = (1/3) × π × r<sup>2</sup> × t
                        <br />= (1/3) × 22/7 × 49 × 15
                        <br />= (1/3) × 22 × 7 × 15
                        <br />= (1/3) × 2.310
                        <br />= 770 cm<sup>3</sup>
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
                <h2 className="text-lg font-semibold">Kalkulator Kerucut</h2>

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
                      <h3 className="font-medium">Volume Kerucut</h3>
                      <div className="mt-1 text-center font-mono text-lg">
                        {volume.toFixed(2)} cm<sup>3</sup>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">
                        V = (1/3) × π × {r}
                        <sup>2</sup> × {h} = {volume.toFixed(2)} cm<sup>3</sup>
                      </p>
                    </div>

                    <div className="p-3 bg-red-50 rounded-lg">
                      <h3 className="font-medium">Panjang Garis Pelukis</h3>
                      <div className="mt-1 text-center font-mono text-lg">{slantHeight.toFixed(2)} cm</div>
                      <p className="text-xs text-gray-600 mt-1">
                        s = √({r}
                        <sup>2</sup> + {h}
                        <sup>2</sup>) = {slantHeight.toFixed(2)} cm
                      </p>
                    </div>

                    <div className="p-3 bg-green-50 rounded-lg">
                      <h3 className="font-medium">Luas Permukaan Kerucut</h3>
                      <div className="mt-1 text-center font-mono text-lg">
                        {surfaceArea.toFixed(2)} cm<sup>2</sup>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">
                        LP = π × {r} × ({r} + {slantHeight.toFixed(2)}) = {surfaceArea.toFixed(2)} cm<sup>2</sup>
                      </p>
                    </div>

                    <div className="p-3 bg-purple-50 rounded-lg">
                      <h3 className="font-medium">Luas Selimut Kerucut</h3>
                      <div className="mt-1 text-center font-mono text-lg">
                        {lateralArea.toFixed(2)} cm<sup>2</sup>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">
                        L<sub>selimut</sub> = π × {r} × {slantHeight.toFixed(2)} = {lateralArea.toFixed(2)} cm
                        <sup>2</sup>
                      </p>
                    </div>

                    <div className="p-3 bg-yellow-50 rounded-lg">
                      <h3 className="font-medium">Luas Alas Kerucut</h3>
                      <div className="mt-1 text-center font-mono text-lg">
                        {baseArea.toFixed(2)} cm<sup>2</sup>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">
                        L<sub>alas</sub> = π × {r}
                        <sup>2</sup> = {baseArea.toFixed(2)} cm<sup>2</sup>
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
                <h2 className="text-lg font-semibold">Video Pembelajaran Kerucut</h2>

                <div className="space-y-4">
                  <div>
                    {/* <h3 className="font-medium mb-2">Penjelasan Kerucut dan Sifat-sifatnya</h3> */}
                    <YouTubeEmbed videoId="wSQ1PeSNrGw" title="Penjelasan Kerucut dan Sifat-sifatnya" />
                  </div>
{/* 
                  <div>
                    <h3 className="font-medium mb-2">Cara Menghitung Volume dan Luas Permukaan Kerucut</h3>
                    <YouTubeEmbed videoId="ZfzLMpqIS7g" title="Cara Menghitung Volume dan Luas Permukaan Kerucut" />
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Contoh Soal Kerucut</h3>
                    <YouTubeEmbed videoId="Rl9LnUVDQKY" title="Contoh Soal Kerucut" />
                  </div> */}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-6">
          <Link href="/exercises">
            <Button className="w-full" size="lg">
              Latihan Soal Kerucut
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
            <Triangle className="h-6 w-6" />
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
