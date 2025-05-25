"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, X, UserCheck, Users, Search, Filter, PieChart } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { id } from "date-fns/locale"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AdminUsersPage() {
  const { user, loading, confirmUser, rejectUser } = useAuth()
  const router = useRouter()
  const [pendingUsers, setPendingUsers] = useState<any[]>([])
  const [activeUsers, setActiveUsers] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [processingUser, setProcessingUser] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState<string>("all")

  useEffect(() => {
    if (!loading && (!user || user.role !== "admin")) {
      router.replace("/")
      return
    }

    if (user && user.role === "admin") {
      fetchUsers()
    }
  }, [user, loading, router])

  const fetchUsers = async () => {
    setIsLoading(true)
    try {
      // Get pending users
      const { data: pendingData } = await supabase
        .from("users")
        .select("*")
        .eq("is_confirmed", false)
        .order("created_at", { ascending: false })

      setPendingUsers(pendingData || [])

      // Get active users
      const { data: activeData } = await supabase
        .from("users")
        .select("*")
        .eq("is_confirmed", true)
        .order("last_active", { ascending: false })

      setActiveUsers(activeData || [])
    } catch (err) {
      console.error("Error fetching users:", err)
      setError("Gagal memuat data pengguna")
    } finally {
      setIsLoading(false)
    }
  }

  const handleConfirmUser = async (userId: string) => {
    setProcessingUser(userId)
    setError(null)
    setSuccess(null)

    try {
      if (!confirmUser) return

      const { error } = await confirmUser(userId)

      if (error) {
        throw error
      }

      setSuccess("Pengguna berhasil dikonfirmasi")
      // Update the lists
      setPendingUsers(pendingUsers.filter((user) => user.id !== userId))
      fetchUsers()
    } catch (err: any) {
      setError(err.message || "Gagal mengkonfirmasi pengguna")
    } finally {
      setProcessingUser(null)
    }
  }

  const handleRejectUser = async (userId: string) => {
    setProcessingUser(userId)
    setError(null)
    setSuccess(null)

    try {
      if (!rejectUser) return

      const { error } = await rejectUser(userId)

      if (error) {
        throw error
      }

      setSuccess("Pengguna berhasil ditolak")
      // Update the list
      setPendingUsers(pendingUsers.filter((user) => user.id !== userId))
    } catch (err: any) {
      setError(err.message || "Gagal menolak pengguna")
    } finally {
      setProcessingUser(null)
    }
  }

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "admin":
        return "destructive"
      case "dosen":
        return "default"
      case "mahasiswa":
        return "secondary"
      default:
        return "outline"
    }
  }

  const filteredActiveUsers = activeUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesRole = roleFilter === "all" || user.role === roleFilter

    return matchesSearch && matchesRole
  })

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (user.role !== "admin") {
    return (
      <div className="container px-4 py-6">
        <Alert variant="destructive">
          <AlertDescription>Anda tidak memiliki akses ke halaman ini</AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="container px-4 py-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Pengguna</h1>
          <p className="text-muted-foreground">Kelola dan konfirmasi pengguna</p>
        </div>
        <Button variant="outline" onClick={() => router.push("/admin")}>
          <PieChart className="mr-2 h-4 w-4" />
          Ringkasan
        </Button>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-300">
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue={pendingUsers.length > 0 ? "pending" : "active"}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="pending" className="flex items-center gap-2">
            <UserCheck className="h-4 w-4" />
            <span>Konfirmasi Pendaftaran</span>
            {pendingUsers.length > 0 && (
              <Badge variant="destructive" className="ml-2">
                {pendingUsers.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="active" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>Pengguna Aktif</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCheck className="h-5 w-5" />
                Konfirmasi Pendaftaran
              </CardTitle>
              <CardDescription>Konfirmasi atau tolak pendaftaran pengguna baru</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                </div>
              ) : pendingUsers.length > 0 ? (
                <div className="space-y-4">
                  {pendingUsers.map((pendingUser) => (
                    <Card
                      key={pendingUser.id}
                      className="border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-950/10"
                    >
                      <CardContent className="p-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <div className="bg-amber-100 dark:bg-amber-900/30 h-10 w-10 rounded-full flex items-center justify-center">
                              <span className="font-semibold text-amber-700 dark:text-amber-400">
                                {pendingUser.name.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div>
                              <h3 className="font-medium">{pendingUser.name}</h3>
                              <p className="text-sm text-muted-foreground">{pendingUser.email}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant={getRoleBadgeVariant(pendingUser.role)}>{pendingUser.role}</Badge>
                                <span className="text-xs text-muted-foreground">
                                  Mendaftar{" "}
                                  {formatDistanceToNow(new Date(pendingUser.created_at || Date.now()), {
                                    addSuffix: true,
                                    locale: id,
                                  })}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2 self-end sm:self-auto">
                            <Button
                              variant="outline"
                              className="border-green-300 bg-green-100 text-green-700 hover:bg-green-200 dark:border-green-800 dark:bg-green-900/20 dark:text-green-400 dark:hover:bg-green-900/40"
                              onClick={() => handleConfirmUser(pendingUser.id)}
                              disabled={processingUser === pendingUser.id}
                            >
                              <Check className="mr-1 h-4 w-4" />
                              Konfirmasi
                            </Button>
                            <Button
                              variant="outline"
                              className="border-red-300 bg-red-100 text-red-700 hover:bg-red-200 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/40"
                              onClick={() => handleRejectUser(pendingUser.id)}
                              disabled={processingUser === pendingUser.id}
                            >
                              <X className="mr-1 h-4 w-4" />
                              Tolak
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <UserCheck className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">Tidak ada pendaftaran yang menunggu konfirmasi</h3>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="active" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Pengguna Aktif
              </CardTitle>
              <CardDescription>Daftar pengguna yang aktif dalam sistem</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Cari pengguna..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <Select value={roleFilter} onValueChange={setRoleFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter peran" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua Peran</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="dosen">Dosen</SelectItem>
                      <SelectItem value="mahasiswa">Mahasiswa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {isLoading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                </div>
              ) : filteredActiveUsers.length > 0 ? (
                <div className="overflow-x-auto rounded-md border">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="text-left py-3 px-4 font-medium">Nama</th>
                        <th className="text-left py-3 px-4 font-medium">Email</th>
                        <th className="text-left py-3 px-4 font-medium">Peran</th>
                        <th className="text-left py-3 px-4 font-medium">Terakhir Aktif</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {filteredActiveUsers.map((activeUser) => (
                        <tr key={activeUser.id} className="hover:bg-muted/30">
                          <td className="py-3 px-4">{activeUser.name}</td>
                          <td className="py-3 px-4">{activeUser.email}</td>
                          <td className="py-3 px-4">
                            <Badge variant={getRoleBadgeVariant(activeUser.role)}>{activeUser.role}</Badge>
                          </td>
                          <td className="py-3 px-4">
                            {activeUser.last_active
                              ? formatDistanceToNow(new Date(activeUser.last_active), { addSuffix: true, locale: id })
                              : "Belum pernah"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Users className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">Tidak ada pengguna aktif ditemukan</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {searchQuery || roleFilter !== "all"
                      ? "Coba ubah filter pencarian Anda"
                      : "Belum ada pengguna aktif dalam sistem"}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
