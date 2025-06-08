"use client"

import { useEffect, useState } from "react"
import { notificationManager } from "@/lib/notifications"
import { supabase } from "@/lib/supabase"

export function useNotifications() {
  const [user, setUser] = useState(null)
  const [isEnabled, setIsEnabled] = useState(false)

  useEffect(() => {
    async function initializeNotifications() {
      // Get current user
      const { data: sessionData } = await supabase.auth.getSession()
      if (sessionData.session) {
        setUser(sessionData.session.user)

        // Check if notifications are enabled
        const permission = notificationManager.getPermission()
        const hasReminders = localStorage.getItem(`reminder_${sessionData.session.user.id}_0`)
        setIsEnabled(permission === "granted" && !!hasReminders)
      }
    }

    initializeNotifications()
  }, [])

  // Trigger achievement notification
  const showAchievement = async (achievement: string) => {
    if (isEnabled) {
      await notificationManager.showAchievementNotification(achievement)
    }
  }

  // Trigger progress notification
  const showProgress = async (progress: number) => {
    if (isEnabled) {
      await notificationManager.showProgressNotification(progress)
    }
  }

  // Show custom notification
  const showCustomNotification = async (title: string, message: string) => {
    if (isEnabled) {
      await notificationManager.showNotification(title, { body: message })
    }
  }

  return {
    user,
    isEnabled,
    showAchievement,
    showProgress,
    showCustomNotification,
  }
}
