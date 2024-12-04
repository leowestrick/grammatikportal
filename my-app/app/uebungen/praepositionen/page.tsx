import { Navbar } from '../../../components/navbar'
import { PraepositionUebung } from '../../../components/praeposition-uebung'

export default function PraepositionUebungPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Präpositions-Übung</h1>
        <p className="text-center mb-8">
          Wähle die richtige Präposition für jeden Satz. Du erhältst sofort Feedback zu deiner Antwort.
        </p>
        <PraepositionUebung />
      </main>
    </div>
  )
}

