import { useState } from "react"
import { Header } from "../components/Header"
import { Footer } from "../components/Footer"
import { SweetCard } from "../components/SweetCard"
import { useSweetData } from "../context/SweetContext"

export default function Home() {
//   const { sweets, purchaseSweet } = useSweets() 
  const [searchTerm, setSearchTerm] = useState<string>("")
  const { sweets } = useSweetData()

//   const filteredSweets = sweets.filter((sweet) => sweet.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <>  
        <Header />

        <main className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-primary mb-6 text-center">Our Sweet Selection</h1>
            <div className="mb-6 flex justify-center">
                <input
                    type="text"
                    placeholder="Search sweets..."
                    className="p-2 border border-gray-300 rounded-md w-full max-w-md focus:outline-none focus:ring-2 focus:ring-accent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {/* <SweetCard sweet={sweet} /> */}
                {/* {filteredSweets.map((sweet) => (
                 <SweetCard key={sweet.id} sweet={sweet} onPurchase={purchaseSweet} /> 
                ))}  */}

                {sweets.map((sw) => (
                    <SweetCard key={sw.id} sweet={sw} />
                ))}
            </div>
        </main>

        <Footer/>
    </>
  )
}
