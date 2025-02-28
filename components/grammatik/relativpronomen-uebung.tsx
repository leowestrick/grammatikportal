'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Question {
  sentence: string
  options: string[]
  correct: string
  explanation: string
}

const questions: Question[] = [
  {
    sentence: "Das ist der Mann, ___ ich gestern getroffen habe.",
    options: ["der", "den", "dem", "dessen"],
    correct: "den",
    explanation: "Wir verwenden „den“, weil es die Akkusativform von „der“ für ein maskulines Substantiv im Relativsatz ist."
  },
  {
    sentence: "Die Frau, ___ Auto vor dem Haus steht, ist meine Nachbarin.",
    options: ["der", "die", "deren", "denen"],
    correct: "deren",
    explanation: "Wir verwenden „deren“ als Genitivform für ein feminines Substantiv im Relativsatz."
  },
  {
    sentence: "Das Buch, ___ ich gerade lese, ist sehr spannend.",
    options: ["das", "dem", "dessen", "welches"],
    correct: "das",
    explanation: "Wir verwenden „das“ als Relativpronomen für ein Substantiv im Nominativ oder Akkusativ."
  },
  {
    sentence: "Die Kinder, mit ___ ich gespielt habe, sind sehr nett.",
    options: ["denen", "deren", "die", "welche"],
    correct: "denen",
    explanation: "Wir verwenden „denen“ als Dativform für Pluralnomen im Relativsatz."
  },
  {
    sentence: "Der Hund, ___ wir gefunden haben, gehört unserem Nachbarn.",
    options: ["der", "den", "dem", "dessen"],
    correct: "den",
    explanation: "Wir verwenden „den“, weil es die Akkusativform von „der“ für ein maskulines Substantiv im Relativsatz ist."
  }
]

export function RelativpronomenUebung() {
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
    progressData['Relativpronomen'] = progress
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
        <CardTitle className="flex justify-between items-center">
          <span>Relativpronomen Übung</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-lg mb-4">Wähle das richtige Relativpronomen:</p>
        <p className="text-xl font-semibold mb-4">{currentQuestion.sentence}</p>
        <Select value={selectedAnswer || ""} onValueChange={setSelectedAnswer}>
          <SelectTrigger className="w-full mb-4">
            <SelectValue placeholder="Wähle ein Relativpronomen" />
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

