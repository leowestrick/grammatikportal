'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Star, Heart } from 'lucide-react'

interface Frage {
  id: number
  typ: 'vokabel' | 'satzbau' | 'grammatik' | 'hoerverstehen' | 'leseverstehen'
  frage: string
  antworten?: string[]
  korrekt: string | string[]
  hinweis?: string
  audio?: string
  bild?: string
}

interface Level {
  id: number
  name: string
  fragen: Frage[]
}

const levels: Level[] = [
  {
    id: 1,
    name: "Anfänger",
    fragen: [
      {
        id: 1,
        typ: 'vokabel',
        frage: "Was bedeutet 'Hund' auf Englisch?",
        antworten: ["Cat", "Dog", "Bird", "Fish"],
        korrekt: "Dog"
      },
      {
        id: 2,
        typ: 'satzbau',
        frage: "Ordne die Wörter zu einem korrekten Satz: Ich - Kaffee - trinke - gern",
        korrekt: ["Ich trinke gern Kaffee", "Ich trinke gern Kaffee."]
      },
      {
        id: 3,
        typ: 'grammatik',
        frage: "Welcher Artikel passt? ___ Sonne scheint.",
        antworten: ["Der", "Die", "Das"],
        korrekt: "Die"
      }
    ]
  },
  {
    id: 2,
    name: "Fortgeschritten",
    fragen: [
      {
        id: 1,
        typ: 'vokabel',
        frage: "Was ist das Gegenteil von 'fleißig'?",
        antworten: ["Faul", "Schnell", "Klug", "Stark"],
        korrekt: "Faul"
      },
      {
        id: 2,
        typ: 'satzbau',
        frage: "Bilde einen Satz im Perfekt: ich - gestern - ins Kino - gehen",
        korrekt: ["Ich bin gestern ins Kino gegangen", "Ich bin gestern ins Kino gegangen."]
      },
      {
        id: 3,
        typ: 'grammatik',
        frage: "Ergänze die richtige Präposition: Wir warten ___ den Bus.",
        antworten: ["auf", "für", "mit", "zu"],
        korrekt: "auf"
      }
    ]
  },
  {
    id: 3,
    name: "Experte",
    fragen: [
      {
        id: 1,
        typ: 'vokabel',
        frage: "Was bedeutet 'Fernweh'?",
        antworten: ["Heimweh", "Reiselust", "Müdigkeit", "Aufregung"],
        korrekt: "Reiselust"
      },
      {
        id: 2,
        typ: 'satzbau',
        frage: "Bilde einen Satz im Konjunktiv II: wenn - ich - Zeit haben - ich - mehr reisen",
        korrekt: ["Wenn ich Zeit hätte, würde ich mehr reisen", "Wenn ich Zeit hätte, würde ich mehr reisen."]
      },
      {
        id: 3,
        typ: 'grammatik',
        frage: "Welches Verb passt im Präteritum? Er ___ den ganzen Tag im Bett. (liegen)",
        korrekt: "lag"
      }
    ]
  },
  {
    id: 4,
    name: "Meister",
    fragen: [
      {
        id: 1,
        typ: 'vokabel',
        frage: "Was bedeutet die Redewendung 'Eulen nach Athen tragen'?",
        antworten: ["Etwas Überflüssiges tun", "Sehr weise sein", "Nachtaktiv sein", "Griechisch lernen"],
        korrekt: "Etwas Überflüssiges tun"
      },
      {
        id: 2,
        typ: 'satzbau',
        frage: "Bilde einen Satz mit indirekter Rede: Er sagte, dass...",
        korrekt: ["Er sagte, dass er morgen kommen werde", "Er sagte, dass er morgen kommen würde"]
      },
      {
        id: 3,
        typ: 'grammatik',
        frage: "Ergänze den Satz im Plusquamperfekt: Nachdem er ___ ___ (aufstehen), ___ er zum Bahnhof ___ (gehen).",
        korrekt: ["Nachdem er aufgestanden war, war er zum Bahnhof gegangen"]
      },
      {
        id: 4,
        typ: 'hoerverstehen',
        frage: "Höre dir den Audioclip an und beantworte die Frage: Was ist das Hauptthema des Gesprächs?",
        antworten: ["Klimawandel", "Wirtschaft", "Politik", "Technologie"],
        korrekt: "Klimawandel",
        audio: "/audio/klimawandel-gespraech.mp3"
      }
    ]
  },
  {
    id: 5,
    name: "Muttersprachler",
    fragen: [
      {
        id: 1,
        typ: 'vokabel',
        frage: "Was bedeutet das Wort 'Weltschmerz'?",
        antworten: ["Traurigkeit über das Leid in der Welt", "Freude am Reisen", "Angst vor Fremden", "Sehnsucht nach der Heimat"],
        korrekt: "Traurigkeit über das Leid in der Welt"
      },
      {
        id: 2,
        typ: 'satzbau',
        frage: "Formuliere einen komplexen Satz mit Haupt- und Nebensätzen zum Thema 'Digitalisierung in der Bildung'.",
        korrekt: ["Die Digitalisierung, die in allen Bereichen des Lebens voranschreitet, hat auch das Bildungssystem erreicht, wobei sowohl Chancen als auch Herausforderungen entstehen."]
      },
      {
        id: 3,
        typ: 'grammatik',
        frage: "Korrigiere den folgenden Satz: 'Trotz, dass er krank war ist er zur Arbeit gegangen.'",
        korrekt: ["Trotz der Tatsache, dass er krank war, ist er zur Arbeit gegangen.", "Obwohl er krank war, ist er zur Arbeit gegangen."]
      },
      {
        id: 4,
        typ: 'leseverstehen',
        frage: "Lies den folgenden Textausschnitt und beantworte die Frage:\n\n'Die Digitalisierung verändert nicht nur unsere Arbeitswelt, sondern auch die Art und Weise, wie wir kommunizieren, lernen und leben. Während sie einerseits neue Möglichkeiten eröffnet, stellt sie uns andererseits vor ethische und soziale Herausforderungen.'\n\nWelche Aussage trifft am besten den Kern des Textes?",
        antworten: [
          "Digitalisierung betrifft nur die Arbeitswelt",
          "Digitalisierung hat ausschließlich positive Auswirkungen",
          "Digitalisierung verändert viele Lebensbereiche und bringt Chancen und Herausforderungen",
          "Digitalisierung stellt hauptsächlich ethische Probleme dar"
        ],
        korrekt: "Digitalisierung verändert viele Lebensbereiche und bringt Chancen und Herausforderungen"
      },
      {
        id: 5,
        typ: 'hoerverstehen',
        frage: "Höre dir den Audioclip an und fasse die Hauptargumente des Sprechers in einem Satz zusammen.",
        audio: "/audio/zukunft-der-arbeit.mp3",
        korrekt: ["Die Zukunft der Arbeit wird durch Automatisierung und künstliche Intelligenz geprägt sein, was sowohl neue Jobmöglichkeiten schafft als auch traditionelle Berufsfelder gefährdet."]
      }
    ]
  }
]

