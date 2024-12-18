'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion, AnimatePresence } from 'framer-motion'
import { saveProgress, getProgress } from '../utils/progress-manager'
import { addPoints, unlockBadge } from '../utils/gamification'

interface Frage {
  id: number
  satz: string
  woerter: string[]
  korrekt: string[]
  erklaerung: string
}

const fragen: { [key: string]: Frage[] } = {
  anfaenger: [
    {
      id: 1,
      satz: "Der Hund ___ laut.",
      woerter: ["bellt"],
      korrekt: ["Der Hund bellt laut.", "Der Hund bellt laut"],
      erklaerung: "In einem einfachen Hauptsatz steht das Verb an zweiter Stelle."
    },
    {
      id: 2,
      satz: "Ich ___ jeden Morgen zur Schule.",
      woerter: ["gehe"],
      korrekt: ["Ich gehe jeden Morgen zur Schule.", "Ich gehe jeden Morgen zur Schule"],
      erklaerung: "Zeitangaben wie 'jeden Morgen' stehen oft nach dem Verb."
    },
    {
      id: 3,
      satz: "Mein Bruder ___ gern Fußball im Park.",
      woerter: ["spielt"],
      korrekt: ["Mein Bruder spielt gern Fußball im Park.", "Mein Bruder spielt gern Fußball im Park"],
      erklaerung: "Das Adverb 'gern' steht normalerweise direkt nach dem Verb."
    },
  ],
  fortgeschritten: [
    {
      id: 1,
      satz: "___ du mir bitte mit den Hausaufgaben helfen?",
      woerter: ["Kannst"],
      korrekt: ["Kannst du mir bitte mit den Hausaufgaben helfen?", "Kannst du mir bitte mit den Hausaufgaben helfen"],
      erklaerung: "In Fragesätzen steht das Verb an erster Stelle, gefolgt vom Subjekt."
    },
    {
      id: 2,
      satz: "Obwohl es regnete, ___ wir spazieren.",
      woerter: ["gingen"],
      korrekt: ["Obwohl es regnete, gingen wir spazieren.", "Obwohl es regnete, gingen wir spazieren"],
      erklaerung: "Nach einem Nebensatz steht das Verb des Hauptsatzes direkt nach dem Komma."
    },
    {
      id: 3,
      satz: "Die Kinder ___ gestern den ganzen Tag im Garten ___.",
      woerter: ["haben", "gespielt"],
      korrekt: ["Die Kinder haben gestern den ganzen Tag im Garten gespielt.", "Die Kinder haben gestern den ganzen Tag im Garten gespielt"],
      erklaerung: "Im Perfekt steht das Hilfsverb an zweiter Stelle und das Partizip II am Ende des Satzes."
    },
  ],
  experte: [
    {
      id: 1,
      satz: "___ ich mehr Zeit ___, ___ ich gerne mehr Bücher ___.",
      woerter: ["Wenn", "hätte", "würde", "lesen"],
      korrekt: ["Wenn ich mehr Zeit hätte, würde ich gerne mehr Bücher lesen.", "Wenn ich mehr Zeit hätte, würde ich gerne mehr Bücher lesen"],
      erklaerung: "In Konditionalsätzen mit Konjunktiv II steht das konjugierte Verb am Ende des Nebensatzes und an zweiter Stelle im Hauptsatz."
    },
    {
      id: 2,
      satz: "Er behauptete, dass er den Fehler nicht ___ ___.",
      woerter: ["gemacht", "habe"],
      korrekt: ["Er behauptete, dass er den Fehler nicht gemacht habe.", "Er behauptete, dass er den Fehler nicht gemacht habe"],
      erklaerung: "In indirekter Rede im Nebensatz steht das Hilfsverb am Ende, nach dem Partizip II."
    },
    {
      id: 3,
      satz: "Nicht nur ___ sie Deutsch, ___ auch Französisch und Spanisch.",
      woerter: ["spricht", "sondern"],
      korrekt: ["Nicht nur spricht sie Deutsch, sondern auch Französisch und Spanisch.", "Nicht nur spricht sie Deutsch, sondern auch Französisch und Spanisch"],
      erklaerung: "Bei 'nicht nur ... sondern auch' steht das Verb direkt nach 'nicht nur' an erster Stelle."
    },
  ]
}

type Schwierigkeitsgrad = 'anfaenger' | 'fortgeschritten' | 'experte'

