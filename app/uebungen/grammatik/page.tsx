import { Navbar } from '@/components/navbar'
import { UebungCard } from '@/components/uebung-card'

const grammatikUebungen = [
  { title: "Wortarten", description: "Üben Sie die verschiedenen Wortarten", link: "/uebungen/grammatik/wortarten" },
  { title: "Zeitformen des Verbs", description: "Lernen Sie die verschiedenen Zeitformen", link: "/uebungen/grammatik/zeitformen" },
  { title: "Satzglieder", description: "Üben Sie die Bestimmung von Satzgliedern", link: "/uebungen/grammatik/satzglieder" },
  { title: "Satzarten und Satzzeichen", description: "Lernen Sie verschiedene Satzarten und ihre Zeichensetzung", link: "/uebungen/grammatik/satzarten" },
  { title: "Relativpronomen", description: "Üben Sie den Gebrauch von Relativpronomen", link: "/uebungen/grammatik/relativpronomen" },
  { title: "Passiv", description: "Lernen Sie die Bildung und Anwendung des Passivs", link: "/uebungen/grammatik/passiv" },
  { title: "Konjunktionen und Nebensätze", description: "Üben Sie den Gebrauch von Konjunktionen in Nebensätzen", link: "/uebungen/grammatik/konjunktionen" },
  { title: "Kommasetzung", description: "Üben Sie die korrekte Kommasetzung in Sätzen", link: "/uebungen/grammatik/kommasetzung" },
]

export default function GrammatikPage() {
  return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pb-20">
        <Navbar/>
        <div className="relative isolate px-6 pt-14 lg:px-8 mx-30">
          <h1 className="text-4xl font-bold mb-12 text-center text-gray-800">Grammatik Übungen</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {grammatikUebungen.map((uebung, index) => (
                <UebungCard key={index} {...uebung} />
            ))}
          </div>
        </div>
      </div>
  )
}

