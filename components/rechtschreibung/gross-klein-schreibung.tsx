'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

interface Frage {
  text: string
  korrekt: string
}

const fragen: Frage[] = [
  { text: "der hund bellt laut", korrekt: "Der Hund bellt laut." },
  { text: "BERLIN IST DIE HAUPTSTADT VON DEUTSCHLAND", korrekt: "Berlin ist die Hauptstadt von Deutschland." },
  { text: "ich gehe zur schule", korrekt: "Ich gehe zur Schule." },
  { text: "DAS auto FÄHRT schnell", korrekt: "Das Auto fährt schnell." },
  { text: "die SONNE scheint HELL", korrekt: "Die Sonne scheint hell." },
]

export function GrossKleinSchreibung() {
  const [aktuelleFrageIndex, setAktuelleFrageIndex] = useState(0)
  const [antwort, setAntwort] = useState("")
  const [punktzahl, setPunktzahl] = useState(0)
  const [istBeendet, setIstBeendet] = useState(false)
  const [feedback, setFeedback] = useState<string | null>(null)

  const aktuelleFrage = fragen[aktuelleFrageIndex]

  const pruefeAntwort = () => {
    const istKorrekt = antwort.trim() === aktuelleFrage.korrekt
    
    if (istKorrekt) {
      setPunktzahl(punktzahl + 1)
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
      }
    }, 2000)
  }

  const updateProgress = () => {
    const progress = Math.round((punktzahl / fragen.length) * 100)
    const storedProgress = localStorage.getItem('deutschLernProgress')
    const progressData = storedProgress ? JSON.parse(storedProgress) : {}
    progressData['Groß- und Kleinschreibung'] = progress
    localStorage.setItem('deutschLernProgress', JSON.stringify(progressData))
  }

  if (istBeendet) {
    updateProgress()
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
            Übung wiederholen
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Frage {punktzahl + 1} von {fragen.length}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-lg mb-4">Korrigiere die Groß- und Kleinschreibung im folgenden Satz:</p>
        <p className="text-xl font-semibold mb-4">{aktuelleFrage.text}</p>
        <div className="mb-4">
          <Label htmlFor="antwort">Deine Antwort:</Label>
          <Input
            id="antwort"
            value={antwort}
            onChange={(e) => setAntwort(e.target.value)}
            placeholder="Gib den korrigierten Satz ein"
            className="mt-1"
          />
        </div>
        <Button disabled={!!feedback}  onClick={pruefeAntwort} className="w-full">Antwort prüfen</Button>
        {feedback && (
          <p className={`mt-4 ${feedback.startsWith("Richtig") ? "text-green-600" : "text-red-600"}`}>
            {feedback}
          </p>
        )}
      </CardContent>
    </Card>
  )
}

