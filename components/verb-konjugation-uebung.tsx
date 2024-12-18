'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { motion, AnimatePresence } from 'framer-motion'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { saveProgress, getProgress } from '../utils/progress-manager'
import { addPoints, unlockBadge } from '../utils/gamification'

// ... (rest of the imports and interface definitions)

export function VerbKonjugationUebung() {
  // ... (existing state variables)

  useEffect(() => {
    const fortgeschrittenFreigeschaltet = getProgress('Verbkonjugation (anfaenger)') === 100
    const experteFreigeschaltet = getProgress('Verbkonjugation (fortgeschritten)') === 100

    let verfuegbar: Schwierigkeitsgrad[] = ['anfaenger']
    if (fortgeschrittenFreigeschaltet) verfuegbar.push('fortgeschritten')
    if (experteFreigeschaltet) verfuegbar.push('experte')

    setVerfuegbareSchwierigkeitsgrade(verfuegbar)
  }, [])

  // ... (rest of the component logic)

  const updateProgress = () => {
    const progress = Math.round((berechnePunktzahl() / fragen[schwierigkeitsgrad].length) * 100)
    saveProgress(`Verbkonjugation (${schwierigkeitsgrad})`, progress)
    if (progress === 100) {
      unlockBadge('perfekte-konjugation')
    }
  }

  // ... (rest of the component JSX)
}

