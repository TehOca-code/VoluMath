"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Eye, EyeOff, Check, X } from "lucide-react"
import { registerUser } from "@/lib/auth"

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState<"success" | "error" | null>(null)
  const router = useRouter()

  // Password validation
  const passwordValidation = {
    minLength: formData.password.length >= 8,
    hasUppercase: /[A-Z]/.test(formData.password),
    hasLowercase: /[a-z]/.test(formData.password),
    hasNumber: /\d/.test(formData.password),
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(formData.password),
    passwordsMatch: formData.password === formData.confirmPassword && formData.confirmPassword !== "",
  }

  const isPasswordValid = Object.values(passwordValidation).every(Boolean)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isPasswordValid) {
      setStatus("error")
      setMessage("Pastikan semua kriteria password terpenuhi.")
      return
    }

    setIsLoading(true)
    setMessage("")
    setStatus(null)

    try {
      const result = await registerUser(formData.email, formData.fullName, formData.phone, formData.password)

      if (result.success) {
        setStatus("success")
        setMessage("Pendaftaran berhasil! Akun Anda akan diverifikasi oleh admin. Silakan tunggu konfirmasi.")

        // Reset form
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          password: "",
          confirmPassword: "",
        })

        // Redirect ke login setelah 3 detik
        setTimeout(() => {
          router.push("/profile/login")
        }, 3000)
      } else {
        setStatus("error")
        setMessage("Terjadi kesalahan saat mendaftar. Silakan coba lagi.")
      }
    } catch (error) {
      console.error("Error registering:", error)
      setStatus("error")
      setMessage("Terjadi kesalahan. Silakan coba lagi.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#F38C0B]">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-[#01484C] p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <Link href="/profile">
            <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-[#129392]">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Kembali</span>
            </Button>
          </Link>
          <h1 className="text-xl font-bold text-white">Daftar</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 flex items-center justify-center">
        <Card className="w-full max-w-md bg-white">
          <CardHeader>
            <CardTitle className="text-[#01484C]">Buat Akun Baru</CardTitle>
            <CardDescription>Isi formulir di bawah untuk mendaftar ke aplikasi Kubika.</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-[#01484C]">
                  Nama Lengkap
                </Label>
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="Masukkan nama lengkap"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  disabled={isLoading}
                  className="border-gray-300 focus:border-[#129392] focus:ring-[#129392]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#01484C]">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="nama@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  disabled={isLoading}
                  className="border-gray-300 focus:border-[#129392] focus:ring-[#129392]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-[#01484C]">
                  Nomor Telepon
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="08xxxxxxxxxx"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  disabled={isLoading}
                  className="border-gray-300 focus:border-[#129392] focus:ring-[#129392]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-[#01484C]">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Buat password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading}
                    className="border-gray-300 focus:border-[#129392] focus:ring-[#129392] pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-[#01484C]">
                  Konfirmasi Password
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Ulangi password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading}
                    className="border-gray-300 focus:border-[#129392] focus:ring-[#129392] pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    disabled={isLoading}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Password Requirements */}
              {formData.password && (
                <div className="p-3 bg-gray-50 rounded-md">
                  <p className="text-sm font-medium text-[#01484C] mb-2">Kriteria Password:</p>
                  <div className="space-y-1">
                    {Object.entries({
                      "Minimal 8 karakter": passwordValidation.minLength,
                      "Huruf besar (A-Z)": passwordValidation.hasUppercase,
                      "Huruf kecil (a-z)": passwordValidation.hasLowercase,
                      "Angka (0-9)": passwordValidation.hasNumber,
                      "Karakter khusus (!@#$%^&*)": passwordValidation.hasSpecialChar,
                    }).map(([requirement, isValid]) => (
                      <div key={requirement} className="flex items-center gap-2">
                        {isValid ? (
                          <Check className="h-4 w-4 text-green-600" />
                        ) : (
                          <X className="h-4 w-4 text-red-600" />
                        )}
                        <span className={`text-sm ${isValid ? "text-green-600" : "text-red-600"}`}>{requirement}</span>
                      </div>
                    ))}
                    {formData.confirmPassword && (
                      <div className="flex items-center gap-2">
                        {passwordValidation.passwordsMatch ? (
                          <Check className="h-4 w-4 text-green-600" />
                        ) : (
                          <X className="h-4 w-4 text-red-600" />
                        )}
                        <span
                          className={`text-sm ${passwordValidation.passwordsMatch ? "text-green-600" : "text-red-600"}`}
                        >
                          Password cocok
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {message && (
                <div
                  className={`p-3 rounded-md ${
                    status === "success" ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"
                  }`}
                >
                  <p className={`text-sm ${status === "success" ? "text-green-600" : "text-red-600"}`}>{message}</p>
                </div>
              )}

              <div className="text-center">
                <Link href="/profile/login" className="text-sm text-[#129392] hover:text-[#01484C] hover:underline">
                  Sudah punya akun? Masuk di sini
                </Link>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                type="submit"
                className="w-full bg-[#01484C] hover:bg-[#129392] text-white"
                disabled={isLoading || !isPasswordValid}
              >
                {isLoading ? "Mendaftar..." : "Daftar"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </main>

      {/* Bottom Navigation */}
      <nav className="sticky bottom-0 bg-[#01484C] border-t border-gray-200 p-2">
        <div className="flex items-center justify-around">
          <Link href="/" className="flex flex-col items-center p-2 text-[#129392]">
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
          <Link href="/shapes" className="flex flex-col items-center p-2 text-[#129392]">
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
          <Link href="/exercises" className="flex flex-col items-center p-2 text-[#129392]">
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
          <Link href="/profile" className="flex flex-col items-center p-2 text-[#F38C0B]">
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
