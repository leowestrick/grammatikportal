import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"

interface SatzbauRegelnProps {
  onWeiterClick: () => void;
}

export function SatzbauRegeln({ onWeiterClick }: SatzbauRegelnProps) {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Regeln für den deutschen Satzbau</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="list-disc pl-5 space-y-2">
          <li>In einem Hauptsatz steht das Verb immer an zweiter Stelle.</li>
          <li>Das Subjekt steht meist am Anfang des Satzes, kann aber auch an anderer Stelle stehen.</li>
          <li>In Fragesätzen steht das Verb an erster Stelle, gefolgt vom Subjekt.</li>
          <li>Zeitangaben stehen oft am Anfang oder am Ende des Satzes.</li>
          <li>Achte auf die korrekte Groß- und Kleinschreibung sowie die Zeichensetzung.</li>
        </ul>
      </CardContent>
      <CardFooter>
        <Button onClick={onWeiterClick} className="w-full">Weiter zur Übung</Button>
      </CardFooter>
    </Card>
  )
}

