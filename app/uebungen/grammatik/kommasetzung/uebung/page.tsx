import {KommasetzungSpiel} from "@/components/grammatik/kommasetzung-spiel";
import {Navbar} from "@/components/navbar";


export default function uebungKommasetzung(){
   return (
       <div className="min-h-screen bg-gray-100">
           <Navbar/>
           <main className="container mx-auto px-4 py-8">
               <h1 className="text-3xl font-bold mt-6 mb-8 text-center">Kommasetzung-Übung</h1>
               <KommasetzungSpiel/>
           </main>
       </div>
   )
}

