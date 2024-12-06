'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { motion, AnimatePresence } from 'framer-motion'

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
  const [istKorrekt, setIstKorrekt] = useState<boolean | null>(null)
  const [versuchsZaehler, setVersuchsZaehler] = useState(0)

  const aktuelleAntwort = antworten[aktuelleFrageIndex]
  const aktuelleFrage = fragen[aktuelleFrageIndex]

  const handleAntwort = (wert: string) => {
    const neueAntworten = [...antworten]
    neueAntworten[aktuelleFrageIndex] = wert
    setAntworten(neueAntworten)
    setIstKorrekt(null)
  }

  const pruefeAntwort = () => {
    const korrekt = aktuelleAntwort === aktuelleFrage.korrekt
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
    return antworten.filter((antwort, index) => antwort === fragen[index].korrekt).length
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
          <p className="text-xl mb-6 text-gray-700">{aktuelleFrage.satz.replace('___', '________')}</p>
          <Select value={aktuelleAntwort} onValueChange={handleAntwort}>
            <SelectTrigger className="w-full mb-4">
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

