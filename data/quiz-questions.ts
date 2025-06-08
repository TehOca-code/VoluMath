import type { QuizQuestion } from "@/types/quiz"

export const quizQuestions: QuizQuestion[] = [
  // Soal-soal Kubus
  {
    id: "cube-1",
    question: "Jika panjang rusuk sebuah kubus adalah 5 cm, berapakah volume kubus tersebut?",
    options: [
      { id: "c1-a", text: "25 cm³", isCorrect: false },
      { id: "c1-b", text: "75 cm³", isCorrect: false },
      { id: "c1-c", text: "125 cm³", isCorrect: true },
      { id: "c1-d", text: "150 cm³", isCorrect: false },
    ],
    explanation: "Volume kubus = s³ = 5³ = 125 cm³",
    shapeType: "cube",
    difficulty: "easy",
  },
  {
    id: "cube-2",
    question: "Jika panjang rusuk sebuah kubus adalah 6 cm, berapakah luas permukaan kubus tersebut?",
    options: [
      { id: "c2-a", text: "36 cm²", isCorrect: false },
      { id: "c2-b", text: "216 cm²", isCorrect: true },
      { id: "c2-c", text: "72 cm²", isCorrect: false },
      { id: "c2-d", text: "144 cm²", isCorrect: false },
    ],
    explanation: "Luas permukaan kubus = 6 × s² = 6 × 6² = 6 × 36 = 216 cm²",
    shapeType: "cube",
    difficulty: "easy",
  },
  {
    id: "cube-3",
    question: "Berapakah panjang diagonal ruang kubus yang memiliki panjang rusuk 4 cm?",
    options: [
      { id: "c3-a", text: "4√3 cm", isCorrect: true },
      { id: "c3-b", text: "8 cm", isCorrect: false },
      { id: "c3-c", text: "4√2 cm", isCorrect: false },
      { id: "c3-d", text: "6 cm", isCorrect: false },
    ],
    explanation: "Diagonal ruang kubus = s√3 = 4√3 cm",
    shapeType: "cube",
    difficulty: "medium",
  },

  // Soal-soal Balok
  {
    id: "cuboid-1",
    question: "Sebuah balok memiliki panjang 8 cm, lebar 6 cm, dan tinggi 5 cm. Berapakah volume balok tersebut?",
    options: [
      { id: "cb1-a", text: "240 cm³", isCorrect: true },
      { id: "cb1-b", text: "120 cm³", isCorrect: false },
      { id: "cb1-c", text: "200 cm³", isCorrect: false },
      { id: "cb1-d", text: "280 cm³", isCorrect: false },
    ],
    explanation: "Volume balok = p × l × t = 8 × 6 × 5 = 240 cm³",
    shapeType: "cuboid",
    difficulty: "easy",
  },
  {
    id: "cuboid-2",
    question:
      "Sebuah balok memiliki panjang 10 cm, lebar 8 cm, dan tinggi 6 cm. Berapakah luas permukaan balok tersebut?",
    options: [
      { id: "cb2-a", text: "376 cm²", isCorrect: false },
      { id: "cb2-b", text: "480 cm²", isCorrect: false },
      { id: "cb2-c", text: "336 cm²", isCorrect: true },
      { id: "cb2-d", text: "296 cm²", isCorrect: false },
    ],
    explanation: "Luas permukaan balok = 2(pl + pt + lt) = 2(10×8 + 10×6 + 8×6) = 2(80 + 60 + 48) = 2(188) = 376 cm²",
    shapeType: "cuboid",
    difficulty: "medium",
  },

  // Soal-soal Tabung
  {
    id: "cylinder-1",
    question:
      "Sebuah tabung memiliki jari-jari alas 7 cm dan tinggi 10 cm. Berapakah volume tabung tersebut? (π = 22/7)",
    options: [
      { id: "cy1-a", text: "1.540 cm³", isCorrect: true },
      { id: "cy1-b", text: "770 cm³", isCorrect: false },
      { id: "cy1-c", text: "1.386 cm³", isCorrect: false },
      { id: "cy1-d", text: "2.200 cm³", isCorrect: false },
    ],
    explanation: "Volume tabung = πr²t = (22/7) × 7² × 10 = (22/7) × 49 × 10 = 22 × 7 × 10 = 1.540 cm³",
    shapeType: "cylinder",
    difficulty: "medium",
  },
  {
    id: "cylinder-2",
    question:
      "Sebuah tabung memiliki jari-jari alas 14 cm dan tinggi 20 cm. Berapakah luas permukaan tabung tersebut? (π = 22/7)",
    options: [
      { id: "cy2-a", text: "2.640 cm²", isCorrect: false },
      { id: "cy2-b", text: "3.080 cm²", isCorrect: false },
      { id: "cy2-c", text: "2.992 cm²", isCorrect: true },
      { id: "cy2-d", text: "3.520 cm²", isCorrect: false },
    ],
    explanation:
      "Luas permukaan tabung = 2πr² + 2πrt = 2πr(r + t) = 2 × (22/7) × 14 × (14 + 20) = 2 × 22 × 2 × 34 = 2.992 cm²",
    shapeType: "cylinder",
    difficulty: "hard",
  },

  // Soal-soal Kerucut
  {
    id: "cone-1",
    question:
      "Sebuah kerucut memiliki jari-jari alas 6 cm dan tinggi 8 cm. Berapakah volume kerucut tersebut? (π = 3,14)",
    options: [
      { id: "co1-a", text: "301,44 cm³", isCorrect: true },
      { id: "co1-b", text: "150,72 cm³", isCorrect: false },
      { id: "co1-c", text: "452,16 cm³", isCorrect: false },
      { id: "co1-d", text: "904,32 cm³", isCorrect: false },
    ],
    explanation: "Volume kerucut = (1/3) × πr²t = (1/3) × 3,14 × 6² × 8 = (1/3) × 3,14 × 36 × 8 = 301,44 cm³",
    shapeType: "cone",
    difficulty: "medium",
  },

  // Soal-soal Bola
  {
    id: "sphere-1",
    question: "Sebuah bola memiliki jari-jari 7 cm. Berapakah volume bola tersebut? (π = 22/7)",
    options: [
      { id: "s1-a", text: "1.437,33 cm³", isCorrect: true },
      { id: "s1-b", text: "1.078 cm³", isCorrect: false },
      { id: "s1-c", text: "2.156 cm³", isCorrect: false },
      { id: "s1-d", text: "4.312 cm³", isCorrect: false },
    ],
    explanation:
      "Volume bola = (4/3) × πr³ = (4/3) × (22/7) × 7³ = (4/3) × (22/7) × 343 = (4/3) × 22 × 49 = 1.437,33 cm³",
    shapeType: "sphere",
    difficulty: "medium",
  },
  {
    id: "sphere-2",
    question: "Sebuah bola memiliki jari-jari 14 cm. Berapakah luas permukaan bola tersebut? (π = 22/7)",
    options: [
      { id: "s2-a", text: "1.232 cm²", isCorrect: false },
      { id: "s2-b", text: "2.464 cm²", isCorrect: true },
      { id: "s2-c", text: "3.696 cm²", isCorrect: false },
      { id: "s2-d", text: "4.928 cm²", isCorrect: false },
    ],
    explanation: "Luas permukaan bola = 4πr² = 4 × (22/7) × 14² = 4 × (22/7) × 196 = 4 × 22 × 28 = 2.464 cm²",
    shapeType: "sphere",
    difficulty: "hard",
  },

  // Soal-soal Prisma
  {
    id: "prism-1",
    question:
      "Sebuah prisma segitiga memiliki alas berbentuk segitiga dengan panjang alas 6 cm dan tinggi 4 cm. Jika tinggi prisma 10 cm, berapakah volume prisma tersebut?",
    options: [
      { id: "p1-a", text: "120 cm³", isCorrect: true },
      { id: "p1-b", text: "240 cm³", isCorrect: false },
      { id: "p1-c", text: "60 cm³", isCorrect: false },
      { id: "p1-d", text: "180 cm³", isCorrect: false },
    ],
    explanation: "Volume prisma = luas alas × tinggi prisma = (1/2 × 6 × 4) × 10 = 12 × 10 = 120 cm³",
    shapeType: "prism",
    difficulty: "medium",
  },

  // Soal-soal Limas
  {
    id: "pyramid-1",
    question:
      "Sebuah limas persegi memiliki alas berbentuk persegi dengan panjang sisi 6 cm dan tinggi limas 8 cm. Berapakah volume limas tersebut?",
    options: [
      { id: "py1-a", text: "96 cm³", isCorrect: true },
      { id: "py1-b", text: "144 cm³", isCorrect: false },
      { id: "py1-c", text: "72 cm³", isCorrect: false },
      { id: "py1-d", text: "288 cm³", isCorrect: false },
    ],
    explanation: "Volume limas = (1/3) × luas alas × tinggi = (1/3) × 6² × 8 = (1/3) × 36 × 8 = 96 cm³",
    shapeType: "pyramid",
    difficulty: "medium",
  },
]
