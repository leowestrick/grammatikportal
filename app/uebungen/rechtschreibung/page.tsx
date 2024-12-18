import { Navbar } from '@/components/navbar'
import { RechtschreibUebung } from '@/components/rechtschreib-uebung'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { YouTubeVideo } from '@/components/youtube-video'

export default function RechtschreibungPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Rechtschreibung</h1>
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Wichtige Rechtschreibregeln im Deutschen</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              <li>Substantive werden immer großgeschrieben (z.B. der Tisch, die Freundschaft).</li>
              <li>Nach einem Punkt, Fragezeichen oder Ausrufezeichen am Satzende folgt ein Großbuchstabe.</li>
              <li>Das Wort "dass" (Konjunktion) wird mit "ss" geschrieben, "das" (Artikel/Pronomen) mit einem "s".</li>
              <li>Bei zusammengesetzten Wörtern wird in der Regel kein Bindestrich verwendet (z.B. Haustür, Apfelbaum).</li>
              <li>Nach kurz gesprochenem Vokal folgt oft ein Doppelkonsonant (z.B. kommen, Sonne).</li>
              <li>Nach lang gesprochenem Vokal steht meist nur ein Konsonant (z.B. Schule, Boden).</li>
              <li>Wörter mit "ie" werden meist mit langem "i" gesprochen (z.B. Liebe, fliegen).</li>
              <li>Fremdwörter behalten oft ihre originale Schreibweise (z.B. Computer, Yoga).</li>
            </ul>
          </CardContent>
        </Card>
        <YouTubeVideo 
          videoId="Iu7sKYZ_Eo0"
          title="Deutsche Rechtschreibung Erklärung"
        />
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Rechtschreibübung mit verschiedenen Schwierigkeitsgraden</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Wähle einen Schwierigkeitsgrad aus und beginne mit der Übung. Du kannst jederzeit zwischen den Schwierigkeitsgraden wechseln.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Anfänger:</strong> Einfache Sätze mit Fokus auf Großschreibung von Substantiven und Satzanfängen.</li>
              <li><strong>Fortgeschritten:</strong> Komplexere Sätze mit Fokus auf "dass" vs. "das", zusammengesetzte Substantive und spezielle Großschreibungsregeln.</li>
              <li><strong>Experte:</strong> Anspruchsvolle Sätze mit mehreren Rechtschreibherausforderungen, einschließlich Kommasetzung und komplexer Grammatik.</li>
            </ul>
          </CardContent>
        </Card>
        <RechtschreibUebung />
      </main>
    </div>
  )
}

