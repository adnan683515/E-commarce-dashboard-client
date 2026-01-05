import React from "react"

type Seller = {
  id: number
  name: string
  totalProducts: number
  status: "Pending" | "Verified"
  img: string
}

const recentSellers: Seller[] = [
  { id: 1, name: "John Doe", totalProducts: 140, status: "Pending", img: "seller.png" },
  { id: 2, name: "Jane Smith", totalProducts: 120, status: "Verified", img: "seller.png" },
  { id: 3, name: "Mark Johnson", totalProducts: 85, status: "Pending", img: "seller.png" },
  { id: 4, name: "Emily Davis", totalProducts: 200, status: "Verified", img: "seller.png" },
  { id: 5, name: "Chris Lee", totalProducts: 95, status: "Pending", img: "seller.png" },
  { id: 6, name: "Sarah Brown", totalProducts: 110, status: "Verified", img: "seller.png" },
  { id: 7, name: "Sarah Brown", totalProducts: 110, status: "Verified", img: "seller.png" },
]

const RecentSellers = () => {
  return (
    <div className=" rounded-3xl   p-6 w-full h-full ">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-lg">Recent Sellers</h2>
        <button className="text-sm  text-gray-600 cursor-pointer  hover:underline">View All</button>
      </div>

      {/* Seller List */}
      <div className="divide-y divide-gray-200">
        {recentSellers.map((seller) => (
          <div
            key={seller.id}
            className="flex items-center justify-between py-2"
          >
            {/* Left side */}
            <div className="flex items-center gap-4">
              <img
                src={seller.img}
                alt={seller.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-medium">{seller.name}</p>
                <p className="text-sm text-gray-500">{seller.totalProducts} products</p>
              </div>
            </div>

            {/* Right side */}
            <span
              className={`
                px-3 py-1 text-xs font-semibold rounded-full
                ${seller.status === "Pending" ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"}
              `}
            >
              {seller.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RecentSellers
