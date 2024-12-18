'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Sparkles, Heart } from 'lucide-react'

interface Word {
  text: string
  type: string
}

const words: Word[] = [
  { text: "schnell", type: "Adjektiv" },
  { text: "laufen", type: "Verb" },
  { text: "der Tisch", type: "Nomen" },
  { text: "glücklich", type: "Adjektiv" },
  { text: "sie", type: "Pronomen" },
  { text: "und", type: "Konjunktion" },
  { text: "auf", type: "Präposition" },
  { text: "heute", type: "Adverb" },
  { text: "die", type: "Artikel" },
  { text: "springen", type: "Verb" },
]

const wordTypes = ["Nomen", "Verb", "Adjektiv", "Adverb", "Pronomen", "Präposition", "Konjunktion", "Artikel"]

export function WortartenInteraktiv() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(3)
  const [feedback, setFeedback] = useState<string | null>(null)
  const [gameOver, setGameOver] = useState(false)

  const currentWord = words[currentWordIndex]

  useEffect(() => {
    if (lives === 0) {
      setGameOver(true)
    }
  }, [lives])

  const handleAnswer = (selectedType: string) => {
    if (selectedType === currentWord.type) {
      setScore(score + 1)
      setFeedback("Richtig!")
    } else {
      setLives(lives - 1)
      setFeedback(`Falsch. Die richtige Antwort ist: ${currentWord.type}`)
    }

    setTimeout(() => {
      if (currentWordIndex < words.length - 1) {
        setCurrentWordIndex(currentWordIndex + 1)
        setFeedback(null)
      } else {
        setGameOver(true)
      }
    }, 1500)
  }

  const restartGame = () => {
    setCurrentWordIndex(0)
    setScore(0)
    setLives(3)
    setFeedback(null)
    setGameOver(false)
  }

  if (gameOver) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="pt-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Spiel beendet!</h2>
          <p className="text-xl mb-4">Deine Gesamtpunktzahl: {score}</p>
          <Button onClick={restartGame} className="w-full">
            Noch einmal spielen
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Wortarten Interaktiv</span>
          <Badge variant="secondary" className="text-lg">
            <Sparkles className="w-4 h-4 mr-1" />
            {score}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between mb-4">
          <div className="flex">
            {[...Array(lives)].map((_, i) => (
              <Heart key={i} className="w-6 h-6 text-red-500 fill-current" />
            ))}
          </div>
          <Progress value={(currentWordIndex / words.length) * 100} className="w-1/2" />
        </div>
        <p className="text-2xl font-bold mb-6 text-center">{currentWord.text}</p>
        <div className="grid grid-cols-2 gap-4">
          {wordTypes.map((type) => (
            <motion.div key={type} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => handleAnswer(type)}
                className="w-full"
                variant="outline"
              >
                {type}
              </Button>
            </motion.div>
          ))}
        </div>
        {feedback && (
          <p className={`mt-4 text-center ${feedback.includes("Richtig") ? "text-green-600" : "text-red-600"}`}>
            {feedback}
          </p>
        )}
      </CardContent>
    </Card>
  )
}

