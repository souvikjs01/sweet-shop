import type React from "react"
import { useState } from "react"

interface EditCardProps {
  onClose: () => void
  onSubmit: any
  // onSubmit: (data: { name: string; price: number; category: string; quantity: number }) => void
}

export function PopupCard({ onClose, onSubmit }: EditCardProps) {
  const [name, setName] = useState("")
  const [price, setPrice] = useState<number>(0)
  const [category, setCategory] = useState("")
  const [quantity, setQuantity] = useState<number>(1)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ name, price, category, quantity })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-md rounded-lg bg-card p-6 shadow-lg">
        <h2 className="mb-4 text-2xl font-bold text-foreground">Add New Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="mb-1 block text-sm font-medium text-foreground">
              Product Name
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
              className="bg-secondary text-secondary-foreground hover:bg-secondary/80"
            >
              Cancel
            </button>
            <button type="submit">Add Product</button>
          </div>
        </form>
      </div>
    </div>
  )
}
