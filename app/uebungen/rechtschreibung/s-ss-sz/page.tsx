import { Navbar } from '@/components/navbar'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { YouTubeVideo } from '@/components/youtube-video'

export default function SSZPage() {
    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <main className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8 text-center mt-10">s, ss oder ß</h1>
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>Erklärung: s, ss und ß</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>In der deutschen Rechtschreibung gibt es klare Regeln für die Verwendung von s, ss und ß:</p>
                        <ul className="list-disc pl-5 mt-2">
                            <li><strong>s:</strong> Wird verwendet für den stimmhaften s-Laut (wie in "Sonne") und am Wortanfang.</li>
                            <li><strong>ss:</strong> Steht nach einem kurzen Vokal (wie in "Wasser" oder "müssen").</li>
                            <li><strong>ß:</strong> Wird nach einem langen Vokal oder Diphthong verwendet (wie in "Straße" oder "heiß").</li>
                        </ul>
                        <p className="mt-4">Beachte auch:</p>
                        <ul className="list-disc pl-5 mt-2">
                            <li>Nach Diphthongen (ei, au, äu) steht immer ß, nie ss (z.B. "heiß", "außen").</li>
                            <li>Am Satzanfang wird "ß" zu "SS" (z.B. "Straße" wird zu "STRASSE").</li>
                            <li>In der Schweiz wird kein ß verwendet, sondern immer ss.</li>
                        </ul>
                        <p className="mt-4">In der folgenden Übung kannst du dein Wissen über s, ss und ß testen. Wähle für jede Lücke die richtige Option aus.</p>
                    </CardContent>
                </Card>
                <YouTubeVideo
                    videoId="cjxBIKOIys8"
                    title="s, ss und ß Erklärung"
                />
                <div className="text-center mt-8">
                    <a
                        href="./s-ss-sz/uebung"
                        className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Zur Übung
                    </a>
                </div>
            </main>
        </div>
    )
}

