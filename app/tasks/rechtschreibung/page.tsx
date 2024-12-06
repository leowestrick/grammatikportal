'use client'

import { useState } from 'react'
import { Navbar } from '../../../components/navbar'
import { RechtschreibRegeln } from '../../../components/rechtschreib-regeln'
import { RechtschreibUebung } from '../../../components/rechtschreib-uebung'

export default function RechtschreibungUebungPage() {
  const [showUebung, setShowUebung] = useState(false)

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Rechtschreibübung</h1>
        {!showUebung ? (
          <RechtschreibRegeln onWeiterClick={() => setShowUebung(true)} />
        ) : (
          <>
            <p className="text-center mb-8">
              Korrigiere die Rechtschreibfehler in den folgenden Sätzen.
            </p>
            <RechtschreibUebung />
          </>
        )}
      </main>
    </div>
  )
}

