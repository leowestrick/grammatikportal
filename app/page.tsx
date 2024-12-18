import Link from 'next/link'
import { Navbar } from '../components/navbar'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, GraduationCap, BarChart, Users } from 'lucide-react'
import { GamificationSystem } from '../components/gamification-system'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-blue-800">Willkommen zur Deutschen Lernplattform</h1>
          <p className="text-xl text-gray-600 mb-8">Verbessern Sie Ihre Deutschkenntnisse mit interaktiven Übungen und Spielen</p>
          <Link href="/uebungen">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white text-lg py-2 px-6">
              Jetzt lernen
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div>
            <GamificationSystem />
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart className="mr-2 h-6 w-6 text-blue-600" />
                Dein Lernfortschritt
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Verfolge deinen Fortschritt und sieh, wie du dich verbesserst. Je mehr du übst, desto mehr Punkte und Abzeichen sammelst du!</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="mr-2 h-6 w-6 text-blue-600" />
                Vielfältige Übungen
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Von Grammatik bis Wortschatz - für jeden Lernbereich die passende Übung.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <GraduationCap className="mr-2 h-6 w-6 text-blue-600" />
                Alle Niveaus
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Für Anfänger bis Fortgeschrittene - finden Sie Ihr passendes Level.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-6 w-6 text-blue-600" />
                Community
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Lernen Sie gemeinsam mit anderen und tauschen Sie sich aus.</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl text-blue-800">Unsere Übungen</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <li className="flex items-center"><BookOpen className="mr-2 h-4 w-4 text-blue-600" /> Artikel</li>
              <li className="flex items-center"><BookOpen className="mr-2 h-4 w-4 text-blue-600" /> Verbkonjugation</li>
              <li className="flex items-center"><BookOpen className="mr-2 h-4 w-4 text-blue-600" /> Rechtschreibung</li>
              <li className="flex items-center"><BookOpen className="mr-2 h-4 w-4 text-blue-600" /> Satzbau</li>
              <li className="flex items-center"><BookOpen className="mr-2 h-4 w-4 text-blue-600" /> Präpositionen</li>
              <li className="flex items-center"><BookOpen className="mr-2 h-4 w-4 text-blue-600" /> Kommasetzung</li>
              <li className="flex items-center"><BookOpen className="mr-2 h-4 w-4 text-blue-600" /> Wortarten</li>
              <li className="flex items-center"><BookOpen className="mr-2 h-4 w-4 text-blue-600" /> Zeitformen</li>
            </ul>
            <div className="mt-6 text-center">
              <Link href="/uebungen">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Alle Übungen ansehen
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-blue-800">Warum Deutsch lernen?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Deutsch ist eine der meistgesprochenen Sprachen in Europa und eröffnet viele Möglichkeiten in Beruf und Privatleben. 
              Mit unserer Plattform machen wir das Lernen einfach, effektiv und sogar unterhaltsam!
            </p>
            <p className="text-gray-600">
              Egal ob Sie Deutsch für den Beruf, das Studium oder aus persönlichem Interesse lernen - wir unterstützen Sie auf Ihrem Weg zur Sprachbeherrschung.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

