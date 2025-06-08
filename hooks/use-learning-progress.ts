"use client"

import { useState, useEffect } from "react"
import type { LearningProgress, ProgressUpdate } from "@/types/progress"
import { supabase } from "@/lib/supabase"

const PROGRESS_KEY = "learning_progress"

export function useLearningProgress() {
  const [user, setUser] = useState(null)
  const [progress, setProgress] = useState<LearningProgress | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load progress from localStorage on component mount
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

        const savedProgress = localStorage.getItem(`${PROGRESS_KEY}_${currentUser.id}`)
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
        }
      } catch (error) {
        console.error("Error loading progress:", error)
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
      localStorage.setItem(`${PROGRESS_KEY}_${user.id}`, JSON.stringify(progress))
    }
  }, [progress, user])

  // Update progress when a question is answered
  const updateProgress = (updates: ProgressUpdate[]) => {
    if (!progress || !user) return

    setProgress((prevProgress) => {
      if (!prevProgress) return null

      const newProgress = { ...prevProgress }

      updates.forEach((update) => {
        const { shapeType, isCorrect } = update

        // Update overall progress
        newProgress.totalQuestions += 1
        newProgress.answeredQuestions += 1
        if (isCorrect) {
          newProgress.correctAnswers += 1
        }

        // Update shape-specific progress
        if (!newProgress.shapeProgress[shapeType]) {
          newProgress.shapeProgress[shapeType] = {
            total: 0,
            answered: 0,
            correct: 0,
          }
        }

        newProgress.shapeProgress[shapeType].total += 1
        newProgress.shapeProgress[shapeType].answered += 1
        if (isCorrect) {
          newProgress.shapeProgress[shapeType].correct += 1
        }
      })

      newProgress.lastUpdated = new Date()

      return newProgress
    })
  }

  // Reset progress
  const resetProgress = () => {
    if (!user) return

    setProgress({
      userId: user.id,
      totalQuestions: 0,
      answeredQuestions: 0,
      correctAnswers: 0,
      shapeProgress: {},
      lastUpdated: new Date(),
    })
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

  return {
    progress,
    isLoading,
    updateProgress,
    resetProgress,
    getShapeProgressPercentage,
    getOverallProgressPercentage,
  }
}
