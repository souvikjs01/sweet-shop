import type { Sweet } from "../lib/types"

interface SweetCardProps {
  sweet: Sweet
//   onPurchase: (id: string) => void
}

export function SweetCard({ sweet }: SweetCardProps) {
  const isOutOfStock = sweet.quantity === 0

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
      <div className="relative w-full h-48">
        <img
            src="/sweet1.png"
            alt={sweet?.name || "Sweet"}
            className="rounded-t-lg object-cover w-full h-48"
        />
      </div>
      <div className="p-4 flex-grow flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-2">{sweet.name}</h2>
          <p className="text-muted-foreground text-sm mb-4">{sweet.category}</p>
        </div>
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-bold text-primary">Rs.{Number(sweet.price)}</span>
          <span className={`text-sm font-medium ${isOutOfStock ? "text-red-500" : "text-green-600"}`}>
            {isOutOfStock ? "Out of Stock" : `Qty: ${sweet.quantity}`}
          </span>
        </div>
        <button
        //   onClick={() => onPurchase(sweet.id)}
          disabled={isOutOfStock}
          className={`w-full py-2 px-4 rounded-md text-white font-medium transition-colors ${
            isOutOfStock ? "bg-gray-400 cursor-not-allowed" : "bg-blue-400 hover:bg-blue-700"
          }`}
        >
          {isOutOfStock ? "Sold Out" : "Purchase"}
        </button>
      </div>
    </div>
  )
}
