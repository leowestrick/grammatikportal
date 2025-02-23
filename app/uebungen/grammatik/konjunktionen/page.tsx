import { Navbar } from '@/components/navbar'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { YouTubeVideo } from '@/components/youtube-video'

export default function KonjunktionenPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center mt-10">Konjunktionen und Nebensätze</h1>
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Erklärung: Konjunktionen und Nebensätze</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Konjunktionen verbinden Wörter, Satzteile oder Sätze miteinander. In Nebensätzen beeinflussen sie die
              Wortstellung.</p>
            <ul className="list-disc pl-5 mt-2">
              <li><strong>Nebenordnende Konjunktionen:</strong> und, aber, oder, denn (keine Änderung der Wortstellung)
              </li>
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
            <YouTubeVideo
                videoId="96FAXfWbtcI"
                title="Konjunktionen und Nebensätze Erklärung"
            />
          </CardContent>
        </Card>
        <div className="text-center mt-8">
          <a
              href="./konjunktionen/uebung"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Zur Übung
          </a>
        </div>
      </main>
    </div>
  )
}

