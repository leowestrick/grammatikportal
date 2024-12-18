import { Navbar } from '../../../../components/navbar'
import { ZeitformenUebung } from '../../../../components/grammatik/zeitformen-uebung'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { YouTubeVideo } from '../../../../components/youtube-video'

export default function ZeitformenPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Zeitformen des Verbs</h1>
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Erklärung: Zeitformen des Verbs</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Im Deutschen gibt es sechs Hauptzeitformen:</p>
            <ul className="list-disc pl-5 mt-2">
              <li><strong>Präsens:</strong> Beschreibt gegenwärtige Handlungen oder Zustände (z.B. Ich gehe)</li>
              <li><strong>Präteritum:</strong> Erzählzeit der Vergangenheit (z.B. Ich ging)</li>
              <li><strong>Perfekt:</strong> Beschreibt abgeschlossene Handlungen (z.B. Ich bin gegangen)</li>
              <li><strong>Plusquamperfekt:</strong> Beschreibt Handlungen, die vor einer anderen Vergangenheit stattfanden (z.B. Ich war gegangen)</li>
              <li><strong>Futur I:</strong> Beschreibt zukünftige Handlungen (z.B. Ich werde gehen)</li>
              <li><strong>Futur II:</strong> Beschreibt in der Zukunft abgeschlossene Handlungen (z.B. Ich werde gegangen sein)</li>
            </ul>
            <p className="mt-4">Die korrekte Verwendung der Zeitformen ist wichtig für die präzise Kommunikation und das Verständnis von Handlungsabläufen.</p>
          </CardContent>
        </Card>
        <YouTubeVideo 
          videoId="r9-OrN1BFj4"
          title="Zeitformen des Verbs Erklärung"
        />
        <ZeitformenUebung />
      </main>
    </div>
  )
}

