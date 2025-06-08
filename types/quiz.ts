export interface QuizOption {
  id: string
  text: string
  isCorrect: boolean
}

export interface QuizQuestion {
  id: string
  question: string
  options: QuizOption[]
  explanation: string
  shapeType: string // jenis bangun ruang (cube, cylinder, dll)
  difficulty: "easy" | "medium" | "hard"
}

export interface QuizResult {
  totalQuestions: number
  correctAnswers: number
  wrongAnswers: number
  score: number
  answeredQuestions: {
    questionId: string
    selectedOptionId: string
    isCorrect: boolean
  }[]
}
