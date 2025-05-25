"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { supabase } from "@/lib/supabase"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bell, Check, Trash2 } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { id } from "date-fns/locale"

export default function NotifikasiPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [notifications, setNotifications] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  useEffect(() => {
    const fetchNotifications = async () => {
      if (user) {
        try {
          const { data } = await supabase
            .from("notifications")
            .select("*")
            .eq("user_id", user.id)
            .order("sent_at", { ascending: false })

          setNotifications(data || [])
        } catch (error) {
          console.error("Error fetching notifications:", error)
        } finally {
          setIsLoading(false)
        }
      }
    }

    fetchNotifications()
  }, [user])

  const markAsRead = async (id: string) => {
    try {
      await supabase.from("notifications").update({ is_read: true }).eq("id", id)

      setNotifications(
        notifications.map((notification) =>
          notification.id === id ? { ...notification, is_read: true } : notification,
        ),
      )
    } catch (error) {
      console.error("Error marking notification as read:", error)
    }
  }

  const deleteNotification = async (id: string) => {
    try {
      await supabase.from("notifications").delete().eq("id", id)

      setNotifications(notifications.filter((notification) => notification.id !== id))
    } catch (error) {
      console.error("Error deleting notification:", error)
    }
  }

  const markAllAsRead = async () => {
    try {
      await supabase.from("notifications").update({ is_read: true }).eq("user_id", user?.id).eq("is_read", false)

      setNotifications(notifications.map((notification) => ({ ...notification, is_read: true })))
    } catch (error) {
      console.error("Error marking all notifications as read:", error)
    }
  }

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="container px-4 py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Notifikasi</h1>
        {notifications.some((notification) => !notification.is_read) && (
          <Button variant="outline" onClick={markAllAsRead}>
            <Check className="mr-2 h-4 w-4" /> Tandai Semua Dibaca
          </Button>
        )}
      </div>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : notifications.length > 0 ? (
        <div className="space-y-4">
          {notifications.map((notification) => (
            <Card key={notification.id} className={notification.is_read ? "bg-background" : "bg-muted/50"}>
              <CardHeader className="pb-2 flex flex-row items-start justify-between space-y-0">
                <div>
                  <CardTitle className="text-base font-medium">
                    {notification.is_read ? (
                      notification.message
                    ) : (
                      <span className="font-semibold">{notification.message}</span>
                    )}
                  </CardTitle>
                  <CardDescription>
                    {notification.sent_at &&
                      formatDistanceToNow(new Date(notification.sent_at), {
                        addSuffix: true,
                        locale: id,
                      })}
                  </CardDescription>
                </div>
                <div className="flex space-x-2">
                  {!notification.is_read && (
                    <Button variant="ghost" size="icon" onClick={() => markAsRead(notification.id)}>
                      <Check className="h-4 w-4" />
                      <span className="sr-only">Tandai dibaca</span>
                    </Button>
                  )}
                  <Button variant="ghost" size="icon" onClick={() => deleteNotification(notification.id)}>
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Hapus</span>
                  </Button>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Bell className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium">Tidak ada notifikasi</h3>
          <p className="mt-2 text-sm text-muted-foreground">Anda akan menerima notifikasi ketika ada aktivitas baru</p>
        </div>
      )}
    </div>
  )
}
