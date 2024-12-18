import { Navbar } from '../../../../components/navbar'
import { SatzartenUebung } from '../../../../components/grammatik/satzarten-uebung'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { YouTubeVideo } from '../../../../components/youtube-video'

export default function SatzartenPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Satzarten und Satzzeichen</h1>
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Erklärung: Satzarten und Satzzeichen</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Es gibt verschiedene Satzarten im Deutschen, die jeweils mit einem bestimmten Satzzeichen enden:</p>
            <ul className="list-disc pl-5 mt-2">
              <li><strong>Aussagesatz:</strong> Endet mit einem Punkt (.) - Stellt eine Tatsache oder Meinung dar.</li>
              <li><strong>Fragesatz:</strong> Endet mit einem Fragezeichen (?) - Stellt eine Frage.</li>
              <li><strong>Aufforderungssatz:</strong> Endet mit einem Ausrufezeichen (!) - Drückt eine Bitte oder einen Befehl aus.</li>
              <li><strong>Wunschsatz:</strong> Endet meist mit einem Ausrufezeichen (!) - Drückt einen Wunsch aus.</li>
              <li><strong>Ausrufesatz:</strong> Endet mit einem Ausrufezeichen (!) - Drückt starke Gefühle oder Überraschung aus.</li>
            </ul>
            <p className="mt-4">Die richtige Verwendung von Satzarten und Satzzeichen ist wichtig für das Verständnis und die Betonung in der schriftlichen Kommunikation.</p>
          </CardContent>
        </Card>
        <YouTubeVideo 
          videoId="yZn8bZ6-Aqw"
          title="Satzarten und Satzzeichen Erklärung"
        />
        <SatzartenUebung />
      </main>
    </div>
  )
}

