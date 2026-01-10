import React, { useState } from 'react';
import { Search, Filter, ChevronLeft, ChevronRight, Store, Star, X } from 'lucide-react';
import sneakers from '../../../assets/sneakers.jpg'

interface Product {
  id: string;
  name: string;
  seller: string;
  price: string;
  sku: string;
  image: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

const Product: React.FC = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Handle smooth transition timing
  const openModal = (product: Product) => {
    setSelectedProduct(product);
    setTimeout(() => setIsModalVisible(true), 10);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setTimeout(() => setSelectedProduct(null), 1000); // Wait for transition to finish
  };



  const products: Product[] = Array(8).fill({
    id: '1',
    name: 'Premium Sneakers',
    seller: 'SneakersHub',
    price: '$1500',
    sku: 'sk-1234',
    image: sneakers,
    status: 'Pending'
  });

  return (
    <div className=" md:p-8  min-h-screen relative">
      {/* Header & Description */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Product Moderation</h1>
        <p className="text-sm text-gray-500">Review and manage vendor product listings pending approval.</p>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-wrap items-center gap-3 mb-8">
        <button className="flex items-center gap-2 px-4 py-2 bg-[#C1E0F6] text-black rounded-lg font-bold text-sm">
          <Filter size={16} /> Filter
        </button>

        <div className="relative">
          <select
            className="appearance-none border border-gray-200 rounded-lg px-4 py-2 pr-10 text-sm font-medium cursor-pointer bg-white text-gray-700 outline-none transition-all hover:border-sky-400 focus:ring-2 focus:ring-gray-200 focus:border-gray-400 font-semibold"
          >
            <option value="pending">Status : Pending</option>
            <option value="approved">Status : Approved</option>
          </select>


          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
            <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </div>
        </div>

        <div className="relative">
          <select
            className="appearance-none border border-gray-200 rounded-lg px-4 py-2 pr-10 text-sm font-medium cursor-pointer bg-white text-gray-700 outline-none transition-all hover:border-sky-400 focus:ring-2 focus:ring-gray-200 focus:border-gray-400 font-semibold"
          >
            <option value="pending">Status : Fashion</option>
            <option value="approved">Status : Tech</option>
            <option value="approved">Status : Electronics</option>
          </select>


          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
            <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </div>
        </div>


        <div className=" flex-1 flex gap-2 max-w-md">
          <input
            type="text"
            placeholder="Search product..."
            className="w-full border border-gray-300 rounded-lg pl-4 pr-10 py-2 text-sm outline-none focus:ring-2 bg-white focus:ring-gray-500 font-semibold"
          />
          <button className="    cursor-pointer top-0 h-full hover:scale-95 transition-all duration-500  px-4 py-2 bg-[#C1E0F6]  text-black font-semibold rounded-lg">
            Search
          </button>
        </div>
      </div>

      {/* Grid Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-[14px] sm:text-xl font-bold text-gray-800">Pending Products (235)</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500 mr-2">Showing 8 of 235</span>
          <button className="border px-3 hover:scale-95 cursor-pointer  py-1.5 rounded-lg text-sm text-[#2289C9] font-bold hover:bg-white transition-all">Previous</button>
          <button className="bg-[#2289C9]  transition-all duration-100 cursor-pointer text-white px-4 py-1.5 rounded-lg text-sm font-bold hover:scale-95 ">Next</button>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product, idx) => (
          <div key={idx} className="bg-sky-100  rounded-xl   border-gray-100 overflow-hidden group">
            <div className="relative  h-[30vh] w-full aspect-square bg-[#A5C9E1] flex items-center justify-center ">
              <span className="absolute top-3 right-3 bg-yellow-400 text-white text-[10px] font-bold px-3 py-1 rounded-full ">
                Pending
              </span>
              <img src={product.image} alt={product.name} className="w-full  h-full object-contain  mix-blend-multiply  group-hover:scale-110 transition-transform duration-300" />
            </div>

            <div className="p-4 space-y-2">
              <div>
                <h3 className="font-bold text-gray-900">{product.name}</h3>
                <div className="flex items-center gap-1 font-semibold text-gray-700 text-[14px] mt-1">
                  <Store size={18} /> {product.seller}
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-lg font-black text-gray-900">{product.price}</span>
                <span className="text-[12px] font-bold text-gray-800  tracking-tighter">SKU: {product.sku}</span>
              </div>

              <button onClick={() => openModal(product)} className="w-full cursor-pointer py-2 bg-[#2289C9] text-white rounded-lg text-sm font-bold hover:bg-sky-900 transition-colors">
                View Details
              </button>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <button className="py-2 bg-[#128635] text-white rounded-lg text-xs font-bold hover:bg-green-700 transition-colors ">
                  Approve
                </button>
                <button className="py-2 bg-[#DF2A16] text-white rounded-lg text-xs font-bold hover:bg-red-600 transition-colors ">
                  Reject
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>




      {selectedProduct && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 transition-all duration-1000 ease-in-out ${isModalVisible ? 'opacity-100' : 'opacity-0'
            }`}
        >
          {/* Backdrop/Blur - Click to close */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            onClick={closeModal}
          ></div>

          {/* Modal Content Container */}
          <div
            className={`relative bg-white w-full max-w-5xl rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden transition-all duration-1000 ease-in-out transform ${isModalVisible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-10'
              } max-h-[95vh] flex flex-col`}
          >
            {/* Close Button - Sticky for Mobile */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-50 p-2 bg-white/80 backdrop-blur-md shadow-md rounded-full hover:bg-white transition-colors"
            >
              <X size={24} className="text-gray-800 cursor-pointer" />
            </button>

            {/* Internal Scrollable Wrapper */}
            <div className="overflow-y-auto flex-1">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">

                {/* Left Side - Image & Product Intro (Mobile: First) */}
                <div className="lg:col-span-5 bg-[#A5C9E1] p-6 sm:p-8 flex flex-col justify-center min-h-[350px] sm:min-h-0">
                  <div className="flex-1 flex items-center justify-center py-4">
                    <img
                      src={selectedProduct.image}
                      alt="Sneaker"
                      className="w-full max-w-[280px] sm:max-w-full object-contain mix-blend-multiply drop-shadow-2xl"
                    />
                  </div>
                  <div className="mt-4">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{selectedProduct.name}</h2>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xl sm:text-2xl font-black text-gray-900">{selectedProduct.price}</span>
                      <div className="flex items-center gap-1">
                        <span className="text-xs sm:text-sm font-bold text-gray-700">(250 Reviews)</span>
                        <Star size={16} className="fill-yellow-400 text-yellow-400" />
                        <span className="font-bold text-gray-800">4.5</span>
                      </div>
                    </div>

                    {/* Sizes */}
                    <div className="mt-4 flex gap-2 flex-wrap no-scrollbar pb-2">
                      {['08', '16', '18', '20', '22', '24', '26'].map(size => (
                        <span key={size} className="flex-shrink-0 px-4 py-2 bg-white/50 rounded-lg text-sm font-bold border border-white/30">
                          {size}
                        </span>
                      ))}
                    </div>

                    {/* Shop Info Card */}
                    <div className="mt-6 bg-white/60 backdrop-blur-sm p-4 rounded-2xl flex items-center justify-between border border-white/40">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white font-bold italic shadow-lg">Z</div>
                        <div>
                          <p className="text-sm font-bold text-gray-900">Official Sneakers Store</p>
                          <p className="text-[11px] font-semibold text-gray-600">Verified Seller • 250 Sales</p>
                        </div>
                      </div>
                      <button className="bg-[#E97F3E] text-white px-4 py-2 rounded-xl text-xs font-bold hover:scale-95 transition-transform">
                        View Shop
                      </button>
                    </div>
                  </div>
                </div>

                {/* Middle Side - Specs (Mobile: Second) */}
                <div className="lg:col-span-3 p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-gray-100 bg-white">
                  <h4 className="font-bold text-gray-900 text-lg mb-3">Description</h4>
                  <p className="text-sm text-gray-600 leading-relaxed mb-8">
                    The Marathon Sports Shoe is engineered for performance and comfort. Crafted with premium breathable fabric and a shock-resistant sole, it delivers stability and flexibility.
                  </p>

                  <h4 className="font-bold text-gray-900 text-lg mb-4">Specifications</h4>
                  <div className="space-y-4">
                    {[
                      ['Upper Material', 'Breathable Mesh'],
                      ['Sole Material', 'Rubber'],
                      ['Closure Type', 'Lace-up'],
                      ['Weight', 'Lightweight'],
                      ['Fit Type', 'Regular'],
                      ['Gender', 'Unisex'],
                      ['Occasion', 'Sports & Casual']
                    ].map(([label, value]) => (
                      <div key={label} className="flex justify-between text-sm">
                        <span className="text-gray-500 font-medium">{label}</span>
                        <span className="font-bold text-gray-800">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Side - Reviews (Mobile: Last) */}
                <div className="lg:col-span-4 p-6 sm:p-8 bg-gray-50/80">
                  <div className="flex justify-between items-center mb-6">
                    <h4 className="font-bold text-gray-900 text-lg">Reviews (42)</h4>
                    <button className="text-xs font-bold text-[#2289C9]">Write a Review</button>
                  </div>

                  <div className="space-y-4">
                    {[1, 2].map((i) => (
                      <div key={i} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex gap-3">
                            <div className="w-10 h-10 bg-orange-100 rounded-full border-2 border-white shadow-sm flex items-center justify-center font-bold text-orange-600 text-xs">WJ</div>
                            <div>
                              <p className="text-sm font-bold text-gray-900">William Johnson</p>
                              <div className="flex text-yellow-400 gap-0.5 mt-0.5">
                                {Array(5).fill(0).map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                              </div>
                            </div>
                          </div>
                          <span className="text-[10px] font-bold text-gray-400 ">10 Dec</span>
                        </div>
                        <p className="text-xs text-gray-600 leading-normal mb-4">
                          Extremely comfortable for long runs. The cushioning is exactly what I needed.
                        </p>
                        <div className="flex gap-2">
                          {Array(3).fill(0).map((_, i) => (
                            <div key={i} className="w-14 h-14 bg-gray-100 rounded-xl border border-gray-50 overflow-hidden">
                              <img src={selectedProduct.image} className="w-full h-full object-cover opacity-60" alt="review" />
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="w-full mt-6 py-3  cursor-pointer rounded-2xl text-sky-600 text-sm font-bold hover:bg-gray-100 transition-colors">
                    Load More.....
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;