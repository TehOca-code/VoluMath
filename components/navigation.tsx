"use client"

import type React from "react"

import { memo, useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Users, BarChart2, Settings, Shield, User, Book, NotebookText, Bell} from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/contexts/auth-context"
import { supabase } from "@/lib/supabase"

export const Navigation = memo(function Navigation() {
  const pathname = usePathname()
  const { user } = useAuth()
  const [stats, setStats] = useState({
    totalUsers: 0,
    pendingUsers: 0,
    activeToday: 0,
  })

  // Don't show navigation on auth pages
  if (pathname === "/login" || pathname === "/register") {
    return null
  }

  // Don't show bottom navigation on admin pages if using the admin layout
  if (pathname.startsWith("/admin")) {
    return null
  }

  // For admin users, show admin-specific navigation
  if (user?.role === "admin") {
    return <AdminNavigation pathname={pathname} stats={stats} />
  }

  // For regular users, show standard navigation
  return (
    <div className="fixed bottom-0 left-0 right-0 border-t bg-background z-50">
      <nav className="flex justify-around items-center h-16">
        <NavItem href="/" icon={<Home className="h-6 w-6" />} label="Beranda" isActive={pathname === "/"} />
        <NavItem
          href="/materi"
          icon={<Book                                                                                                                                                                                                                                                                                                                                                                                                                                      className="h-6 w-6" />}
          label="Materi"
          isActive={pathname === "/materi" || pathname.startsWith("/materi/")}
        />
        {user?.role === "mahasiswa" && (
          <NavItem
          href="/quiz"
          icon={<NotebookText className="h-6 w-6" />}
          label="Quiz"
          isActive={pathname === "/quiz" || pathname.startsWith("/quiz/")}
        />
        )}
        <NavItem
          href="/notifikasi"
          icon={<Bell className="h-6 w-6" />}
          label="Notifikasi"
          isActive={pathname === "/notifikasi"}
        />
        <NavItem href="/profil" icon={<User className="h-6 w-6" />} label="Profil" isActive={pathname === "/profil"} />
      </nav>
    </div>
  )
})

// Admin-specific navigation with stats
const AdminNavigation = memo(function AdminNavigation({
  pathname,
  stats,
}: {
  pathname: string
  stats: {
    totalUsers: number
    pendingUsers: number
    activeToday: number
  }
}) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      setIsLoading(true)
      try {
        // Get total users count
        const { count: totalUsersCount } = await supabase.from("users").select("*", { count: "exact", head: true })

        // Get pending users count
        const { count: pendingCount } = await supabase
          .from("users")
          .select("*", { count: "exact", head: true })
          .eq("is_confirmed", false)

        // Get users active today
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        const { count: activeTodayCount } = await supabase
          .from("users")
          .select("*", { count: "exact", head: true })
          .gte("last_active", today.toISOString())

        stats.totalUsers = totalUsersCount || 0
        stats.pendingUsers = pendingCount || 0
        stats.activeToday = activeTodayCount || 0
      } catch (err) {
        console.error("Error fetching stats:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStats()
  }, [])

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t bg-background z-50">
      <nav className="flex justify-around items-center h-16">
        <NavItem
          href="/admin"
          icon={<Shield className="h-6 w-6" />}
          label="Dashboard"
          isActive={pathname === "/admin"}
        />
        <NavItem
          href="/admin/users"
          icon={<Users className="h-6 w-6" />}
          label={isLoading ? "Pengguna" : `${stats.totalUsers}`}
          badge={stats.pendingUsers > 0 ? stats.pendingUsers.toString() : undefined}
          isActive={pathname === "/admin/users"}
        />
        <NavItem
          href="/admin/stats"
          icon={<BarChart2 className="h-6 w-6" />}
          label={isLoading ? "Statistik" : `${stats.activeToday} Aktif`}
          isActive={pathname === "/admin/stats"}
        />
        <NavItem
          href="/admin/settings"
          icon={<Settings className="h-6 w-6" />}
          label="Pengaturan"
          isActive={pathname === "/admin/settings"}
        />
      </nav>
    </div>
  )
})

const NavItem = memo(function NavItem({
  href,
  icon,
  label,
  badge,
  isActive,
}: {
  href: string
  icon: React.ReactNode
  label: string
  badge?: string
  isActive: boolean
}) {
  return (
    <Link
      href={href}
      className={cn(
        "flex flex-col items-center justify-center w-full py-1 relative",
        isActive ? "text-primary" : "text-muted-foreground",
      )}
      prefetch={false} // Disable prefetching to improve performance
    >
      {icon}
      <span className="text-xs mt-1">{label}</span>
      {badge && (
        <span className="absolute top-0 right-1/4 bg-destructive text-destructive-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {badge}
        </span>
      )}
    </Link>
  )
})
