'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface Frage {
  id: number
  satz: string
  woerter: string[]
  korrekt: string[]
}

const fragen: Frage[] = [
  {
    id: 1,
    satz: "Der Hund ___ laut.",
    woerter: ["bellt"],
    korrekt: ["Der Hund bellt laut.", "Der Hund bellt laut"]
  },
  {
    id: 2,
    satz: "Ich ___ jeden Morgen zur Schule.",
    woerter: ["gehe"],
    korrekt: ["Ich gehe jeden Morgen zur Schule.", "Ich gehe jeden Morgen zur Schule"]
  },
  {
    id: 3,
    satz: "Mein Bruder ___ gern Fußball im Park.",
    woerter: ["spielt"],
    korrekt: ["Mein Bruder spielt gern Fußball im Park.", "Mein Bruder spielt gern Fußball im Park"]
  },
  {
    id: 4,
    satz: "Wir ___ um 19 Uhr zu Abend.",
    woerter: ["essen"],
    korrekt: ["Wir essen um 19 Uhr zu Abend.", "Wir essen um 19 Uhr zu Abend"]
  },
  {
    id: 5,
    satz: "___ du mir bitte mit den Hausaufgaben helfen?",
    woerter: ["Kannst"],
    korrekt: ["Kannst du mir bitte mit den Hausaufgaben helfen?", "Kannst du mir bitte mit den Hausaufgaben helfen"]
  }
]

export function SatzbauUebung() {
  const [aktuelleFrageIndex, setAktuelleFrageIndex] = useState(0)
  const [antwort, setAntwort] = useState("")
  const [feedback, setFeedback] = useState<string | null>(null)
  const [istBeendet, setIstBeendet] = useState(false)
  const [punktzahl, setPunktzahl] = useState(0)

  const aktuelleFrage = fragen[aktuelleFrageIndex]

  const handleAntwortChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAntwort(event.target.value)
  }

  const pruefeAntwort = () => {
    const istKorrekt = aktuelleFrage.korrekt.some(
      korrekt => antwort.trim().toLowerCase() === korrekt.toLowerCase()
    )

    if (istKorrekt) {
      setFeedback("Richtig! Gut gemacht!")
      setPunktzahl(punktzahl + 1)
      setTimeout(() => {
        if (aktuelleFrageIndex < fragen.length - 1) {
          setAktuelleFrageIndex(aktuelleFrageIndex + 1)
          setAntwort("")
          setFeedback(null)
        } else {
          setIstBeendet(true)
        }
      }, 1500)
    } else {
      setFeedback("Das ist leider nicht korrekt. Versuche es noch einmal!")
    }
  }

  if (istBeendet) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Übung beendet!</h2>
        <p className="text-xl mb-4">Deine Punktzahl: {punktzahl} von {fragen.length}</p>
        <Button onClick={() => {
          setAktuelleFrageIndex(0)
          setAntwort("")
          setFeedback(null)
          setIstBeendet(false)
          setPunktzahl(0)
        }}>
          Übung wiederholen
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="mb-4">
        <CardContent className="pt-6">
          <h2 className="text-2xl font-bold mb-4">Frage {aktuelleFrageIndex + 1} von {fragen.length}</h2>
          <p className="text-lg mb-4">Vervollständige den folgenden Satz:</p>
          <p className="text-lg font-semibold mb-4">{aktuelleFrage.satz}</p>
          <p className="text-md mb-4">Verwende das Wort: {aktuelleFrage.woerter[0]}</p>
          <div className="mb-4">
            <Label htmlFor="antwort">Deine Antwort:</Label>
            <Input
              type="text"
              id="antwort"
              value={antwort}
              onChange={handleAntwortChange}
              placeholder="Gib hier deine Antwort ein"
              className="w-full mt-1"
            />
          </div>
          {feedback && (
            <div className={`mt-4 p-2 rounded ${feedback.includes("Richtig") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
              {feedback}
            </div>
          )}
        </CardContent>
      </Card>
      <Button onClick={pruefeAntwort} className="w-full" disabled={!antwort.trim()}>
        Antwort prüfen
      </Button>
    </div>
  )
}

