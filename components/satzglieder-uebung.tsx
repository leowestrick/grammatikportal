'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { addPoints, unlockBadge } from '../../utils/gamification'
import { saveProgress } from '../../utils/progress-manager'

interface Frage {
  satz: string
  satzglied: string
  optionen: string[]
  korrekt: string
}

const fragen: Frage[] = [
  {
    satz: "Der Hund bellt laut.",
    satzglied: "Der Hund",
    optionen: ["Subjekt", "Prädikat", "Objekt", "Adverbiale Bestimmung"],
    korrekt: "SubjektSubjekt"
  },
  {
    satz: "Sie liest ein spannendes Buch.",
    satzglied: "ein spannendes Buch",
    optionen: ["Subjekt", "Prädikat", "Objekt", "Attribut"],
    korrekt: "Objekt"
  },
  {
    satz: "Morgen fahren wir in den Urlaub.",
    satzglied: "Morgen",
    optionen: ["Subjekt", "Prädikat", "Objekt", "Adverbiale Bestimmung"],
    korrekt: "Adverbiale Bestimmung"
  },
  {
    satz: "Der alte Mann geht langsam.",
    satzglied: "geht",
    optionen: ["Subjekt", "Prädikat", "Objekt", "Adverbiale Bestimmung"],
    korrekt: "Prädikat"
  },
  {
    satz: "Die Katze der Nachbarin schläft auf dem Sofa.",
    satzglied: "der Nachbarin",
    optionen: ["Subjekt", "Prädikat", "Objekt", "Attribut"],
    korrekt: "Attribut"
  }
]

export function SatzgliederUebung() {
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
      setFeedback("Richtig!")
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
    saveProgress('Satzglieder', progress)
    if (progress === 100) {
      unlockBadge('satzglieder-meister')
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
        <p className="text-lg mb-4">Satz: {aktuelleFrage.satz}</p>
        <p className="text-lg mb-4">Welches Satzglied ist "{aktuelleFrage.satzglied}"?</p>
        <Select value={antwort || ""} onValueChange={setAntwort}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Wähle ein Satzglied" />
          </SelectTrigger>
          <SelectContent>
            {aktuelleFrage.optionen.map((option) => (
              <SelectItem key={option} value={option}>{option}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button onClick={pruefeAntwort} className="mt-4" disabled={!antwort}>
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

