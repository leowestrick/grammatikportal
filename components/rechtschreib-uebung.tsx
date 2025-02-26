'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { motion, AnimatePresence } from 'framer-motion'
import { saveProgress } from '@/utils/progress-manager'
import { addPoints, unlockBadge } from '@/utils/gamification'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Question {
  id: number
  sentence: string
  correct: string
  advice: string
}

type Level = "anfaenger" | "fortgeschritten" | "experte";

const questions: Record<Level, Question[]> = {
  anfaenger: [
    { id: 1, sentence: "Der hund bellt laut.", correct: "Der Hund bellt laut.", advice: "Substantive werden großgeschrieben." },
    { id: 2, sentence: "ich gehe zur schule", correct: "Ich gehe zur Schule.", advice: "Satzanfänge und Substantive werden großgeschrieben." },
    { id: 3, sentence: "Die sonne scheint hell.", correct: "Die Sonne scheint hell.", advice: "Substantive werden großgeschrieben." },
  ],
  fortgeschritten: [
    { id: 1, sentence: "Er sagte das er kommt.", correct: "Er sagte, dass er kommt.", advice: "Hier wird 'dass' als Konjunktion verwendet." },
    { id: 2, sentence: "Sie hat einen neuen Fußball-schuh gekauft.", correct: "Sie hat einen neuen Fußballschuh gekauft.", advice: "Zusammengesetzte Substantive werden in der Regel zusammengeschrieben." },
    { id: 3, sentence: "Der zug fährt um 8 uhr ab.", correct: "Der Zug fährt um 8 Uhr ab.", advice: "Substantive und die Abkürzung 'Uhr' werden großgeschrieben." },
  ],
  experte: [
    { id: 1, sentence: "Die aufgabe war so schwierig das niemand sie lösen konnte.", correct: "Die Aufgabe war so schwierig, dass niemand sie lösen konnte.", advice: "Beachte die Großschreibung, Kommasetzung und die Verwendung von 'dass'." },
    { id: 2, sentence: "Er verspricht ihr das er pünktlich sein wird.", correct: "Er verspricht ihr, dass er pünktlich sein wird.", advice: "Beachte die Kommasetzung und die Verwendung von 'dass'." },
    { id: 3, sentence: "Trotz des schlechten wetters gingen wir spatzieren.", correct: "Trotz des schlechten Wetters gingen wir spazieren.", advice: "Beachte die Großschreibung des Substantivs und die korrekte Schreibweise von 'spazieren'." },
  ]
}

type Difficulty = 'anfaenger' | 'fortgeschritten' | 'experte'

export function RechtschreibUebung() {
  const [difficulty, setDifficulty] = useState<Difficulty>('anfaenger')
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<string[]>(Array(questions[difficulty].length).fill(''))
  const [isFinished, setIsFinished] = useState(false)
  const [showAdvice, setShowAdvice] = useState(false)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [tryCounter, setTryCounter] = useState(0)

  const currentAnswer = answers[currentQuestionIndex]
  const currentQuestion = questions[difficulty][currentQuestionIndex]

  const handleAnswer = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestionIndex] = event.target.value
    setAnswers(newAnswers)
    setIsCorrect(null)
  }

  const checkAnswer = () => {
    const correct = currentAnswer === currentQuestion.correct
    setIsCorrect(correct)
    setTryCounter(tryCounter + 1)

    if (correct) {
      addPoints(10)
      setTimeout(() => {
        if (currentQuestionIndex < questions[difficulty].length - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1)
          setIsCorrect(null)
          setShowAdvice(false)
          setTryCounter(0)
        } else {
          setIsFinished(true)
        }
      }, 1500)
    }
  }

  const calcPoints = () => {
    return answers.filter((answer, index) => answer === questions[difficulty][index].correct).length
  }

  const updateProgress = () => {
    const progress = Math.round((calcPoints() / questions[difficulty].length) * 100)
    saveProgress(`Rechtschreibung (${difficulty})`, progress)
    if (progress === 100) {
      unlockBadge('rechtschreib-champion')
    }
  }

  const handleSwitchDifficulty = (newDifficulty: Difficulty) => {
    setDifficulty(newDifficulty)
    setCurrentQuestionIndex(0)
    setAnswers(Array(questions[newDifficulty].length).fill(''))
    setIsFinished(false)
    setIsCorrect(null)
    setShowAdvice(false)
    setTryCounter(0)
  }

  if (isFinished) {
    const points = calcPoints()
    updateProgress()
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="text-center"
      >
        <h2 className="text-2xl font-bold mb-4">Übung beendet!</h2>
        <p className="text-xl mb-4">Deine Punktzahl: {points} von {questions[difficulty].length}</p>
        <Button disabled={!!feedback}  onClick={() => {
          setCurrentQuestionIndex(0)
          setAnswers(Array(questions[difficulty].length).fill(''))
          setIsFinished(false)
          setIsCorrect(null)
          setShowAdvice(false)
          setTryCounter(0)
        }}>
          Übung wiederholen
        </Button>
      </motion.div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Label htmlFor="schwierigkeitsgrad">Schwierigkeitsgrad:</Label>
        <Select value={difficulty} onValueChange={(value: Difficulty) => handleSwitchDifficulty(value)}>
          <SelectTrigger id="schwierigkeitsgrad">
            <SelectValue placeholder="Wähle einen Schwierigkeitsgrad" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="anfaenger">Anfänger</SelectItem>
            <SelectItem value="fortgeschritten">Fortgeschritten</SelectItem>
            <SelectItem value="experte">Experte</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Frage {currentQuestionIndex + 1} von {questions[difficulty].length}</h2>
      <Card className="mb-6">
        <CardContent className="pt-6">
          <p className="text-xl mb-6 text-gray-700">Korrigiere den folgenden Satz:</p>
          <p className="text-lg font-semibold mb-4 text-gray-800">{currentQuestion.sentence}</p>
          <div className="mb-4">
            <Label htmlFor="antwort" className="text-lg text-gray-700 mb-2 block">Deine Antwort:</Label>
            <Input
              type="text"
              id="antwort"
              value={currentAnswer}
              onChange={handleAnswer}
              placeholder="Gib deine korrigierte Version ein"
              className="w-full p-2 text-lg"
            />
          </div>
          <AnimatePresence>
            {isCorrect !== null && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`text-lg font-semibold mt-4 ${isCorrect ? 'text-green-600' : 'text-red-600'}`}
              >
                {isCorrect ? 'Richtig!' : `Falsch. Versuche es nochmal. (Versuch ${tryCounter})`}
              </motion.p>
            )}
          </AnimatePresence>
          {showAdvice && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-gray-600 mt-4 p-4 bg-gray-100 rounded-md"
            >
              {currentQuestion.advice}
            </motion.p>
          )}
        </CardContent>
      </Card>
      <div className="flex justify-between">
        <Button disabled={!!feedback}  onClick={() => setShowAdvice(true)} variant="outline" className="text-gray-600">
          Hinweis
        </Button>
        <Button disabled={!!feedback}  onClick={checkAnswer} className="bg-blue-500 hover:bg-blue-600 text-white text-lg py-3" disabled={!currentAnswer}>
          Antwort prüfen
        </Button>
      </div>
    </div>
  )
}

