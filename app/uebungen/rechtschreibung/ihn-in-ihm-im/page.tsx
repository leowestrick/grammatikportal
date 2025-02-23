import { Navbar } from '@/components/navbar'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function IhnInIhmImPage() {
    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <main className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8 text-center mt-10">ihn/in und ihm/im</h1>
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>Erklärung: ihn/in und ihm/im</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>Diese Wörter werden oft verwechselt. Hier ist eine kurze Erklärung:</p>
                        <ul className="list-disc pl-5 mt-2">
                            <li><strong>ihn:</strong> Akkusativ-Pronomen für maskuline Nomen (z.B. "Ich sehe ihn.")</li>
                            <li><strong>in:</strong> Präposition für Ort oder Richtung (z.B. "Ich gehe in die Schule.")
                            </li>
                            <li><strong>ihm:</strong> Dativ-Pronomen für maskuline und neutrale Nomen (z.B. "Ich helfe
                                ihm.")
                            </li>
                            <li><strong>im:</strong> Kontraktion von "in dem" (z.B. "Ich bin im Haus.")</li>
                        </ul>
                        <p className="mt-4">In der folgenden Übung kannst du die richtige Verwendung dieser Wörter
                            üben.</p>
                    </CardContent>
                </Card>
                <div className="text-center mt-8">
                    <a
                        href="./ihn-in-ihm-im/uebung"
                        className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Zur Übung
                    </a>
                </div>
            </main>
        </div>
    )
}

