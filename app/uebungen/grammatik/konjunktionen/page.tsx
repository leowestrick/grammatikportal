import { Navbar } from '../../../../components/navbar'
import { KonjunktionenUebung } from '../../../../components/grammatik/konjunktionen-uebung'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { YouTubeVideo } from '../../../../components/youtube-video'

export default function KonjunktionenPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Konjunktionen und Nebensätze</h1>
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Erklärung: Konjunktionen und Nebensätze</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Konjunktionen verbinden Wörter, Satzteile oder Sätze miteinander. In Nebensätzen beeinflussen sie die Wortstellung.</p>
            <ul className="list-disc pl-5 mt-2">
              <li><strong>Nebenordnende Konjunktionen:</strong> und, aber, oder, denn (keine Änderung der Wortstellung)</li>
              <li><strong>Unterordnende Konjunktionen:</strong> weil, dass, wenn, ob (Verb am Ende des Nebensatzes)</li>
              <li><strong>Beispiele für unterordnende Konjunktionen:</strong>
                <ul className="list-circle pl-5 mt-1">
                  <li><strong>weil, da:</strong> Grund</li>
                  <li><strong>wenn, falls:</strong> Bedingung</li>
                  <li><strong>obwohl, trotzdem:</strong> Gegensatz</li>
                  <li><strong>damit, um ... zu:</strong> Zweck</li>
                </ul>
              </li>
            </ul>
            <p className="mt-4">Die richtige Verwendung von Konjunktionen ist entscheidend für die Struktur und Logik komplexer Sätze.</p>
          </CardContent>
        </Card>
        <YouTubeVideo 
          videoId="S9ugVvCNYUI"
          title="Konjunktionen und Nebensätze Erklärung"
        />
        <KonjunktionenUebung />
      </main>
    </div>
  )
}

