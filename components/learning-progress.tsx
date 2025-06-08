"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { RotateCcw } from "lucide-react"
import { supabase } from "@/lib/supabase"

type LearningProgress = {
  userId: string
  totalQuestions: number
  answeredQuestions: number
  correctAnswers: number
  shapeProgress: Record<string, { total: number; answered: number; correct: number }>
  lastUpdated: Date
}

export function LearningProgress() {
  const [user, setUser] = useState(null)
  const [progress, setProgress] = useState<LearningProgress | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load user and progress
  useEffect(() => {
    async function loadUserAndProgress() {
      try {
        setIsLoading(true)

        // Get current session
        const { data: sessionData } = await supabase.auth.getSession()

        if (!sessionData.session) {
          setUser(null)
          setProgress(null)
          setIsLoading(false)
          return
        }

        const currentUser = sessionData.session.user
        setUser(currentUser)

        // Load progress from localStorage
        const savedProgress = localStorage.getItem(`learning_progress_${currentUser.id}`)
        if (savedProgress) {
          const parsedProgress = JSON.parse(savedProgress)
          setProgress({
            ...parsedProgress,
            lastUpdated: new Date(parsedProgress.lastUpdated),
          })
        } else {
          // Initialize empty progress
          const initialProgress = {
            userId: currentUser.id,
            totalQuestions: 0,
            answeredQuestions: 0,
            correctAnswers: 0,
            shapeProgress: {},
            lastUpdated: new Date(),
          }
          setProgress(initialProgress)
          localStorage.setItem(`learning_progress_${currentUser.id}`, JSON.stringify(initialProgress))
        }
      } catch (error) {
        console.error("Error loading user and progress:", error)
        setUser(null)
        setProgress(null)
      } finally {
        setIsLoading(false)
      }
    }

    loadUserAndProgress()
  }, [])

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    if (progress && user) {
      localStorage.setItem(`learning_progress_${user.id}`, JSON.stringify(progress))
    }
  }, [progress, user])

  // Reset progress
  const resetProgress = () => {
    if (!user) return

    const resetProgressData = {
      userId: user.id,
      totalQuestions: 0,
      answeredQuestions: 0,
      correctAnswers: 0,
      shapeProgress: {},
      lastUpdated: new Date(),
    }

    setProgress(resetProgressData)
    localStorage.setItem(`learning_progress_${user.id}`, JSON.stringify(resetProgressData))
  }

  // Get progress percentage for a specific shape
  const getShapeProgressPercentage = (shapeType: string): number => {
    if (!progress || !progress.shapeProgress[shapeType]) return 0

    const shapeProgress = progress.shapeProgress[shapeType]
    if (shapeProgress.total === 0) return 0

    return Math.round((shapeProgress.correct / shapeProgress.total) * 100)
  }

  // Get overall progress percentage
  const getOverallProgressPercentage = (): number => {
    if (!progress || progress.totalQuestions === 0) return 0
    return Math.round((progress.correctAnswers / progress.totalQuestions) * 100)
  }

  if (isLoading) {
    return (
      <Card className="bg-white shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg text-[#01484C]">Progres Belajar</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 animate-pulse">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-8 bg-gray-200 rounded"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!user) {
    return (
      <Card className="bg-white shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg text-[#01484C]">Progres Belajar</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8">
            <div className="w-16 h-16 bg-[#129392]/20 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-[#129392]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <p className="text-[#01484C] text-center">Silakan login untuk melacak progres belajar Anda.</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const overallProgress = getOverallProgressPercentage()
  const shapes = [
    { id: "cube", name: "Kubus" },
    { id: "cuboid", name: "Balok" },
    { id: "cylinder", name: "Tabung" },
    { id: "cone", name: "Kerucut" },
    { id: "sphere", name: "Bola" },
    { id: "prism", name: "Prisma" },
    { id: "pyramid", name: "Limas" },
  ]

  return (
    <Card className="bg-white shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg text-[#01484C]">Progres Belajar</CardTitle>
        <Button variant="outline" size="sm" onClick={resetProgress} className="h-8 gap-1">
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Reset</span>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-[#01484C]">Progres Keseluruhan</span>
              <span className="text-sm font-medium text-[#01484C]">{overallProgress}%</span>
            </div>
            <Progress value={overallProgress} className="h-2 [&>div]:bg-[#129392]" />
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-medium text-[#01484C]">Progres per Materi Ruang</h4>
            <div className="grid gap-2">
              {shapes.map((shape) => {
                const shapeProgress = getShapeProgressPercentage(shape.id)
                const hasProgress = progress.shapeProgress[shape.id]?.total > 0

                return (
                  <div key={shape.id} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-[#01484C]">{shape.name}</span>
                      <span className="text-[#01484C]">
                        {hasProgress
                          ? `${progress.shapeProgress[shape.id].correct}/${progress.shapeProgress[shape.id].total} (${shapeProgress}%)`
                          : "Belum ada data"}
                      </span>
                    </div>
                    <Progress value={shapeProgress} className="h-1.5 [&>div]:bg-[#129392]" />
                  </div>
                )
              })}
            </div>
          </div>

          {progress.totalQuestions > 0 && (
            <div className="text-xs text-gray-500 pt-2">
              Terakhir diperbarui:{" "}
              {progress.lastUpdated.toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          )}

          {progress.totalQuestions === 0 && (
            <div className="text-center py-4">
              <p className="text-sm text-[#01484C]">Belum ada progres belajar.</p>
              <p className="text-xs text-gray-500 mt-1">Mulai mengerjakan latihan untuk melihat progres Anda!</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
