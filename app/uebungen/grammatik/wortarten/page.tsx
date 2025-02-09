import { Navbar } from '../../../../components/navbar'
import { WortartenUebung } from '../../../../components/grammatik/wortarten-uebung'
import { WortartenInteraktiv } from '../../../../components/grammatik/wortarten-interaktiv'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { YouTubeVideo } from '../../../../components/youtube-video'

export default function WortartenPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Wortarten</h1>
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Erklärung: Wortarten</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Wortarten sind Kategorien, in die Wörter basierend auf ihrer Funktion im Satz eingeteilt werden. Die wichtigsten Wortarten im Deutschen sind:</p>
            <ul className="list-disc pl-5 mt-2">
              <li><strong>Nomen (Substantive):</strong> Bezeichnen Dinge, Personen oder Konzepte (z.B. Tisch, Frau, Freiheit)</li>
              <li><strong>Verben:</strong> Drücken Handlungen oder Zustände aus (z.B. laufen, sein, denken)</li>
              <li><strong>Adjektive:</strong> Beschreiben Eigenschaften (z.B. groß, schön, intelligent)</li>
              <li><strong>Adverbien:</strong> Modifizieren Verben, Adjektive oder andere Adverbien (z.B. schnell, sehr, dort)</li>
              <li><strong>Pronomen:</strong> Ersetzen Nomen (z.B. ich, sie, wer)</li>
              <li><strong>Präpositionen:</strong> Zeigen Beziehungen zwischen Wörtern an (z.B. in, auf, mit)</li>
              <li><strong>Konjunktionen:</strong> Verbinden Wörter oder Satzteile (z.B. und, aber, weil)</li>
              <li><strong>Artikel:</strong> Begleiten Nomen und zeigen Geschlecht, Zahl und Fall an (z.B. der, die, das)</li>
            </ul>
            <p className="mt-4">Die Kenntnis der Wortarten ist wichtig für das Verständnis der Grammatik und hilft bei der korrekten Satzbildung.</p>
          </CardContent>
        </Card>
        <YouTubeVideo 
          videoId="Pz9oc8vOjZM"
          title="Wortarten Erklärung"
        />
        <Tabs defaultValue="level1">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="level1">Level 1</TabsTrigger>
            <TabsTrigger value="level2">Level 2</TabsTrigger>
          </TabsList>
          <TabsContent value="level1">
            <WortartenUebung />
          </TabsContent>
          <TabsContent value="level2">
            <WortartenInteraktiv />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

