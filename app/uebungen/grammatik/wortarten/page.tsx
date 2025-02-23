import { Navbar } from '@/components/navbar'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { YouTubeVideo } from '@/components/youtube-video'

export default function WortartenPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center mt-10">Wortarten</h1>
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Erklärung: Wortarten</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Wortarten sind Kategorien, in die Wörter basierend auf ihrer Funktion im Satz eingeteilt werden. Die
              wichtigsten Wortarten im Deutschen sind:</p>
            <ul className="list-disc pl-5 mt-2">
              <li><strong>Nomen (Substantive):</strong> Bezeichnen Dinge, Personen oder Konzepte (z.B. Tisch, Frau,
                Freiheit)
              </li>
              <li><strong>Verben:</strong> Drücken Handlungen oder Zustände aus (z.B. laufen, sein, denken)</li>
              <li><strong>Adjektive:</strong> Beschreiben Eigenschaften (z.B. groß, schön, intelligent)</li>
              <li><strong>Adverbien:</strong> Modifizieren Verben, Adjektive oder andere Adverbien (z.B. schnell, sehr,
                dort)
              </li>
              <li><strong>Pronomen:</strong> Ersetzen Nomen (z.B. ich, sie, wer)</li>
              <li><strong>Präpositionen:</strong> Zeigen Beziehungen zwischen Wörtern an (z.B. in, auf, mit)</li>
              <li><strong>Konjunktionen:</strong> Verbinden Wörter oder Satzteile (z.B. und, aber, weil)</li>
              <li><strong>Artikel:</strong> Begleiten Nomen und zeigen Geschlecht, Zahl und Fall an (z.B. der, die, das)
              </li>
            </ul>
            <p className="mt-4">Die Kenntnis der Wortarten ist wichtig für das Verständnis der Grammatik und hilft bei
              der korrekten Satzbildung.</p>
            <YouTubeVideo
                videoId="eBEeFYQ6YIE"
                title="Wortarten Erklärung"
            />
          </CardContent>
        </Card>

        <div className="text-center mt-8">
          <a
              href="./wortarten/uebung"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Zur Übung
          </a>
        </div>

      </div>
    </div>
  )
}

