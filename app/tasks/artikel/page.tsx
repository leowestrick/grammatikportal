'use client'

import { useState } from 'react'
import { Navbar } from '../../../components/navbar'
import { ArtikelRegeln } from '../../../components/grammatik/artikel-regeln'
import { ArtikelUebung } from '../../../components/grammatik/artikel-uebung'
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from 'framer-motion'

export default function ArtikelUebungPage() {
  const [showUebung, setShowUebung] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-12 text-center text-gray-800">Erweiterte Artikel-Übung</h1>
        <AnimatePresence mode="wait">
          {!showUebung ? (
            <motion.div
              key="regeln"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <ArtikelRegeln onWeiterClick={() => setShowUebung(true)} />
              <div className="text-center mt-8">
                <Button onClick={() => setShowUebung(true)} className="bg-blue-500 hover:bg-blue-600 text-white">
                  Zur erweiterten Übung
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="uebung"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-center mb-8 text-gray-700">
                In dieser erweiterten Übung wirst du verschiedene Aufgabentypen zu Artikeln bearbeiten:
                Multiple-Choice, Lückentexte, Bildauswahl und Satzverbindungen.
              </p>
              <ArtikelUebung />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}