export function SatzbauUebung() {
  const [schwierigkeitsgrad, setSchwierigkeitsgrad] = useState<Schwierigkeitsgrad>('anfaenger')
  const [aktuelleFrageIndex, setAktuelleFrageIndex] = useState(0)
  const [antwort, setAntwort] = useState("")
  const [feedback, setFeedback] = useState<string | null>(null)
  const [istBeendet, setIstBeendet] = useState(false)
  const [punktzahl, setPunktzahl] = useState(0)
  const [zeigeErklaerung, setZeigeErklaerung] = useState(false)
  const [verfuegbareSchwierigkeitsgrade, setVerfuegbareSchwierigkeitsgrade] = useState<Schwierigkeitsgrad[]>(['anfaenger'])

  const aktuelleFrage = fragen[schwierigkeitsgrad][aktuelleFrageIndex]

  useEffect(() => {
    const fortgeschrittenFreigeschaltet = getProgress('Satzbau (anfaenger)') === 100
    const experteFreigeschaltet = getProgress('Satzbau (fortgeschritten)') === 100

    let verfuegbar: Schwierigkeitsgrad[] = ['anfaenger']
    if (fortgeschrittenFreigeschaltet) verfuegbar.push('fortgeschritten')
    if (experteFreigeschaltet) verfuegbar.push('experte')

    setVerfuegbareSchwierigkeitsgrade(verfuegbar)
  }, [])

  const handleAntwortChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAntwort(event.target.value)
  }

  const pruefeAntwort = () => {
    const istKorrekt = aktuelleFrage.korrekt.some(
      korrekt => antwort.trim().toLowerCase() === korrekt.toLowerCase()
    )

    if (istKorrekt) {
      setFeedback("Richtig! Gut gemacht!")
      setPunktzahl(punktzahl + 1)
      // Add points for correct answer
      addPoints(10)
      setTimeout(() => {
        if (aktuelleFrageIndex < fragen[schwierigkeitsgrad].length - 1) {
          setAktuelleFrageIndex(aktuelleFrageIndex + 1)
          setAntwort("")
          setFeedback(null)
          setZeigeErklaerung(false)
        } else {
          setIstBeendet(true)
          updateProgress()
          // Unlock badge for completing the exercise
          unlockBadge('satzbau-genie')
        }
      }, 1500)
    } else {
      setFeedback("Das ist leider nicht korrekt. Versuche es noch einmal!")
      setZeigeErklaerung(true)
    }
  }

  const updateProgress = () => {
    const progress = Math.round((punktzahl / fragen[schwierigkeitsgrad].length) * 100)
    saveProgress(`Satzbau (${schwierigkeitsgrad})`, progress)

    if (progress === 100) {
      unlockBadge('perfekter-satzbau')
    }
  }

  const handleSchwierigkeitswechsel = (neuerSchwierigkeitsgrad: Schwierigkeitsgrad) => {
    setSchwierigkeitsgrad(neuerSchwierigkeitsgrad)
    setAktuelleFrageIndex(0)
    setAntwort("")
    setFeedback(null)
    setIstBeendet(false)
    setPunktzahl(0)
    setZeigeErklaerung(false)
  }

  if (istBeendet) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Übung beendet!</h2>
        <p className="text-xl mb-4">Deine Punktzahl: {punktzahl} von {fragen[schwierigkeitsgrad].length}</p>
        <Button onClick={() => {
          setAktuelleFrageIndex(0)
          setAntwort("")
          setFeedback(null)
          setIstBeendet(false)
          setPunktzahl(0)
          setZeigeErklaerung(false)
        }}>
          Übung wiederholen
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Label htmlFor="schwierigkeitsgrad">Schwierigkeitsgrad:</Label>
        <Select value={schwierigkeitsgrad} onValueChange={(value: Schwierigkeitsgrad) => handleSchwierigkeitswechsel(value)}>
          <SelectTrigger id="schwierigkeitsgrad">
            <SelectValue placeholder="Wähle einen Schwierigkeitsgrad" />
          </SelectTrigger>
          <SelectContent>
            {verfuegbareSchwierigkeitsgrade.map((grad) => (
              <SelectItem key={grad} value={grad}>
                {grad.charAt(0).toUpperCase() + grad.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Card className="mb-4">
        <CardContent className="pt-6">
          <h2 className="text-2xl font-bold mb-4">Frage {aktuelleFrageIndex + 1} von {fragen[schwierigkeitsgrad].length}</h2>
          <p className="text-lg mb-4">Vervollständige den folgenden Satz:</p>
          <p className="text-lg font-semibold mb-4">{aktuelleFrage.satz}</p>
          <p className="text-md mb-4">Verwende {aktuelleFrage.woerter.length > 1 ? "die Wörter" : "das Wort"}: {aktuelleFrage.woerter.join(", ")}</p>
          <div className="mb-4">
            <Label htmlFor="antwort">Deine Antwort:</Label>
            <Input
              type="text"
              id="antwort"
              value={antwort}
              onChange={handleAntwortChange}
              placeholder="Gib hier deine Antwort ein"
              className="w-full mt-1"
            />
          </div>
          <AnimatePresence>
            {feedback && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`mt-4 p-2 rounded ${feedback.includes("Richtig") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
              >
                {feedback}
              </motion.div>
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
      <Button onClick={pruefeAntwort} className="w-full" disabled={!antwort.trim()}>
        Antwort prüfen
      </Button>
    </div>
  )
}

