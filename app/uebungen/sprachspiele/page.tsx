import { Navbar } from '../../../components/navbar'
import { UebungCard } from '../../../components/uebung-card'

const sprachspiele = [
  { title: "Wort-Durcheinander", description: "Entwirre durcheinander geratene Wörter", link: "/uebungen/sprachspiele/wort-durcheinander" },
  { title: "Lückentext", description: "Vervollständige Sätze mit den richtigen Wörtern", link: "/uebungen/sprachspiele/lueckentext" },
  { title: "Fehler finden", description: "Finde und korrigiere Grammatik- und Rechtschreibfehler", link: "/uebungen/sprachspiele/fehler-finden" },
]

export default function SprachspielePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-12 text-center text-gray-800">Sprachspiele</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sprachspiele.map((spiel, index) => (
            <UebungCard key={index} {...spiel} />
          ))}
        </div>
      </main>
    </div>
  )
}

