'use client'

import { useState, useEffect } from 'react'
import { Navbar } from '@/components/navbar'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { getAllProgress } from '@/utils/progress-manager'

interface ProgressData {
  [key: string]: number
}

export default function ProgressPage() {
  const [progressData, setProgressData] = useState<ProgressData>({})

  useEffect(() => {
    setProgressData(getAllProgress());
  }, []);

  return (
    <div className="min-h-screen from-blue-50 to-white">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-12 text-center text-gray-800 mt-10">Mein Fortschritt</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(progressData).map(([category, progress]) => (
            <Card key={category}>
              <CardHeader>
                <CardTitle>{category}</CardTitle>
              </CardHeader>
              <CardContent>
                <Progress value={progress} className="w-full" />
                <p className="mt-2 text-right">{progress}% abgeschlossen</p>
              </CardContent>
            </Card>
          ))}
        </div>
        {Object.keys(progressData).length === 0 && (
          <p className="text-center text-gray-600 mt-8">
            Du hast noch keine Übungen abgeschlossen. Starte jetzt und verfolge deinen Fortschritt!
          </p>
        )}
      </main>
    </div>
  )
}

