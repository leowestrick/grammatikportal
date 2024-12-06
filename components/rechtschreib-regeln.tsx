import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"

interface RechtschreibRegelnProps {
  onWeiterClick: () => void;
}

export function RechtschreibRegeln({ onWeiterClick }: RechtschreibRegelnProps) {
  return (
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
      <CardFooter>
        <Button onClick={onWeiterClick} className="w-full">Weiter zur Übung</Button>
      </CardFooter>
    </Card>
  )
}

