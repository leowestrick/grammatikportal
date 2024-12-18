'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { addPoints, unlockBadge } from '../../utils/gamification'
import { saveProgress } from '../../utils/progress-manager'

interface Frage {
  wort: string
  optionen: string[]
  korrekt: string
}

const fragen: Frage[] = [
  { wort: "schnell", optionen: ["Adjektiv", "Verb", "Nomen", "Adverb"], korrekt: "Adjektiv" },
  { wort: "laufen", optionen: ["Adjektiv", "Verb", "Nomen", "Adverb"], korrekt: "Verb" },
  { wort: "der Tisch", optionen: ["Adjektiv", "Verb", "Nomen", "Adverb"], korrekt: "Nomen" },
  { wort: "heute", optionen: ["Adjektiv", "Verb", "Nomen", "Adverb"], korrekt: "Adverb" },
  { wort: "und", optionen: ["Konjunktion", "Präposition", "Artikel", "Pronomen"], korrekt: "Konjunktion" },
]

export function WortartenUebung() {
  const [aktuelleFrageIndex, setAktuelleFrageIndex] = useState(0)
  const [antwort, setAntwort] = useState<string | null>(null)
  const [punktzahl, setPunktzahl] = useState(0)
  const [istBeendet, setIstBeendet] = useState(false)
  const [feedback, setFeedback] = useState<string | null>(null)

  const aktuelleFrage = fragen[aktuelleFrageIndex]

  const pruefeAntwort = () => {
    if (antwort === aktuelleFrage.korrekt) {
      setPunktzahl(punktzahl + 1)
      addPoints(10)
      setFeedback("Richtig! Gut gemacht!")
    } else {
      setFeedback(`Falsch. Die richtige Antwort ist: ${aktuelleFrage.korrekt}`)
    }

    setTimeout(() => {
      if (aktuelleFrageIndex < fragen.length - 1) {
        setAktuelleFrageIndex(aktuelleFrageIndex + 1)
        setAntwort(null)
        setFeedback(null)
      } else {
        setIstBeendet(true)
        updateProgress()
      }
    }, 2000)
  }

  const updateProgress = () => {
    const progress = Math.round((punktzahl / fragen.length) * 100)
    saveProgress('Wortarten', progress)
    if (progress === 100) {
      unlockBadge('wortarten-meister')
    }
  }

  if (istBeendet) {
    return (
      <Card>
        <CardContent className="pt-6">
          <h2 className="text-2xl font-bold mb-4">Übung beendet!</h2>
          <p className="text-xl mb-4">Deine Punktzahl: {punktzahl} von {fragen.length}</p>
          <Button onClick={() => {
            setAktuelleFrageIndex(0)
            setPunktzahl(0)
            setAntwort(null)
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
        <CardTitle>Frage {aktuelleFrageIndex + 1} von {fragen.length}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-lg mb-4">Welche Wortart ist "{aktuelleFrage.wort}"?</p>
        <RadioGroup value={antwort || ""} onValueChange={setAntwort}>
          {aktuelleFrage.optionen.map((option) => (
            <div key={option} className="flex items-center space-x-2">
              <RadioGroupItem value={option} id={option} />
              <Label htmlFor={option}>{option}</Label>
            </div>
          ))}
        </RadioGroup>
        {feedback && (
          <p className={`mt-4 ${feedback.startsWith("Richtig") ? "text-green-600" : "text-red-600"}`}>
            {feedback}
          </p>
        )}
        <Button onClick={pruefeAntwort} className="mt-4" disabled={!antwort}>
          Nächste Frage
        </Button>
      </CardContent>
    </Card>
  )
}

