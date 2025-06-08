export interface LearningProgress {
  userId: string
  totalQuestions: number
  answeredQuestions: number
  correctAnswers: number
  shapeProgress: {
    [key: string]: {
      total: number
      answered: number
      correct: number
    }
  }
  lastUpdated: Date
}

export interface ProgressUpdate {
  shapeType: string
  isCorrect: boolean
}
