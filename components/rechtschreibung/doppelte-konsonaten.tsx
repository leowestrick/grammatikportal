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
    { word: "ko__en", correct: "kommen", options: ["kommen", "komen"] },
    { word: "Wa__er", correct: "Wasser", options: ["Wasser", "Waser"] },
    { word: "he__", correct: "hell", options: ["hell", "hel"] },
    { word: "Kla__e", correct: "Klasse", options: ["Klasse", "Klase"] },
    { word: "Scha__en", correct: "Schatten", options: ["Schatten", "Schaten"] },
    { word: "bi__e", correct: "bitte", options: ["bitte", "bite"] },
    { word: "Stu__e", correct: "Stufe", options: ["Stuffe", "Stufe"] },
    { word: "Gru__e", correct: "Gruppe", options: ["Gruppe", "Grupe"] },
    { word: "Kno__e", correct: "Knope", options: ["Knoppe", "Knope"] },
    { word: "Schli__en", correct: "Schlitten", options: ["Schlitten", "Schliten"] },
    { word: "Ho__nung", correct: "Hoffnung", options: ["Hoffnung", "Hofnung"] },
    { word: "Schu__e", correct: "Schule", options: ["Schulle", "Schule"] },
    { word: "Ka__ee", correct: "Kaffee", options: ["Kaffee", "Kafee"] },
    { word: "Lö__el", correct: "Löffel", options: ["Löffel", "Löfel"] },
    { word: "Ga__el", correct: "Gabel", options: ["Gabbel", "Gabel"] },
]

export function DoppelteKonsonantenUebung() {
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
        progressData['Doppelte Konsonanten'] = progress
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