'use client'

import { Navbar } from '@/components/navbar';

export default function Example() {
  return (
      <div className="bg-white">

        <Navbar></Navbar>

        <div className="relative isolate px-6 pt-14 lg:px-8">
          <div
              aria-hidden="true"
              className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          >
            <div
                style={{
                  clipPath:
                      'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                }}
                className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            />
          </div>
          <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
            <div className="text-center">
              <h1 className="text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
                Deine Deutsch Lernplattform
              </h1>
              <p className="mt-8 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
                Durch unsere Übungsaufgaben kannst du mit Spaß deine Grammatik und Rechtschreibung verbessern.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <a
                    href="#"
                    className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Grammatik Übungen
                </a>
                <a
                    href="#"
                    className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Rechtschreibübungen
                </a>
              </div>
            </div>
          </div>
          <div
              aria-hidden="true"
              className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          >
            <div
                style={{
                  clipPath:
                      'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                }}
                className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            />
          </div>
        </div>
        {statsUsers()}
        {newsletterSection()}
        {faqSection()}
      </div>
  )
}
const stats = [
  { id: 1, name: 'Übungsaufgaben', value: '20' },
  { id: 2, name: 'Monatliche Benutzer', value: '12' },
  { id: 3, name: 'Entwicklungszeit', value: '800 h' },
]

export function statsUsers() {
  return (
      <div className="bg-white sm:pb-32">
        <div className="text-center mb-10">
            <h2 className="text-balance text-4xl font-semibold tracking-tight text-gray-900">
              Entwickelt von Schülern
            </h2>
          </div>
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
              {stats.map((stat) => (
                  <div key={stat.id} className="mx-auto flex max-w-xs flex-col gap-y-4">
                    <dt className="text-base/7 text-gray-600">{stat.name}</dt>
                    <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                      {stat.value}
                    </dd>
                  </div>
              ))}
            </dl>
          </div>
        </div>
        )
}

export function newsletterSection(){
  return (
      <div className="relative isolate overflow-hidden bg-gray-900 py-16 sm:py-24 lg:py-32 align-middle">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="align-middle grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
            <div className="max-w-xl lg:max-w-lg">
              <h2 className="text-4xl font-semibold tracking-tight text-white">Newsletter abonnieren</h2>
              <p className="mt-4 text-lg text-gray-300">
                Abonniere unseren Newsletter um keine neuen Übungsaufgaben zu verpassen.
              </p>
              <div className="mt-6 flex max-w-md gap-x-4">
                <label htmlFor="email-address" className="sr-only">
                  deine Email Adresse
                </label>
                <input
                    id="email-address"
                    name="email"
                    type="email"
                    required
                    placeholder="Deine Email Adresse"
                    autoComplete="email"
                    className="min-w-0 flex-auto rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
                <button
                    type="submit"
                    className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                  Abonnieren
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export function faqSection(){
  return (
      <section className="bg-white dark:bg-gray-900 pt-32">
        <div className="max-w-screen-xl px-4 pb-8 mx-auto lg:pb-24 lg:px-6 ">
          <h2 className="mb-6 text-3xl font-extrabold tracking-tight text-center text-gray-900 lg:mb-8 lg:text-3xl dark:text-white">
            Häufig gestellte Fragen
          </h2>
          <div className="max-w-screen-md mx-auto">
            <div id="accordion-flush" data-accordion="collapse" data-active-classes="bg-white dark:bg-gray-900 text-gray-900 dark:text-white" data-inactive-classes="text-gray-500 dark:text-gray-400">
              <h3 id="accordion-flush-heading-1">
                <button type="button"
                        className="flex items-center justify-between w-full py-5 font-medium text-left text-gray-900 bg-white border-b border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                        data-accordion-target="#accordion-flush-body-1" aria-expanded="true"
                        aria-controls="accordion-flush-body-1">
                  <span>Can I use Landwind in open-source projects?</span>
                  <svg data-accordion-icon="" className="w-6 h-6 rotate-180 shrink-0" fill="currentColor"
                       viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clip-rule="evenodd"></path>
                  </svg>
                </button>
              </h3>
              <div id="accordion-flush-body-1" className="" aria-labelledby="accordion-flush-heading-1">
                <div className="py-5 border-b border-gray-200 dark:border-gray-700">
                  <p className="mb-2 text-gray-500 dark:text-gray-400">Landwind is an open-source library of
                    interactive components built on top of Tailwind CSS including buttons, dropdowns, modals,
                    navbars, and more.</p>
                  <p className="text-gray-500 dark:text-gray-400">Check out this guide to learn how to <a href="#"
                                                                                                          className="text-purple-600 dark:text-purple-500 hover:underline">get
                    started</a> and start
                    developing websites even faster with components on top of Tailwind CSS.</p>
                </div>
              </div>
              <h3 id="accordion-flush-heading-2">
                <button type="button"
                        className="flex items-center justify-between w-full py-5 font-medium text-left text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400"
                        data-accordion-target="#accordion-flush-body-2" aria-expanded="false"
                        aria-controls="accordion-flush-body-2">
                  <span>Is there a Figma file available?</span>
                  <svg data-accordion-icon="" className="w-6 h-6 shrink-0" fill="currentColor" viewBox="0 0 20 20"
                       xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clip-rule="evenodd"></path>
                  </svg>
                </button>
              </h3>
              <div id="accordion-flush-body-2" className="hidden" aria-labelledby="accordion-flush-heading-2">
                <div className="py-5 border-b border-gray-200 dark:border-gray-700">
                  <p className="mb-2 text-gray-500 dark:text-gray-400">Landwind is first conceptualized and designed
                    using the Figma software so everything you see in the library has a design equivalent in our
                    Figma file.</p>
                  <p className="text-gray-500 dark:text-gray-400">Check out the <a href="#"
                                                                                   className="text-purple-600 dark:text-purple-500 hover:underline">Figma
                    design system</a>
                    based on the utility classes from Tailwind CSS and components from Landwind.</p>
                </div>
              </div>
              <h3 id="accordion-flush-heading-3">
                <button type="button"
                        className="flex items-center justify-between w-full py-5 font-medium text-left text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400"
                        data-accordion-target="#accordion-flush-body-3" aria-expanded="false"
                        aria-controls="accordion-flush-body-3">
                  <span>What are the differences between Landwind and Tailwind UI?</span>
                  <svg data-accordion-icon="" className="w-6 h-6 shrink-0" fill="currentColor" viewBox="0 0 20 20"
                       xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clip-rule="evenodd"></path>
                  </svg>
                </button>
              </h3>
              <div id="accordion-flush-body-3" className="hidden" aria-labelledby="accordion-flush-heading-3">
                <div className="py-5 border-b border-gray-200 dark:border-gray-700">
                  <p className="mb-2 text-gray-500 dark:text-gray-400">The main difference is that the core components
                    from Landwind are open source under the MIT license, whereas Tailwind UI is a paid product.
                    Another difference is that Landwind relies on smaller and standalone components, whereas
                    Tailwind UI offers sections of pages.</p>
                  <p className="mb-2 text-gray-500 dark:text-gray-400">However, we actually recommend using both
                    Landwind, Landwind Pro, and even Tailwind UI as there is no technical reason stopping you
                    from using the best of two worlds.</p>
                  <p className="mb-2 text-gray-500 dark:text-gray-400">Learn more about these technologies:</p>
                  <ul className="pl-5 text-gray-500 list-disc dark:text-gray-400">
                    <li><a href="#" className="text-purple-600 dark:text-purple-500 hover:underline">Landwind
                      Pro</a></li>
                    <li><a href="#" className="text-purple-600 dark:text-purple-500 hover:underline">Tailwind UI</a>
                    </li>
                  </ul>
                </div>
              </div>
              <h3 id="accordion-flush-heading-4">
                <button type="button"
                        className="flex items-center justify-between w-full py-5 font-medium text-left text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400"
                        data-accordion-target="#accordion-flush-body-4" aria-expanded="false"
                        aria-controls="accordion-flush-body-4">
                  <span>What about browser support?</span>
                  <svg data-accordion-icon="" className="w-6 h-6 shrink-0" fill="currentColor" viewBox="0 0 20 20"
                       xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clip-rule="evenodd"></path>
                  </svg>
                </button>
              </h3>
              <div id="accordion-flush-body-4" className="hidden" aria-labelledby="accordion-flush-heading-4">
                <div className="py-5 border-b border-gray-200 dark:border-gray-700">
                  <p className="mb-2 text-gray-500 dark:text-gray-400">The main difference is that the core components
                    from Landwind are open source under the MIT license, whereas Tailwind UI is a paid product.
                    Another difference is that Landwind relies on smaller and standalone components, whereas
                    Tailwind UI offers sections of pages.</p>
                  <p className="mb-2 text-gray-500 dark:text-gray-400">However, we actually recommend using both
                    Landwind, Landwind Pro, and even Tailwind UI as there is no technical reason stopping you
                    from using the best of two worlds.</p>
                  <p className="mb-2 text-gray-500 dark:text-gray-400">Learn more about these technologies:</p>
                  <ul className="pl-5 text-gray-500 list-disc dark:text-gray-400">
                    <li><a href="#" className="text-purple-600 dark:text-purple-500 hover:underline">Landwind
                      Pro</a></li>
                    <li><a href="#" className="text-purple-600 dark:text-purple-500 hover:underline">Tailwind UI</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}