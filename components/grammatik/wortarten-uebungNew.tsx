"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"


interface Question {
    id: number
    sentence: string
    highlightedWord: string
    correctType: string
}

const questions: Question[] = [
    {
        id: 1,
        sentence: "Der <mark>schnelle</mark> Hund läuft im Park.",
        highlightedWord: "schnelle",
        correctType: "Adjektiv",
    },
    {
        id: 2,
        sentence: "Meine Schwester <mark>liest</mark> ein interessantes Buch.",
        highlightedWord: "liest",
        correctType: "Verb",
    },
    {
        id: 3,
        sentence: "Der <mark>Tisch</mark> steht in der Ecke des Zimmers.",
        highlightedWord: "Tisch",
        correctType: "Nomen",
    },
    {
        id: 4,
        sentence: "<mark>Heute</mark> ist das Wetter besonders schön.",
        highlightedWord: "Heute",
        correctType: "Adverb",
    },
    {
        id: 5,
        sentence: "<mark>Sie</mark> geht jeden Tag zur Arbeit.",
        highlightedWord: "Sie",
        correctType: "Pronomen",
    },
    {
        id: 6,
        sentence: "Das Buch liegt <mark>auf</mark> dem Tisch.",
        highlightedWord: "auf",
        correctType: "Präposition",
    },
    {
        id: 7,
        sentence: "Ich mag Äpfel <mark>und</mark> Bananen.",
        highlightedWord: "und",
        correctType: "Konjunktion",
    },
    {
        id: 8,
        sentence: "<mark>Der</mark> Himmel ist heute blau.",
        highlightedWord: "Der",
        correctType: "Artikel",
    },
]

const wordTypes = ["Nomen", "Verb", "Adjektiv", "Adverb", "Pronomen", "Präposition", "Konjunktion", "Artikel"]

export function WortartenSentenceQuiz() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [score, setScore] = useState(0)
    const [feedback, setFeedback] = useState<string | null>(null)
    const [gameOver, setGameOver] = useState(false)

    const currentQuestion = questions[currentQuestionIndex]

    const handleAnswer = (selectedType: string) => {
        const isCorrect = selectedType === currentQuestion.correctType
        if (isCorrect) {
            setScore(score + 1)
            setFeedback(`Richtig! "${currentQuestion.highlightedWord}" ist ein ${currentQuestion.correctType}.`)
        } else {
            setFeedback(
                `Falsch. "${currentQuestion.highlightedWord}" ist kein ${selectedType}, sondern ein ${currentQuestion.correctType}.`,
            )
        }

        setTimeout(() => {
            if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1)
                setFeedback(null)
            } else {
                setGameOver(true)
            }
        }, 2000)
    }

    const updateProgress = () => {
        const progress = Math.round((score / questions.length) * 100)
        const storedProgress = localStorage.getItem('deutschLernProgress')
        const progressData = storedProgress ? JSON.parse(storedProgress) : {}
        progressData['Wortarten'] = progress
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
            <Card className="w-full lg:max-w-2xl mx-auto">
                <CardContent className="pt-6 text-center">
                    <h2 className="text-2xl font-bold mb-4">Spiel beendet!</h2>
                    <p className="text-xl mb-4">
                        Deine Gesamtpunktzahl: {score} von {questions.length}
                    </p>
                    <Button disabled={!!feedback}  onClick={restartGame} className="w-full">
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
                    <span>Wortarten Übung</span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-lg mb-4">Wähle die richtige Wortart für das markierte Wort:</p>
                <p className="text-xl font-semibold mb-6" dangerouslySetInnerHTML={{ __html: currentQuestion.sentence }} />
                <div className="grid grid-cols-2 gap-4 mb-4">
                    {wordTypes.map((type) => (
                        <Button disabled={!!feedback}  key={type} onClick={() => handleAnswer(type)} variant="outline" className="w-full">
                            {type}
                        </Button>
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

