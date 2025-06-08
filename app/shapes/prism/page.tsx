"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, BookOpen, Calculator, FileText, Hexagon, Video } from "lucide-react"
import { YouTubeEmbed } from "@/components/youtube-embed"
import { PDFDownload } from "@/components/pdf-download"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@/components/ui/breadcrumb"

export default function PrismDetailPage() {
  const [baseLength, setBaseLength] = useState("6")
  const [baseHeight, setBaseHeight] = useState("4")
  const [prismHeight, setPrismHeight] = useState("10")

  const a = Number.parseFloat(baseLength) || 0
  const b = Number.parseFloat(baseHeight) || 0
  const h = Number.parseFloat(prismHeight) || 0

  const baseArea = (a * b) / 2
  const lateralArea = 3 * a * h
  const surfaceArea = 2 * baseArea + lateralArea
  const volume = baseArea * h

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
          <h1 className="text-xl font-bold">Prisma</h1>
        </div>
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink href="/shapes">Materi Ruang</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4">
        <div className="flex justify-center mb-6">
          <div className="relative h-48 w-48">
            <Image
              src="/placeholder.svg?height=192&width=192"
              alt="Prisma"
              width={192}
              height={192}
              className="object-contain"
            />
            <div className="absolute inset-0 flex items-center justify-center text-purple-800 font-bold">Prisma</div>
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
                <h2 className="text-lg font-semibold">Apa itu Prisma?</h2>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 mb-4">
                      Prisma adalah bangun ruang tiga dimensi yang dibatasi oleh alas dan tutup yang berbentuk segi-n
                      yang kongruen dan sejajar, serta sisi-sisi tegak berbentuk persegi panjang atau jajargenjang.
                      Prisma dinamai berdasarkan bentuk alasnya, misalnya prisma segitiga, prisma segiempat (balok),
                      prisma segilima, dan seterusnya.
                    </p>

                    <div className="relative h-40 w-full md:hidden mb-4">
                      <Image
                        src="/placeholder.svg?height=160&width=320"
                        alt="Bagian-bagian Prisma"
                        width={320}
                        height={160}
                        className="object-contain"
                      />
                    </div>

                    <h3 className="font-medium mt-4">Sifat-sifat Prisma:</h3>
                    <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                      <li>Memiliki alas dan tutup yang kongruen dan sejajar</li>
                      <li>Memiliki sisi tegak berbentuk persegi panjang atau jajargenjang</li>
                      <li>Memiliki rusuk tegak yang sama panjang dan sejajar</li>
                      <li>Banyaknya sisi = n + 2, dimana n adalah jumlah sisi alas</li>
                      <li>Banyaknya rusuk = 3n, dimana n adalah jumlah sisi alas</li>
                      <li>Banyaknya titik sudut = 2n, dimana n adalah jumlah sisi alas</li>
                    </ul>
                  </div>
                  <div className="hidden md:block flex-1">
                    <div className="relative h-full w-full">
                      <Image
                        src="/placeholder.svg?height=300&width=300"
                        alt="Bagian-bagian Prisma"
                        width={300}
                        height={300}
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>

                <h3 className="font-medium mt-4">Jenis-jenis Prisma:</h3>
                <div className="space-y-2 text-sm text-gray-700">
                  <p>
                    <strong>Prisma Segitiga:</strong> Prisma dengan alas berbentuk segitiga.
                  </p>
                  <p>
                    <strong>Prisma Segiempat:</strong> Prisma dengan alas berbentuk segiempat. Balok adalah prisma
                    segiempat dengan alas berbentuk persegi panjang.
                  </p>
                  <p>
                    <strong>Prisma Segilima:</strong> Prisma dengan alas berbentuk segilima.
                  </p>
                  <p>
                    <strong>Prisma Segienam:</strong> Prisma dengan alas berbentuk segienam.
                  </p>
                  <p>
                    <strong>Prisma Tegak:</strong> Prisma yang rusuk tegaknya tegak lurus terhadap bidang alas.
                  </p>
                  <p>
                    <strong>Prisma Miring:</strong> Prisma yang rusuk tegaknya tidak tegak lurus terhadap bidang alas.
                  </p>
                </div>

                <h3 className="font-medium mt-4">Bagian-bagian Prisma:</h3>
                <div className="space-y-2 text-sm text-gray-700">
                  <p>
                    <strong>Alas dan Tutup:</strong> Bidang berbentuk segi-n yang kongruen dan sejajar.
                  </p>
                  <p>
                    <strong>Sisi Tegak:</strong> Bidang berbentuk persegi panjang atau jajargenjang yang menghubungkan
                    alas dan tutup.
                  </p>
                  <p>
                    <strong>Rusuk Alas:</strong> Garis yang merupakan pertemuan dua sisi pada alas.
                  </p>
                  <p>
                    <strong>Rusuk Tegak:</strong> Garis yang menghubungkan titik sudut alas dengan titik sudut tutup
                    yang bersesuaian.
                  </p>
                  <p>
                    <strong>Titik Sudut:</strong> Titik pertemuan tiga rusuk.
                  </p>
                  <p>
                    <strong>Tinggi Prisma:</strong> Jarak antara bidang alas dan bidang tutup.
                  </p>
                  <p>
                    <strong>Diagonal Sisi:</strong> Garis yang menghubungkan dua titik sudut yang tidak berdekatan pada
                    satu sisi.
                  </p>
                  <p>
                    <strong>Diagonal Ruang:</strong> Garis yang menghubungkan titik sudut pada alas dengan titik sudut
                    pada tutup yang tidak bersesuaian.
                  </p>
                </div>

                <h3 className="font-medium mt-4">Contoh Prisma dalam Kehidupan Sehari-hari:</h3>
                <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                  <li>Atap rumah berbentuk prisma segitiga</li>
                  <li>Tenda kemah</li>
                  <li>Cokelat batangan Toblerone</li>
                  <li>Kemasan makanan berbentuk prisma</li>
                  <li>Penggaris segitiga</li>
                </ul>

                <div className="mt-4">
                  <PDFDownload url="#" title="Materi Lengkap Prisma" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rumus">
            <Card>
              <CardContent className="p-4 space-y-4">
                <h2 className="text-lg font-semibold">Rumus Prisma</h2>

                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <h3 className="font-medium">Volume Prisma</h3>
                    <div className="mt-1 text-center font-mono text-lg">V = Luas alas × tinggi</div>
                    <p className="text-xs text-gray-600 mt-1">Dimana tinggi adalah jarak antara alas dan tutup</p>
                  </div>

                  <div className="p-3 bg-green-50 rounded-lg">
                    <h3 className="font-medium">Luas Permukaan Prisma</h3>
                    <div className="mt-1 text-center font-mono text-lg">
                      LP = 2 × Luas alas + Luas selimut
                      <br />= 2 × Luas alas + (keliling alas × tinggi)
                    </div>
                    <p className="text-xs text-gray-600 mt-1">
                      Dimana keliling alas adalah jumlah panjang semua sisi alas
                    </p>
                  </div>

                  <div className="p-3 bg-purple-50 rounded-lg">
                    <h3 className="font-medium">Luas Selimut Prisma</h3>
                    <div className="mt-1 text-center font-mono text-lg">
                      L<sub>selimut</sub> = keliling alas × tinggi
                    </div>
                    <p className="text-xs text-gray-600 mt-1">
                      Dimana keliling alas adalah jumlah panjang semua sisi alas
                    </p>
                  </div>
                </div>

                <h3 className="font-medium mt-4">Rumus Khusus Prisma Segitiga:</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-yellow-50 rounded-lg">
                    <h3 className="font-medium">Luas Alas Prisma Segitiga</h3>
                    <div className="mt-1 text-center font-mono text-lg">
                      L<sub>alas</sub> = (1/2) × alas segitiga × tinggi segitiga
                    </div>
                  </div>

                  <div className="p-3 bg-red-50 rounded-lg">
                    <h3 className="font-medium">Keliling Alas Prisma Segitiga</h3>
                    <div className="mt-1 text-center font-mono text-lg">
                      K<sub>alas</sub> = sisi a + sisi b + sisi c
                    </div>
                    <p className="text-xs text-gray-600 mt-1">Dimana a, b, dan c adalah panjang sisi-sisi segitiga</p>
                  </div>

                  <div className="p-3 bg-orange-50 rounded-lg">
                    <h3 className="font-medium">Volume Prisma Segitiga</h3>
                    <div className="mt-1 text-center font-mono text-lg">
                      V = (1/2) × alas segitiga × tinggi segitiga × tinggi prisma
                    </div>
                  </div>
                </div>

                <h3 className="font-medium mt-4">Contoh Soal:</h3>
                <div className="space-y-4">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="font-medium">Soal 1:</p>
                    <p className="text-sm text-gray-700 mt-1">
                      Sebuah prisma segitiga memiliki alas berbentuk segitiga dengan panjang alas 6 cm dan tinggi 4 cm.
                      Jika tinggi prisma 10 cm, hitunglah volume prisma tersebut!
                    </p>
                    <div className="mt-2 p-2 bg-white rounded border">
                      <p className="text-sm font-medium">Penyelesaian:</p>
                      <p className="text-sm">
                        Luas alas = (1/2) × alas segitiga × tinggi segitiga
                        <br />= (1/2) × 6 × 4
                        <br />= 12 cm<sup>2</sup>
                        <br />
                        <br />
                        Volume prisma = Luas alas × tinggi prisma
                        <br />= 12 × 10
                        <br />= 120 cm<sup>3</sup>
                      </p>
                    </div>
                  </div>

                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="font-medium">Soal 2:</p>
                    <p className="text-sm text-gray-700 mt-1">
                      Sebuah prisma segitiga memiliki alas berbentuk segitiga sama sisi dengan panjang sisi 5 cm. Jika
                      tinggi prisma 12 cm, hitunglah luas permukaan prisma tersebut!
                    </p>
                    <div className="mt-2 p-2 bg-white rounded border">
                      <p className="text-sm font-medium">Penyelesaian:</p>
                      <p className="text-sm">
                        Tinggi segitiga sama sisi = (√3/2) × sisi
                        <br />= (√3/2) × 5
                        <br />= 4,33 cm
                        <br />
                        <br />
                        Luas alas = (1/2) × alas segitiga × tinggi segitiga
                        <br />= (1/2) × 5 × 4,33
                        <br />= 10,83 cm<sup>2</sup>
                        <br />
                        <br />
                        Keliling alas = 3 × sisi
                        <br />= 3 × 5
                        <br />= 15 cm
                        <br />
                        <br />
                        Luas selimut = keliling alas × tinggi prisma
                        <br />= 15 × 12
                        <br />= 180 cm<sup>2</sup>
                        <br />
                        <br />
                        Luas permukaan prisma = 2 × Luas alas + Luas selimut
                        <br />= 2 × 10,83 + 180
                        <br />= 21,66 + 180
                        <br />= 201,66 cm<sup>2</sup>
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
                <h2 className="text-lg font-semibold">Kalkulator Prisma Segitiga</h2>

                <div className="space-y-3">
                  <div className="space-y-2">
                    <label htmlFor="base-length" className="text-sm font-medium">
                      Panjang Alas Segitiga
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
                    <label htmlFor="base-height" className="text-sm font-medium">
                      Tinggi Segitiga
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        id="base-height"
                        type="number"
                        value={baseHeight}
                        onChange={(e) => setBaseHeight(e.target.value)}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                      <span className="text-sm">cm</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="prism-height" className="text-sm font-medium">
                      Tinggi Prisma
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        id="prism-height"
                        type="number"
                        value={prismHeight}
                        onChange={(e) => setPrismHeight(e.target.value)}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                      <span className="text-sm">cm</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3 mt-4">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <h3 className="font-medium">Volume Prisma</h3>
                      <div className="mt-1 text-center font-mono text-lg">
                        {volume.toFixed(2)} cm<sup>3</sup>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">
                        V = (1/2) × {a} × {b} × {h} = {volume.toFixed(2)} cm<sup>3</sup>
                      </p>
                    </div>

                    <div className="p-3 bg-yellow-50 rounded-lg">
                      <h3 className="font-medium">Luas Alas</h3>
                      <div className="mt-1 text-center font-mono text-lg">
                        {baseArea.toFixed(2)} cm<sup>2</sup>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">
                        L<sub>alas</sub> = (1/2) × {a} × {b} = {baseArea.toFixed(2)} cm<sup>2</sup>
                      </p>
                    </div>

                    <div className="p-3 bg-green-50 rounded-lg">
                      <h3 className="font-medium">Luas Permukaan Prisma</h3>
                      <div className="mt-1 text-center font-mono text-lg">
                        {surfaceArea.toFixed(2)} cm<sup>2</sup>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">
                        LP = 2 × {baseArea.toFixed(2)} + {lateralArea.toFixed(2)} = {surfaceArea.toFixed(2)} cm
                        <sup>2</sup>
                      </p>
                    </div>

                    <div className="p-3 bg-purple-50 rounded-lg">
                      <h3 className="font-medium">Luas Selimut Prisma</h3>
                      <div className="mt-1 text-center font-mono text-lg">
                        {lateralArea.toFixed(2)} cm<sup>2</sup>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">
                        L<sub>selimut</sub> = 3 × {a} × {h} = {lateralArea.toFixed(2)} cm<sup>2</sup>
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
                <h2 className="text-lg font-semibold">Video Pembelajaran Prisma</h2>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Penjelasan Prisma dan Sifat-sifatnya</h3>
                    <YouTubeEmbed videoId="XNmQr6hEoGw" title="Penjelasan Prisma dan Sifat-sifatnya" />
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Cara Menghitung Volume dan Luas Permukaan Prisma</h3>
                    <YouTubeEmbed videoId="ZfzLMpqIS7g" title="Cara Menghitung Volume dan Luas Permukaan Prisma" />
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Contoh Soal Prisma</h3>
                    <YouTubeEmbed videoId="Rl9LnUVDQKY" title="Contoh Soal Prisma" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-6">
          <Link href="/exercises">
            <Button className="w-full" size="lg">
              Latihan Soal Prisma
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
            <Hexagon className="h-6 w-6" />
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
