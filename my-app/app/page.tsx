import { Navbar } from '../components/navbar'
import { UebungCard } from '../components/uebung-card'

export default function Home() {
  const uebungen = [
    { title: "Artikel", description: "Üben Sie den richtigen Gebrauch von der, die, das", link: "/uebungen/artikel" },
    { title: "Verbkonjugation", description: "Trainieren Sie die Konjugation deutscher Verben", link: "/uebungen/verbkonjugation" },
    { title: "Rechtschreibung", description: "Verbessern Sie Ihre deutsche Rechtschreibung", link: "/uebungen/rechtschreibung" },
    { title: "Satzbau", description: "Lernen Sie die korrekte Wortstellung im Satz", link: "/uebungen/satzbau" },
    { title: "Präpositionen", description: "Üben Sie den richtigen Gebrauch von Präpositionen", link: "/uebungen/praepositionen" },
    { title: "Groß- und Kleinschreibung", description: "Lernen Sie die Regeln der Groß- und Kleinschreibung", link: "/uebungen/gross-kleinschreibung" },
  ]

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Willkommen zur Deutschen Lernplattform</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {uebungen.map((uebung, index) => (
            <UebungCard key={index} {...uebung} />
          ))}
        </div>
      </main>
    </div>
  )
}

