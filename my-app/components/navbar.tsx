import Link from 'next/link'

export function Navbar() {
  return (
    <nav className="bg-slate-800 text-white p-4">
      <ul className="flex space-x-4">
        <li><Link href="/" className="hover:text-yellow-300">Startseite</Link></li>
        <li><Link href="/uebungen" className="hover:text-yellow-300">Übungen</Link></li>
        <li><Link href="/fortschritt" className="hover:text-yellow-300">Mein Fortschritt</Link></li>
      </ul>
    </nav>
  )
}

