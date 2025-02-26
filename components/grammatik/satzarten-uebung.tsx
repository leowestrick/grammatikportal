'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { addPoints, unlockBadge } from '../../utils/gamification'
import { saveProgress } from '../../utils/progress-manager'

interface Frage {
  satz: string
  optionen: string[]
  korrekt: string
}

const fragen: Frage[] = [
  {
    satz: "Der Hund bellt laut",
    optionen: ["Aussagesatz", "Fragesatz", "Aufforderungssatz", "Wunschsatz"],
    korrekt: "Aussagesatz"
  },
  {
    satz: "Kommst du morgen zur Party",
    optionen: ["Aussagesatz", "Fragesatz", "Aufforderungssatz", "Wunschsatz"],
    korrekt: "Fragesatz"
  },
  {
    satz: "Bitte mach das Fenster zu",
    optionen: ["Aussagesatz", "Fragesatz", "Aufforderungssatz", "Wunschsatz"],
    korrekt: "Aufforderungssatz"
  },
  {
    satz: "Wenn ich doch mehr Zeit hätte",
    optionen: ["Aussagesatz", "Fragesatz", "Aufforderungssatz", "Wunschsatz"],
    korrekt: "Wunschsatz"
  },
  {
    satz: "Wie schön der Sonnenuntergang ist",
    optionen: ["Aussagesatz", "Fragesatz", "Aufforderungssatz", "Ausrufesatz"],
    korrekt: "Ausrufesatz"
  }
]

export function SatzartenUebung() {
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
    saveProgress('Satzarten', progress)
    if (progress === 100) {
      unlockBadge('satzarten-meister')
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
        <p className="text-lg mb-4">Welche Satzart ist das?</p>
        <p className="text-lg font-semibold mb-4">"{aktuelleFrage.satz}"</p>
        <RadioGroup value={antwort || ""} onValueChange={setAntwort}>
          {aktuelleFrage.optionen.map((option) => (
            <div key={option} className="flex items-center space-x-2">
              <RadioGroupItem value={option} id={option} />
              <Label htmlFor={option}>{option}</Label>
            </div>
          ))}
        </RadioGroup>
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

