'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {Bars3Icon, XMarkIcon} from "@heroicons/react/24/outline";
import {Dialog, DialogPanel} from "@headlessui/react";
import {useState} from "react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  return (
      <header className="absolute inset-x-0 top-0 z-50">
        <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">DeutschLernPlattform</span>
              DeutscheLernPlattform
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="size-6"/>
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            <ul className="flex space-x-6">
              <motion.li whileHover={{scale: 1.05}} whileTap={{scale: 0.95}}>
                <Link href="/" className="text-gray-600 hover:text-gray-800 transition-colors">Startseite</Link>
              </motion.li>
              <motion.li whileHover={{scale: 1.05}} whileTap={{scale: 0.95}}>
                <Link href="/uebungen/grammatik" className="text-gray-600 hover:text-gray-800 transition-colors">Grammatik</Link>
              </motion.li>
              <motion.li whileHover={{scale: 1.05}} whileTap={{scale: 0.95}}>
                <Link href="/uebungen/rechtschreibung" className="text-gray-600 hover:text-gray-800 transition-colors">Rechtschreibung</Link>
              </motion.li>
            </ul>
          </div>
          {/*<div className="hidden lg:flex lg:flex-1 lg:justify-end">*/}
          {/*  <a href="#" className="text-sm/6 font-semibold text-gray-900">*/}
          {/*    Log in <span aria-hidden="true">&rarr;</span>*/}
          {/*  </a>*/}
          {/*</div>*/}
        </nav>
        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
          <div className="fixed inset-0 z-50"/>
          <DialogPanel
              className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <Image
                    alt=""
                    src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                    className="h-8 w-auto"
                />
              </a>
              <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6"/>
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  <ul className="flex space-x-6">
                    <motion.li whileHover={{scale: 1.05}} whileTap={{scale: 0.95}}>
                      <Link href="/" className="text-gray-600 hover:text-gray-800 transition-colors">Startseite</Link>
                    </motion.li>
                    <motion.li whileHover={{scale: 1.05}} whileTap={{scale: 0.95}}>
                      <Link href="/uebungen/grammatik"
                            className="text-gray-600 hover:text-gray-800 transition-colors">Grammatik</Link>
                    </motion.li>
                    <motion.li whileHover={{scale: 1.05}} whileTap={{scale: 0.95}}>
                      <Link href="/uebungen/rechtschreibung" className="text-gray-600 hover:text-gray-800 transition-colors">Rechtschreibung</Link>
                    </motion.li>
                  </ul>
                </div>
                <div className="py-6">
                  <a
                      href="#"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    Log in
                  </a>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>
  )
}

