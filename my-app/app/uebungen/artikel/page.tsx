import { Navbar } from '../../../components/navbar'
import { ArtikelUebung } from '../../../components/artikel-uebung'

export default function ArtikelUebungPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Artikel-Übung</h1>
        <p className="text-center mb-8">
          Wähle den richtigen Artikel (der, die, das) für jedes Substantiv.
        </p>
        <ArtikelUebung />
      </main>
    </div>
  )
}

