"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { supabase } from "@/lib/supabase"
import { CheckCircle, XCircle, Loader2 } from "lucide-react"

export default function TestConnectionPage() {
  const [connectionStatus, setConnectionStatus] = useState<{
    database: "loading" | "success" | "error"
    auth: "loading" | "success" | "error"
    storage: "loading" | "success" | "error"
  }>({
    database: "loading",
    auth: "loading",
    storage: "loading",
  })

  const [logs, setLogs] = useState<string[]>([])

  const addLog = (message: string) => {
    setLogs((prev) => [...prev, `${new Date().toLocaleTimeString()}: ${message}`])
  }

  const testConnection = async () => {
    setConnectionStatus({
      database: "loading",
      auth: "loading",
      storage: "loading",
    })
    setLogs([])

    addLog("🔄 Starting connection tests...")

    // Test Database
    try {
      addLog("Testing database connection...")
      const { error } = await supabase.from("user_profiles").select("count", { count: "exact", head: true })

      if (error) {
        if (error.message.includes("relation") && error.message.includes("does not exist")) {
          addLog("✅ Database connected (tables need to be created)")
          setConnectionStatus((prev) => ({ ...prev, database: "success" }))
        } else {
          addLog(`❌ Database error: ${error.message}`)
          setConnectionStatus((prev) => ({ ...prev, database: "error" }))
        }
      } else {
        addLog("✅ Database connection successful!")
        setConnectionStatus((prev) => ({ ...prev, database: "success" }))
      }
    } catch (error) {
      addLog(`❌ Database connection failed: ${error}`)
      setConnectionStatus((prev) => ({ ...prev, database: "error" }))
    }

    // Test Auth
    try {
      addLog("Testing auth service...")
      const { error } = await supabase.auth.getSession()

      if (error) {
        addLog(`❌ Auth error: ${error.message}`)
        setConnectionStatus((prev) => ({ ...prev, auth: "error" }))
      } else {
        addLog("✅ Auth service working!")
        setConnectionStatus((prev) => ({ ...prev, auth: "success" }))
      }
    } catch (error) {
      addLog(`❌ Auth test failed: ${error}`)
      setConnectionStatus((prev) => ({ ...prev, auth: "error" }))
    }

    // Test Storage
    try {
      addLog("Testing storage service...")
      const { error } = await supabase.storage.listBuckets()

      if (error) {
        addLog(`ℹ️ Storage: ${error.message}`)
        setConnectionStatus((prev) => ({ ...prev, storage: "error" }))
      } else {
        addLog("✅ Storage service accessible!")
        setConnectionStatus((prev) => ({ ...prev, storage: "success" }))
      }
    } catch (error) {
      addLog(`❌ Storage test failed: ${error}`)
      setConnectionStatus((prev) => ({ ...prev, storage: "error" }))
    }

    addLog("🏁 Connection tests completed!")
  }

  useEffect(() => {
    testConnection()
  }, [])

  const getStatusIcon = (status: "loading" | "success" | "error") => {
    switch (status) {
      case "loading":
        return <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "error":
        return <XCircle className="h-5 w-5 text-red-500" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Kubika - Test Koneksi</h1>
          <p className="text-gray-600">Test koneksi ke Supabase Database</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Status Cards */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {getStatusIcon(connectionStatus.database)}
                  Database Connection
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">Test koneksi ke database Supabase dan tabel user_profiles</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {getStatusIcon(connectionStatus.auth)}
                  Authentication Service
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">Test layanan autentikasi Supabase</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {getStatusIcon(connectionStatus.storage)}
                  Storage Service
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">Test layanan penyimpanan file Supabase</p>
              </CardContent>
            </Card>

            <Button onClick={testConnection} className="w-full">
              Test Ulang Koneksi
            </Button>
          </div>

          {/* Logs */}
          <Card>
            <CardHeader>
              <CardTitle>Connection Logs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg h-96 overflow-y-auto font-mono text-sm">
                {logs.map((log, index) => (
                  <div key={index} className="mb-1">
                    {log}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Configuration Info */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Konfigurasi Supabase</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <strong>Supabase URL:</strong>
                <br />
                <code className="bg-gray-100 px-2 py-1 rounded">https://mroeadpzuyjfoswxrydr.supabase.co</code>
              </div>
              <div>
                <strong>Anon Key:</strong>
                <br />
                <code className="bg-gray-100 px-2 py-1 rounded">eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...</code>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
