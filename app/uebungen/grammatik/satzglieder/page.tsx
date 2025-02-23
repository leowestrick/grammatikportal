import { Navbar } from '@/components/navbar'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { YouTubeVideo } from '@/components/youtube-video'

export default function SatzgliederPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center mt-10">Satzglieder</h1>
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Erklärung: Satzglieder</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Satzglieder sind die Bausteine eines Satzes. Die wichtigsten Satzglieder sind:</p>
            <ul className="list-disc pl-5 mt-2">
              <li><strong>Subjekt:</strong> Der Handlungsträger (Wer oder was?)</li>
              <li><strong>Prädikat:</strong> Die Handlung oder der Zustand (Was geschieht?)</li>
              <li><strong>Objekt:</strong> Der Gegenstand der Handlung (Wen oder was?)</li>
              <li><strong>Adverbiale Bestimmung:</strong> Nähere Umstände (Wo, wann, wie, warum?)</li>
              <li><strong>Attribut:</strong> Nähere Bestimmung zu einem Nomen oder Pronomen</li>
            </ul>
            <p className="mt-4">Die Kenntnis der Satzglieder hilft beim Verständnis der Satzstruktur und bei der
              korrekten Satzbildung.</p>
            <YouTubeVideo
                videoId="Qb5ZuwTZlXY"
                title="Satzglieder Erklärung"
            />
          </CardContent>
        </Card>
        <div className="text-center mt-8">
          <a
              href="./satzglieder/uebung"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Zur Übung
          </a>
        </div>
      </main>
    </div>
  )
}

