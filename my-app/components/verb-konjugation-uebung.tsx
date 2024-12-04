'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface Frage {
  id: number
  infinitiv: string
  person: string
  korrekt: string
}

const fragen: Frage[] = [
  { id: 1, infinitiv: "spielen", person: "ich", korrekt: "spiele" },
  { id: 2, infinitiv: "laufen", person: "du", korrekt: "läufst" },
  { id: 3, infinitiv: "arbeiten", person: "er/sie/es", korrekt: "arbeitet" },
  { id: 4, infinitiv: "sein", person: "wir", korrekt: "sind" },
  { id: 5, infinitiv: "gehen", person: "ihr", korrekt: "geht" },
  { id: 6, infinitiv: "fahren", person: "sie/Sie", korrekt: "fahren" },
]

export function VerbKonjugationUebung() {
  const [aktuelleFrageIndex, setAktuelleFrageIndex] = useState(0)
  const [antworten, setAntworten] = useState<string[]>(Array(fragen.length).fill(''))
  const [istBeendet, setIstBeendet] = useState(false)

  const aktuelleAntwort = antworten[aktuelleFrageIndex]
  const aktuelleFrage = fragen[aktuelleFrageIndex]

  const handleAntwort = (event: React.ChangeEvent<HTMLInputElement>) => {
    const neueAntworten = [...antworten]
    neueAntworten[aktuelleFrageIndex] = event.target.value
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
    return antworten.filter((antwort, index) => antwort.toLowerCase() === fragen[index].korrekt.toLowerCase()).length
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
      <p className="text-lg mb-4">Konjugiere das Verb &quot;{aktuelleFrage.infinitiv}&quot; für &quot;{aktuelleFrage.person}&quot;:</p>
      <div className="mb-4">
        <Label htmlFor="antwort" className="sr-only">Deine Antwort</Label>
        <Input
          type="text"
          id="antwort"
          value={aktuelleAntwort}
          onChange={handleAntwort}
          placeholder="Gib deine Antwort ein"
          className="w-full"
        />
      </div>
      <Button onClick={naechsteFrage} className="w-full" disabled={!aktuelleAntwort}>
        {aktuelleFrageIndex === fragen.length - 1 ? 'Beenden' : 'Nächste Frage'}
      </Button>
    </div>
  )
}

