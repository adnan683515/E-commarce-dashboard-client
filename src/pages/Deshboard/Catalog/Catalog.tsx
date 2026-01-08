import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  ChevronDown, 
  ChevronRight, 
  Edit3, 
  Circle 
} from 'lucide-react';

// --- Types ---
interface SubCategory {
  id: string;
  name: string;
  productCount: number;
}

interface Category {
  id: string;
  name: string;
  subCategories: SubCategory[];
  totalProducts: number;
}

const Catalog: React.FC = () => {
  const [expandedIds, setExpandedIds] = useState<string[]>(['1']);

  const categories: Category[] = [
    {
      id: '1',
      name: 'Electronics',
      totalProducts: 1245,
      subCategories: [
        { id: '1-1', name: 'Laptop', productCount: 415 },
        { id: '1-2', name: 'Smartphone', productCount: 415 },
        { id: '1-3', name: 'Headphone', productCount: 415 },
      ]
    },
    { id: '2', name: 'Fashion', totalProducts: 1245, subCategories: [] },
    { id: '3', name: 'Home & Garden', totalProducts: 1245, subCategories: [] },
    { id: '4', name: 'Sports & Outdoor', totalProducts: 1245, subCategories: [] },
    { id: '5', name: 'Beauty & Personal Care', totalProducts: 1245, subCategories: [] },
  ];

  const toggleExpand = (id: string) => {
    setExpandedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-[#F4F9FD] p-4 md:p-8 text-slate-800 transition-all duration-100">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-[24px] font-bold text-slate-900 tracking-tight">Category Management</h1>
        <p className="text-[14px] text-slate-500 mt-1">Manage product taxonomy, hierarchy, and custom attributes fields.</p>
      </div>

      {/* Action Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <span className="text-[18px] font-bold text-slate-900 whitespace-nowrap">Total Categories: {categories.length}</span>
          <button className="flex items-center gap-2 bg-[#2E90D1] hover:bg-[#257ab3] text-white px-5 py-2.5 rounded-lg font-bold text-[14px] shadow-sm transition-all duration-100 active:scale-95">
            <Plus size={18} /> Add New Category
          </button>
        </div>

        <div className="flex flex-1 max-w-md items-center gap-2">
          <div className="relative flex-1">
            <input 
              type="text" 
              placeholder="Search categories..." 
              className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-[14px] outline-none focus:ring-2 focus:ring-[#D2E9F6] transition-all duration-100"
            />
          </div>
          <button className="bg-[#D2E9F6] text-[#2E90D1] px-6 py-2.5 rounded-lg font-bold text-[14px] hover:bg-[#C1E1F5] transition-colors duration-100">
            Search
          </button>
        </div>
      </div>

      {/* Category Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-[#D2E9F6] border-b border-slate-200">
                <th className="px-6 py-4 text-[14px] font-bold text-slate-700">Category</th>
                <th className="px-6 py-4 text-[14px] font-bold text-slate-700">Sub - Category</th>
                <th className="px-6 py-4 text-[14px] font-bold text-slate-700 text-center">Products</th>
                <th className="px-6 py-4 text-[14px] font-bold text-slate-700 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {categories.map((cat) => {
                const isExpanded = expandedIds.includes(cat.id);
                return (
                  <React.Fragment key={cat.id}>
                    {/* Main Category Row */}
                    <tr className="hover:bg-slate-50 transition-colors duration-100">
                      <td className="px-6 py-4">
                        <button 
                          onClick={() => toggleExpand(cat.id)}
                          className="flex items-center gap-2 group outline-none"
                        >
                          <div className={`text-slate-400 group-hover:text-slate-600 transition-transform duration-100 ${isExpanded ? 'rotate-0' : '-rotate-90'}`}>
                            <ChevronDown size={20} />
                          </div>
                          <span className="font-bold text-slate-900 text-[15px]">{cat.name}</span>
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-[14px] font-bold text-slate-800">
                          {cat.subCategories.length > 0 ? `${cat.subCategories.length} Subcategories` : '—'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center font-bold text-slate-800 text-[14px]">
                        {cat.totalProducts.toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-3">
                          <button className="flex items-center gap-1.5 bg-[#2E90D1] text-white px-3 py-1.5 rounded-lg text-[12px] font-bold hover:bg-[#257ab3] transition-all duration-100">
                            <Plus size={14} /> Add Sub-Category
                          </button>
                          <button className="flex items-center gap-1.5 bg-[#2E90D1] text-white px-3 py-1.5 rounded-lg text-[12px] font-bold hover:bg-[#257ab3] transition-all duration-100">
                            <Edit3 size={14} /> Edit
                          </button>
                        </div>
                      </td>
                    </tr>

                    {/* Sub Category Container with duration-100 */}
                    {cat.subCategories.map((sub) => (
                      <tr 
                        key={sub.id} 
                        className={`bg-white border-b border-slate-50 last:border-b-0 transition-all duration-100 ease-in-out ${
                          isExpanded ? 'table-row opacity-100' : 'hidden opacity-0'
                        }`}
                      >
                        <td className="px-6 py-3 pl-16">
                          <div className="flex items-center gap-3">
                            <Circle size={8} className="fill-[#2E90D1] text-[#2E90D1]" />
                            <span className="font-bold text-slate-800 text-[14px]">{sub.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-3"></td>
                        <td className="px-6 py-3 text-center font-bold text-slate-800 text-[14px]">
                          {sub.productCount}
                        </td>
                        <td className="px-6 py-3 text-right">
                          <button className="inline-flex items-center gap-1.5 bg-[#2E90D1] text-white px-3 py-1.5 rounded-lg text-[12px] font-bold hover:bg-[#257ab3] transition-all duration-100">
                            <Edit3 size={14} /> Edit
                          </button>
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Catalog;