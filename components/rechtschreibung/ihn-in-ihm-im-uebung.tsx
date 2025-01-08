'use client'

import React, {useState, useRef, useEffect} from 'react'
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Badge} from "@/components/ui/badge"
import {Sparkles} from 'lucide-react'
import {motion, AnimatePresence} from 'framer-motion'
import {addPoints, unlockBadge} from '@/utils/gamification'
import {saveProgress} from '@/utils/progress-manager'

interface Sentence {
    text: string
    gaps: {
        index: number
        correct: string
        options: string[]
    }[]
}

const sentences: Sentence[] = [
    {
        text: "Ich sehe ? jeden Tag im Park.",
        gaps: [
            {index: 9, correct: "ihn", options: ["ihn", "in"]}
        ]
    },
    {
        text: "Wir gehen ? das Kino.",
        gaps: [
            {index: 10, correct: "in", options: ["ihn", "in"]}
        ]
    },
    {
        text: "Ich habe ? gestern geholfen.",
        gaps: [
            {index: 9, correct: "ihm", options: ["ihm", "im"]}
        ]
    },
    {
        text: "? Sommer fahren wir ans Meer.",
        gaps: [
            {index: 0, correct: "Im", options: ["Ihm", "Im"]}
        ]
    },
    {
        text: "Der Ball liegt ? Garten.",
        gaps: [
            {index: 15, correct: "im", options: ["ihm", "im"]}
        ]
    }
]

export function IhnInIhmImUebung() {
    const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0)
    const [userAnswers, setUserAnswers] = useState<string[]>([])
    const [score, setScore] = useState(0)
    const [showFeedback, setShowFeedback] = useState(false)
    const [gameOver, setGameOver] = useState(false)
    const inputRefs = useRef<(HTMLSelectElement | null)[]>([])

    const currentSentence = sentences[currentSentenceIndex]

    useEffect(() => {
        inputRefs.current = inputRefs.current.slice(0, currentSentence.gaps.length)
        setUserAnswers([])
    }, [currentSentence])

    const handleInputChange = (index: number, value: string) => {
        const newAnswers = [...userAnswers]
        newAnswers[index] = value
        setUserAnswers(newAnswers)
    }

    const checkAnswers = () => {
        let correct = 0
        currentSentence.gaps.forEach((gap, index) => {
            if (userAnswers[index] === gap.correct) {
                correct++
            }
        })
        setScore(score + correct)
        setShowFeedback(true)
        addPoints(correct * 10)

        setTimeout(() => {
            if (currentSentenceIndex < sentences.length - 1) {
                setCurrentSentenceIndex(currentSentenceIndex + 1)
                setShowFeedback(false)
            } else {
                setGameOver(true)
                updateProgress()
            }
        }, 2000)
    }

    const updateProgress = () => {
        const totalGaps = sentences.reduce((sum, sentence) => sum + sentence.gaps.length, 0)
        const progress = Math.round((score / totalGaps) * 100)
        saveProgress('Ihn/In Ihm/Im Übung', progress)
        if (progress === 100) {
            unlockBadge('ihn-in-ihm-im-meister')
        }
    }

    const restartGame = () => {
        setCurrentSentenceIndex(0)
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
                    <span>ihn/in und ihm/im Übung</span>
                    <Badge variant="secondary" className="text-lg">
                        <Sparkles className="w-4 h-4 mr-1"/>
                        {score}
                    </Badge>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-lg mb-4">Wähle die richtige Option:</p>
                <div className="text-xl mb-6 leading-relaxed">
                    {currentSentence.text.split('').map((char, index) => {
                        const gap = currentSentence.gaps.find(g => g.index === index)
                        if (gap) {
                            const gapIndex = currentSentence.gaps.indexOf(gap)

                            return (
                                <select
                                    key={index}
                                    // @ts-expect-error because of lint errors
                                    ref={el => inputRefs.current[gapIndex] = el}
                                    value={userAnswers[gapIndex] || ''}
                                    onChange={(e) => handleInputChange(gapIndex, e.target.value)}
                                    className="w-16 text-center border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
                                >
                                    <option value="" disabled></option>
                                    {gap.options.map(option => (
                                        <option key={option} value={option}>{option}</option>
                                    ))}
                                </select>
                            )
                        }
                        return <span key={index}>{char}</span>
                    })}
                </div>
                <Button onClick={checkAnswers} className="w-full mb-4"
                        disabled={userAnswers.length !== currentSentence.gaps.length || userAnswers.includes('')}>
                    Antworten überprüfen
                </Button>
                <AnimatePresence>
                    {showFeedback && (
                        <motion.div
                            initial={{opacity: 0, y: -10}}
                            animate={{opacity: 1, y: 0}}
                            exit={{opacity: 0, y: -10}}
                            className="text-center text-lg font-semibold"
                        >
                            {userAnswers.every((answer, index) => answer === currentSentence.gaps[index].correct)
                                ? "Sehr gut! Alle Antworten sind richtig."
                                : "Einige Antworten sind falsch. Versuche es beim nächsten Satz noch einmal!"}
                        </motion.div>
                    )}
                </AnimatePresence>
            </CardContent>
        </Card>
    )
}
