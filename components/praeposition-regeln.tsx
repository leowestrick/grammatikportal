import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"

interface PraepositionRegelnProps {
  onWeiterClick: () => void;
}

export function PraepositionRegeln({ onWeiterClick }: PraepositionRegelnProps) {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Regeln für Präpositionen</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="list-disc pl-5 space-y-2">
          <li>Präpositionen sind unveränderliche Wörter, die Beziehungen zwischen anderen Wörtern im Satz ausdrücken.</li>
          <li>Sie stehen meist vor einem Nomen oder Pronomen und bestimmen dessen Fall (Akkusativ, Dativ oder Genitiv).</li>
          <li>Einige häufig verwendete Präpositionen sind:
            <ul className="list-circle pl-5 mt-2">
              <li><strong>in</strong> (in der Stadt, ins Kino)</li>
              <li><strong>auf</strong> (auf dem Tisch, aufs Dach)</li>
              <li><strong>mit</strong> (mit dem Auto, mit Freunden)</li>
              <li><strong>zu</strong> (zum Bahnhof, zur Schule)</li>
              <li><strong>für</strong> (für dich, für die Prüfung)</li>
            </ul>
          </li>
          <li>Manche Präpositionen können mit dem nachfolgenden Artikel verschmelzen, z.B. "in dem" wird zu "im", "zu dem" wird zu "zum".</li>
          <li>Die Wahl der richtigen Präposition hängt oft vom Kontext und der Bedeutung des Satzes ab.</li>
        </ul>
      </CardContent>
      <CardFooter>
        <Button disabled={!!feedback}  onClick={onWeiterClick} className="w-full">Weiter zur Übung</Button>
      </CardFooter>
    </Card>
  )
}

