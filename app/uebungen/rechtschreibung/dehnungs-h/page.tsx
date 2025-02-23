import { Navbar } from '@/components/navbar'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { YouTubeVideo } from '@/components/youtube-video'

export default function DehnungsHPage() {
    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <main className="container mx-auto px-4 py-8 pt-20">
                <h1 className="text-3xl font-bold mb-8 text-center mt-10">Dehnungs-h</h1>
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>Erklärung: Das Dehnungs-h</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>Das Dehnungs-h ist ein stummes h, das nach einem Vokal steht und diesen verlängert (dehnt).
                            Es gibt einige Regeln, die helfen zu erkennen, wann ein Dehnungs-h verwendet wird:</p>
                        <ul className="list-disc pl-5 mt-2">
                            <li>Es steht meist vor l, m, n oder r (z.B. Stuhl, zahm, Bahn, Rohr).</li>
                            <li>Es kommt nur in betonten Silben vor.</li>
                            <li>Es steht nie vor oder nach einem Doppelvokal (z.B. kein "Baahn" oder "Boohn").</li>
                            <li>Es wird nicht verwendet, wenn der Vokal bereits durch einen Doppelvokal oder ein
                                folgendes e gedehnt wird (z.B. Boot, Beet).
                            </li>
                            <li>Viele Wörter mit Dehnungs-h muss man sich einfach merken, da es Ausnahmen gibt.</li>
                        </ul>
                        <p className="mt-4">Übung macht den Meister! Je mehr du übst, desto besser wirst du im Umgang
                            mit dem Dehnungs-h.</p>
                        <YouTubeVideo
                            videoId="WUVG57uYpxQ"
                            title="Dehnungs-h Erklärung"
                        />
                    </CardContent>
                </Card>

                <div className="text-center mt-8">
                    <a
                        href="./dehnungs-h/uebung"
                        className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Zur Übung
                    </a>
                </div>
            </main>
        </div>
    )
}