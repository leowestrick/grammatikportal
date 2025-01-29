'use client'

import { useState } from 'react'
import { Navbar } from '../../../components/navbar'
import { PraepositionRegeln } from '../../../components/praeposition-regeln'
import { PraepositionUebung } from '../../../components/praeposition-uebung'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function PraepositionUebungPage() {
  const [showUebung, setShowUebung] = useState(false)

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Präpositions-Übung</h1>
        {!showUebung ? (
          <>
            <PraepositionRegeln onWeiterClick={() => setShowUebung(true)} />
            <div className="text-center mt-8">
              <Button onClick={() => setShowUebung(true)} className="bg-blue-500 hover:bg-blue-600 text-white">
                Zur erweiterten Übung
              </Button>
            </div>
          </>
        ) : (
          <>
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Präpositions-Übung mit verschiedenen Schwierigkeitsgraden</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Wähle einen Schwierigkeitsgrad aus und beginne mit der Übung. Du musst jeden Schwierigkeitsgrad abschließen, bevor du zum nächsten übergehen kannst.
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Anfänger:</strong> Einfache Sätze mit häufig verwendeten Präpositionen.</li>
                  <li><strong>Fortgeschritten:</strong> Komplexere Sätze mit weniger gebräuchlichen Präpositionen.</li>
                  <li><strong>Experte:</strong> Anspruchsvolle Sätze mit idiomatischen Ausdrücken und Präpositionen in verschiedenen Kontexten.</li>
                </ul>
              </CardContent>
            </Card>
            <PraepositionUebung />
          </>
        )}
      </main>
    </div>
  )
}

