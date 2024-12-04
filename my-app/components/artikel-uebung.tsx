'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface Frage {
  id: number
  text: string
  optionen: string[]
  korrekt: string
}

const fragen: Frage[] = [
  { id: 1, text: "___ Hund bellt laut.", optionen: ["Der", "Die", "Das"], korrekt: "Der" },
  { id: 2, text: "___ Sonne scheint hell.", optionen: ["Der", "Die", "Das"], korrekt: "Die" },
  { id: 3, text: "___ Auto fährt schnell.", optionen: ["Der", "Die", "Das"], korrekt: "Das" },
  { id: 4, text: "___ Blume blüht schön.", optionen: ["Der", "Die", "Das"], korrekt: "Die" },
  { id: 5, text: "___ Buch ist interessant.", optionen: ["Der", "Die", "Das"], korrekt: "Das" },
]

export function ArtikelUebung() {
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
      <p className="text-lg mb-4">{aktuelleFrage.text}</p>
      <RadioGroup value={aktuelleAntwort} onValueChange={handleAntwort}>
        {aktuelleFrage.optionen.map((option) => (
          <div key={option} className="flex items-center space-x-2 mb-2">
            <RadioGroupItem value={option} id={option} />
            <Label htmlFor={option}>{option}</Label>
          </div>
        ))}
      </RadioGroup>
      <Button onClick={naechsteFrage} className="mt-4" disabled={!aktuelleAntwort}>
        {aktuelleFrageIndex === fragen.length - 1 ? 'Beenden' : 'Nächste Frage'}
      </Button>
    </div>
  )
}

