'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Sparkles } from 'lucide-react'

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
    explanation: "We use 'den' because it's the accusative form of 'der' for a masculine noun in the relative clause."
  },
  {
    sentence: "Die Frau, ___ Auto vor dem Haus steht, ist meine Nachbarin.",
    options: ["der", "die", "deren", "denen"],
    correct: "deren",
    explanation: "We use 'deren' as the genitive form for a feminine noun in the relative clause."
  },
  {
    sentence: "Das Buch, ___ ich gerade lese, ist sehr spannend.",
    options: ["das", "dem", "dessen", "welches"],
    correct: "das",
    explanation: "We use 'das' as the relative pronoun for a neuter noun in the nominative or accusative case."
  },
  {
    sentence: "Die Kinder, mit ___ ich gespielt habe, sind sehr nett.",
    options: ["denen", "deren", "die", "welche"],
    correct: "denen",
    explanation: "We use 'denen' as the dative form for plural nouns in the relative clause."
  },
  {
    sentence: "Der Hund, ___ wir gefunden haben, gehört unserem Nachbarn.",
    options: ["der", "den", "dem", "dessen"],
    correct: "den",
    explanation: "We use 'den' because it's the accusative form of 'der' for a masculine noun in the relative clause."
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

  const restartGame = () => {
    setCurrentQuestionIndex(0)
    setSelectedAnswer(null)
    setScore(0)
    setShowExplanation(false)
    setIsGameOver(false)
  }

  if (isGameOver) {
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
          <Badge variant="secondary" className="text-lg">
            <Sparkles className="w-4 h-4 mr-1" />
            {score}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Progress value={(currentQuestionIndex / questions.length) * 100} className="mb-4" />
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

