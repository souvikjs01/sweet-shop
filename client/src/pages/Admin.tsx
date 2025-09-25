import type React from "react"
import { useState } from "react"
import type { Sweet } from "../lib/types"
import { useUserData } from "../context/UserContext"
import { useSweetData } from "../context/SweetContext"
import { PopupCard } from "../components/PopupCard"

export default function AdminPage() {
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [selectedSweet, setSelectedSweet] = useState<Sweet | null>(null)
  const [formState, setFormState] = useState<Omit<Sweet, "id">>({
    name: "",
    category: "",
    price: 0,
    quantity: 0
  })
  const { user } = useUserData()
  const { addSweet, sweets, deleteSweet, updateSweet } = useSweetData()


    const handleOpenPopup = (sweet: Sweet) => {
        setSelectedSweet(sweet)
        setIsPopupOpen(true)
    }

    const handleClosePopup = () => {
        setSelectedSweet(null)
        setIsPopupOpen(false)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormState((prevState) => ({
        ...prevState,
        [name]: name === "price" || name === "quantity" ? Number(value) : value,
        }))
    }

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // console.log(formState.name, formState.category, formState.price, formState.quantity);

    addSweet(
        formState.name, 
        formState.category, 
        Number(formState.price), 
        Number(formState.quantity), 
        user?.id!
    )
  }

//   const handleEditClick = (sweet: Sweet) => {
//     console.log(sweet);
//     updateSweet(
//         sweet.id,
//         sweet.name,
//         sweet.category,
//         Number(sweet.price),
//         Number(sweet.quantity)
//     )
//   }

  const handleDeleteClick = (id: string) => {
    if (window.confirm("Are you sure you want to delete this sweet?")) {
        deleteSweet(id)
    }
  }

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-primary mb-6 text-center">Admin Dashboard</h1>

      <section className="mb-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-foreground mb-4">Add New Sweet</h2>
        <form onSubmit={handleAddSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formState.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
              required
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-muted-foreground mb-1">
              Category
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={formState.category}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
              required
            />
          </div>
          
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-muted-foreground mb-1">
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={Number(formState.price)}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
              step="0.01"
              required
            />
          </div>

          <div>
            <label htmlFor="quantity" className="block text-sm font-medium text-muted-foreground mb-1">
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={Number(formState.quantity)}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
              required
            />
          </div>

          
          <div className="md:col-span-2 flex justify-end space-x-2">
            <button
              type="submit"
              className="px-4 py-2 text-white bg-black rounded-md"
            >
                Add Sweet
            </button>
          </div>
        </form>
      </section>

      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-foreground mb-4">Manage Sweets</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-left text-sm font-medium text-muted-foreground">Name</th>
                <th className="py-2 px-4 border-b text-left text-sm font-medium text-muted-foreground">Price</th>
                <th className="py-2 px-4 border-b text-left text-sm font-medium text-muted-foreground">Quantity</th>
                <th className="py-2 px-4 border-b text-left text-sm font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
                
              {sweets.map((sweet) => (
                <tr key={sweet.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b text-foreground">{sweet.name}</td>
                  <td className="py-2 px-4 border-b text-foreground">Rs.{Number(sweet.price)}</td>
                  <td className="py-2 px-4 border-b text-foreground">{Number(sweet.quantity)}</td>
                  <td className="py-2 px-4 border-b">
                    <button onClick={() => handleOpenPopup(sweet)} className="text-accent hover:underline mr-4">
                      Edit
                    </button>
                    {isPopupOpen && 
                        <PopupCard 
                            sweet={selectedSweet!}
                            onClose={handleClosePopup} 
                            updateSweet={updateSweet}
                            
                        />
                    }
                    <button onClick={() => handleDeleteClick(sweet.id)} className="text-red-500 hover:underline">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  )
}
