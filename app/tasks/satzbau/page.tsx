'use client'

import { useState } from 'react'
import { Navbar } from '../../../components/navbar'
import { SatzbauRegeln } from '../../../components/satzbau-regeln'
import { SatzbauUebung } from '../../../components/satzbau-uebung'

export default function SatzbauUebungPage() {
  const [showUebung, setShowUebung] = useState(false)

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Satzbau-Übung</h1>
        {!showUebung ? (
          <SatzbauRegeln onWeiterClick={() => setShowUebung(true)} />
        ) : (
          <>
            <p className="text-center mb-8">
              Vervollständige die Sätze mit dem gegebenen Wort.
            </p>
            <SatzbauUebung />
          </>
        )}
      </main>
    </div>
  )
}

