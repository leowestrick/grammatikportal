'use client'

import { useState } from 'react'
import { Navbar } from '../../../components/navbar'
import { MultiLevelUebung } from '../../../components/multi-level-uebung'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function MultiLevelUebungPage() {
  const [showUebung, setShowUebung] = useState(false)

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Multi-Level Übung</h1>
        {!showUebung ? (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Willkommen zur erweiterten Multi-Level Übung!</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">In dieser Übung wirst du deine Deutschkenntnisse in verschiedenen Bereichen und auf unterschiedlichen Niveaus testen:</p>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li>Vokabeln</li>
                <li>Satzbau</li>
                <li>Grammatik</li>
                <li>Hörverstehen</li>
                <li>Leseverstehen</li>
              </ul>
              <p className="mb-4">Es gibt fünf Schwierigkeitsgrade:</p>
              <ol className="list-decimal pl-5 space-y-2 mb-4">
                <li>Anfänger</li>
                <li>Fortgeschritten</li>
                <li>Experte</li>
                <li>Meister</li>
                <li>Muttersprachler</li>
              </ol>
              <p className="mb-4">Du hast drei Leben. Beantworte so viele Fragen wie möglich richtig und erreiche das höchste Level!</p>
              <Button onClick={() => setShowUebung(true)} className="w-full">
                Übung starten
              </Button>
            </CardContent>
          </Card>
        ) : (
          <MultiLevelUebung />
        )}
      </main>
    </div>
  )
}

