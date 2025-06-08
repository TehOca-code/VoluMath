// Service Worker untuk Push Notifications
self.addEventListener("install", (event) => {
  console.log("Service Worker installing...")
  self.skipWaiting()
})

self.addEventListener("activate", (event) => {
  console.log("Service Worker activating...")
  event.waitUntil(self.clients.claim())
})

// Handle push notifications
self.addEventListener("push", (event) => {
  console.log("Push notification received:", event)

  const options = {
    body: event.data ? event.data.text() : "Waktunya belajar matematika!",
    icon: "/icon-192x192.png",
    badge: "/badge-72x72.png",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
    actions: [
      {
        action: "explore",
        title: "Mulai Belajar",
        icon: "/icon-explore.png",
      },
      {
        action: "close",
        title: "Nanti Saja",
        icon: "/icon-close.png",
      },
    ],
  }

  event.waitUntil(self.registration.showNotification("VoluMath - Belajar Matematika", options))
})

// Handle notification clicks
self.addEventListener("notificationclick", (event) => {
  console.log("Notification click received:", event)

  event.notification.close()

  if (event.action === "explore") {
    // Open the app and navigate to exercises
    event.waitUntil(self.clients.openWindow("/exercises"))
  } else if (event.action === "close") {
    // Just close the notification
    console.log("Notification dismissed")
  } else {
    // Default action - open the app
    event.waitUntil(self.clients.openWindow("/"))
  }
})
