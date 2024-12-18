'use client'

import { useState } from 'react'
import { Navbar } from '../../../components/navbar'
import { ArtikelRegeln } from '../../../components/artikel-regeln'
import { ArtikelUebung } from '../../../components/artikel-uebung'
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

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
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Artikel-Übung mit verschiedenen Schwierigkeitsgraden</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    Wähle einen Schwierigkeitsgrad aus und beginne mit der Übung. Du musst jeden Schwierigkeitsgrad abschließen, bevor du zum nächsten übergehen kannst.
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Anfänger:</strong> Einfache Sätze mit Fokus auf der Grundverwendung von Artikeln.</li>
                    <li><strong>Fortgeschritten:</strong> Komplexere Sätze mit Lückentexten und Bildauswahl.</li>
                    <li><strong>Experte:</strong> Anspruchsvolle Sätze mit mehreren Artikeln und speziellen Fällen.</li>
                  </ul>
                </CardContent>
              </Card>
              <ArtikelUebung />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}

