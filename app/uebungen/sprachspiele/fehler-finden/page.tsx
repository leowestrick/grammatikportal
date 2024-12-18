import { Navbar } from '../../../../components/navbar'
import { FehlerFindenSpiel } from '../../../../components/fehler-finden-spiel'

export default function FehlerFindenPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Fehler finden</h1>
        <p className="text-center mb-8">
          Finde und korrigiere die Grammatik- und Rechtschreibfehler in den folgenden Sätzen.
        </p>
        <FehlerFindenSpiel />
      </main>
    </div>
  )
}

