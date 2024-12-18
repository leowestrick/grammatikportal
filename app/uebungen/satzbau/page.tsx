'use client'

import { useState } from 'react'
import { Navbar } from '../../../components/navbar'
import { SatzbauRegeln } from '../../../components/satzbau-regeln'
import { SatzbauUebung } from '../../../components/satzbau-uebung'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function SatzbauUebungPage() {
  const [showUebung, setShowUebung] = useState(false)

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Satzbau-Übung</h1>
        {!showUebung ? (
          <>
            <SatzbauRegeln onWeiterClick={() => setShowUebung(true)} />
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
                <CardTitle>Satzbau-Übung mit verschiedenen Schwierigkeitsgraden</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Wähle einen Schwierigkeitsgrad aus und beginne mit der Übung. Du musst jeden Schwierigkeitsgrad abschließen, bevor du zum nächsten übergehen kannst.
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Anfänger:</strong> Einfache Hauptsätze mit grundlegender Wortstellung.</li>
                  <li><strong>Fortgeschritten:</strong> Komplexere Sätze mit Nebensätzen und verschiedenen Zeitformen.</li>
                  <li><strong>Experte:</strong> Anspruchsvolle Satzstrukturen mit Konjunktiv, indirekter Rede und komplexen Satzverbindungen.</li>
                </ul>
              </CardContent>
            </Card>
            <SatzbauUebung />
          </>
        )}
      </main>
    </div>
  )
}

