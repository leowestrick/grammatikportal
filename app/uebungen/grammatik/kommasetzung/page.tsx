import { Navbar } from '../../../../components/navbar'
import { KommasetzungSpiel } from '../../../../components/grammatik/kommasetzung-uebung'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { YouTubeVideo } from '../../../../components/youtube-video'

export default function KommasetzungPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Kommasetzung-Übung</h1>
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Regeln für die Kommasetzung im Deutschen</CardTitle>
            <CardDescription>Hier sind einige wichtige Regeln für die Kommasetzung:</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              <li>Vor nebenordnenden Konjunktionen wie "und", "oder", "sowie" steht in der Regel kein Komma.</li>
              <li>Vor "sondern" und "aber" steht immer ein Komma.</li>
              <li>Zwischen Haupt- und Nebensätzen steht ein Komma.</li>
              <li>Vor Infinitivgruppen, die mit "zu", "um zu", "ohne zu", "statt zu" eingeleitet werden, steht meist ein Komma.</li>
              <li>Bei Aufzählungen werden die einzelnen Elemente durch Kommas getrennt.</li>
              <li>Eingeschobene Nebensätze oder Zusätze werden durch Kommas eingeschlossen.</li>
            </ul>
          </CardContent>
        </Card>
        <YouTubeVideo 
          videoId="pE6Yt_aUPqw"
          title="Kommasetzung Erklärung"
        />
        <p className="text-center mb-8">
          Setze die Kommas an den richtigen Stellen im Satz. Klicke dazu zwischen die Buchstaben.
        </p>
        <KommasetzungSpiel />
      </main>
    </div>
  )
}

