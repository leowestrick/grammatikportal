import { Navbar } from '../../../../components/navbar'
import { LueckentextSpiel } from '../../../../components/lueckentext-spiel'

export default function LueckentextPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Lückentext</h1>
        <p className="text-center mb-8">
          Vervollständige die Sätze mit den richtigen Wörtern.
        </p>
        <LueckentextSpiel />
      </main>
    </div>
  )
}

