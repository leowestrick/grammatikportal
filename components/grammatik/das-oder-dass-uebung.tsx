"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Question {
    id: number
    sentence: string
    correctAnswer: "dass" | "das"
    explanation: string
}

const questions: Question[] = [
    {
        id: 1,
        sentence: "Ich hoffe, ___ du bald wieder gesund wirst.",
        correctAnswer: "dass",
        explanation: "'Dass' wird hier als Konjunktion verwendet, um einen Nebensatz einzuleiten.",
    },
    {
        id: 2,
        sentence: "___ Buch, das du mir empfohlen hast, ist sehr interessant.",
        correctAnswer: "das",
        explanation: "'Das' wird hier als Artikel verwendet, um auf das Nomen 'Buch' zu verweisen.",
    },
    {
        id: 3,
        sentence: "Es ist wichtig, ___ du pünktlich kommst.",
        correctAnswer: "dass",
        explanation: "'Dass' leitet hier einen Nebensatz ein, der den Hauptsatz ergänzt.",
    },
    {
        id: 4,
        sentence: "___ ist genau das, was ich brauche.",
        correctAnswer: "das",
        explanation: "'Das' wird hier als Demonstrativpronomen verwendet, um auf etwas Bestimmtes zu zeigen.",
    },
    {
        id: 5,
        sentence: "Ich weiß, ___ du hart gearbeitet hast.",
        correctAnswer: "dass",
        explanation: "'Dass' wird verwendet, um einen Objektsatz einzuleiten.",
    },
    {
        id: 6,
        sentence: "___ Auto, das dort parkt, gehört meinem Nachbarn.",
        correctAnswer: "das",
        explanation: "'Das' ist hier der bestimmte Artikel für das Nomen 'Auto'.",
    },
    {
        id: 7,
        sentence: "Es freut mich, ___ du dich dafür interessierst.",
        correctAnswer: "dass",
        explanation: "'Dass' leitet einen Nebensatz ein, der den Grund für die Freude angibt.",
    },
    {
        id: 8,
        sentence: "___ Wetter ist heute wunderschön.",
        correctAnswer: "das",
        explanation: "'Das' wird als Artikel vor dem Nomen 'Wetter' verwendet.",
    },
]

export function DassVsDasQuiz() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [score, setScore] = useState(0)
    const [feedback, setFeedback] = useState<string | null>(null)
    const [gameOver, setGameOver] = useState(false)

    const currentQuestion = questions[currentQuestionIndex]

    const handleAnswer = (answer: "dass" | "das") => {
        const isCorrect = answer === currentQuestion.correctAnswer
        if (isCorrect) {
            setScore(score + 1)
            setFeedback(`Richtig! ${currentQuestion.explanation}`)
        } else {
            setFeedback(`Falsch. Die richtige Antwort ist "${currentQuestion.correctAnswer}". ${currentQuestion.explanation}`)
        }

        setTimeout(() => {
            if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1)
                setFeedback(null)
            } else {
                setGameOver(true)
            }
        }, 3000)
    }

    const updateProgress = () => {
        const progress = Math.round((score / questions.length) * 100)
        const storedProgress = localStorage.getItem('deutschLernProgress')
        const progressData = storedProgress ? JSON.parse(storedProgress) : {}
        progressData['dass vs. das'] = progress
        localStorage.setItem('deutschLernProgress', JSON.stringify(progressData))
    }
    const restartGame = () => {
        setCurrentQuestionIndex(0)
        setScore(0)
        setFeedback(null)
        setGameOver(false)
    }

    if (gameOver) {
        updateProgress()
        return (
            <Card className="w-full max-w-2xl mx-auto">
                <CardContent className="pt-6 text-center">
                    <h2 className="text-2xl font-bold mb-4">Spiel beendet!</h2>
                    <p className="text-xl mb-4">
                        Deine Gesamtpunktzahl: {score} von {questions.length}
                    </p>
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
                <CardTitle>Frage {score + 1} von {questions.length}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-lg mb-4">Wähle die richtige Form (dass oder das) für den folgenden Satz:</p>
                <p className="text-xl font-semibold mb-6">{currentQuestion.sentence.replace("___", "________")}</p>
                <div className="flex justify-center space-x-4 mb-4">
                    <Button disabled={!!feedback}  onClick={() => handleAnswer("dass")} variant="outline" className="w-1/3">
                        dass
                    </Button>
                    <Button disabled={!!feedback}  onClick={() => handleAnswer("das")} variant="outline" className="w-1/3">
                        das
                    </Button>
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