export function MultiLevelUebung() {
  const [aktuellesLevel, setAktuellesLevel] = useState(0)
  const [aktuelleFrageIndex, setAktuelleFrageIndex] = useState(0)
  const [antwort, setAntwort] = useState("")
  const [punktzahl, setPunktzahl] = useState(0)
  const [leben, setLeben] = useState(3)
  const [feedback, setFeedback] = useState<string | null>(null)
  const [istBeendet, setIstBeendet] = useState(false)

  const aktuelleFrage = levels[aktuellesLevel].fragen[aktuelleFrageIndex]

  useEffect(() => {
    setAntwort("")
    setFeedback(null)
  }, [aktuellesLevel, aktuelleFrageIndex])

  const pruefeAntwort = () => {
    const istKorrekt = Array.isArray(aktuelleFrage.korrekt)
      ? aktuelleFrage.korrekt.some(k => antwort.trim().toLowerCase() === k.toLowerCase())
      : antwort.trim().toLowerCase() === aktuelleFrage.korrekt.toLowerCase()

    if (istKorrekt) {
      setPunktzahl(punktzahl + 1)
      setFeedback("Richtig! Gut gemacht!")
      setTimeout(() => naechsteFrage(), 1500)
    } else {
      setLeben(leben - 1)
      if (leben > 1) {
        setFeedback("Das ist leider nicht korrekt. Versuche es noch einmal!")
      } else {
        setIstBeendet(true)
        updateProgress()
      }
    }
  }

  const naechsteFrage = () => {
    if (aktuelleFrageIndex < levels[aktuellesLevel].fragen.length - 1) {
      setAktuelleFrageIndex(aktuelleFrageIndex + 1)
    } else if (aktuellesLevel < levels.length - 1) {
      setAktuellesLevel(aktuellesLevel + 1)
      setAktuelleFrageIndex(0)
    } else {
      setIstBeendet(true)
      updateProgress()
    }
  }

  const updateProgress = () => {
    const totalQuestions = levels.reduce((sum, level) => sum + level.fragen.length, 0)
    const progress = Math.round((punktzahl / totalQuestions) * 100)
    const storedProgress = localStorage.getItem('deutschLernProgress')
    let progressData = storedProgress ? JSON.parse(storedProgress) : {}
    progressData['Multi-Level'] = progress
    localStorage.setItem('deutschLernProgress', JSON.stringify(progressData))
  }

  const renderFrage = () => {
    switch (aktuelleFrage.typ) {
      case 'vokabel':
      case 'grammatik':
        return (
          <div className="grid grid-cols-2 gap-2">
            {aktuelleFrage.antworten!.map((option, index) => (
              <Button
                key={index}
                variant={antwort === option ? "default" : "outline"}
                onClick={() => setAntwort(option)}
                className="w-full"
              >
                {option}
              </Button>
            ))}
          </div>
        )
      case 'satzbau':
      case 'hoerverstehen':
      case 'leseverstehen':
        return (
          <div className="mb-4">
            <Label htmlFor="antwort">Deine Antwort:</Label>
            <Input
              type="text"
              id="antwort"
              value={antwort}
              onChange={(e) => setAntwort(e.target.value)}
              placeholder="Gib hier deine Antwort ein"
              className="w-full mt-1"
            />
          </div>
        )
      default:
        return null
    }
  }

  if (istBeendet) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Übung beendet!</h2>
        <p className="text-xl mb-4">Deine Punktzahl: {punktzahl}</p>
        <Button onClick={() => {
          setAktuellesLevel(0)
          setAktuelleFrageIndex(0)
          setAntwort("")
          setPunktzahl(0)
          setLeben(3)
          setFeedback(null)
          setIstBeendet(false)
        }}>
          Übung wiederholen
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Level: {levels[aktuellesLevel].name}</h2>
        <div className="flex items-center space-x-4">
          <Badge variant="secondary">
            <Star className="w-4 h-4 mr-1" />
            {punktzahl}
          </Badge>
          <div className="flex">
            {[...Array(leben)].map((_, i) => (
              <Heart key={i} className="w-5 h-5 text-red-500 fill-current" />
            ))}
          </div>
        </div>
      </div>
      <Progress value={(aktuelleFrageIndex / levels[aktuellesLevel].fragen.length) * 100} className="mb-4" />
      <Card className="mb-4">
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold mb-2">{aktuelleFrage.typ.charAt(0).toUpperCase() + aktuelleFrage.typ.slice(1)}</h3>
          <p className="text-lg mb-4">{aktuelleFrage.frage}</p>
          {aktuelleFrage.audio && (
            <audio controls className="w-full mb-4">
              <source src={aktuelleFrage.audio} type="audio/mpeg" />
              Dein Browser unterstützt das Audio-Element nicht.
            </audio>
          )}
          {aktuelleFrage.bild && (
            <img src={aktuelleFrage.bild} alt="Bild zur Frage" className="w-full mb-4 rounded-lg" />
          )}
          {renderFrage()}
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
        </CardContent>
      </Card>
      <Button onClick={pruefeAntwort} className="w-full" disabled={!antwort}>
        Antwort prüfen
      </Button>
    </div>
  )
}

