import { Navbar } from '@/components/navbar'
import { DoppelteKonsonantenUebung } from '@/components/rechtschreibung/doppelte-konsonaten'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { YouTubeVideo } from '@/components/youtube-video'

export default function DoppelteKonsonantenPage() {
    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <main className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8 text-center">Konsonanten Übung</h1>
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>Erklärung: Einfache und doppelte Konsonanten</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>In der deutschen Sprache ist es wichtig zu wissen, wann man einfache und wann man doppelte Konsonanten verwendet. Hier sind einige Regeln dazu:</p>
                        <ul className="list-disc pl-5 mt-2">
                            <li>Nach einem kurzen, betonten Vokal folgt oft ein doppelter Konsonant (z.B. kommen, Wasser).</li>
                            <li>Nach einem langen Vokal oder Diphthong steht in der Regel ein einfacher Konsonant (z.B. Schule, Löffel).</li>
                            <li>Bei zusammengesetzten Wörtern kann es zu einer Verdoppelung kommen (z.B. Schifffahrt).</li>
                            <li>Bei der Bildung von Adjektiven aus Nomen mit -ig bleibt der einfache Konsonant (z.B. sonnig von Sonne).</li>
                            <li>Bei der Steigerung von Adjektiven, die auf -d, -t, -s oder -ß enden, wird der Konsonant verdoppelt (z.B. glatt - glatter).</li>
                        </ul>
                        <p className="mt-4">In der folgenden Übung kannst du dein Wissen über einfache und doppelte Konsonanten testen. Klicke einfach auf die richtige Schreibweise des Wortes.</p>
                    </CardContent>
                </Card>
                <YouTubeVideo
                    videoId="Oj_0YBbDQNw"
                    title="Doppelte Konsonanten Erklärung"
                />
                <DoppelteKonsonantenUebung />
            </main>
        </div>
    )
}

