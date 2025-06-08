"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, BookOpen, Calculator, FileText, Video } from "lucide-react"
import { YouTubeEmbed } from "@/components/youtube-embed"
// Tambahkan import PDFDownload
import { PDFDownload } from "@/components/pdf-download"

export default function CuboidDetailPage() {
  const [length, setLength] = useState("8")
  const [width, setWidth] = useState("6")
  const [height, setHeight] = useState("4")

  const l = Number.parseFloat(length) || 0
  const w = Number.parseFloat(width) || 0
  const h = Number.parseFloat(height) || 0

  const volume = l * w * h
  const surfaceArea = 2 * (l * w + l * h + w * h)
  const diagonalSpace = Math.sqrt(l ** 2 + w ** 2 + h ** 2)

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
          <h1 className="text-xl font-bold">Balok</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4">
        <div className="flex justify-center mb-6">
          <div className="relative h-48 w-48">
            <Image
              src="https://png.pngtree.com/png-clipart/20220110/original/pngtree-cuboid-vector-png-image_7041672.png"
              alt="Balok"
              width={192}
              height={192}
              className="object-contain"
            />
            {/* <div className="absolute inset-0 flex items-center justify-center text-indigo-800 font-bold">Balok</div> */}
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
                <h2 className="text-lg font-semibold">Apa itu Balok?</h2>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 mb-4">
                      Balok adalah bangun ruang tiga dimensi yang dibatasi oleh enam bidang sisi yang berbentuk persegi
                      panjang. Balok memiliki 8 titik sudut dan 12 rusuk. Balok merupakan prisma segi empat, dengan alas
                      dan tutup berbentuk persegi panjang.
                    </p>

                    <div className="relative h-40 w-full md:hidden mb-4">
                      <Image
                        src="https://png.pngtree.com/png-clipart/20220110/original/pngtree-cuboid-vector-png-image_7041672.png"
                        alt="Bagian-bagian Balok"
                        width={320}
                        height={160}
                        className="object-contain"
                      />
                    </div>

                    <h3 className="font-medium mt-4">Sifat-sifat Balok:</h3>
                    <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                      <li>Memiliki 6 sisi berbentuk persegi panjang</li>
                      <li>Memiliki 8 titik sudut</li>
                      <li>Memiliki 12 rusuk</li>
                      <li>Sisi yang berhadapan memiliki bentuk dan ukuran yang sama</li>
                      <li>Semua sudutnya siku-siku (90°)</li>
                      <li>Memiliki 4 diagonal ruang yang sama panjang</li>
                      <li>Memiliki 12 diagonal bidang</li>
                    </ul>
                  </div>
                  <div className="hidden md:block flex-1">
                    <div className="relative h-full w-full">
                      <Image
                        src="https://png.pngtree.com/png-clipart/20220110/original/pngtree-cuboid-vector-png-image_7041672.png"
                        alt="Bagian-bagian Balok"
                        width={300}
                        height={300}
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>

                <h3 className="font-medium mt-4">Bagian-bagian Balok:</h3>
                <div className="space-y-2 text-sm text-gray-700">
                  <p>
                    <strong>Sisi:</strong> Bidang yang membatasi balok. Balok memiliki 6 sisi berbentuk persegi panjang.
                  </p>
                  <p>
                    <strong>Rusuk:</strong> Garis yang merupakan pertemuan dua sisi balok. Balok memiliki 12 rusuk.
                  </p>
                  <p>
                    <strong>Titik Sudut:</strong> Titik pertemuan tiga rusuk. Balok memiliki 8 titik sudut.
                  </p>
                  <p>
                    <strong>Diagonal Bidang:</strong> Garis yang menghubungkan dua titik sudut yang berhadapan dalam
                    satu sisi (bidang). Balok memiliki 12 diagonal bidang.
                  </p>
                  <p>
                    <strong>Diagonal Ruang:</strong> Garis yang menghubungkan dua titik sudut yang berhadapan dalam
                    balok. Balok memiliki 4 diagonal ruang dengan panjang √(p² + l² + t²), dimana p adalah panjang, l
                    adalah lebar, dan t adalah tinggi.
                  </p>
                  <p>
                    <strong>Bidang Diagonal:</strong> Bidang yang melalui dua rusuk yang berhadapan dalam balok. Balok
                    memiliki 6 bidang diagonal berbentuk persegi panjang.
                  </p>
                </div>

                <h3 className="font-medium mt-4">Contoh Balok dalam Kehidupan Sehari-hari:</h3>
                <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                  <li>Kotak sepatu</li>
                  <li>Lemari</li>
                  <li>Kulkas</li>
                  <li>Buku</li>
                  <li>Kardus</li>
                  <li>Batako</li>
                </ul>
                {/* Tambahkan tombol unduh PDF di akhir bagian penjelasan */}
                {/* <div className="mt-4">
                  <PDFDownload url="#" title="Materi Lengkap Balok" />
                </div> */}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rumus">
            <Card>
              <CardContent className="p-4 space-y-4">
                <h2 className="text-lg font-semibold">Rumus Balok</h2>

                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <h3 className="font-medium">Volume Balok</h3>
                    <div className="mt-1 text-center font-mono text-lg">V = p × l × t</div>
                    <p className="text-xs text-gray-600 mt-1">Dimana p = panjang, l = lebar, t = tinggi</p>
                  </div>

                  <div className="p-3 bg-green-50 rounded-lg">
                    <h3 className="font-medium">Luas Permukaan Balok</h3>
                    <div className="mt-1 text-center font-mono text-lg">LP = 2 × (p × l + p × t + l × t)</div>
                    <p className="text-xs text-gray-600 mt-1">Dimana p = panjang, l = lebar, t = tinggi</p>
                  </div>

                  <div className="p-3 bg-purple-50 rounded-lg">
                    <h3 className="font-medium">Panjang Diagonal Bidang</h3>
                    <div className="mt-1 text-center font-mono text-lg">
                      d<sub>1</sub> = √(p² + l²)
                      <br />d<sub>2</sub> = √(p² + t²)
                      <br />d<sub>3</sub> = √(l² + t²)
                    </div>
                    <p className="text-xs text-gray-600 mt-1">Dimana p = panjang, l = lebar, t = tinggi</p>
                  </div>

                  <div className="p-3 bg-yellow-50 rounded-lg">
                    <h3 className="font-medium">Panjang Diagonal Ruang</h3>
                    <div className="mt-1 text-center font-mono text-lg">
                      d<sub>ruang</sub> = √(p² + l² + t²)
                    </div>
                    <p className="text-xs text-gray-600 mt-1">Dimana p = panjang, l = lebar, t = tinggi</p>
                  </div>

                  <div className="p-3 bg-red-50 rounded-lg">
                    <h3 className="font-medium">Luas Bidang Diagonal</h3>
                    <div className="mt-1 text-center font-mono text-lg">
                      L<sub>bd1</sub> = p × √(l² + t²)
                      <br />L<sub>bd2</sub> = l × √(p² + t²)
                      <br />L<sub>bd3</sub> = t × √(p² + l²)
                    </div>
                    <p className="text-xs text-gray-600 mt-1">Dimana p = panjang, l = lebar, t = tinggi</p>
                  </div>
                </div>

                <h3 className="font-medium mt-4">Contoh Soal:</h3>
                <div className="space-y-4">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="font-medium">Soal 1:</p>
                    <p className="text-sm text-gray-700 mt-1">
                      Sebuah balok memiliki panjang 8 cm, lebar 6 cm, dan tinggi 4 cm. Hitunglah volume balok tersebut!
                    </p>
                    <div className="mt-2 p-2 bg-white rounded border">
                      <p className="text-sm font-medium">Penyelesaian:</p>
                      <p className="text-sm">
                        Volume balok = p × l × t = 8 × 6 × 4 = 192 cm<sup>3</sup>
                      </p>
                    </div>
                  </div>

                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="font-medium">Soal 2:</p>
                    <p className="text-sm text-gray-700 mt-1">
                      Sebuah balok memiliki panjang 10 cm, lebar 8 cm, dan tinggi 5 cm. Hitunglah luas permukaan balok
                      tersebut!
                    </p>
                    <div className="mt-2 p-2 bg-white rounded border">
                      <p className="text-sm font-medium">Penyelesaian:</p>
                      <p className="text-sm">
                        Luas permukaan balok = 2 × (p × l + p × t + l × t)
                        <br />= 2 × (10 × 8 + 10 × 5 + 8 × 5)
                        <br />= 2 × (80 + 50 + 40)
                        <br />= 2 × 170
                        <br />= 340 cm<sup>2</sup>
                      </p>
                    </div>
                  </div>

                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="font-medium">Soal 3:</p>
                    <p className="text-sm text-gray-700 mt-1">
                      Sebuah balok memiliki panjang 12 cm, lebar 9 cm, dan tinggi 6 cm. Hitunglah panjang diagonal ruang
                      balok tersebut!
                    </p>
                    <div className="mt-2 p-2 bg-white rounded border">
                      <p className="text-sm font-medium">Penyelesaian:</p>
                      <p className="text-sm">
                        Diagonal ruang balok = √(p² + l² + t²)
                        <br />= √(12² + 9² + 6²)
                        <br />= √(144 + 81 + 36)
                        <br />= √261
                        <br />= 16,16 cm
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
                <h2 className="text-lg font-semibold">Kalkulator Balok</h2>

                <div className="space-y-3">
                  <div className="space-y-2">
                    <label htmlFor="length" className="text-sm font-medium">
                      Panjang (p)
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        id="length"
                        type="number"
                        value={length}
                        onChange={(e) => setLength(e.target.value)}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                      <span className="text-sm">cm</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="width" className="text-sm font-medium">
                      Lebar (l)
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        id="width"
                        type="number"
                        value={width}
                        onChange={(e) => setWidth(e.target.value)}
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
                      <h3 className="font-medium">Volume Balok</h3>
                      <div className="mt-1 text-center font-mono text-lg">
                        {volume.toFixed(2)} cm<sup>3</sup>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">
                        V = {l} × {w} × {h} = {volume.toFixed(2)} cm<sup>3</sup>
                      </p>
                    </div>

                    <div className="p-3 bg-green-50 rounded-lg">
                      <h3 className="font-medium">Luas Permukaan Balok</h3>
                      <div className="mt-1 text-center font-mono text-lg">
                        {surfaceArea.toFixed(2)} cm<sup>2</sup>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">
                        LP = 2 × ({l} × {w} + {l} × {h} + {w} × {h}) = {surfaceArea.toFixed(2)} cm<sup>2</sup>
                      </p>
                    </div>

                    <div className="p-3 bg-purple-50 rounded-lg">
                      <h3 className="font-medium">Panjang Diagonal Bidang</h3>
                      <div className="mt-1 text-center font-mono text-lg">
                        d<sub>1</sub> = {Math.sqrt(l ** 2 + w ** 2).toFixed(2)} cm
                        <br />d<sub>2</sub> = {Math.sqrt(l ** 2 + h ** 2).toFixed(2)} cm
                        <br />d<sub>3</sub> = {Math.sqrt(w ** 2 + h ** 2).toFixed(2)} cm
                      </div>
                    </div>

                    <div className="p-3 bg-yellow-50 rounded-lg">
                      <h3 className="font-medium">Panjang Diagonal Ruang</h3>
                      <div className="mt-1 text-center font-mono text-lg">{diagonalSpace.toFixed(2)} cm</div>
                      <p className="text-xs text-gray-600 mt-1">
                        d<sub>ruang</sub> = √({l}² + {w}² + {h}²) = {diagonalSpace.toFixed(2)} cm
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
                <h2 className="text-lg font-semibold">Video Pembelajaran Balok</h2>

                <div className="space-y-4">
                  <div>
                    {/* <h3 className="font-medium mb-2">Penjelasan Balok dan Sifat-sifatnya</h3> */}
                    <YouTubeEmbed videoId="b_eDk9aB0EY" title="Penjelasan Balok dan Sifat-sifatnya" />
                  </div>
{/* 
                  <div>
                    <h3 className="font-medium mb-2">Cara Menghitung Volume dan Luas Permukaan Balok</h3>
                    <YouTubeEmbed videoId="ZfzLMpqIS7g" title="Cara Menghitung Volume dan Luas Permukaan Balok" />
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Contoh Soal Balok</h3>
                    <YouTubeEmbed videoId="XNmQr6hEoGw" title="Contoh Soal Balok" />
                  </div> */}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-6">
          <Link href="/exercises">
            <Button className="w-full" size="lg">
              Latihan Soal Balok
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
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
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
