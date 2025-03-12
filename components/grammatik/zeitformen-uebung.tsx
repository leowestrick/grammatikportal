'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { addPoints, unlockBadge } from '@/utils/gamification'
import { saveProgress } from '@/utils/progress-manager'

interface Frage {
  infinitiv: string
  zeitform: string
  person: string
  korrekt: string
}

const fragen: Frage[] = [
  { infinitiv: "gehen", zeitform: "Präsens", person: "ich", korrekt: "gehe" },
  { infinitiv: "spielen", zeitform: "Präteritum", person: "er", korrekt: "spielte" },
  { infinitiv: "singen", zeitform: "Perfekt", person: "wir", korrekt: "haben gesungen" },
  { infinitiv: "laufen", zeitform: "Futur I", person: "du", korrekt: "wirst laufen" },
  { infinitiv: "essen", zeitform: "Plusquamperfekt", person: "sie (Singular)", korrekt: "hatte gegessen" },
]

export function ZeitformenUebung() {
  const [aktuelleFrageIndex, setAktuelleFrageIndex] = useState(0)
  const [antwort, setAntwort] = useState("")
  const [punktzahl, setPunktzahl] = useState(0)
  const [istBeendet, setIstBeendet] = useState(false)
  const [feedback, setFeedback] = useState<string | null>(null)

  const aktuelleFrage = fragen[aktuelleFrageIndex]

  const pruefeAntwort = () => {
    const istKorrekt = antwort.toLowerCase().trim() === aktuelleFrage.korrekt.toLowerCase()
    
    if (istKorrekt) {
      setPunktzahl(punktzahl + 1)
      addPoints(10)
      setFeedback("Richtig!")
    } else {
      setFeedback(`Falsch. Die richtige Antwort ist: ${aktuelleFrage.korrekt}`)
    }

    setTimeout(() => {
      if (aktuelleFrageIndex < fragen.length - 1) {
        setAktuelleFrageIndex(aktuelleFrageIndex + 1)
        setAntwort("")
        setFeedback(null)
      } else {
        setIstBeendet(true)
        updateProgress()
      }
    }, 2000)
  }

  const updateProgress = () => {
    const progress = Math.round((punktzahl / fragen.length) * 100)
    saveProgress('Zeitformen', progress)
    if (progress === 100) {
      unlockBadge('zeitformen-meister')
    }
  }

  if (istBeendet) {
    return (
      <Card>
        <CardContent className="pt-6">
          <h2 className="text-2xl font-bold mb-4">Übung beendet!</h2>
          <p className="text-xl mb-4">Deine Punktzahl: {punktzahl} von {fragen.length}</p>
          <Button disabled={!!feedback}  onClick={() => {
            setAktuelleFrageIndex(0)
            setPunktzahl(0)
            setAntwort("")
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
        <CardTitle>Frage {aktuelleFrageIndex + 1} von {fragen.length}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-lg mb-4">
          Konjugiere das Verb "{aktuelleFrage.infinitiv}" in der {aktuelleFrage.zeitform} für die Person "{aktuelleFrage.person}".
        </p>
        <div className="mb-4">
          <Label htmlFor="antwort">Deine Antwort:</Label>
          <Input
            id="antwort"
            value={antwort}
            onChange={(e) => setAntwort(e.target.value)}
            className="mt-1"
          />
        </div>
        <Button onClick={pruefeAntwort} disabled={!antwort.trim()}>
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

