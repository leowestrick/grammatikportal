'use client'

import { useEffect, useState } from 'react'
import { Navbar } from '../../components/navbar'
import { UebungCard } from '../../components/uebung-card'
import { getPoints, getBadges } from '../../utils/gamification'
import { getAllProgress } from '../../utils/progress-manager'
import { Badge } from "@/components/ui/badge"
import { Trophy, Star, Award } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const hauptKategorien = [
  { title: "Grammatik", description: "Üben Sie verschiedene Aspekte der deutschen Grammatik", link: "/uebungen/grammatik" },
  { title: "Rechtschreibung", description: "Verbessern Sie Ihre Rechtschreibkenntnisse", link: "/uebungen/rechtschreibung" },
  { title: "Sprachspiele", description: "Spielerisch Deutsch lernen mit interaktiven Übungen", link: "/uebungen/sprachspiele" },
]

export default function UebungenPage() {
  const [points, setPoints] = useState(0)
  const [badges, setBadges] = useState<{[key: string]: boolean}>({})
  const [progress, setProgress] = useState<{[key: string]: number}>({})

  useEffect(() => {
    setPoints(getPoints())
    setBadges(getBadges())
    setProgress(getAllProgress())
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-12 text-center text-gray-800">Übungen</h1>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Dein Fortschritt</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold mb-4">Punkte: {points}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {Object.entries(badges).map(([badge, unlocked]) => 
                unlocked && (
                  <Badge key={badge} variant="secondary" className="p-2">
                    {badge === 'verb-konjugation-meister' && <Trophy className="w-4 h-4 mr-1" />}
                    {badge === 'praepositionen-profi' && <Star className="w-4 h-4 mr-1" />}
                    {badge === 'satzbau-genie' && <Award className="w-4 h-4 mr-1" />}
                    {badge}
                  </Badge>
                )
              )}
            </div>
            <div className="space-y-2">
              {Object.entries(progress).map(([category, value]) => (
                <div key={category}>
                  <div className="flex justify-between mb-1">
                    <span>{category}</span>
                    <span>{value}%</span>
                  </div>
                  <Progress value={value} className="w-full" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hauptKategorien.map((kategorie, index) => (
            <UebungCard key={index} {...kategorie} />
          ))}
        </div>
      </main>
    </div>
  )
}

