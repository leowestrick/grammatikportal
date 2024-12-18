'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Sparkles } from 'lucide-react'

interface Question {
  active: string
  passive: string
  hint: string
}

const questions: Question[] = [
  {
    active: "Der Lehrer korrigiert die Hausaufgaben.",
    passive: "Die Hausaufgaben werden von dem Lehrer korrigiert.",
    hint: "Use 'werden' + past participle. Don't forget to change the subject and object."
  },
  {
    active: "Die Studenten lesen das Buch.",
    passive: "Das Buch wird von den Studenten gelesen.",
    hint: "Remember to use the appropriate form of 'werden' for singular/plural."
  },
  {
    active: "Der Hund jagt die Katze.",
    passive: "Die Katze wird von dem Hund gejagt.",
    hint: "Pay attention to the subject-object swap and the verb form."
  },
  {
    active: "Die Firma stellt neue Mitarbeiter ein.",
    passive: "Neue Mitarbeiter werden von der Firma eingestellt.",
    hint: "Don't forget to separate the prefix 'ein-' in the passive construction."
  },
  {
    active: "Der Architekt hat das Haus entworfen.",
    passive: "Das Haus ist von dem Architekten entworfen worden.",
    hint: "For perfect tense, use 'ist/sind' + past participle + 'worden'."
  }
]

export function PassivUebung() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userAnswer, setUserAnswer] = useState('')
  const [score, setScore] = useState(0)
  const [showFeedback, setShowFeedback] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [isGameOver, setIsGameOver] = useState(false)

  const currentQuestion = questions[currentQuestionIndex]

  const handleAnswer = () => {
    const correct = userAnswer.trim().toLowerCase() === currentQuestion.passive.toLowerCase()
    setIsCorrect(correct)
    if (correct) {
      setScore(score + 1)
    }
    setShowFeedback(true)
  }

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setUserAnswer('')
      setShowFeedback(false)
    } else {
      setIsGameOver(true)
    }
  }

  const restartGame = () => {
    setCurrentQuestionIndex(0)
    setUserAnswer('')
    setScore(0)
    setShowFeedback(false)
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
          <span>Passiv Übung</span>
          <Badge variant="secondary" className="text-lg">
            <Sparkles className="w-4 h-4 mr-1" />
            {score}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Progress value={(currentQuestionIndex / questions.length) * 100} className="mb-4" />
        <p className="text-lg mb-4">Verwandle den folgenden Satz ins Passiv:</p>
        <p className="text-xl font-semibold mb-4">{currentQuestion.active}</p>
        <div className="mb-4">
          <Label htmlFor="answer">Deine Antwort:</Label>
          <Input
            id="answer"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            className="mt-1"
          />
        </div>
        <Button onClick={handleAnswer} className="w-full mb-4" disabled={showFeedback}>
          Antwort prüfen
        </Button>
        {showFeedback && (
          <div className="mt-4">
            <p className={`font-bold ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
              {isCorrect ? 'Richtig!' : 'Falsch.'}
            </p>
            {!isCorrect && (
              <>
                <p className="mt-2">Richtige Antwort: {currentQuestion.passive}</p>
                <p className="mt-2">Tipp: {currentQuestion.hint}</p>
              </>
            )}
            <Button onClick={nextQuestion} className="w-full mt-4">
              {currentQuestionIndex < questions.length - 1 ? 'Nächste Frage' : 'Ergebnis anzeigen'}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

