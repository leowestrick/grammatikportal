import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"

interface ArtikelRegelnProps {
  onWeiterClick: () => void;
}

export function ArtikelRegeln({ onWeiterClick }: ArtikelRegelnProps) {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Regeln für Artikel im Deutschen</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="list-disc pl-5 space-y-2">
          <li>Im Deutschen gibt es drei Artikel: <strong>der</strong> (maskulin), <strong>die</strong> (feminin), und <strong>das</strong> (neutral).</li>
          <li>Das Geschlecht eines Nomens muss meistens auswendig gelernt werden, es gibt aber einige Hinweise:
            <ul className="list-circle pl-5 mt-2">
              <li>Männliche Personen und Berufe sind meist maskulin (der Mann, der Lehrer)</li>
              <li>Weibliche Personen und Berufe sind meist feminin (die Frau, die Lehrerin)</li>
              <li>Wörter, die auf -ung, -heit, -keit enden, sind feminin (die Zeitung, die Freiheit, die Möglichkeit)</li>
              <li>Wörter, die auf -chen oder -lein enden, sind neutral (das Mädchen, das Büchlein)</li>
            </ul>
          </li>
          <li>Im Plural wird immer der Artikel "die" verwendet, unabhängig vom Geschlecht im Singular.</li>
          <li>Artikel ändern sich je nach Fall (Nominativ, Akkusativ, Dativ, Genitiv) und stimmen mit dem Nomen überein.</li>
        </ul>
      </CardContent>
      <CardFooter>
        <Button disabled={!!feedback}  onClick={onWeiterClick} className="w-full">Weiter zur Übung</Button>
      </CardFooter>
    </Card>
  )
}

