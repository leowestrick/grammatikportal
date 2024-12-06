'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion, AnimatePresence } from 'framer-motion'

interface Frage {
  id: number
  typ: 'multiplechoice' | 'lueckentext' | 'bildauswahl' | 'saetzeverbinden'
  text: string
  optionen?: string[]
  korrekt: string | string[]
  bild?: string
  erklaerung: string
}

const fragen: Frage[] = [
  { 
    id: 1, 
    typ: 'multiplechoice',
    text: "___ Hund bellt laut.", 
    optionen: ["Der", "Die", "Das"], 
    korrekt: "Der",
    erklaerung: "Hund ist maskulin, daher verwendet man den Artikel 'der'."
  },
  { 
    id: 2, 
    typ: 'multiplechoice',
    text: "___ Sonne scheint hell.", 
    optionen: ["Der", "Die", "Das"], 
    korrekt: "Die",
    erklaerung: "Sonne ist feminin, daher verwendet man den Artikel 'die'."
  },
  { 
    id: 3, 
    typ: 'multiplechoice',
    text: "___ Auto fährt schnell.", 
    optionen: ["Der", "Die", "Das"], 
    korrekt: "Das",
    erklaerung: "Auto ist neutral, daher verwendet man den Artikel 'das'."
  },
  { 
    id: 4, 
    typ: 'lueckentext',
    text: "___ Katze und ___ Maus spielen zusammen.",
    korrekt: ["Die", "die"],
    erklaerung: "Katze und Maus sind beide feminin, daher verwendet man den Artikel 'die'."
  },
  { 
    id: 5, 
    typ: 'bildauswahl',
    text: "Wähle den richtigen Artikel für das Bild:",
    optionen: ["Der", "Die", "Das"],
    korrekt: "Das",
    bild: "/placeholder.svg?height=150&width=150",
    erklaerung: "Das Bild zeigt ein Haus, welches neutral ist. Daher ist der korrekte Artikel 'das'."
  },
  { 
    id: 6, 
    typ: 'saetzeverbinden',
    text: "Verbinde die Satzteile mit dem richtigen Artikel:",
    optionen: ["Der Apfel ist rot", "Die Blume ist schön", "Das Kind spielt"],
    korrekt: ["Der", "Die", "Das"],
    erklaerung: "Apfel ist maskulin (der), Blume ist feminin (die), und Kind ist neutral (das)."
  },
  { 
    id: 7, 
    typ: 'multiplechoice',
    text: "Welcher Artikel passt nicht? ___ Buch, ___ Heft, ___ Stift",
    optionen: ["Der", "Die", "Das"],
    korrekt: "Die",
    erklaerung: "Buch und Heft sind neutral (das), Stift ist maskulin (der). 'Die' passt zu keinem der Wörter."
  },
  { 
    id: 8, 
    typ: 'lueckentext',
    text: "___ Sonne scheint am Tag, und ___ Mond leuchtet in ___ Nacht.",
    korrekt: ["Die", "der", "der"],
    erklaerung: "Sonne ist feminin (die), Mond ist maskulin (der), und Nacht ist auch feminin, aber hier im Dativ, daher 'der'."
  }
]

