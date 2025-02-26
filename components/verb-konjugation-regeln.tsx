import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"

interface VerbKonjugationRegelnProps {
  onWeiterClick: () => void;
}

export function VerbKonjugationRegeln({ onWeiterClick }: VerbKonjugationRegelnProps) {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Regeln für Verbkonjugation im Deutschen</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="list-disc pl-5 space-y-2">
          <li>Die Grundform eines Verbs ist der Infinitiv (z.B. spielen, laufen).</li>
          <li>Um ein Verb zu konjugieren, entfernt man die Endung -en und fügt neue Endungen hinzu.</li>
          <li>Die Endungen im Präsens für regelmäßige Verben sind:
            <ul className="list-circle pl-5 mt-2">
              <li>ich: -e</li>
              <li>du: -st</li>
              <li>er/sie/es: -t</li>
              <li>wir: -en</li>
              <li>ihr: -t</li>
              <li>sie/Sie: -en</li>
            </ul>
          </li>
          <li>Einige Verben ändern den Stammvokal in der 2. und 3. Person Singular (du, er/sie/es).</li>
          <li>Unregelmäßige Verben wie "sein" und "haben" folgen eigenen Konjugationsmustern.</li>
          <li>Bei Verben, die auf -s, -ß, -z oder -tz enden, wird in der 2. Person Singular (du) nur ein -t angehängt.</li>
        </ul>
      </CardContent>
      <CardFooter>
        <Button disabled={!!feedback}  onClick={onWeiterClick} className="w-full">Weiter zur Übung</Button>
      </CardFooter>
    </Card>
  )
}

