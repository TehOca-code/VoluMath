"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Shuffle } from "lucide-react"
import { QuizQuestionComponent } from "@/components/quiz-question"
import { QuizResult } from "@/components/quiz-result"
import { quizQuestions } from "@/data/quiz-questions"
import type { QuizQuestion, QuizResult as QuizResultType } from "@/types/quiz"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useLearningProgress } from "@/hooks/use-learning-progress"

export default function ExercisesPage() {
  const [questions, setQuestions] = useState<QuizQuestion[]>([])
  const [answeredQuestions, setAnsweredQuestions] = useState<{
    [key: string]: { selectedOptionId: string; isCorrect: boolean }
  }>({})
  const [showResult, setShowResult] = useState(false)
  const [result, setResult] = useState<QuizResultType | null>(null)
  const [selectedShape, setSelectedShape] = useState<string>("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all")

  const { updateProgress } = useLearningProgress()

  useEffect(() => {
    // Acak urutan soal saat pertama kali dimuat
    shuffleQuestions()
  }, [])

  const shuffleQuestions = () => {
    // Acak urutan soal
    const shuffled = [...quizQuestions].sort(() => Math.random() - 0.5)
    setQuestions(shuffled)
    setAnsweredQuestions({})
    setShowResult(false)
    setResult(null)
  }

  const handleAnswer = (questionId: string, selectedOptionId: string, isCorrect: boolean) => {
    // Dapatkan pertanyaan yang dijawab
    const question = questions.find((q) => q.id === questionId)

    setAnsweredQuestions((prev) => ({
      ...prev,
      [questionId]: { selectedOptionId, isCorrect },
    }))

    // Update progres belajar jika pertanyaan ditemukan
    if (question) {
      updateProgress([
        {
          shapeType: question.shapeType,
          isCorrect,
        },
      ])
    }
  }

  const handleFinish = () => {
    const totalQuestions = filteredQuestions.length
    const answeredCount = Object.keys(answeredQuestions).length

    if (answeredCount < totalQuestions) {
      // Jika belum semua soal dijawab, konfirmasi
      if (!window.confirm("Anda belum menjawab semua soal. Yakin ingin menyelesaikan latihan?")) {
        return
      }

      // Update progres untuk pertanyaan yang belum dijawab (dianggap salah)
      const unansweredQuestions = filteredQuestions.filter((question) => !answeredQuestions[question.id])

      if (unansweredQuestions.length > 0) {
        const updates = unansweredQuestions.map((question) => ({
          shapeType: question.shapeType,
          isCorrect: false,
        }))

        updateProgress(updates)
      }
    }

    const correctAnswers = Object.values(answeredQuestions).filter((answer) => answer.isCorrect).length
    const wrongAnswers = answeredCount - correctAnswers

    const result: QuizResultType = {
      totalQuestions,
      correctAnswers,
      wrongAnswers,
      score: correctAnswers,
      answeredQuestions: Object.entries(answeredQuestions).map(([questionId, answer]) => ({
        questionId,
        selectedOptionId: answer.selectedOptionId,
        isCorrect: answer.isCorrect,
      })),
    }

    setResult(result)
    setShowResult(true)
  }

  const handleReset = () => {
    shuffleQuestions()
  }

  const handleFilterChange = (type: "shape" | "difficulty", value: string) => {
    if (type === "shape") {
      setSelectedShape(value)
    } else {
      setSelectedDifficulty(value)
    }
    setAnsweredQuestions({})
    setShowResult(false)
    setResult(null)
  }

  // Filter soal berdasarkan bentuk dan tingkat kesulitan
  const filteredQuestions = questions.filter((question) => {
    const shapeMatch = selectedShape === "all" || question.shapeType === selectedShape
    const difficultyMatch = selectedDifficulty === "all" || question.difficulty === selectedDifficulty
    return shapeMatch && difficultyMatch
  })

  return (
    <div className="flex flex-col min-h-screen bg-[#F38C0B]">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-[#01484C] p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <Link href="/">
            <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/10">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Kembali</span>
            </Button>
          </Link>
          <h1 className="text-xl font-bold text-white">VoluMath</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4">
        {showResult ? (
          <QuizResult result={result!} onReset={handleReset} />
        ) : (
          <>
            <Card className="mb-4 bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg text-[#01484C]">Filter Soal</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#01484C]">Materi Ruang</label>
                    <Select value={selectedShape} onValueChange={(value) => handleFilterChange("shape", value)}>
                      <SelectTrigger className="bg-white">
                        <SelectValue placeholder="Pilih Materi Ruang" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Semua Bangun</SelectItem>
                        <SelectItem value="cube">Kubus</SelectItem>
                        <SelectItem value="cuboid">Balok</SelectItem>
                        <SelectItem value="cylinder">Tabung</SelectItem>
                        <SelectItem value="cone">Kerucut</SelectItem>
                        <SelectItem value="sphere">Bola</SelectItem>
                        <SelectItem value="prism">Prisma</SelectItem>
                        <SelectItem value="pyramid">Limas</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#01484C]">Tingkat Kesulitan</label>
                    <Select
                      value={selectedDifficulty}
                      onValueChange={(value) => handleFilterChange("difficulty", value)}
                    >
                      <SelectTrigger className="bg-white">
                        <SelectValue placeholder="Pilih Tingkat Kesulitan" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Semua Tingkat</SelectItem>
                        <SelectItem value="easy">Mudah</SelectItem>
                        <SelectItem value="medium">Sedang</SelectItem>
                        <SelectItem value="hard">Sulit</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button
                  onClick={shuffleQuestions}
                  variant="outline"
                  className="w-full flex items-center gap-2 border-[#129392] text-[#129392] hover:bg-[#129392]/10"
                >
                  <Shuffle className="h-4 w-4" />
                  <span>Acak Soal</span>
                </Button>
              </CardContent>
            </Card>

            <div className="mb-4">
              <h2 className="text-lg font-semibold mb-2 text-[#01484C]">
                Soal Latihan ({Object.keys(answeredQuestions).length}/{filteredQuestions.length} dijawab)
              </h2>
              <div className="h-2 w-full bg-white/30 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#01484C] rounded-full"
                  style={{
                    width: `${(Object.keys(answeredQuestions).length / filteredQuestions.length) * 100}%`,
                  }}
                ></div>
              </div>
            </div>

            {filteredQuestions.length === 0 ? (
              <Card className="bg-white shadow-lg">
                <CardContent className="p-6 text-center">
                  <p className="text-[#01484C]">Tidak ada soal yang sesuai dengan filter yang dipilih.</p>
                </CardContent>
              </Card>
            ) : (
              <>
                <Accordion type="single" collapsible className="mb-4">
                  {filteredQuestions.map((question, index) => (
                    <AccordionItem key={question.id} value={question.id}>
                      <AccordionTrigger className="px-4 py-2 bg-white rounded-lg shadow-lg hover:bg-gray-50">
                        <div className="flex items-center justify-between w-full">
                          <span className="text-[#01484C]">Soal {index + 1}</span>
                          {answeredQuestions[question.id] ? (
                            <span
                              className={`text-xs px-2 py-1 rounded-full ${
                                answeredQuestions[question.id].isCorrect
                                  ? "bg-[#129392]/20 text-[#129392]"
                                  : "bg-red-100 text-red-600"
                              }`}
                            >
                              {answeredQuestions[question.id].isCorrect ? "Benar" : "Salah"}
                            </span>
                          ) : (
                            <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-[#01484C]">
                              Belum dijawab
                            </span>
                          )}
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <QuizQuestionComponent
                          question={question}
                          onAnswer={handleAnswer}
                          isAnswered={!!answeredQuestions[question.id]}
                          selectedOptionId={answeredQuestions[question.id]?.selectedOptionId}
                        />
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>

                <Button
                  onClick={handleFinish}
                  className="w-full bg-[#01484C] hover:bg-[#01484C]/90 text-white"
                  size="lg"
                >
                  Selesai & Lihat Hasil
                </Button>
              </>
            )}
          </>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="sticky bottom-0 bg-[#01484C] border-t border-[#129392]/30 p-2">
        <div className="flex items-center justify-around">
          <Link href="/" className="flex flex-col items-center p-2 text-[#E9E9E7]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <span className="text-xs">Beranda</span>
          </Link>
          <Link href="/shapes" className="flex flex-col items-center p-2 text-[#E9E9E7]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
            <span className="text-xs">Bangun</span>
          </Link>
          <Link href="/exercises" className="flex flex-col items-center p-2 text-[#F38C0B]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <span className="text-xs">Latihan</span>
          </Link>
          <Link href="/profile" className="flex flex-col items-center p-2 text-[#E9E9E7]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <span className="text-xs">Profil</span>
          </Link>
        </div>
      </nav>
    </div>
  )
}
