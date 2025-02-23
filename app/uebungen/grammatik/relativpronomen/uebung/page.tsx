import {Navbar} from "@/components/navbar";
import {RelativpronomenUebung} from "@/components/grammatik/relativpronomen-uebung";


export default function uebungRelativpronomen(){
    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar/>
            <main className="container mx-auto px-4 py-8">
                <h1 className="text-xl lg:text-3xl font-bold mb-8 text-center mt-10">Relativpronomen - Übung</h1>
                <h4 className={"text-center mb-3"}><a href="./" className={"underline"}>Erklärung</a></h4>
                <RelativpronomenUebung></RelativpronomenUebung>
            </main>
        </div>
    )
}

