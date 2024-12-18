'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="text-xl font-bold text-gray-800">DeutschLernen</Link>
          <ul className="flex space-x-6">
            <motion.li whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/" className="text-gray-600 hover:text-gray-800 transition-colors">Startseite</Link>
            </motion.li>
            <motion.li whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/uebungen" className="text-gray-600 hover:text-gray-800 transition-colors">Übungen</Link>
            </motion.li>
            <motion.li whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/fortschritt" className="text-gray-600 hover:text-gray-800 transition-colors">Mein Fortschritt</Link>
            </motion.li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

