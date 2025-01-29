'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Info } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import React from 'react'

interface Sentence {
  text: string
  correctPositions: number[]
  rule: string
}

const sentences: Sentence[] = [
  {
    text: "Ich gehe in den Park um Fußball zu spielen",
    correctPositions: [4],
    rule: "Vor 'um ... zu' Konstruktionen wird ein Komma gesetzt."
  },
  {
    text: "Obwohl es regnete gingen wir spazieren",
    correctPositions: [0,2],
    rule: "Nach einem Nebensatz, der mit einer unterordnenden Konjunktion beginnt, steht ein Komma."
  },
  {
    text: "Sie kochte Nudeln Kartoffeln und Reis",
    correctPositions: [2],
    rule: "In Aufzählungen werden die Elemente durch Kommas getrennt."
  },
  {
    text: "Der Mann der dort steht ist mein Bruder",
    correctPositions: [1, 4],
    rule: "Relativsätze werden durch Kommas vom Hauptsatz getrennt."
  },
  {
    text: "Ich weiß dass du Recht hast",
    correctPositions: [1],
    rule: "Vor 'dass' steht ein Komma, wenn es einen Nebensatz einleitet."
  }
]

export function KommasetzungSpiel() {
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0)
  const [userCommas, setUserCommas] = useState<number[]>([])
  const [score, setScore] = useState(0)
  const [feedback, setFeedback] = useState<string | null>(null)
  const [showRule, setShowRule] = useState(false)
  const [gameOver, setGameOver] = useState(false)

  const currentSentence = sentences[currentSentenceIndex]

  const toggleComma = (index: number) => {
    setUserCommas(prev =>
        prev.includes(index)
            ? prev.filter(i => i !== index)
            : [...prev, index].sort((a, b) => a - b)
    )
  }

  const checkAnswer = () => {
    const correct = JSON.stringify(userCommas) === JSON.stringify(currentSentence.correctPositions)
    if (correct) {
      setScore(score + 10)  // Fixed points per correct answer
      setFeedback("Richtig! Super gemacht!")
      setTimeout(() => {
        if (currentSentenceIndex < sentences.length - 1) {
          setCurrentSentenceIndex(currentSentenceIndex + 1)
          setUserCommas([])
          setFeedback(null)
          setShowRule(false)
        } else {
          endGame()
        }
      }, 2000)
    } else {
      setFeedback("Nicht ganz richtig. Versuch es noch einmal!")
      setShowRule(true)
    }
  }

  const endGame = () => {
    updateProgress()
    setGameOver(true)
    setFeedback(null)
  }

  const restartGame = () => {
    setCurrentSentenceIndex(0)
    setUserCommas([])
    setScore(0)
    setFeedback(null)
    setShowRule(false)
    setGameOver(false)
  }

  const updateProgress = () => {
    const progress = Math.round((score / sentences.length) * 100)
    const storedProgress = localStorage.getItem('deutschLernProgress')
    const progressData = storedProgress ? JSON.parse(storedProgress) : {}
    progressData['Kommasetzung'] = progress
    localStorage.setItem('deutschLernProgress', JSON.stringify(progressData))
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
            <span>Kommasetzung-Spiel</span>
            <Badge variant="secondary" className="text-lg">
              <Sparkles className="w-4 h-4 mr-1" />
              {score}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg mb-4">Klicke auf die Stellen, wo ein Komma stehen sollte:</p>
          <div className="text-2xl mb-6 leading-loose flex flex-wrap items-center">
            {currentSentence.text.split(' ').map((word, index, array) => (
                <React.Fragment key={index}>
                  <span>{word}</span>
                  {index < array.length - 1 && (
                      <span
                          className={`cursor-pointer px-1 ${userCommas.includes(index) ? 'text-blue-500 font-bold' : 'text-transparent'}`}
                          onClick={() => toggleComma(index)}
                      >
                  ,
                </span>
                  )}
                </React.Fragment>
            ))}
          </div>
          {feedback && (
              <div className={`mb-4 p-2 rounded text-center ${feedback.includes("Richtig") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                {feedback}
              </div>
          )}
          {showRule && (
              <div className="mb-4 p-2 bg-blue-100 text-blue-800 rounded">
                <strong>Regel:</strong> {currentSentence.rule}
              </div>
          )}
          <div className="flex justify-between items-center">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Info className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Klicke zwischen die Wörter, um Kommas zu setzen oder zu entfernen.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Button onClick={checkAnswer}>Antwort prüfen</Button>
          </div>
        </CardContent>
      </Card>
  )
}