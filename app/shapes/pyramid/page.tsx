"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, BookOpen, Calculator, FileText, Video } from "lucide-react"
import { YouTubeEmbed } from "@/components/youtube-embed"
import { PDFDownload } from "@/components/pdf-download"

export default function PyramidDetailPage() {
  const [baseLength, setBaseLength] = useState("6")
  const [pyramidHeight, setPyramidHeight] = useState("8")

  const a = Number.parseFloat(baseLength) || 0
  const h = Number.parseFloat(pyramidHeight) || 0

  const baseArea = a * a
  const slantHeight = Math.sqrt((a / 2) ** 2 + h ** 2)
  const lateralArea = 4 * (1 / 2) * a * slantHeight
  const surfaceArea = baseArea + lateralArea
  const volume = (1 / 3) * baseArea * h

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
          <h1 className="text-xl font-bold">Limas</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4">
        <div className="flex justify-center mb-6">
          <div className="relative h-48 w-48">
            <Image
              src="/placeholder.svg?height=192&width=192"
              alt="Limas"
              width={192}
              height={192}
              className="object-contain"
            />
            <div className="absolute inset-0 flex items-center justify-center text-orange-800 font-bold">Limas</div>
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
                <h2 className="text-lg font-semibold">Apa itu Limas?</h2>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 mb-4">
                      Limas adalah bangun ruang tiga dimensi yang dibatasi oleh sebuah sisi alas berbentuk segi-n dan n
                      buah sisi berbentuk segitiga yang bertemu di satu titik puncak. Limas dinamai berdasarkan bentuk
                      alasnya, misalnya limas segitiga, limas segiempat, limas segilima, dan seterusnya.
                    </p>

                    <div className="relative h-40 w-full md:hidden mb-4">
                      <Image
                        src="/placeholder.svg?height=160&width=320"
                        alt="Bagian-bagian Limas"
                        width={320}
                        height={160}
                        className="object-contain"
                      />
                    </div>

                    <h3 className="font-medium mt-4">Sifat-sifat Limas:</h3>
                    <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                      <li>Memiliki 1 sisi alas berbentuk segi-n</li>
                      <li>Memiliki n sisi berbentuk segitiga yang bertemu di satu titik puncak</li>
                      <li>Memiliki n + 1 sisi</li>
                      <li>Memiliki 2n rusuk</li>
                      <li>Memiliki n + 1 titik sudut</li>
                      <li>Memiliki n diagonal bidang pada alas</li>
                    </ul>
                  </div>
                  <div className="hidden md:block flex-1">
                    <div className="relative h-full w-full">
                      <Image
                        src="/placeholder.svg?height=300&width=300"
                        alt="Bagian-bagian Limas"
                        width={300}
                        height={300}
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>

                <h3 className="font-medium mt-4">Jenis-jenis Limas:</h3>
                <div className="space-y-2 text-sm text-gray-700">
                  <p>
                    <strong>Limas Segitiga:</strong> Limas dengan alas berbentuk segitiga.
                  </p>
                  <p>
                    <strong>Limas Segiempat:</strong> Limas dengan alas berbentuk segiempat.
                  </p>
                  <p>
                    <strong>Limas Segilima:</strong> Limas dengan alas berbentuk segilima.
                  </p>
                  <p>
                    <strong>Limas Segienam:</strong> Limas dengan alas berbentuk segienam.
                  </p>
                  <p>
                    <strong>Limas Beraturan:</strong> Limas yang alasnya berupa segi-n beraturan dan titik puncaknya
                    terletak tepat di atas pusat alas.
                  </p>
                  <p>
                    <strong>Limas Tidak Beraturan:</strong> Limas yang alasnya bukan segi-n beraturan atau titik
                    puncaknya tidak terletak tepat di atas pusat alas.
                  </p>
                </div>

                <h3 className="font-medium mt-4">Bagian-bagian Limas:</h3>
                <div className="space-y-2 text-sm text-gray-700">
                  <p>
                    <strong>Alas:</strong> Bidang berbentuk segi-n yang menjadi dasar limas.
                  </p>
                  <p>
                    <strong>Sisi Tegak:</strong> Bidang berbentuk segitiga yang menghubungkan alas dengan titik puncak.
                  </p>
                  <p>
                    <strong>Rusuk Alas:</strong> Garis yang merupakan pertemuan dua sisi pada alas.
                  </p>
                  <p>
                    <strong>Rusuk Tegak:</strong> Garis yang menghubungkan titik sudut alas dengan titik puncak.
                  </p>
                  <p>
                    <strong>Titik Puncak:</strong> Titik tertinggi pada limas, tempat bertemunya semua rusuk tegak.
                  </p>
                  <p>
                    <strong>Tinggi Limas:</strong> Jarak tegak lurus dari titik puncak ke bidang alas.
                  </p>
                  <p>
                    <strong>Tinggi Sisi Tegak:</strong> Jarak tegak lurus dari titik puncak ke rusuk alas. Juga disebut
                    sebagai apotema sisi.
                  </p>
                  <p>
                    <strong>Diagonal Alas:</strong> Garis yang menghubungkan dua titik sudut yang tidak berdekatan pada
                    alas.
                  </p>
                </div>

                <h3 className="font-medium mt-4">Contoh Limas dalam Kehidupan Sehari-hari:</h3>
                <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                  <li>Piramida di Mesir</li>
                  <li>Atap rumah berbentuk limas</li>
                  <li>Tenda berbentuk limas</li>
                  <li>Kemasan makanan berbentuk limas</li>
                  <li>Ornamen dekoratif berbentuk limas</li>
                </ul>

                <div className="mt-4">
                  <PDFDownload url="#" title="Materi Lengkap Limas" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rumus">
            <Card>
              <CardContent className="p-4 space-y-4">
                <h2 className="text-lg font-semibold">Rumus Limas</h2>

                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <h3 className="font-medium">Volume Limas</h3>
                    <div className="mt-1 text-center font-mono text-lg">V = (1/3) × Luas alas × tinggi</div>
                    <p className="text-xs text-gray-600 mt-1">Dimana tinggi adalah jarak dari puncak ke alas</p>
                  </div>

                  <div className="p-3 bg-green-50 rounded-lg">
                    <h3 className="font-medium">Luas Permukaan Limas</h3>
                    <div className="mt-1 text-center font-mono text-lg">LP = Luas alas + Luas selimut</div>
                    <p className="text-xs text-gray-600 mt-1">
                      Dimana luas selimut adalah jumlah luas semua sisi tegak
                    </p>
                  </div>

                  <div className="p-3 bg-purple-50 rounded-lg">
                    <h3 className="font-medium">Luas Selimut Limas</h3>
                    <div className="mt-1 text-center font-mono text-lg">
                      L<sub>selimut</sub> = Jumlah luas semua sisi tegak
                    </div>
                  </div>
                </div>

                <h3 className="font-medium mt-4">Rumus Khusus Limas Segiempat:</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-yellow-50 rounded-lg">
                    <h3 className="font-medium">Luas Alas Limas Segiempat</h3>
                    <div className="mt-1 text-center font-mono text-lg">
                      L<sub>alas</sub> = sisi × sisi
                    </div>
                    <p className="text-xs text-gray-600 mt-1">Untuk alas berbentuk persegi</p>
                  </div>

                  <div className="p-3 bg-red-50 rounded-lg">
                    <h3 className="font-medium">Luas Sisi Tegak Limas Segiempat Beraturan</h3>
                    <div className="mt-1 text-center font-mono text-lg">
                      L<sub>sisi tegak</sub> = (1/2) × sisi alas × tinggi sisi tegak
                    </div>
                    <p className="text-xs text-gray-600 mt-1">
                      Dimana tinggi sisi tegak adalah jarak dari puncak ke rusuk alas
                    </p>
                  </div>

                  <div className="p-3 bg-orange-50 rounded-lg">
                    <h3 className="font-medium">Volume Limas Segiempat</h3>
                    <div className="mt-1 text-center font-mono text-lg">V = (1/3) × sisi × sisi × tinggi</div>
                    <p className="text-xs text-gray-600 mt-1">Untuk alas berbentuk persegi</p>
                  </div>
                </div>

                <h3 className="font-medium mt-4">Contoh Soal:</h3>
                <div className="space-y-4">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="font-medium">Soal 1:</p>
                    <p className="text-sm text-gray-700 mt-1">
                      Sebuah limas segiempat memiliki alas berbentuk persegi dengan panjang sisi 6 cm dan tinggi limas 8
                      cm. Hitunglah volume limas tersebut!
                    </p>
                    <div className="mt-2 p-2 bg-white rounded border">
                      <p className="text-sm font-medium">Penyelesaian:</p>
                      <p className="text-sm">
                        Luas alas = sisi × sisi
                        <br />= 6 × 6
                        <br />= 36 cm<sup>2</sup>
                        <br />
                        <br />
                        Volume limas = (1/3) × Luas alas × tinggi
                        <br />= (1/3) × 36 × 8
                        <br />= 96 cm<sup>3</sup>
                      </p>
                    </div>
                  </div>

                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="font-medium">Soal 2:</p>
                    <p className="text-sm text-gray-700 mt-1">
                      Sebuah limas segiempat beraturan memiliki alas berbentuk persegi dengan panjang sisi 10 cm dan
                      tinggi limas 12 cm. Hitunglah luas permukaan limas tersebut!
                    </p>
                    <div className="mt-2 p-2 bg-white rounded border">
                      <p className="text-sm font-medium">Penyelesaian:</p>
                      <p className="text-sm">
                        Luas alas = sisi × sisi
                        <br />= 10 × 10
                        <br />= 100 cm<sup>2</sup>
                        <br />
                        <br />
                        Tinggi sisi tegak = √(h<sup>2</sup> + (s/2)<sup>2</sup>)
                        <br />= √(12<sup>2</sup> + 5<sup>2</sup>)
                        <br />= √(144 + 25)
                        <br />= √169
                        <br />= 13 cm
                        <br />
                        <br />
                        Luas satu sisi tegak = (1/2) × sisi alas × tinggi sisi tegak
                        <br />= (1/2) × 10 × 13
                        <br />= 65 cm<sup>2</sup>
                        <br />
                        <br />
                        Luas selimut = 4 × Luas satu sisi tegak
                        <br />= 4 × 65
                        <br />= 260 cm<sup>2</sup>
                        <br />
                        <br />
                        Luas permukaan limas = Luas alas + Luas selimut
                        <br />= 100 + 260
                        <br />= 360 cm<sup>2</sup>
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
                <h2 className="text-lg font-semibold">Kalkulator Limas Segiempat</h2>

                <div className="space-y-3">
                  <div className="space-y-2">
                    <label htmlFor="base-length" className="text-sm font-medium">
                      Panjang Sisi Alas (Persegi)
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        id="base-length"
                        type="number"
                        value={baseLength}
                        onChange={(e) => setBaseLength(e.target.value)}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                      <span className="text-sm">cm</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="pyramid-height" className="text-sm font-medium">
                      Tinggi Limas
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        id="pyramid-height"
                        type="number"
                        value={pyramidHeight}
                        onChange={(e) => setPyramidHeight(e.target.value)}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                      <span className="text-sm">cm</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3 mt-4">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <h3 className="font-medium">Volume Limas</h3>
                      <div className="mt-1 text-center font-mono text-lg">
                        {volume.toFixed(2)} cm<sup>3</sup>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">
                        V = (1/3) × {a}
                        <sup>2</sup> × {h} = {volume.toFixed(2)} cm<sup>3</sup>
                      </p>
                    </div>

                    <div className="p-3 bg-red-50 rounded-lg">
                      <h3 className="font-medium">Tinggi Sisi Tegak</h3>
                      <div className="mt-1 text-center font-mono text-lg">{slantHeight.toFixed(2)} cm</div>
                      <p className="text-xs text-gray-600 mt-1">
                        Tinggi sisi tegak = √({h}
                        <sup>2</sup> + ({a}/2)<sup>2</sup>) = {slantHeight.toFixed(2)} cm
                      </p>
                    </div>

                    <div className="p-3 bg-yellow-50 rounded-lg">
                      <h3 className="font-medium">Luas Alas</h3>
                      <div className="mt-1 text-center font-mono text-lg">
                        {baseArea.toFixed(2)} cm<sup>2</sup>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">
                        L<sub>alas</sub> = {a} × {a} = {baseArea.toFixed(2)} cm<sup>2</sup>
                      </p>
                    </div>

                    <div className="p-3 bg-green-50 rounded-lg">
                      <h3 className="font-medium">Luas Permukaan Limas</h3>
                      <div className="mt-1 text-center font-mono text-lg">
                        {surfaceArea.toFixed(2)} cm<sup>2</sup>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">
                        LP = {baseArea.toFixed(2)} + {lateralArea.toFixed(2)} = {surfaceArea.toFixed(2)} cm<sup>2</sup>
                      </p>
                    </div>

                    <div className="p-3 bg-purple-50 rounded-lg">
                      <h3 className="font-medium">Luas Selimut Limas</h3>
                      <div className="mt-1 text-center font-mono text-lg">
                        {lateralArea.toFixed(2)} cm<sup>2</sup>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">
                        L<sub>selimut</sub> = 4 × (1/2) × {a} × {slantHeight.toFixed(2)} = {lateralArea.toFixed(2)} cm
                        <sup>2</sup>
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
                <h2 className="text-lg font-semibold">Video Pembelajaran Limas</h2>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Penjelasan Limas dan Sifat-sifatnya</h3>
                    <YouTubeEmbed videoId="XNmQr6hEoGw" title="Penjelasan Limas dan Sifat-sifatnya" />
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Cara Menghitung Volume dan Luas Permukaan Limas</h3>
                    <YouTubeEmbed videoId="ZfzLMpqIS7g" title="Cara Menghitung Volume dan Luas Permukaan Limas" />
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Contoh Soal Limas</h3>
                    <YouTubeEmbed videoId="Rl9LnUVDQKY" title="Contoh Soal Limas" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-6">
          <Link href="/exercises">
            <Button className="w-full" size="lg">
              Latihan Soal Limas
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
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
            <span className="text-xs">Materi</span>
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
