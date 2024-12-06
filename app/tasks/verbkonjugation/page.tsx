'use client'

import { useState } from 'react'
import { Navbar } from '../../../components/navbar'
import { VerbKonjugationRegeln } from '../../../components/verb-konjugation-regeln'
import { VerbKonjugationUebung } from '../../../components/verb-konjugation-uebung'

export default function VerbKonjugationUebungPage() {
  const [showUebung, setShowUebung] = useState(false)

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Verbkonjugations-Übung</h1>
        {!showUebung ? (
          <VerbKonjugationRegeln onWeiterClick={() => setShowUebung(true)} />
        ) : (
          <>
            <p className="text-center mb-8">
              Konjugiere die gegebenen Verben in der richtigen Form für die angegebene Person.
            </p>
            <VerbKonjugationUebung />
          </>
        )}
      </main>
    </div>
  )
}

