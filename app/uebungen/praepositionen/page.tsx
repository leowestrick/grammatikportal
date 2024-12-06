'use client'

import { useState } from 'react'
import { Navbar } from '../../../components/navbar'
import { PraepositionRegeln } from '../../../components/praeposition-regeln'
import { PraepositionUebung } from '../../../components/praeposition-uebung'

export default function PraepositionUebungPage() {
  const [showUebung, setShowUebung] = useState(false)

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Präpositions-Übung</h1>
        {!showUebung ? (
          <PraepositionRegeln onWeiterClick={() => setShowUebung(true)} />
        ) : (
          <>
            <p className="text-center mb-8">
              Wähle die richtige Präposition für jeden Satz. Du erhältst sofort Feedback zu deiner Antwort.
            </p>
            <PraepositionUebung />
          </>
        )}
      </main>
    </div>
  )
}

