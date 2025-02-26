'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from 'framer-motion'
import { addPoints } from '@/utils/gamification'

interface Word {
    word: string
    correct: string
    options: string[]
}

const words: Word[] = [
    { word: "fe_len", correct: "fehlen", options: ["fehlen", "felen"] },
    { word: "za_m", correct: "zahm", options: ["zahm", "zam"] },
    { word: "Ro_r", correct: "Rohr", options: ["Rohr", "Ror"] },
    { word: "Stra_l", correct: "Strahl", options: ["Strahl", "Stral"] },
    { word: "fü_ren", correct: "führen", options: ["führen", "füren"] },
    { word: "Stu_l", correct: "Stuhl", options: ["Stuhl", "Stul"] },
    { word: "Mü_e", correct: "Mühe", options: ["Mühe", "Müe"] },
    { word: "nä_en", correct: "nähen", options: ["nähen", "näen"] },
    { word: "Fa_ne", correct: "Fahne", options: ["Fahne", "Fane"] },
    { word: "Bo_ne", correct: "Bohne", options: ["Bohne", "Bone"] },
]

export function DehnungsHUebung() {
    const [currentWordIndex, setCurrentWordIndex] = useState(0)
    const [score, setScore] = useState(0)
    const [feedback, setFeedback] = useState<string | null>(null)
    const [gameOver, setGameOver] = useState(false)

    const currentWord = words[currentWordIndex]

    const checkAnswer = (selectedAnswer: string) => {
        const isCorrect = selectedAnswer === currentWord.correct

        if (isCorrect) {
            setScore(score + 1)
            addPoints(10)
            setFeedback("Richtig! Gut gemacht!")
        } else {
            setFeedback(`Falsch. Die richtige Antwort ist: ${currentWord.correct}`)
        }

        setTimeout(() => {
            if (currentWordIndex < words.length - 1) {
                setCurrentWordIndex(currentWordIndex + 1)
                setFeedback(null)
            } else {
                setGameOver(true)
                updateProgress()
            }
        }, 2000)
    }

    const updateProgress = () => {
        const progress = Math.round((score / words.length) * 100)
        const storedProgress = localStorage.getItem('deutschLernProgress')
        const progressData = storedProgress ? JSON.parse(storedProgress) : {}
        progressData['Dehnungs-h'] = progress
        localStorage.setItem('deutschLernProgress', JSON.stringify(progressData))
    }

    const restartGame = () => {
        setCurrentWordIndex(0)
        setScore(0)
        setFeedback(null)
        setGameOver(false)
    }

    if (gameOver) {
        return (
            <Card className="w-full max-w-md mx-auto">
                <CardContent className="pt-6 text-center">
                    <h2 className="text-2xl font-bold mb-4">Übung beendet!</h2>
                    <p className="text-xl mb-4">Deine Punktzahl: {score} von {words.length}</p>
                    <Button disabled={!!feedback}  onClick={restartGame} className="w-full">
                        Noch einmal spielen
                    </Button>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle>Frage {score + 1} von {words.length}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-lg mb-4">Wähle die richtige Schreibweise:</p>
                <p className="text-2xl font-bold mb-6 text-center">{currentWord.word}</p>
                <div className="grid grid-cols-2 gap-4 mb-4">
                    {currentWord.options.map((option, index) => (
                        <Button disabled={!!feedback}
                            key={index}
                            onClick={() => checkAnswer(option)}
                            className="w-full text-lg py-2"
                        >
                            {option}
                        </Button>
                    ))}
                </div>
                {feedback && (
                    <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`text-center ${feedback.includes("Richtig") ? "text-green-600" : "text-red-600"}`}
                    >
                        {feedback}
                    </motion.p>
                )}
            </CardContent>
        </Card>
    )
}

