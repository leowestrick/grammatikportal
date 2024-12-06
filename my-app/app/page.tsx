import { Navbar } from '../components/navbar'
import { UebungCard } from '../components/uebung-card'

const uebungen = [
  { title: "Artikel", description: "Üben Sie den richtigen Gebrauch von der, die, das", link: "/uebungen/artikel" },
  { title: "Verbkonjugation", description: "Trainieren Sie die Konjugation deutscher Verben", link: "/uebungen/verbkonjugation" },
  { title: "Rechtschreibung", description: "Verbessern Sie Ihre deutsche Rechtschreibung", link: "/uebungen/rechtschreibung" },
  { title: "Satzbau", description: "Lernen Sie die korrekte Wortstellung im Satz", link: "/uebungen/satzbau" },
  { title: "Präpositionen", description: "Üben Sie den richtigen Gebrauch von Präpositionen", link: "/uebungen/praepositionen" },
  { title: "Groß- und Kleinschreibung", description: "Lernen Sie die Regeln der Groß- und Kleinschreibung", link: "/uebungen/gross-kleinschreibung" },
  { title: "Kommasetzung", description: "Üben Sie die korrekte Verwendung von Kommas", link: "/uebungen/kommasetzung" },
  { title: "Multi-Level Übung", description: "Testen Sie Ihre Deutschkenntnisse in verschiedenen Bereichen", link: "/uebungen/multi-level" },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-12 text-center text-gray-800">Willkommen zur Deutschen Lernplattform</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {uebungen.map((uebung, index) => (
            <UebungCard key={index} {...uebung} />
          ))}
        </div>
      </main>
    </div>
  )
}

