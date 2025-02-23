import { Navbar } from '@/components/navbar'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function GrossKleinSchreibungPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center mt-10">Groß- und Kleinschreibung</h1>
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Erklärung: Groß- und Kleinschreibung</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Im Deutschen gelten folgende Regeln für die Groß- und Kleinschreibung:</p>
            <ul className="list-disc pl-5 mt-2">
              <li>Satzanfänge werden immer großgeschrieben.</li>
              <li>Alle Nomen (Substantive) werden großgeschrieben.</li>
              <li>Eigennamen (z.B. Personen, Orte, Marken) werden großgeschrieben.</li>
              <li>Adjektive, Verben (außer in Nominalisierungen) und andere Wortarten werden kleingeschrieben.</li>
              <li>Nach einem Doppelpunkt wird großgeschrieben, wenn ein vollständiger Satz folgt.</li>
            </ul>
            <p className="mt-4">Achte besonders auf Nomen, die von Verben oder Adjektiven abgeleitet sind, da diese oft
              übersehen werden.</p>
          </CardContent>
        </Card>
        <div className="text-center mt-8">
          <a
              href="./gross-klein/uebung"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Zur Übung
          </a>
        </div>
      </main>
    </div>
  )
}

