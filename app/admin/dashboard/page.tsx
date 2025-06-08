"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, CheckCircle, Home, LogOut, Users, XCircle } from "lucide-react"
import { getPendingUsers, getApprovedUsers, approveUser, rejectUser, toggleUserActive } from "@/lib/admin"
import { logout } from "@/lib/auth"
import { useRouter } from "next/navigation"
import type { UserProfile } from "@/types/user"

export default function AdminDashboardPage() {
  const router = useRouter()
  const [pendingUsers, setPendingUsers] = useState<UserProfile[]>([])
  const [approvedUsers, setApprovedUsers] = useState<UserProfile[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true)
      const pending = await getPendingUsers()
      const approved = await getApprovedUsers()
      setPendingUsers(pending)
      setApprovedUsers(approved)
      setIsLoading(false)
    }

    fetchUsers()
  }, [])

  const handleApprove = async (userId: string) => {
    const result = await approveUser(userId)
    if (result.success) {
      // Refresh data
      const pending = await getPendingUsers()
      const approved = await getApprovedUsers()
      setPendingUsers(pending)
      setApprovedUsers(approved)
    }
  }

  const handleReject = async (userId: string) => {
    const result = await rejectUser(userId)
    if (result.success) {
      // Refresh data
      const pending = await getPendingUsers()
      setPendingUsers(pending)
    }
  }

  const handleToggleActive = async (userId: string, isActive: boolean) => {
    const result = await toggleUserActive(userId, isActive)
    if (result.success) {
      // Refresh data
      const approved = await getApprovedUsers()
      setApprovedUsers(approved)
    }
  }

  const handleLogout = async () => {
    const result = await logout()
    if (result.success) {
      router.push("/profile/admin-login")
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#E9E9E7]">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-[#E9E9E7] p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/profile/admin-login">
              <Button variant="ghost" size="icon" className="rounded-full">
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">Kembali</span>
              </Button>
            </Link>
            <h1 className="text-xl font-bold">Dashboard Admin</h1>
          </div>
          <Button variant="ghost" size="icon" className="rounded-full" onClick={handleLogout}>
            <LogOut className="h-5 w-5" />
            <span className="sr-only">Logout</span>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 flex flex-col items-center justify-center">
              <div className="h-12 w-12 rounded-full bg-[#129392]/20 flex items-center justify-center mb-2">
                <Users className="h-6 w-6 text-[#129392]" />
              </div>
              <h3 className="font-medium text-center">Total Pengguna</h3>
              <p className="text-2xl font-bold">{approvedUsers.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex flex-col items-center justify-center">
              <div className="h-12 w-12 rounded-full bg-[#F38C0B]/20 flex items-center justify-center mb-2">
                <Users className="h-6 w-6 text-[#F38C0B]" />
              </div>
              <h3 className="font-medium text-center">Menunggu Persetujuan</h3>
              <p className="text-2xl font-bold">{pendingUsers.length}</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="pending">Menunggu Persetujuan</TabsTrigger>
            <TabsTrigger value="users">Pengguna Terdaftar</TabsTrigger>
          </TabsList>

          <TabsContent value="pending">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Permintaan Pendaftaran</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="text-center py-6 text-gray-500">Memuat data...</div>
                ) : pendingUsers.length === 0 ? (
                  <div className="text-center py-6 text-gray-500">
                    Tidak ada permintaan pendaftaran yang menunggu persetujuan
                  </div>
                ) : (
                  <div className="space-y-4">
                    {pendingUsers.map((user) => (
                      <Card key={user.id}>
                        <CardContent className="p-4">
                          <div className="flex flex-col gap-1 mb-3">
                            <h3 className="font-medium">{user.full_name}</h3>
                            <p className="text-sm text-gray-500">{user.email}</p>
                            <p className="text-sm text-gray-500">{user.phone}</p>
                            <p className="text-xs text-gray-400">
                              Mendaftar pada: {new Date(user.created_at).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              className="flex-1 bg-[#129392] hover:bg-[#129392]/80"
                              onClick={() => handleApprove(user.user_id)}
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Setujui
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              className="flex-1"
                              onClick={() => handleReject(user.user_id)}
                            >
                              <XCircle className="h-4 w-4 mr-1" />
                              Tolak
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Pengguna Terdaftar</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="text-center py-6 text-gray-500">Memuat data...</div>
                ) : approvedUsers.length === 0 ? (
                  <div className="text-center py-6 text-gray-500">Belum ada pengguna terdaftar</div>
                ) : (
                  <div className="space-y-4">
                    {approvedUsers.map((user) => (
                      <Card key={user.id}>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="font-medium">{user.full_name}</h3>
                              <p className="text-sm text-gray-500">{user.email}</p>
                              <p className="text-sm text-gray-500">{user.phone}</p>
                            </div>
                            <Badge className={user.is_active ? "bg-[#129392]" : "bg-[#01484C]"}>
                              {user.is_active ? "Aktif" : "Nonaktif"}
                            </Badge>
                          </div>
                          <Button
                            size="sm"
                            variant={user.is_active ? "destructive" : "default"}
                            className="w-full"
                            onClick={() => handleToggleActive(user.user_id, !user.is_active)}
                          >
                            {user.is_active ? "Nonaktifkan" : "Aktifkan"}
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Bottom Navigation */}
      <nav className="sticky bottom-0 bg-white border-t border-gray-200 p-2">
        <div className="flex items-center justify-around">
          <Link href="/admin/dashboard" className="flex flex-col items-center p-2 text-blue-600">
            <Home className="h-6 w-6" />
            <span className="text-xs">Dashboard</span>
          </Link>
          {/* <Link href="/admin/users" className="flex flex-col items-center p-2 text-gray-500">
            <Users className="h-6 w-6" />
            <span className="text-xs">Pengguna</span>
          </Link> */}
          <button onClick={handleLogout} className="flex flex-col items-center p-2 text-gray-500">
            <LogOut className="h-6 w-6" />
            <span className="text-xs">Logout</span>
          </button>
        </div>
      </nav>
    </div>
  )
}
