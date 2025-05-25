import type React from "react"
import { AdminNavigation } from "@/components/admin-navigation"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <AdminNavigation />
      <main className="flex-1 pt-28 pb-6">{children}</main>
    </div>
  )
}
