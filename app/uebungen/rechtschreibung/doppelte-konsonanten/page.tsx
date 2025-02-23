import { Navbar } from '@/components/navbar'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { YouTubeVideo } from '@/components/youtube-video'

export default function DoppelteKonsonantenPage() {
    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <main className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8 text-center mt-10">Konsonanten</h1>
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
                        <YouTubeVideo
                            videoId="TGHqVyy0uEE"
                            title="Doppelte Konsonanten Erklärung"
                        />
                    </CardContent>
                </Card>
                <div className="text-center mt-8">
                    <a
                        href="./doppelte-konsonanten/uebung"
                        className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Zur Übung
                    </a>
                </div>
            </main>
        </div>
    )
}

