'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion, AnimatePresence } from 'framer-motion'
import { addPoints } from '@/utils/gamification'

interface TextWithGaps {
    text: string
    gaps: {
        index: number
        correct: string
    }[]
}

const texts: TextWithGaps[] = [
    {
        text: "Der Flu? flie?t durch die gro?e Stadt.",
        gaps: [
            { index: 7, correct: 'ss' },
            { index: 13, correct: 'ß' },
            { index: 29, correct: 'ß' }
        ]
    },
    {
        text: "Ich wei?, da? du gerne Spa? hast.",
        gaps: [
            { index: 7, correct: 'ß' },
            { index: 12, correct: 'ss' },
            { index: 26, correct: 'ß' }
        ]
    },
    {
        text: "Das Fa? ist au?en wei? und innen na?.",
        gaps: [
            { index: 6, correct: 'ss' },
            { index: 14, correct: 'ß' },
            { index: 21, correct: 'ß' },
            { index: 35, correct: 'ss' }
        ]
    },
    {
        text: "Er i?t gerne hei?e Suppe mit einem Löffel.",
        gaps: [
            { index: 4, correct: 'ss' },
            { index: 16, correct: 'ß' },
        ]
    },
    {
        text: "Die Stra?e ist sehr lang, aber sie führt zum Schlo?.",
        gaps: [
            { index: 8, correct: 'ß' },
            { index: 50, correct: 'ss' }
        ]
    }
]

export function SSZUebung() {
    const [currentTextIndex, setCurrentTextIndex] = useState(0)
    const [userAnswers, setUserAnswers] = useState<string[]>([])
    const [score, setScore] = useState(0)
    const [showFeedback, setShowFeedback] = useState(false)
    const [gameOver, setGameOver] = useState(false)
    const inputRefs = useRef<(HTMLInputElement | null)[]>([])

    const currentText = texts[currentTextIndex]

    useEffect(() => {
        inputRefs.current = inputRefs.current.slice(0, currentText.gaps.length)
    }, [currentText])

    const handleInputChange = (index: number, value: string) => {
        const newAnswers = [...userAnswers]
        newAnswers[index] = value
        setUserAnswers(newAnswers)

        if (value.length === currentText.gaps[index].correct.length) {
            const nextInput = inputRefs.current[index + 1]
            if (nextInput) {
                nextInput.focus()
            }
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace' && userAnswers[index] === '') {
            const prevInput = inputRefs.current[index - 1]
            if (prevInput) {
                prevInput.focus()
            }
        }
    }

    const checkAnswers = () => {
        let correct = 0
        currentText.gaps.forEach((gap, index) => {
            if (userAnswers[index] === gap.correct) {
                correct++
            }
        })
        setScore(score + correct)
        setShowFeedback(true)
        addPoints(correct * 10)

        setTimeout(() => {
            if (currentTextIndex < texts.length - 1) {
                setCurrentTextIndex(currentTextIndex + 1)
                setUserAnswers([])
                setShowFeedback(false)
            } else {
                setGameOver(true)
                updateProgress()
            }
        }, 2000)
    }

    const updateProgress = () => {
        const progress = Math.round((score / texts.length) * 100)
        const storedProgress = localStorage.getItem('deutschLernProgress')
        const progressData = storedProgress ? JSON.parse(storedProgress) : {}
        progressData['s, ss oder ß'] = progress
        localStorage.setItem('deutschLernProgress', JSON.stringify(progressData))
    }

    const restartGame = () => {
        setCurrentTextIndex(0)
        setUserAnswers([])
        setScore(0)
        setShowFeedback(false)
        setGameOver(false)
    }

    if (gameOver) {
        return (
            <Card className="w-full max-w-2xl mx-auto">
                <CardContent className="pt-6 text-center">
                    <h2 className="text-2xl font-bold mb-4">Übung beendet!</h2>
                    <p className="text-xl mb-4">Deine Gesamtpunktzahl: {score}</p>
                    <Button disabled={showFeedback}  onClick={restartGame} className="w-full">
                        Noch einmal spielen
                    </Button>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>Frage {score + 1} von {texts.length}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-lg mb-4">Fülle die Lücken mit s, ss oder ß:</p>
                <div className="text-xl mb-6 leading-relaxed">
                    {currentText.text.split('').map((char, index) => {
                        const gap = currentText.gaps.find(g => g.index === index)
                        if (gap) {
                            const gapIndex = currentText.gaps.indexOf(gap)
                            return (
                                <input
                                    key={index}
                                    // @ts-expect-error because of lint errors
                                    ref={el => inputRefs.current[gapIndex] = el}
                                    type="text"
                                    value={userAnswers[gapIndex] || ''}
                                    onChange={(e) => handleInputChange(gapIndex, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(e, gapIndex)}
                                    className="w-6 text-center border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
                                    maxLength={2}
                                />
                            )
                        }
                        return <span key={index}>{char}</span>
                    })}
                </div>
                <Button onClick={checkAnswers} className="w-full mb-4" disabled={userAnswers.length !== currentText.gaps.length || userAnswers.includes('')}>
                    Antworten überprüfen
                </Button>
                <AnimatePresence>
                    {showFeedback && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="text-center text-lg font-semibold"
                        >
                            {userAnswers.every((answer, index) => answer === currentText.gaps[index].correct)
                                ? "Sehr gut! Alle Antworten sind richtig."
                                : "Einige Antworten sind falsch. Versuche es beim nächsten Satz noch einmal!"}
                        </motion.div>
                    )}
                </AnimatePresence>
            </CardContent>
        </Card>
    )
}

