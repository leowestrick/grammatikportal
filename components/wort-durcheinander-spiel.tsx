'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles } from 'lucide-react'

interface Word {
  original: string
  scrambled: string
  hint: string
}

const words: Word[] = [
  { original: "Schule", scrambled: "huleSc", hint: "Ein Ort zum Lernen" },
  { original: "Freund", scrambled: "undFre", hint: "Eine Person, die man mag" },
  { original: "Sonne", scrambled: "neSon", hint: "Scheint am Tag am Himmel" },
  { original: "Buch", scrambled: "chBu", hint: "Man liest es" },
  { original: "Apfel", scrambled: "felAp", hint: "Eine runde, süße Frucht" },
]

export function WortDurcheinanderSpiel() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [userGuess, setUserGuess] = useState("")
  const [score, setScore] = useState(0)
  const [showHint, setShowHint] = useState(false)
  const [feedback, setFeedback] = useState<string | null>(null)

  const currentWord = words[currentWordIndex]

  const checkGuess = () => {
    if (userGuess.toLowerCase() === currentWord.original.toLowerCase()) {
      setScore(score + 1)
      setFeedback("Richtig! Gut gemacht!")
      setTimeout(() => {
        if (currentWordIndex < words.length - 1) {
          setCurrentWordIndex(currentWordIndex + 1)
          setUserGuess("")
          setShowHint(false)
          setFeedback(null)
        } else {
          updateProgress()
          setFeedback("Spiel beendet! Du hast alle Wörter erraten!")
        }
      }, 1500)
    } else {
      setFeedback("Nicht ganz richtig. Versuche es noch einmal!")
    }
  }

  const updateProgress = () => {
    const progress = Math.round((score / words.length) * 100)
    const storedProgress = localStorage.getItem('deutschLernProgress')
    const progressData = storedProgress ? JSON.parse(storedProgress) : {}
    progressData['Wort-Durcheinander'] = progress
    localStorage.setItem('deutschLernProgress', JSON.stringify(progressData))
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Wort-Durcheinander</span>
          <Badge variant="secondary" className="text-lg">
            <Sparkles className="w-4 h-4 mr-1" />
            {score}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold mb-4 text-center">{currentWord.scrambled}</p>
        <Input
          type="text"
          value={userGuess}
          onChange={(e) => setUserGuess(e.target.value)}
          placeholder="Gib das richtige Wort ein"
          className="mb-4"
        />
        <div className="flex justify-between mb-4">
          <Button onClick={() => setShowHint(true)} variant="outline">
            Hinweis
          </Button>
          <Button onClick={checkGuess}>Überprüfen</Button>
        </div>
        {showHint && (
          <p className="text-sm text-gray-600 mb-4">Hinweis: {currentWord.hint}</p>
        )}
        {feedback && (
          <p className={`text-center ${feedback.includes("Richtig") ? "text-green-600" : "text-red-600"}`}>
            {feedback}
          </p>
        )}
      </CardContent>
    </Card>
  )
}