export function ArtikelUebung() {
  const [aktuelleFrageIndex, setAktuelleFrageIndex] = useState(0)
  const [antworten, setAntworten] = useState<string[]>(Array(fragen.length).fill(''))
  const [istBeendet, setIstBeendet] = useState(false)
  const [istKorrekt, setIstKorrekt] = useState<boolean | null>(null)
  const [versuchsZaehler, setVersuchsZaehler] = useState(0)
  const [zeigeErklaerung, setZeigeErklaerung] = useState(false)

  const aktuelleAntwort = antworten[aktuelleFrageIndex]
  const aktuelleFrage = fragen[aktuelleFrageIndex]

  const handleAntwort = (wert: string) => {
    const neueAntworten = [...antworten]
    neueAntworten[aktuelleFrageIndex] = wert
    setAntworten(neueAntworten)
    setIstKorrekt(null)
    setZeigeErklaerung(false)
  }

  const pruefeAntwort = () => {
    let korrekt = false
    if (Array.isArray(aktuelleFrage.korrekt)) {
      korrekt = aktuelleAntwort.toLowerCase() === aktuelleFrage.korrekt.join(" ").toLowerCase()
    } else {
      korrekt = aktuelleAntwort.toLowerCase() === aktuelleFrage.korrekt.toLowerCase()
    }
    setIstKorrekt(korrekt)
    setVersuchsZaehler(versuchsZaehler + 1)

    if (korrekt) {
      setTimeout(() => {
        if (aktuelleFrageIndex < fragen.length - 1) {
          setAktuelleFrageIndex(aktuelleFrageIndex + 1)
          setIstKorrekt(null)
          setVersuchsZaehler(0)
          setZeigeErklaerung(false)
        } else {
          setIstBeendet(true)
        }
      }, 1500)
    } else {
      setZeigeErklaerung(true)
    }
  }

  const berechnePunktzahl = () => {
    return antworten.filter((antwort, index) => {
      const frage = fragen[index]
      if (Array.isArray(frage.korrekt)) {
        return antwort.toLowerCase() === frage.korrekt.join(" ").toLowerCase()
      }
      return antwort.toLowerCase() === frage.korrekt.toLowerCase()
    }).length
  }

  const renderFrage = () => {
    switch (aktuelleFrage.typ) {
      case 'multiplechoice':
        return (
          <RadioGroup value={aktuelleAntwort} onValueChange={handleAntwort} className="space-y-2">
            {aktuelleFrage.optionen!.map((option) => (
              <div key={option} className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100">
                <RadioGroupItem value={option} id={option} />
                <Label htmlFor={option} className="flex-grow cursor-pointer">{option}</Label>
              </div>
            ))}
          </RadioGroup>
        )
      case 'lueckentext':
        return (
          <div>
            <p className="mb-4 text-gray-700">{aktuelleFrage.text}</p>
            <Input
              type="text"
              value={aktuelleAntwort}
              onChange={(e) => handleAntwort(e.target.value)}
              placeholder="Gib die Artikel ein (mit Leerzeichen getrennt)"
              className="w-full p-2 border rounded-md"
            />
          </div>
        )
      case 'bildauswahl':
        return (
          <div>
            <img src={aktuelleFrage.bild} alt="Bild zur Frage" className="mb-6 mx-auto rounded-md shadow-md" />
            <Select value={aktuelleAntwort} onValueChange={handleAntwort}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Wähle den richtigen Artikel" />
              </SelectTrigger>
              <SelectContent>
                {aktuelleFrage.optionen!.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )
      case 'saetzeverbinden':
        return (
          <div className="space-y-4">
            {aktuelleFrage.optionen!.map((satz, index) => (
              <div key={index} className="flex items-center space-x-4">
                <Select value={aktuelleAntwort.split(" ")[index] || ""} onValueChange={(value) => {
                  const neueAntworten = aktuelleAntwort.split(" ")
                  neueAntworten[index] = value
                  handleAntwort(neueAntworten.join(" "))
                }}>
                  <SelectTrigger className="w-24">
                    <SelectValue placeholder="Artikel" />
                  </SelectTrigger>
                  <SelectContent>
                    {["Der", "Die", "Das"].map((artikel) => (
                      <SelectItem key={artikel} value={artikel}>
                        {artikel}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <span className="text-gray-700">{satz}</span>
              </div>
            ))}
          </div>
        )
      default:
        return null
    }
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
          setIstKorrekt(null)
          setVersuchsZaehler(0)
          setZeigeErklaerung(false)
        }}>
          Übung wiederholen
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Frage {aktuelleFrageIndex + 1} von {fragen.length}</h2>
      <Card className="mb-6">
        <CardContent className="pt-6">
          <p className="text-xl mb-6 text-gray-700">{aktuelleFrage.text}</p>
          {renderFrage()}
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
          {zeigeErklaerung && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-gray-600 mt-4 p-4 bg-gray-100 rounded-md"
            >
              {aktuelleFrage.erklaerung}
            </motion.p>
          )}
        </CardContent>
      </Card>
      <Button onClick={pruefeAntwort} className="w-full bg-blue-500 hover:bg-blue-600 text-white" disabled={!aktuelleAntwort}>
        Antwort prüfen
      </Button>
    </div>
  )
}

