'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { motion, AnimatePresence } from 'framer-motion'
import { saveProgress, getProgress } from '../utils/progress-manager'
import { addPoints, unlockBadge } from '../utils/gamification'

interface Frage {
  id: number
  satz: string
  optionen: string[]
  korrekt: string
  erklaerung: string
}

const fragen: { [key: string]: Frage[] } = {
  anfaenger: [
    { id: 1, satz: "Das Buch liegt ___ dem Tisch.", optionen: ["auf", "unter", "neben"], korrekt: "auf", erklaerung: "'Auf' wird verwendet, wenn etwas auf einer Oberfläche liegt." },
    { id: 2, satz: "Wir fahren ___ Berlin.", optionen: ["nach", "zu", "in"], korrekt: "nach", erklaerung: "'Nach' wird für Städte und Länder ohne Artikel verwendet." },
    { id: 3, satz: "Sie wartet ___ ihren Freund.", optionen: ["für", "auf", "an"], korrekt: "auf", erklaerung: "'Auf' wird mit 'warten' verwendet." },
  ],
  fortgeschritten: [
    { id: 1, satz: "Er ist stolz ___ seine Leistung.", optionen: ["auf", "über", "für"], korrekt: "auf", erklaerung: "'Stolz sein' wird mit 'auf' verwendet." },
    { id: 2, satz: "Wir diskutieren ___ Politik.", optionen: ["über", "von", "mit"], korrekt: "über", erklaerung: "'Über' wird verwendet, wenn man ein Thema bespricht." },
    { id: 3, satz: "Sie kümmert sich ___ ihre Großeltern.", optionen: ["um", "für", "an"], korrekt: "um", erklaerung: "'Sich kümmern' wird mit 'um' verwendet." },
  ],
  experte: [
    { id: 1, satz: "Er besteht ___ seiner Meinung.", optionen: ["auf", "bei", "zu"], korrekt: "auf", erklaerung: "'Bestehen auf' bedeutet, eine Meinung oder Forderung aufrechtzuerhalten." },
    { id: 2, satz: "Sie zweifelt ___ seinen Fähigkeiten.", optionen: ["an", "über", "von"], korrekt: "an", erklaerung: "'Zweifeln an' wird verwendet, um Unsicherheit über etwas auszudrücken." },
    { id: 3, satz: "Wir haben uns ___ dem Thema vertraut gemacht.", optionen: ["mit", "zu", "über"], korrekt: "mit", erklaerung: "'Sich vertraut machen mit' bedeutet, etwas gut kennenzulernen." },
  ]
}

type Schwierigkeitsgrad = 'anfaenger' | 'fortgeschritten' | 'experte'

export function PraepositionUebung() {
  const [schwierigkeitsgrad, setSchwierigkeitsgrad] = useState<Schwierigkeitsgrad>('anfaenger')
  const [aktuelleFrageIndex, setAktuelleFrageIndex] = useState(0)
  const [antworten, setAntworten] = useState<string[]>(Array(fragen[schwierigkeitsgrad].length).fill(''))
  const [istBeendet, setIstBeendet] = useState(false)
  const [istKorrekt, setIstKorrekt] = useState<boolean | null>(null)
  const [versuchsZaehler, setVersuchsZaehler] = useState(0)
  const [zeigeErklaerung, setZeigeErklaerung] = useState(false)
  const [verfuegbareSchwierigkeitsgrade, setVerfuegbareSchwierigkeitsgrade] = useState<Schwierigkeitsgrad[]>(['anfaenger'])

  const aktuelleAntwort = antworten[aktuelleFrageIndex]
  const aktuelleFrage = fragen[schwierigkeitsgrad][aktuelleFrageIndex]

  useEffect(() => {
    const fortgeschrittenFreigeschaltet = getProgress('Präpositionen (anfaenger)') === 100
    const experteFreigeschaltet = getProgress('Präpositionen (fortgeschritten)') === 100

    const verfuegbar: Schwierigkeitsgrad[] = ['anfaenger']
    if (fortgeschrittenFreigeschaltet) verfuegbar.push('fortgeschritten')
    if (experteFreigeschaltet) verfuegbar.push('experte')

    setVerfuegbareSchwierigkeitsgrade(verfuegbar)
  }, [])

  const handleAntwort = (wert: string) => {
    const neueAntworten = [...antworten]
    neueAntworten[aktuelleFrageIndex] = wert
    setAntworten(neueAntworten)
    setIstKorrekt(null)
    setZeigeErklaerung(false)
  }

  const pruefeAntwort = () => {
    const korrekt = aktuelleAntwort === aktuelleFrage.korrekt
    setIstKorrekt(korrekt)
    setVersuchsZaehler(versuchsZaehler + 1)

    if (korrekt) {
      // Add points for correct answer
      addPoints(10)
      setTimeout(() => {
        if (aktuelleFrageIndex < fragen[schwierigkeitsgrad].length - 1) {
          setAktuelleFrageIndex(aktuelleFrageIndex + 1)
          setIstKorrekt(null)
          setVersuchsZaehler(0)
          setZeigeErklaerung(false)
        } else {
          setIstBeendet(true)
          updateProgress()
          // Unlock badge for completing the exercise
          unlockBadge('praepositionen-profi')
        }
      }, 1500)
    } else {
      setZeigeErklaerung(true)
    }
  }

  const berechnePunktzahl = () => {
    return antworten.filter((antwort, index) => antwort === fragen[schwierigkeitsgrad][index].korrekt).length
  }

  const updateProgress = () => {
    const progress = Math.round((berechnePunktzahl() / fragen[schwierigkeitsgrad].length) * 100)
    saveProgress(`Präpositionen (${schwierigkeitsgrad})`, progress)

    if (progress === 100) {
      unlockBadge('perfekte-praepositionen')
    }
  }

  const handleSchwierigkeitswechsel = (neuerSchwierigkeitsgrad: Schwierigkeitsgrad) => {
    setSchwierigkeitsgrad(neuerSchwierigkeitsgrad)
    setAktuelleFrageIndex(0)
    setAntworten(Array(fragen[neuerSchwierigkeitsgrad].length).fill(''))
    setIstBeendet(false)
    setIstKorrekt(null)
    setZeigeErklaerung(false)
    setVersuchsZaehler(0)
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
        <p className="text-xl mb-4">Deine Punktzahl: {punktzahl} von {fragen[schwierigkeitsgrad].length}</p>
        <Button onClick={() => {
          setAktuelleFrageIndex(0)
          setAntworten(Array(fragen[schwierigkeitsgrad].length).fill(''))
          setIstBeendet(false)
          setIstKorrekt(null)
          setVersuchsZaehler(0)
          setZeigeErklaerung(false)
        }}>
          Übung wiederholen
        </Button>
      </motion.div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <label htmlFor="schwierigkeitsgrad" className="block text-sm font-medium text-gray-700 mb-1">
          Schwierigkeitsgrad:
        </label>
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
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Frage {aktuelleFrageIndex + 1} von {fragen[schwierigkeitsgrad].length}</h2>
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
      <Button onClick={pruefeAntwort} className="w-full bg-blue-500 hover:bg-blue-600 text-white text-lg py-3" disabled={!aktuelleAntwort}>
        Antwort prüfen
      </Button>
    </div>
  )
}

