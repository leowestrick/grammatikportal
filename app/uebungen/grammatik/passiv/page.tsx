import { Navbar } from '../../../../components/navbar'
import { PassivUebung } from '../../../../components/grammatik/passiv-uebung'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { YouTubeVideo } from '../../../../components/youtube-video'

export default function PassivPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Passiv</h1>
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Erklärung: Passiv</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Das Passiv wird verwendet, wenn die Handlung oder der Vorgang wichtiger ist als der Handelnde. Es wird gebildet mit einer Form von "werden" und dem Partizip II des Hauptverbs.</p>
            <ul className="list-disc pl-5 mt-2">
              <li><strong>Präsens Passiv:</strong> werden + Partizip II</li>
              <li><strong>Präteritum Passiv:</strong> wurden + Partizip II</li>
              <li><strong>Perfekt Passiv:</strong> sind + Partizip II + worden</li>
              <li><strong>Plusquamperfekt Passiv:</strong> waren + Partizip II + worden</li>
              <li><strong>Futur I Passiv:</strong> werden + Partizip II + werden</li>
            </ul>
            <p className="mt-4">Bei der Umwandlung vom Aktiv ins Passiv wird das Objekt des Aktivsatzes zum Subjekt des Passivsatzes, und das Subjekt des Aktivsatzes kann mit "von" oder "durch" hinzugefügt werden.</p>
          </CardContent>
        </Card>
        <YouTubeVideo 
          videoId="cGhL0XM9Omo"
          title="Passiv Erklärung"
        />
        <PassivUebung />
      </main>
    </div>
  )
}

