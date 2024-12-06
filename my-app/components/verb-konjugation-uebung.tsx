'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { motion, AnimatePresence } from 'framer-motion'

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
  const [istKorrekt, setIstKorrekt] = useState<boolean | null>(null)
  const [versuchsZaehler, setVersuchsZaehler] = useState(0)

  const aktuelleAntwort = antworten[aktuelleFrageIndex]
  const aktuelleFrage = fragen[aktuelleFrageIndex]

  const handleAntwort = (event: React.ChangeEvent<HTMLInputElement>) => {
    const neueAntworten = [...antworten]
    neueAntworten[aktuelleFrageIndex] = event.target.value
    setAntworten(neueAntworten)
    setIstKorrekt(null)
  }

  const pruefeAntwort = () => {
    const korrekt = aktuelleAntwort.toLowerCase() === aktuelleFrage.korrekt.toLowerCase()
    setIstKorrekt(korrekt)
    setVersuchsZaehler(versuchsZaehler + 1)

    if (korrekt) {
      setTimeout(() => {
        if (aktuelleFrageIndex < fragen.length - 1) {
          setAktuelleFrageIndex(aktuelleFrageIndex + 1)
          setIstKorrekt(null)
          setVersuchsZaehler(0)
        } else {
          setIstBeendet(true)
        }
      }, 1500)
    }
  }

  const berechnePunktzahl = () => {
    return antworten.filter((antwort, index) => antwort.toLowerCase() === fragen[index].korrekt.toLowerCase()).length
  }

  if (istBeendet) {
    const punktzahl = berechnePunktzahl()
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="text-center"
      >
        <h2 className="text-2xl font-bold mb-4">Übung beendet!</h2>
        <p className="text-xl mb-4">Deine Punktzahl: {punktzahl} von {fragen.length}</p>
        <Button onClick={() => {
          setAktuelleFrageIndex(0)
          setAntworten(Array(fragen.length).fill(''))
          setIstBeendet(false)
          setIstKorrekt(null)
          setVersuchsZaehler(0)
        }}>
          Übung wiederholen
        </Button>
      </motion.div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Frage {aktuelleFrageIndex + 1} von {fragen.length}</h2>
      <Card className="mb-6">
        <CardContent className="pt-6">
          <p className="text-xl mb-6 text-gray-700">Konjugiere das Verb "{aktuelleFrage.infinitiv}" für "{aktuelleFrage.person}":</p>
          <div className="mb-4">
            <Label htmlFor="antwort" className="text-lg text-gray-700 mb-2 block">Deine Antwort:</Label>
            <Input
              type="text"
              id="antwort"
              value={aktuelleAntwort}
              onChange={handleAntwort}
              placeholder="Gib deine Antwort ein"
              className="w-full p-2 text-lg"
            />
          </div>
          <AnimatePresence>
            {istKorrekt !== null && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`text-lg font-semibold mt-4 ${istKorrekt ? 'text-green-600' : 'text-red-600'}`}
              >
                {istKorrekt ? 'Richtig!' : `Falsch. Versuche es nochmal. (Versuch ${versuchsZaehler})`}
              </motion.p>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
      <Button onClick={pruefeAntwort} className="w-full bg-blue-500 hover:bg-blue-600 text-white text-lg py-3" disabled={!aktuelleAntwort}>
        Antwort prüfen
      </Button>
    </div>
  )
}

