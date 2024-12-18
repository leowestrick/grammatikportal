'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles } from 'lucide-react'

interface Sentence {
  text: string
  blanks: string[]
  answers: string[]
}

const sentences: Sentence[] = [
  {
    text: "Ich ___ jeden Tag zur Schule.",
    blanks: ["___"],
    answers: ["gehe"]
  },
  {
    text: "Der Hund ___ laut, wenn jemand an der Tür ___.",
    blanks: ["___", "___"],
    answers: ["bellt", "klopft"]
  },
  {
    text: "Im Sommer ___ die Sonne sehr ___.",
    blanks: ["___", "___"],
    answers: ["scheint", "hell"]
  },
  {
    text: "Meine Schwester ___ gerne Bücher über Geschichte.",
    blanks: ["___"],
    answers: ["liest"]
  },
  {
    text: "Wir ___ am Wochenende oft ins Kino oder ins ___.",
    blanks: ["___", "___"],
    answers: ["gehen", "Theater"]
  }
]

export function LueckentextSpiel() {
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState<string[]>([])
  const [score, setScore] = useState(0)
  const [feedback, setFeedback] = useState<string | null>(null)

  const currentSentence = sentences[currentSentenceIndex]

  const checkAnswers = () => {
    const allCorrect = currentSentence.answers.every((answer, index) => 
      answer.toLowerCase() === userAnswers[index]?.toLowerCase()
    )

    if (allCorrect) {
      setScore(score + 1)
      setFeedback("Richtig! Gut gemacht!")
      setTimeout(() => {
        if (currentSentenceIndex < sentences.length - 1) {
          setCurrentSentenceIndex(currentSentenceIndex + 1)
          setUserAnswers([])
          setFeedback(null)
        } else {
          updateProgress()
          setFeedback("Spiel beendet! Du hast alle Sätze richtig vervollständigt!")
        }
      }, 1500)
    } else {
      setFeedback("Nicht ganz richtig. Versuche es noch einmal!")
    }
  }

  const handleInputChange = (index: number, value: string) => {
    const newAnswers = [...userAnswers]
    newAnswers[index] = value
    setUserAnswers(newAnswers)
  }

  const updateProgress = () => {
    const progress = Math.round((score / sentences.length) * 100)
    const storedProgress = localStorage.getItem('deutschLernProgress')
    let progressData = storedProgress ? JSON.parse(storedProgress) : {}
    progressData['Lückentext'] = progress
    localStorage.setItem('deutschLernProgress', JSON.stringify(progressData))
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Lückentext</span>
          <Badge variant="secondary" className="text-lg">
            <Sparkles className="w-4 h-4 mr-1" />
            {score}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-lg mb-4">
          {currentSentence.text.split('___').map((part, index) => (
            <span key={index}>
              {part}
              {index < currentSentence.blanks.length && (
                <Input
                  type="text"
                  value={userAnswers[index] || ''}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  className="w-20 inline-block mx-1"
                />
              )}
            </span>
          ))}
        </p>
        <Button onClick={checkAnswers} className="w-full mb-4">Überprüfen</Button>
        {feedback && (
          <p className={`text-center ${feedback.includes("Richtig") ? "text-green-600" : "text-red-600"}`}>
            {feedback}
          </p>
        )}
      </CardContent>
    </Card>
  )
}

