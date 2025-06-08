"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { CheckCircle, XCircle } from "lucide-react"
import type { QuizQuestion } from "@/types/quiz"

interface QuizQuestionProps {
  question: QuizQuestion
  onAnswer: (questionId: string, selectedOptionId: string, isCorrect: boolean) => void
  isAnswered: boolean
  selectedOptionId?: string
}

export function QuizQuestionComponent({ question, onAnswer, isAnswered, selectedOptionId }: QuizQuestionProps) {
  const [selected, setSelected] = useState<string | undefined>(selectedOptionId)

  const handleOptionSelect = (optionId: string) => {
    if (isAnswered) return
    setSelected(optionId)
  }

  const handleSubmit = () => {
    if (!selected || isAnswered) return
    const selectedOption = question.options.find((option) => option.id === selected)
    if (selectedOption) {
      onAnswer(question.id, selected, selectedOption.isCorrect)
    }
  }

  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="mb-4">
          <h3 className="font-medium text-lg">{question.question}</h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
              {question.shapeType === "cube"
                ? "Kubus"
                : question.shapeType === "cuboid"
                  ? "Balok"
                  : question.shapeType === "cylinder"
                    ? "Tabung"
                    : question.shapeType === "cone"
                      ? "Kerucut"
                      : question.shapeType === "sphere"
                        ? "Bola"
                        : question.shapeType === "prism"
                          ? "Prisma"
                          : question.shapeType === "pyramid"
                            ? "Limas"
                            : question.shapeType}
            </span>
            <span
              className={`text-xs px-2 py-1 rounded-full ${
                question.difficulty === "easy"
                  ? "bg-green-100 text-green-800"
                  : question.difficulty === "medium"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
              }`}
            >
              {question.difficulty === "easy" ? "Mudah" : question.difficulty === "medium" ? "Sedang" : "Sulit"}
            </span>
          </div>
        </div>

        <RadioGroup value={selected} className="space-y-2">
          {question.options.map((option) => (
            <div
              key={option.id}
              className={`flex items-center space-x-2 p-3 rounded-md border ${
                isAnswered && option.id === selected
                  ? option.isCorrect
                    ? "border-green-500 bg-green-50"
                    : "border-red-500 bg-red-50"
                  : isAnswered && option.isCorrect
                    ? "border-green-500 bg-green-50"
                    : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => handleOptionSelect(option.id)}
            >
              <RadioGroupItem
                value={option.id}
                id={option.id}
                disabled={isAnswered}
                className={isAnswered && option.isCorrect ? "text-green-500" : ""}
              />
              <Label htmlFor={option.id} className="flex-1 cursor-pointer font-normal">
                {option.text}
              </Label>
              {isAnswered && option.isCorrect && <CheckCircle className="h-5 w-5 text-green-500" />}
              {isAnswered && option.id === selected && !option.isCorrect && (
                <XCircle className="h-5 w-5 text-red-500" />
              )}
            </div>
          ))}
        </RadioGroup>

        {isAnswered ? (
          <div className="mt-4 p-3 bg-blue-50 rounded-md">
            <p className="text-blue-800 text-sm">{question.explanation}</p>
          </div>
        ) : (
          <Button onClick={handleSubmit} className="mt-4 w-full" disabled={!selected}>
            Jawab
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
