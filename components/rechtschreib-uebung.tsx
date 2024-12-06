'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { motion, AnimatePresence } from 'framer-motion'

interface Frage {
  id: number
  satz: string
  korrekt: string
  hinweis: string
}

const fragen: Frage[] = [
  { id: 1, satz: "Der hund bellt laut.", korrekt: "Der Hund bellt laut.", hinweis: "Substantive werden großgeschrieben." },
  { id: 2, satz: "ich gehe zur schule", korrekt: "Ich gehe zur Schule.", hinweis: "Satzanfänge und Substantive werden großgeschrieben." },
  { id: 3, satz: "Er sagte das er kommt.", korrekt: "Er sagte, dass er kommt.", hinweis: "Hier wird 'dass' als Konjunktion verwendet." },
  { id: 4, satz: "Die sonne scheint hell.", korrekt: "Die Sonne scheint hell.", hinweis: "Substantive werden großgeschrieben." },
  { id: 5, satz: "Sie hat einen neuen Fußball-schuh gekauft.", korrekt: "Sie hat einen neuen Fußballschuh gekauft.", hinweis: "Zusammengesetzte Substantive werden in der Regel zusammengeschrieben." },
]

export function RechtschreibUebung() {
  const [aktuelleFrageIndex, setAktuelleFrageIndex] = useState(0)
  const [antworten, setAntworten] = useState<string[]>(Array(fragen.length).fill(''))
  const [istBeendet, setIstBeendet] = useState(false)
  const [zeigeHinweis, setZeigeHinweis] = useState(false)
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
    const korrekt = aktuelleAntwort === aktuelleFrage.korrekt
    setIstKorrekt(korrekt)
    setVersuchsZaehler(versuchsZaehler + 1)

    if (korrekt) {
      setTimeout(() => {
        if (aktuelleFrageIndex < fragen.length - 1) {
          setAktuelleFrageIndex(aktuelleFrageIndex + 1)
          setIstKorrekt(null)
          setZeigeHinweis(false)
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
          setZeigeHinweis(false)
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
          <p className="text-xl mb-6 text-gray-700">Korrigiere den folgenden Satz:</p>
          <p className="text-lg font-semibold mb-4 text-gray-800">{aktuelleFrage.satz}</p>
          <div className="mb-4">
            <Label htmlFor="antwort" className="text-lg text-gray-700 mb-2 block">Deine Antwort:</Label>
            <Input
              type="text"
              id="antwort"
              value={aktuelleAntwort}
              onChange={handleAntwort}
              placeholder="Gib deine korrigierte Version ein"
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
          {zeigeHinweis && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-gray-600 mt-4 p-4 bg-gray-100 rounded-md"
            >
              {aktuelleFrage.hinweis}
            </motion.p>
          )}
        </CardContent>
      </Card>
      <div className="flex justify-between">
        <Button onClick={() => setZeigeHinweis(true)} variant="outline" className="text-gray-600">
          Hinweis
        </Button>
        <Button onClick={pruefeAntwort} className="bg-blue-500 hover:bg-blue-600 text-white text-lg py-3" disabled={!aktuelleAntwort}>
          Antwort prüfen
        </Button>
      </div>
    </div>
  )
}

