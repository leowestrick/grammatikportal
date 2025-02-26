'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Frage {
  satz: string
  satzglied: string
  optionen: string[]
  korrekt: string
}

const questions: Frage[] = [
  {
    satz: "<mark>Der Hund</mark> bellt laut.",
    satzglied: "Der Hund",
    optionen: ["Subjekt", "Prädikat", "Objekt", "Adverbiale Bestimmung"],
    korrekt: "Subjekt"
  },
  {
    satz: "Sie liest <mark>ein spannendes Buch.</mark>",
    satzglied: "ein spannendes Buch",
    optionen: ["Subjekt", "Prädikat", "Objekt", "Attribut"],
    korrekt: "Objekt"
  },
  {
    satz: "<mark>Morgen</mark> fahren wir in den Urlaub.",
    satzglied: "Morgen",
    optionen: ["Subjekt", "Prädikat", "Objekt", "Adverbiale Bestimmung"],
    korrekt: "Adverbiale Bestimmung"
  },
  {
    satz: "Der alte Mann <mark>geht</mark> langsam.",
    satzglied: "geht",
    optionen: ["Subjekt", "Prädikat", "Objekt", "Adverbiale Bestimmung"],
    korrekt: "Prädikat"
  },
  {
    satz: "Die Katze <mark>der Nachbarin</mark> schläft auf dem Sofa.",
    satzglied: "der Nachbarin",
    optionen: ["Subjekt", "Prädikat", "Objekt", "Attribut"],
    korrekt: "Attribut"
  }
]

export function SatzgliederUebung() {
  const [aktuelleFrageIndex, setAktuelleFrageIndex] = useState(0)
  const [antwort, setAntwort] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [istBeendet, setIstBeendet] = useState(false)
  const [feedback, setFeedback] = useState<string | null>(null)

  const aktuelleFrage = questions[aktuelleFrageIndex]

  const pruefeAntwort = () => {
    if (antwort === aktuelleFrage.korrekt) {
      setScore(score + 1)
      setFeedback("Richtig!")
    } else {
      setFeedback(`Falsch. Die richtige Antwort ist: ${aktuelleFrage.korrekt}`)
    }

    setTimeout(() => {
      if (aktuelleFrageIndex < questions.length - 1) {
        setAktuelleFrageIndex(aktuelleFrageIndex + 1)
        setAntwort(null)
        setFeedback(null)
      } else {
        setIstBeendet(true)
      }
    }, 2000)
  }

  const updateProgress = () => {
    const progress = Math.round((score / questions.length) * 100)
    const storedProgress = localStorage.getItem('deutschLernProgress')
    const progressData = storedProgress ? JSON.parse(storedProgress) : {}
    progressData['Satzglieder'] = progress
    localStorage.setItem('deutschLernProgress', JSON.stringify(progressData))
  }

  if (istBeendet) {
    updateProgress()
    return (
      <Card>
        <CardContent className="pt-6">
          <h2 className="text-2xl font-bold mb-4">Übung beendet!</h2>
          <p className="text-xl mb-4">Deine Punktzahl: {score} von {questions.length}</p>
          <Button disabled={!!feedback}  onClick={() => {
            setAktuelleFrageIndex(0)
            setScore(0)
            setAntwort(null)
            setFeedback(null)
            setIstBeendet(false)
          }}>
            Nochmal versuchen
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Frage {aktuelleFrageIndex + 1} von {questions.length}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-lg mb-4" dangerouslySetInnerHTML={{__html: aktuelleFrage.satz}}></p>
        <Select value={antwort || ""} onValueChange={setAntwort}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Wähle ein Satzglied"/>
          </SelectTrigger>
          <SelectContent>
            {aktuelleFrage.optionen.map((option) => (
                <SelectItem key={option} value={option}>{option}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button disabled={!!feedback}  onClick={pruefeAntwort} className="mt-4" disabled={!antwort}>
          Antwort prüfen
        </Button>
        {feedback && (
            <p className={`mt-4 ${feedback.startsWith("Richtig") ? "text-green-600" : "text-red-600"}`}>
              {feedback}
            </p>
        )}
      </CardContent>
    </Card>
  )
}

