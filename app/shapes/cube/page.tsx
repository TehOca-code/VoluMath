"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, BookOpen, Calculator, CuboidIcon as Cube, FileText, Video } from "lucide-react"
import { YouTubeEmbed } from "@/components/youtube-embed"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@/components/ui/breadcrumb"

export default function CubeDetailPage() {
  const [sideLength, setSideLength] = useState("5")
  const side = Number.parseFloat(sideLength) || 0

  const volume = side ** 3
  const surfaceArea = 6 * side ** 2
  const diagonalFace = side * Math.sqrt(2)
  const diagonalSpace = side * Math.sqrt(3)

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
          <h1 className="text-xl font-bold">Kubus</h1>
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
              src="https://vt-vtwa-assets.varsitytutors.com/vt-vtwa/uploads/problem_question_image/image/1346/Cube__PSF_.png"
              alt="Kubus"
              width={192}
              height={192}
              className="object-contain"
            />
            <div className="absolute inset-0 flex items-center justify-center text-blue-800 font-bold"></div>
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
                <h2 className="text-lg font-semibold">Apa itu Kubus?</h2>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 mb-4">
                      Kubus adalah bangun ruang tiga dimensi yang dibatasi oleh enam bidang sisi yang berbentuk persegi
                      dan kongruen (sama dan sebangun). Kubus memiliki 8 titik sudut dan 12 rusuk yang sama panjang.
                    </p>

                    <div className="relative h-40 w-full md:hidden mb-4">
                      <Image
                        src="https://vt-vtwa-assets.varsitytutors.com/vt-vtwa/uploads/problem_question_image/image/1346/Cube__PSF_.png"
                        alt="Bagian-bagian Kubus"
                        width={320}
                        height={160}
                        className="object-contain"
                      />
                    </div>

                    <h3 className="font-medium mt-4">Sifat-sifat Kubus:</h3>
                    <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                      <li>Memiliki 6 sisi berbentuk persegi yang kongruen</li>
                      <li>Memiliki 8 titik sudut</li>
                      <li>Memiliki 12 rusuk yang sama panjang</li>
                      <li>Semua sudutnya siku-siku (90°)</li>
                      <li>Memiliki 4 diagonal ruang yang sama panjang</li>
                      <li>Memiliki 12 diagonal bidang yang sama panjang</li>
                    </ul>
                  </div>
                  <div className="hidden md:block flex-1">
                    <div className="relative h-full w-full">
                      <Image
                        src="https://vt-vtwa-assets.varsitytutors.com/vt-vtwa/uploads/problem_question_image/image/1346/Cube__PSF_.png"
                        alt="Bagian-bagian Kubus"
                        width={300}
                        height={300}
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>

                <h3 className="font-medium mt-4">Bagian-bagian Kubus:</h3>
                <div className="space-y-2 text-sm text-gray-700">
                  <p>
                    <strong>Sisi:</strong> Bidang yang membatasi kubus. Kubus memiliki 6 sisi berbentuk persegi yang
                    kongruen.
                  </p>
                  <p>
                    <strong>Rusuk:</strong> Garis yang merupakan pertemuan dua sisi kubus. Kubus memiliki 12 rusuk yang
                    sama panjang.
                  </p>
                  <p>
                    <strong>Titik Sudut:</strong> Titik pertemuan tiga rusuk. Kubus memiliki 8 titik sudut.
                  </p>
                  <p>
                    <strong>Diagonal Bidang:</strong> Garis yang menghubungkan dua titik sudut yang berhadapan dalam
                    satu sisi (bidang). Kubus memiliki 12 diagonal bidang dengan panjang s√2, dimana s adalah panjang
                    rusuk.
                  </p>
                  <p>
                    <strong>Diagonal Ruang:</strong> Garis yang menghubungkan dua titik sudut yang berhadapan dalam
                    kubus. Kubus memiliki 4 diagonal ruang dengan panjang s√3, dimana s adalah panjang rusuk.
                  </p>
                  <p>
                    <strong>Bidang Diagonal:</strong> Bidang yang melalui dua rusuk yang berhadapan dalam kubus. Kubus
                    memiliki 6 bidang diagonal berbentuk persegi panjang.
                  </p>
                </div>

                <h3 className="font-medium mt-4">Contoh Kubus dalam Kehidupan Sehari-hari:</h3>
                <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                  <li>Dadu</li>
                  <li>Rubik's Cube</li>
                  <li>Kotak kemasan berbentuk kubus</li>
                  <li>Es batu</li>
                  <li>Akuarium berbentuk kubus</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rumus">
            <Card>
              <CardContent className="p-4 space-y-4">
                <h2 className="text-lg font-semibold">Rumus Kubus</h2>

                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <h3 className="font-medium">Volume Kubus</h3>
                    <div className="mt-1 text-center font-mono text-lg">
                      V = s<sup>3</sup>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">Dimana s = panjang sisi kubus</p>
                  </div>

                  <div className="p-3 bg-green-50 rounded-lg">
                    <h3 className="font-medium">Luas Permukaan Kubus</h3>
                    <div className="mt-1 text-center font-mono text-lg">
                      LP = 6 × s<sup>2</sup>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">Dimana s = panjang sisi kubus</p>
                  </div>

                  <div className="p-3 bg-purple-50 rounded-lg">
                    <h3 className="font-medium">Panjang Diagonal Sisi</h3>
                    <div className="mt-1 text-center font-mono text-lg">
                      d<sub>sisi</sub> = s × √2
                    </div>
                    <p className="text-xs text-gray-600 mt-1">Dimana s = panjang sisi kubus</p>
                  </div>

                  <div className="p-3 bg-yellow-50 rounded-lg">
                    <h3 className="font-medium">Panjang Diagonal Ruang</h3>
                    <div className="mt-1 text-center font-mono text-lg">
                      d<sub>ruang</sub> = s × √3
                    </div>
                    <p className="text-xs text-gray-600 mt-1">Dimana s = panjang sisi kubus</p>
                  </div>

                  <div className="p-3 bg-red-50 rounded-lg">
                    <h3 className="font-medium">Luas Bidang Diagonal</h3>
                    <div className="mt-1 text-center font-mono text-lg">
                      L<sub>bidang diagonal</sub> = s<sup>2</sup> × √2
                    </div>
                    <p className="text-xs text-gray-600 mt-1">Dimana s = panjang sisi kubus</p>
                  </div>
                </div>

                <h3 className="font-medium mt-4">Contoh Soal:</h3>
                <div className="space-y-4">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="font-medium">Soal 1:</p>
                    <p className="text-sm text-gray-700 mt-1">
                      Sebuah kubus memiliki panjang rusuk 6 cm. Hitunglah volume kubus tersebut!
                    </p>
                    <div className="mt-2 p-2 bg-white rounded border">
                      <p className="text-sm font-medium">Penyelesaian:</p>
                      <p className="text-sm">
                        Volume kubus = s<sup>3</sup> = 6<sup>3</sup> = 6 × 6 × 6 = 216 cm<sup>3</sup>
                      </p>
                    </div>
                  </div>

                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="font-medium">Soal 2:</p>
                    <p className="text-sm text-gray-700 mt-1">
                      Sebuah kubus memiliki luas permukaan 96 cm<sup>2</sup>. Hitunglah panjang rusuk dan volume kubus
                      tersebut!
                    </p>
                    <div className="mt-2 p-2 bg-white rounded border">
                      <p className="text-sm font-medium">Penyelesaian:</p>
                      <p className="text-sm">
                        Luas permukaan kubus = 6s<sup>2</sup>
                        <br />
                        96 = 6s<sup>2</sup>
                        <br />s<sup>2</sup> = 96 ÷ 6 = 16
                        <br />s = √16 = 4 cm
                        <br />
                        <br />
                        Volume kubus = s<sup>3</sup> = 4<sup>3</sup> = 64 cm<sup>3</sup>
                      </p>
                    </div>
                  </div>

                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="font-medium">Soal 3:</p>
                    <p className="text-sm text-gray-700 mt-1">
                      Sebuah kubus memiliki panjang diagonal ruang 6√3 cm. Hitunglah panjang rusuk, luas permukaan, dan
                      volume kubus tersebut!
                    </p>
                    <div className="mt-2 p-2 bg-white rounded border">
                      <p className="text-sm font-medium">Penyelesaian:</p>
                      <p className="text-sm">
                        Diagonal ruang kubus = s√3
                        <br />
                        6√3 = s√3
                        <br />s = 6 cm
                        <br />
                        <br />
                        Luas permukaan kubus = 6s<sup>2</sup> = 6 × 6<sup>2</sup> = 6 × 36 = 216 cm<sup>2</sup>
                        <br />
                        <br />
                        Volume kubus = s<sup>3</sup> = 6<sup>3</sup> = 216 cm<sup>3</sup>
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
                <h2 className="text-lg font-semibold">Kalkulator Kubus</h2>

                <div className="space-y-3">
                  <div className="space-y-2">
                    <label htmlFor="side-length" className="text-sm font-medium">
                      Panjang Sisi (s)
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        id="side-length"
                        type="number"
                        value={sideLength}
                        onChange={(e) => setSideLength(e.target.value)}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                      <span className="text-sm">cm</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3 mt-4">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <h3 className="font-medium">Volume Kubus</h3>
                      <div className="mt-1 text-center font-mono text-lg">
                        {volume.toFixed(2)} cm<sup>3</sup>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">
                        V = {side} × {side} × {side} = {volume.toFixed(2)} cm<sup>3</sup>
                      </p>
                    </div>

                    <div className="p-3 bg-green-50 rounded-lg">
                      <h3 className="font-medium">Luas Permukaan Kubus</h3>
                      <div className="mt-1 text-center font-mono text-lg">
                        {surfaceArea.toFixed(2)} cm<sup>2</sup>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">
                        LP = 6 × {side}
                        <sup>2</sup> = 6 × {(side ** 2).toFixed(2)} = {surfaceArea.toFixed(2)} cm<sup>2</sup>
                      </p>
                    </div>

                    <div className="p-3 bg-purple-50 rounded-lg">
                      <h3 className="font-medium">Panjang Diagonal Sisi</h3>
                      <div className="mt-1 text-center font-mono text-lg">{diagonalFace.toFixed(2)} cm</div>
                      <p className="text-xs text-gray-600 mt-1">
                        d<sub>sisi</sub> = {side} × √2 = {diagonalFace.toFixed(2)} cm
                      </p>
                    </div>

                    <div className="p-3 bg-yellow-50 rounded-lg">
                      <h3 className="font-medium">Panjang Diagonal Ruang</h3>
                      <div className="mt-1 text-center font-mono text-lg">{diagonalSpace.toFixed(2)} cm</div>
                      <p className="text-xs text-gray-600 mt-1">
                        d<sub>ruang</sub> = {side} × √3 = {diagonalSpace.toFixed(2)} cm
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
                <h2 className="text-lg font-semibold">Video Pembelajaran Kubus</h2>

                <div className="space-y-4">
                  <div>
                    {/* <h3 className="font-medium mb-2">Penjelasan Kubus dan Sifat-sifatnya</h3> */}
                    <YouTubeEmbed videoId="Wps55dtifcM" title="Penjelasan Kubus dan Sifat-sifatnya" />
                  </div>
{/* 
                  <div>
                    <h3 className="font-medium mb-2">Cara Menghitung Volume dan Luas Permukaan Kubus</h3>
                    <YouTubeEmbed videoId="ZfzLMpqIS7g" title="Cara Menghitung Volume dan Luas Permukaan Kubus" />
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Contoh Soal Kubus</h3>
                    <YouTubeEmbed videoId="Rl9LnUVDQKY" title="Contoh Soal Kubus" />
                  </div> */}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-6">
          <Link href="/exercises">
            <Button className="w-full" size="lg">
              Latihan Soal Kubus
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
            <Cube className="h-6 w-6" />
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
