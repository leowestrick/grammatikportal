import { Navbar } from '@/components/navbar'
import { UebungCard } from '@/components/uebung-card'

const grammatikUebungen = [
  { title: "Groß- & Kleinschreibung", description: "Üben Sie die Groß- & Kleinschreibung", link: "/uebungen/rechtschreibung/gross-klein" },
  { title: "Dehnungs-h", description: "Lernen Sie die verschiedenen Zeitformen", link: "/uebungen/rechtschreibung/dehnungs-h" },
  { title: "Doppelte Konsonanten", description: "Doppelte Konsonanten", link: "/uebungen/rechtschreibung/doppelte-konsonanten" },
  { title: "s, ss oder ß", description: "Wann benutzt man welches s", link: "/uebungen/rechtschreibung/s-ss-sz" },
  { title: "ihn oder in, ihm oder im", description: "Wann benutzt man ihn,in,ihm oder im", link: "/uebungen/rechtschreibung/ihn-in-ihm-im" },
]

export default function GrammatikPage() {
  return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pb-20">
        <Navbar/>
        <div className="relative isolate px-6 pt-14 lg:px-8 mx-30">
          <h1 className="text-4xl font-bold mb-12 text-center text-gray-800 mt-10">Rechtschreibübungen</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {grammatikUebungen.map((uebung, index) => (
                <UebungCard key={index} {...uebung} />
            ))}
          </div>
        </div>
      </div>
  )
}

