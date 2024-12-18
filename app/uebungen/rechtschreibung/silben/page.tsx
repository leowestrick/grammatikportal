import { Navbar } from '../../../../components/navbar'
import { SilbenUebung } from '../../../../components/rechtschreibung/silben-uebung'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function SilbenPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Silbentrennung</h1>
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Erklärung: Silbentrennung</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Silben sind die kleinsten Sprecheinheiten eines Wortes. Die Silbentrennung folgt bestimmten Regeln:</p>
            <ul className="list-disc pl-5 mt-2">
              <li>Jede Silbe enthält in der Regel einen Vokal (a, e, i, o, u) oder Diphthong (ei, au, eu).</li>
              <li>Einzelne Konsonanten zwischen zwei Vokalen gehören zur folgenden Silbe.</li>
              <li>Bei mehreren Konsonanten wird meist nach dem ersten Konsonanten getrennt.</li>
              <li>Zusammengesetzte Wörter werden an der Wortfuge getrennt.</li>
            </ul>
            <p className="mt-4">Die korrekte Silbentrennung ist wichtig für das Lesen und Schreiben, besonders beim Trennen von Wörtern am Zeilenende.</p>
          </CardContent>
        </Card>
        <SilbenUebung />
      </main>
    </div>
  )
}

