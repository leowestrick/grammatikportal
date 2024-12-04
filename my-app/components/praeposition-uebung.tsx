'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, XCircle } from 'lucide-react'

interface Frage {
  id: number
  satz: string
  optionen: string[]
  korrekt: string
}

const fragen: Frage[] = [
  { id: 1, satz: "Das Buch liegt ___ dem Tisch.", optionen: ["auf", "unter", "neben"], korrekt: "auf" },
  { id: 2, satz: "Wir fahren ___ Berlin.", optionen: ["nach", "zu", "in"], korrekt: "nach" },
  { id: 3, satz: "Sie wartet ___ ihren Freund.", optionen: ["für", "auf", "an"], korrekt: "auf" },
  { id: 4, satz: "Der Zug fährt ___ 10 Minuten ab.", optionen: ["in", "mit", "vor"], korrekt: "in" },
  { id: 5, satz: "Ich komme ___ Frankreich.", optionen: ["von", "aus", "nach"], korrekt: "aus" },
]

export function PraepositionUebung() {
  const [aktuelleFrageIndex, setAktuelleFrageIndex] = useState(0)
  const [antworten, setAntworten] = useState<string[]>(Array(fragen.length).fill(''))
  const [istBeendet, setIstBeendet] = useState(false)

  const aktuelleAntwort = antworten[aktuelleFrageIndex]
  const aktuelleFrage = fragen[aktuelleFrageIndex]

  const handleAntwort = (wert: string) => {
    const neueAntworten = [...antworten]
    neueAntworten[aktuelleFrageIndex] = wert
    setAntworten(neueAntworten)
  }

  const naechsteFrage = () => {
    if (aktuelleFrageIndex < fragen.length - 1) {
      setAktuelleFrageIndex(aktuelleFrageIndex + 1)
    } else {
      setIstBeendet(true)
    }
  }

  const berechnePunktzahl = () => {
    return antworten.filter((antwort, index) => antwort === fragen[index].korrekt).length
  }

  if (istBeendet) {
    const punktzahl = berechnePunktzahl()
    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Übung beendet!</h2>
        <p className="text-xl mb-4">Deine Punktzahl: {punktzahl} von {fragen.length}</p>
        <Button onClick={() => {
          setAktuelleFrageIndex(0)
          setAntworten(Array(fragen.length).fill(''))
          setIstBeendet(false)
        }}>
          Übung wiederholen
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Frage {aktuelleFrageIndex + 1} von {fragen.length}</h2>
      <Card className="mb-4">
        <CardContent className="pt-6">
          <p className="text-lg mb-4">{aktuelleFrage.satz.replace('___', '________')}</p>
          <Select value={aktuelleAntwort} onValueChange={handleAntwort}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Wähle die richtige Präposition" />
            </SelectTrigger>
            <SelectContent>
              {aktuelleFrage.optionen.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {aktuelleAntwort && (
            <div className="mt-4 flex items-center">
              {aktuelleAntwort === aktuelleFrage.korrekt ? (
                <>
                  <CheckCircle2 className="text-green-500 mr-2" />
                  <span className="text-green-500">Richtig!</span>
                </>
              ) : (
                <>
                  <XCircle className="text-red-500 mr-2" />
                  <span className="text-red-500">
                    Falsch. Die richtige Antwort ist: {aktuelleFrage.korrekt}
                  </span>
                </>
              )}
            </div>
          )}
        </CardContent>
      </Card>
      <Button onClick={naechsteFrage} className="w-full" disabled={!aktuelleAntwort}>
        {aktuelleFrageIndex === fragen.length - 1 ? 'Beenden' : 'Nächste Frage'}
      </Button>
    </div>
  )
}

