"use client"

import type React from "react"

import { memo } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Shield, Users, LogOut, PieChart } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { useIsMobile } from "@/hooks/use-mobile"

export const AdminNavigation = memo(function AdminNavigation() {
  const pathname = usePathname()
  const { user, signOut } = useAuth()
  const router = useRouter()
  const isMobile = useIsMobile()

  // Only show for admin users and on admin pages
  if (!user || user.role !== "admin" || !pathname.startsWith("/admin")) {
    return null
  }

  const handleBackToMain = () => {
    router.push("/")
  }

  return (
    <div className="fixed top-0 left-0 right-0 border-b bg-background z-50 shadow-sm">
      <div className="container flex items-center justify-between h-16 px-4">
        <div className="flex items-center">
          <Shield className="h-6 w-6 text-primary mr-2" />
          <span className="font-bold">Admin Dashboard</span>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={handleBackToMain}>
            {isMobile ? "Kembali" : "Kembali ke Aplikasi"}
          </Button>
          <Button variant="ghost" size="sm" onClick={() => signOut()}>
            <LogOut className="h-4 w-4" />
            {!isMobile && <span className="ml-2">Keluar</span>}
          </Button>
        </div>
      </div>

      <nav className="container flex items-center justify-center h-12 px-4 border-t bg-muted/30">
        <div className="flex items-center justify-center space-x-2">
          <NavItem
            href="/admin"
            icon={<PieChart className="h-5 w-5" />}
            label={isMobile ? "" : "Ringkasan"}
            isActive={pathname === "/admin"}
          />
          <NavItem
            href="/admin/users"
            icon={<Users className="h-5 w-5" />}
            label={isMobile ? "" : "Pengguna"}
            isActive={pathname === "/admin/users"}
          />
        </div>
      </nav>
    </div>
  )
})

const NavItem = memo(function NavItem({
  href,
  icon,
  label,
  isActive,
}: {
  href: string
  icon: React.ReactNode
  label: string
  isActive: boolean
}) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center justify-center px-4 py-2 rounded-md text-sm transition-colors",
        label ? "min-w-[120px]" : "min-w-[48px]",
        isActive
          ? "bg-primary text-primary-foreground font-medium"
          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
      )}
      prefetch={false} // Disable prefetching to improve performance
    >
      {icon}
      {label && <span className="ml-2">{label}</span>}
    </Link>
  )
})
