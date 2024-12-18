'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles } from 'lucide-react'

interface Sentence {
  text: string
  error: string
  correction: string
  explanation: string
}

const sentences: Sentence[] = [
  {
    text: "Ich gehe zu der Schule.",
    error: "zu der",
    correction: "zur",
    explanation: "Bei 'zu' + 'der' wird die Verschmelzungsform 'zur' verwendet."
  },
  {
    text: "Der Hund hat den Knochen gefressen.",
    error: "gefressen",
    correction: "gefressen.",
    explanation: "Am Ende des Satzes fehlt ein Punkt."
  },
  {
    text: "Ich habe gestern ein neues Buch gekauft",
    error: "gekauft",
    correction: "gekauft.",
    explanation: "Am Ende des Satzes fehlt ein Punkt."
  },
  {
    text: "Sie geht oft ins Kino, weil sie Filme mag",
    error: "mag",
    correction: "mag.",
    explanation: "Am Ende des Satzes fehlt ein Punkt."
  },
  {
    text: "Er trinkt gern Kaffe am Morgen.",
    error: "Kaffe",
    correction: "Kaffee",
    explanation: "Das Wort 'Kaffee' wird mit zwei 'f' geschrieben."
  }
]

export function FehlerFindenSpiel() {
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0)
  const [selectedWord, setSelectedWord] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [feedback, setFeedback] = useState<string | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)

  const currentSentence = sentences[currentSentenceIndex]

  const checkAnswer = () => {
    if (selectedWord === currentSentence.error) {
      setScore(score + 1)
      setFeedback("Richtig! Du hast den Fehler gefunden.")
      setShowExplanation(true)
    } else {
      setFeedback("Das ist nicht der Fehler. Versuche es noch einmal!")
    }
  }

  const nextSentence = () => {
    if (currentSentenceIndex < sentences.length - 1) {
      setCurrentSentenceIndex(currentSentenceIndex + 1)
      setSelectedWord(null)
      setFeedback(null)
      setShowExplanation(false)
    } else {
      updateProgress()
      setFeedback("Spiel beendet! Du hast alle Fehler gefunden!")
    }
  }

  const updateProgress = () => {
    const progress = Math.round((score / sentences.length) * 100)
    const storedProgress = localStorage.getItem('deutschLernProgress')
    let progressData = storedProgress ? JSON.parse(storedProgress) : {}
    progressData['Fehler finden'] = progress
    localStorage.setItem('deutschLernProgress', JSON.stringify(progressData))
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Fehler finden</span>
          <Badge variant="secondary" className="text-lg">
            <Sparkles className="w-4 h-4 mr-1" />
            {score}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-lg mb-4">Finde den Fehler im folgenden Satz:</p>
        <p className="text-lg mb-4">
          {currentSentence.text.split(' ').map((word, index) => (
            <span
              key={index}
              className={`cursor-pointer ${selectedWord === word ? 'bg-yellow-200' : ''}`}
              onClick={() => setSelectedWord(word)}
            >
              {word}{' '}
            </span>
          ))}
        </p>
        <Button onClick={checkAnswer} className="w-full mb-4">Überprüfen</Button>
        {feedback && (
          <p className={`text-center mb-4 ${feedback.includes("Richtig") ? "text-green-600" : "text-red-600"}`}>
            {feedback}
          </p>
        )}
        {showExplanation && (
          <div className="mb-4">
            <p className="font-bold">Erklärung:</p>
            <p>{currentSentence.explanation}</p>
            <p className="mt-2">Korrekt: {currentSentence.text.replace(currentSentence.error, currentSentence.correction)}</p>
          </div>
        )}
        {showExplanation && (
          <Button onClick={nextSentence} className="w-full">Nächster Satz</Button>
        )}
      </CardContent>
    </Card>
  )
}

