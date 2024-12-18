'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Trophy, Star, Award } from 'lucide-react'

interface BadgeType {
  name: string
  description: string
  icon: React.ReactNode
  unlocked: boolean
}

export function GamificationSystem() {
  const [points, setPoints] = useState(0)
  const [level, setLevel] = useState(1)
  const [badges, setBadges] = useState<BadgeType[]>([
    { name: "Anfänger", description: "Schließe deine erste Übung ab", icon: <Trophy className="w-6 h-6" />, unlocked: false },
    { name: "Fleißige Biene", description: "Übe 7 Tage in Folge", icon: <Star className="w-6 h-6" />, unlocked: false },
    { name: "Grammatik-Guru", description: "Erreiche 100% in einer Grammatik-Übung", icon: <Award className="w-6 h-6" />, unlocked: false },
  ])

  useEffect(() => {
    // Hier würden wir normalerweise die Daten aus einem Backend oder LocalStorage laden
    // Für dieses Beispiel simulieren wir einige Daten
    setPoints(250)
    setLevel(2)
    setBadges(prevBadges => prevBadges.map((badge, index) => ({ ...badge, unlocked: index === 0 })))
  }, [])

  const calculateLevelProgress = () => {
    const pointsPerLevel = 100
    return (points % pointsPerLevel) / pointsPerLevel * 100
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Dein Fortschritt</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-semibold">Level {level}</span>
          <span className="text-lg font-semibold">{points} Punkte</span>
        </div>
        <Progress value={calculateLevelProgress()} className="mb-6" />
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Abzeichen</h3>
          {badges.map((badge, index) => (
            <div key={index} className="flex items-center space-x-4">
              <Badge variant={badge.unlocked ? "default" : "secondary"} className="p-2">
                {badge.icon}
              </Badge>
              <div>
                <p className="font-semibold">{badge.name}</p>
                <p className="text-sm text-gray-500">{badge.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

