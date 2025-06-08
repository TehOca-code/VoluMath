"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Trophy, RotateCcw } from "lucide-react"
import type { QuizResult } from "@/types/quiz"

interface QuizResultProps {
  result: QuizResult
  onReset: () => void
}

export function QuizResult({ result, onReset }: QuizResultProps) {
  const scorePercentage = Math.round((result.score / result.totalQuestions) * 100)

  let message = ""
  let color = ""

  if (scorePercentage >= 80) {
    message = "Luar biasa! Kamu menguasai materi dengan sangat baik!"
    color = "text-green-600"
  } else if (scorePercentage >= 60) {
    message = "Bagus! Kamu memahami sebagian besar materi."
    color = "text-blue-600"
  } else if (scorePercentage >= 40) {
    message = "Cukup baik. Teruslah berlatih untuk meningkatkan pemahamanmu."
    color = "text-yellow-600"
  } else {
    message = "Jangan menyerah! Cobalah pelajari materi lagi dan ulangi kuis."
    color = "text-red-600"
  }

  return (
    <Card className="w-full">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center">
          <Trophy className="h-10 w-10 text-blue-600" />
        </div>
        <CardTitle className="text-2xl">Hasil Latihan Soal</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <p className="text-4xl font-bold">{scorePercentage}%</p>
          <p className={`mt-2 ${color}`}>{message}</p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Skor</span>
            <span>
              {result.score} / {result.totalQuestions}
            </span>
          </div>
          <Progress value={scorePercentage} className="h-2" />
        </div>

        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="p-3 bg-green-50 rounded-lg">
            <p className="text-sm text-green-800">Jawaban Benar</p>
            <p className="text-xl font-semibold text-green-600">{result.correctAnswers}</p>
          </div>
          <div className="p-3 bg-red-50 rounded-lg">
            <p className="text-sm text-red-800">Jawaban Salah</p>
            <p className="text-xl font-semibold text-red-600">{result.wrongAnswers}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={onReset} className="w-full flex items-center gap-2">
          <RotateCcw className="h-4 w-4" />
          <span>Ulangi Latihan</span>
        </Button>
      </CardFooter>
    </Card>
  )
}
