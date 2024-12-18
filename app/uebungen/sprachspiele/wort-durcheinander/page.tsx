import { Navbar } from '../../../../components/navbar'
import { WortDurcheinanderSpiel } from '../../../../components/wort-durcheinander-spiel'

export default function WortDurcheinanderPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Wort-Durcheinander</h1>
        <p className="text-center mb-8">
          Entwirre die durcheinander geratenen Wörter. Tipp: Achte auf die Hinweise!
        </p>
        <WortDurcheinanderSpiel />
      </main>
    </div>
  )
}

