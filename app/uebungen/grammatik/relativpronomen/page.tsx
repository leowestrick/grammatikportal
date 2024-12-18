import { Navbar } from '../../../../components/navbar'
import { RelativpronomenUebung } from '../../../../components/grammatik/relativpronomen-uebung'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { YouTubeVideo } from '../../../../components/youtube-video'

export default function RelativpronomenPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Relativpronomen</h1>
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Erklärung: Relativpronomen</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Relativpronomen werden verwendet, um Nebensätze einzuleiten, die sich auf ein Nomen oder Pronomen im Hauptsatz beziehen. Sie passen sich in Genus und Numerus dem Bezugswort an, ihr Kasus wird jedoch durch ihre Funktion im Relativsatz bestimmt.</p>
            <ul className="list-disc pl-5 mt-2">
              <li><strong>der, die, das:</strong> für Menschen und Dinge</li>
              <li><strong>welcher, welche, welches:</strong> Alternative zu der, die, das (weniger gebräuchlich)</li>
              <li><strong>wer, was:</strong> für unbestimmte Bezugswörter</li>
              <li><strong>dessen, deren:</strong> für Genitiv-Beziehungen</li>
            </ul>
            <p className="mt-4">Die korrekte Verwendung von Relativpronomen ist wichtig für die Bildung komplexer Sätze und präzise Kommunikation.</p>
          </CardContent>
        </Card>
        <YouTubeVideo 
          videoId="1Pu2MWo_JOw"
          title="Relativpronomen Erklärung"
        />
        <RelativpronomenUebung />
      </main>
    </div>
  )
}

