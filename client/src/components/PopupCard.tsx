import type React from "react"
import { useEffect, useState } from "react"
import type { Sweet } from "../lib/types"
import { useNavigate } from "react-router-dom"

interface EditCardProps {
  sweet: Sweet
  onClose: () => void
  updateSweet: any
}

export function PopupCard({ onClose, sweet, updateSweet }: EditCardProps) {
  const [name, setName] = useState("")
  const [price, setPrice] = useState<number>(0)
  const [category, setCategory] = useState("")
  const [quantity, setQuantity] = useState<number>(0)
  const navigate = useNavigate()
  useEffect(() => {
    setName(sweet.name)
    setPrice(Number(sweet.price))
    setCategory(sweet.category)
    setQuantity(Number(sweet.quantity))
  }, [sweet])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    updateSweet(
      sweet.id,
      name,
      category,
      Number(price),
      Number(quantity)
    )
    navigate("/admin")


    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="mb-4 text-2xl font-bold text-foreground">Edit Sweet Details</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="mb-1 block text-sm font-medium text-foreground">
               Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-md border border-border bg-input px-3 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              required
            />
          </div>
          <div>
            <label htmlFor="price" className="mb-1 block text-sm font-medium text-foreground">
              Price
            </label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(Number.parseFloat(e.target.value))}
              className="w-full rounded-md border border-border bg-input px-3 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              required
              min="0"
              step="0.01"
            />
          </div>
          <div>
            <label htmlFor="category" className="mb-1 block text-sm font-medium text-foreground">
              Category
            </label>
            <input
              type="text"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-md border border-border bg-input px-3 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              required
            />
          </div>
          <div>
            <label htmlFor="quantity" className="mb-1 block text-sm font-medium text-foreground">
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(Number.parseInt(e.target.value))}
              className="w-full rounded-md border border-border bg-input px-3 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              required
              min="1"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="py-2 px-4 rounded-sm bg-gray-200 text-secondary-foreground hover:bg-secondary/80"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="bg-black text-white py-2 px-4 rounded-sm"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
