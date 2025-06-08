"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Bell, BellOff, Settings } from "lucide-react"
import { notificationManager } from "@/lib/notifications"
import { supabase } from "@/lib/supabase"

export function NotificationSetup() {
  const [isSupported, setIsSupported] = useState(false)
  const [permission, setPermission] = useState<NotificationPermission>("default")
  const [isEnabled, setIsEnabled] = useState(false)
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Check notification support and current permission
    setIsSupported(notificationManager.isNotificationSupported())
    setPermission(notificationManager.getPermission())
    setIsEnabled(notificationManager.getPermission() === "granted")

    // Get current user
    async function getCurrentUser() {
      const { data: sessionData } = await supabase.auth.getSession()
      if (sessionData.session) {
        setUser(sessionData.session.user)

        // Check if reminders are already scheduled
        const hasReminders = localStorage.getItem(`reminder_${sessionData.session.user.id}_0`)
        if (hasReminders && permission === "granted") {
          setIsEnabled(true)
        }
      }
    }

    getCurrentUser()
  }, [permission])

  const handleEnableNotifications = async () => {
    setIsLoading(true)

    try {
      if (permission !== "granted") {
        const newPermission = await notificationManager.requestPermission()
        setPermission(newPermission)

        if (newPermission === "granted") {
          await notificationManager.registerServiceWorker()
          setIsEnabled(true)

          if (user) {
            notificationManager.scheduleReminders(user.id)
          }

          // Show welcome notification
          await notificationManager.showNotification("Notifikasi Aktif! 🔔", {
            body: "Kamu akan mendapat pengingat belajar setiap hari. Semangat!",
            actions: [
              {
                action: "start-learning",
                title: "Mulai Belajar Sekarang",
              },
            ],
          })
        }
      } else {
        setIsEnabled(true)
        if (user) {
          notificationManager.scheduleReminders(user.id)
        }
      }
    } catch (error) {
      console.error("Error enabling notifications:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDisableNotifications = () => {
    setIsEnabled(false)
    if (user) {
      notificationManager.clearReminders(user.id)
    }
  }

  const handleTestNotification = async () => {
    await notificationManager.showLearningReminder("Ini adalah notifikasi percobaan! 🧪")
  }

  if (!isSupported) {
    return (
      <Card className="bg-white shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg text-[#01484C] flex items-center gap-2">
            <BellOff className="h-5 w-5" />
            Notifikasi Tidak Didukung
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">
            Browser Anda tidak mendukung push notification. Silakan gunakan browser yang lebih modern.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-white shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg text-[#01484C] flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Pengingat Belajar
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-[#01484C]">Aktifkan Pengingat</p>
            <p className="text-xs text-gray-500">Dapatkan notifikasi harian untuk mengingatkan waktu belajar</p>
          </div>
          <Switch
            checked={isEnabled && permission === "granted"}
            onCheckedChange={(checked) => {
              if (checked) {
                handleEnableNotifications()
              } else {
                handleDisableNotifications()
              }
            }}
            disabled={isLoading}
          />
        </div>

        {permission === "denied" && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-700">Notifikasi diblokir. Silakan aktifkan di pengaturan browser Anda.</p>
          </div>
        )}

        {permission === "granted" && isEnabled && (
          <div className="space-y-3">
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-700">✅ Pengingat belajar aktif! Kamu akan mendapat notifikasi pada:</p>
              <ul className="text-xs text-green-600 mt-2 space-y-1">
                <li>• 09:00 - Pengingat pagi</li>
                <li>• 14:00 - Pengingat siang</li>
                <li>• 19:00 - Pengingat malam</li>
              </ul>
            </div>

            <Button onClick={handleTestNotification} variant="outline" size="sm" className="w-full">
              <Settings className="h-4 w-4 mr-2" />
              Test Notifikasi
            </Button>
          </div>
        )}

        {!user && (
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-700">Silakan login untuk mengaktifkan pengingat belajar personal.</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
