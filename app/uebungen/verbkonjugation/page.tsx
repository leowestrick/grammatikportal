'use client'

import { useState } from 'react'
import { Navbar } from '../../../components/navbar'
import { VerbKonjugationRegeln } from '../../../components/verb-konjugation-regeln'
import { VerbKonjugationUebung } from '../../../components/verb-konjugation-uebung'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function VerbKonjugationUebungPage() {
  const [showUebung, setShowUebung] = useState(false)

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Verbkonjugations-Übung</h1>
        {!showUebung ? (
          <>
            <VerbKonjugationRegeln onWeiterClick={() => setShowUebung(true)} />
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
                <CardTitle>Verbkonjugations-Übung mit verschiedenen Schwierigkeitsgraden</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Wähle einen Schwierigkeitsgrad aus und beginne mit der Übung. Du musst jeden Schwierigkeitsgrad abschließen, bevor du zum nächsten übergehen kannst.
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Anfänger:</strong> Einfache Verben im Präsens.</li>
                  <li><strong>Fortgeschritten:</strong> Verschiedene Zeitformen mit regelmäßigen und unregelmäßigen Verben.</li>
                  <li><strong>Experte:</strong> Komplexe Zeitformen und Konjunktiv.</li>
                </ul>
              </CardContent>
            </Card>
            <VerbKonjugationUebung />
          </>
        )}
      </main>
    </div>
  )
}

