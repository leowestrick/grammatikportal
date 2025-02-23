'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Question {
  mainClause: string
  subordinateClause: string
  options: string[]
  correct: string
  explanation: string
}

const questions: Question[] = [
  {
    mainClause: "Ich gehe nicht zur Party,",
    subordinateClause: "ich krank bin.",
    options: ["weil", "obwohl", "wenn", "dass"],
    correct: "weil",
    explanation: "'Weil' wird verwendet, um einen Grund oder eine Ursache auszudrücken."
  },
  {
    mainClause: "Er kommt später,",
    subordinateClause: "er noch arbeiten muss.",
    options: ["wenn", "als", "damit", "weil"],
    correct: "weil",
    explanation: "'Weil' stellt den Grund für seine verspätete Ankunft vor."
  },
  {
    mainClause: "Wir bleiben zu Hause,",
    subordinateClause: "es regnet.",
    options: ["wenn", "obwohl", "weil", "dass"],
    correct: "wenn",
    explanation: "'Wenn' wird für eine bedingte Anweisung verwendet."
  },
  {
    mainClause: "Sie lernt Deutsch,",
    subordinateClause: "sie in Deutschland studieren kann.",
    options: ["damit", "weil", "ob", "dass"],
    correct: "damit",
    explanation: "'Damit' drückt Zweck oder Absicht aus."
  },
  {
    mainClause: "Ich weiß nicht,",
    subordinateClause: "er morgen kommt.",
    options: ["dass", "ob", "wenn", "weil"],
    correct: "ob",
    explanation: "'Ob' wird für indirekte Fragen verwendet, die Unsicherheit ausdrücken."
  }
]

export function KonjunktionenUebung() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [showExplanation, setShowExplanation] = useState(false)
  const [isGameOver, setIsGameOver] = useState(false)

  const currentQuestion = questions[currentQuestionIndex]

  const handleAnswer = () => {
    if (selectedAnswer === currentQuestion.correct) {
      setScore(score + 1)
    }
    setShowExplanation(true)
  }

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    } else {
      setIsGameOver(true)
    }
  }

  const updateProgress = () => {
    const progress = Math.round((score / questions.length) * 100)
    const storedProgress = localStorage.getItem('deutschLernProgress')
    const progressData = storedProgress ? JSON.parse(storedProgress) : {}
    progressData['Konjunktionen'] = progress
    localStorage.setItem('deutschLernProgress', JSON.stringify(progressData))
  }

  const restartGame = () => {
    setCurrentQuestionIndex(0)
    setSelectedAnswer(null)
    setScore(0)
    setShowExplanation(false)
    setIsGameOver(false)
  }

  if (isGameOver) {
    updateProgress()
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="pt-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Übung beendet!</h2>
          <p className="text-xl mb-4">Deine Punktzahl: {score} von {questions.length}</p>
          <Button onClick={restartGame} className="w-full">Noch einmal spielen</Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
          <CardTitle>Frage {currentQuestionIndex + 1} von {questions.length}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-lg mb-4">Wähle die richtige Konjunktion:</p>
        <p className="text-xl font-semibold mb-4">{currentQuestion.mainClause} _____ {currentQuestion.subordinateClause}</p>
        <Select value={selectedAnswer || ""} onValueChange={setSelectedAnswer}>
          <SelectTrigger className="w-full mb-4">
            <SelectValue placeholder="Wähle eine Konjunktion" />
          </SelectTrigger>
          <SelectContent>
            {currentQuestion.options.map((option) => (
              <SelectItem key={option} value={option}>{option}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button onClick={handleAnswer} className="w-full mb-4" disabled={!selectedAnswer || showExplanation}>
          Antwort prüfen
        </Button>
        {showExplanation && (
          <div className="mt-4">
            <p className={`font-bold ${selectedAnswer === currentQuestion.correct ? 'text-green-600' : 'text-red-600'}`}>
              {selectedAnswer === currentQuestion.correct ? 'Richtig!' : 'Falsch.'}
            </p>
            <p className="mt-2">{currentQuestion.explanation}</p>
            <Button onClick={nextQuestion} className="w-full mt-4">
              {currentQuestionIndex < questions.length - 1 ? 'Nächste Frage' : 'Ergebnis anzeigen'}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

