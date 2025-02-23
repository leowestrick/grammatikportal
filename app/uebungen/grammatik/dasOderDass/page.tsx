import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {YouTubeVideo} from "@/components/youtube-video";

export default function DassVsDasPage() {
    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <main className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8 text-center mt-10">Dass vs. Das</h1>
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>Erklärung: Dass vs. Das</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>Die Unterscheidung zwischen "dass" und "das" ist wichtig für die korrekte deutsche
                            Grammatik:</p>
                        <ul className="list-disc pl-5 mt-2">
                            <li>
                                <strong>dass:</strong>
                                <ul className="list-circle pl-5 mt-1">
                                    <li>Ist eine Konjunktion</li>
                                    <li>Leitet Nebensätze ein</li>
                                    <li>Kann nicht durch "dieses" oder "welches" ersetzt werden</li>
                                    <li>
                                        Beispiel: Ich hoffe, <em>dass</em> du kommst.
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <strong>das:</strong>
                                <ul className="list-circle pl-5 mt-1">
                                    <li>Kann ein Artikel, Relativpronomen oder Demonstrativpronomen sein</li>
                                    <li>Bezieht sich auf ein Nomen oder steht für ein Nomen</li>
                                    <li>Kann oft durch "dieses" oder "welches" ersetzt werden</li>
                                    <li>
                                        Beispiel: <em>Das</em> Buch ist interessant.
                                    </li>
                                </ul>
                            </li>
                        </ul>
                        <p className="mt-4">
                            Tipp: Wenn Sie "dass" durch "welches" ersetzen können und der Satz noch Sinn ergibt, dann
                            ist "das"
                            richtig. Wenn nicht, verwenden Sie "dass".
                        </p>
                        <YouTubeVideo
                            videoId="yUIcf2-Bxyc"
                            title="Dass oder das Erklärung"
                        />
                    </CardContent>
                </Card>
                <div className="text-center mt-8">
                    <a
                        href="./dasOderDass/uebung"
                        className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Zur Übung
                    </a>
                </div>
            </main>
        </div>
    )
}

