// Notification management utilities
export class NotificationManager {
  private static instance: NotificationManager
  private isSupported = false
  private permission: NotificationPermission = "default"

  constructor() {
    this.isSupported = "Notification" in window && "serviceWorker" in navigator
    this.permission = this.isSupported ? Notification.permission : "denied"
  }

  static getInstance(): NotificationManager {
    if (!NotificationManager.instance) {
      NotificationManager.instance = new NotificationManager()
    }
    return NotificationManager.instance
  }

  // Check if notifications are supported
  isNotificationSupported(): boolean {
    return this.isSupported
  }

  // Request notification permission
  async requestPermission(): Promise<NotificationPermission> {
    if (!this.isSupported) {
      return "denied"
    }

    try {
      this.permission = await Notification.requestPermission()
      return this.permission
    } catch (error) {
      console.error("Error requesting notification permission:", error)
      return "denied"
    }
  }

  // Get current permission status
  getPermission(): NotificationPermission {
    return this.permission
  }

  // Register service worker
  async registerServiceWorker(): Promise<ServiceWorkerRegistration | null> {
    if (!("serviceWorker" in navigator)) {
      console.log("Service Worker not supported")
      return null
    }

    try {
      const registration = await navigator.serviceWorker.register("/sw.js")
      console.log("Service Worker registered successfully:", registration)
      return registration
    } catch (error) {
      console.error("Service Worker registration failed:", error)
      return null
    }
  }

  // Show immediate notification
  async showNotification(title: string, options: NotificationOptions = {}): Promise<void> {
    if (this.permission !== "granted") {
      console.log("Notification permission not granted")
      return
    }

    try {
      const registration = await this.registerServiceWorker()
      if (registration) {
        await registration.showNotification(title, {
          icon: "/icon-192x192.png",
          badge: "/badge-72x72.png",
          vibrate: [100, 50, 100],
          ...options,
        })
      }
    } catch (error) {
      console.error("Error showing notification:", error)
    }
  }

  // Schedule learning reminders
  scheduleReminders(userId: string): void {
    if (this.permission !== "granted") {
      return
    }

    // Clear existing reminders
    this.clearReminders(userId)

    // Schedule daily reminders
    const reminderTimes = [
      { hour: 9, minute: 0, message: "Selamat pagi! Yuk mulai hari dengan belajar matematika 📚" },
      { hour: 14, minute: 0, message: "Istirahat sejenak dan belajar bangun ruang yuk! 🔷" },
      { hour: 19, minute: 0, message: "Malam yang tepat untuk mengasah kemampuan matematika 🌙" },
    ]

    reminderTimes.forEach((reminder, index) => {
      const now = new Date()
      const reminderTime = new Date()
      reminderTime.setHours(reminder.hour, reminder.minute, 0, 0)

      // If the time has passed today, schedule for tomorrow
      if (reminderTime <= now) {
        reminderTime.setDate(reminderTime.getDate() + 1)
      }

      const timeUntilReminder = reminderTime.getTime() - now.getTime()

      const timeoutId = setTimeout(() => {
        this.showLearningReminder(reminder.message)
        // Reschedule for next day
        this.scheduleReminders(userId)
      }, timeUntilReminder)

      // Store timeout ID for cleanup
      localStorage.setItem(`reminder_${userId}_${index}`, timeoutId.toString())
    })

    console.log("Learning reminders scheduled for user:", userId)
  }

  // Clear existing reminders
  clearReminders(userId: string): void {
    for (let i = 0; i < 3; i++) {
      const timeoutId = localStorage.getItem(`reminder_${userId}_${i}`)
      if (timeoutId) {
        clearTimeout(Number.parseInt(timeoutId))
        localStorage.removeItem(`reminder_${userId}_${i}`)
      }
    }
  }

  // Show learning reminder notification
  private async showLearningReminder(message: string): Promise<void> {
    const motivationalMessages = [
      "Konsistensi adalah kunci sukses! Mari belajar hari ini 💪",
      "Setiap soal yang diselesaikan membawa kamu lebih dekat ke tujuan! 🎯",
      "Matematika itu menyenangkan! Ayo buktikan dengan berlatih 🧮",
      "Jangan biarkan hari ini berlalu tanpa belajar sesuatu yang baru! ✨",
      "Kemampuan matematikamu akan berkembang dengan latihan rutin 📈",
    ]

    const randomMessage = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)]

    await this.showNotification("VoluMath - Waktunya Belajar!", {
      body: message || randomMessage,
      actions: [
        {
          action: "start-learning",
          title: "Mulai Belajar",
        },
        {
          action: "remind-later",
          title: "Ingatkan Nanti",
        },
      ],
      data: {
        type: "learning-reminder",
        timestamp: Date.now(),
      },
    })
  }

  // Show achievement notification
  async showAchievementNotification(achievement: string): Promise<void> {
    await this.showNotification("Selamat! 🎉", {
      body: `Kamu berhasil ${achievement}! Terus semangat belajar!`,
      actions: [
        {
          action: "continue-learning",
          title: "Lanjut Belajar",
        },
      ],
      data: {
        type: "achievement",
        achievement,
      },
    })
  }

  // Show progress milestone notification
  async showProgressNotification(progress: number): Promise<void> {
    let message = ""
    if (progress >= 100) {
      message = "Luar biasa! Kamu telah menyelesaikan semua materi! 🏆"
    } else if (progress >= 75) {
      message = `Hebat! Progres belajarmu sudah ${progress}%! Sedikit lagi! 🔥`
    } else if (progress >= 50) {
      message = `Bagus! Kamu sudah menyelesaikan ${progress}% materi! 👏`
    } else if (progress >= 25) {
      message = `Terus semangat! Progresmu sudah ${progress}%! 💪`
    }

    if (message) {
      await this.showNotification("Update Progres Belajar", {
        body: message,
        actions: [
          {
            action: "view-progress",
            title: "Lihat Progres",
          },
        ],
      })
    }
  }
}

// Export singleton instance
export const notificationManager = NotificationManager.getInstance()
