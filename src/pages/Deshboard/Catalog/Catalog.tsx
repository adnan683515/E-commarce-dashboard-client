import React, { useRef, useState } from 'react';
import {
  Plus,
  Search,
  ChevronDown,
  ChevronRight,
  Edit3,
  Circle,
  Upload,
  X
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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const onUploadClick = () => {
    fileInputRef.current?.click();
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // Optional: Reset file on close
    // setSelectedFile(null);
    // setPreviewUrl(null);
  };

  return (
    <div className="bg-[#F4F9FD]  text-slate-800 relative transition-all duration-100">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-[18px] sm:text-[24px] font-bold text-slate-900 tracking-tight">Category Management</h1>
        <p className="text-[14px] text-slate-500 mt-1">Manage product taxonomy, hierarchy, and custom attributes fields.</p>
      </div>

      {/* Action Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div className="flex items-center justify-between sm:justify-start gap-2 sm:gap-4">
          <span className="text-[14px] sm:text-[18px] font-bold text-slate-900 whitespace-nowrap">
            Total Categories: {categories.length}
          </span>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1 sm:gap-2 bg-[#2E90D1] hover:bg-[#257ab3] text-white px-2 sm:px-5 py-2 sm:py-2.5 rounded-lg font-bold text-[11px] sm:text-[14px] transition-all duration-100 active:scale-95  "
          >
            <Plus size={16} className="sm:w-[18px]" />
            <span className="whitespace-nowrap">Add New Category</span>
          </button>
        </div>

        <div className="flex w-full lg:max-w-md items-center gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search categories..."
              className="w-full bg-white border border-slate-200 rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 text-[12px] sm:text-[16px] font-semibold outline-none focus:ring-2 focus:ring-[#D2E9F6] transition-all duration-100"
            />
          </div>
          <button className="bg-[#D2E9F6] text-[#2E90D1] px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg font-bold text-[12px] sm:text-[14px] hover:bg-[#C1E1F5] transition-colors duration-100">
            Search
          </button>
        </div>
      </div>

      {/* Category Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden  ">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-[#C1E0F6] border-b border-slate-200">
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
                    <tr className="bg-[#E3EFFB]/50 hover:bg-[#E3EFFB] transition-colors duration-100">
                      <td className="px-6 py-4">
                        <button
                          onClick={() => toggleExpand(cat.id)}
                          className="flex items-center gap-2 group outline-none cursor-pointer"
                        >
                          <div className={`text-slate-400 group-hover:text-slate-600 transition-transform duration-300 ${isExpanded ? 'rotate-0' : '-rotate-90'}`}>
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
                          <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-1.5 bg-[#2E90D1] text-white px-3 py-1.5 rounded-lg text-[12px] font-bold hover:bg-[#257ab3] transition-all duration-100">
                            <Plus size={14} /> Add Sub-Category
                          </button>
                          <button className="flex items-center gap-1.5 bg-[#2E90D1] text-white px-3 py-1.5 rounded-lg text-[12px] font-bold hover:bg-[#257ab3] transition-all duration-100">
                            <Edit3 size={14} /> Edit
                          </button>
                        </div>
                      </td>
                    </tr>

                    {cat.subCategories.map((sub) => (
                      <tr
                        key={sub.id}
                        className={`bg-white border-b border-slate-50 last:border-b-0 transition-all duration-300 ease-in-out ${isExpanded ? 'table-row opacity-100' : 'hidden opacity-0'}`}
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

      {/* CREATE CATEGORY MODAL */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-[2px] transition-all duration-500 ${isModalOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={closeModal}
      >
        <div
          className={`bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 relative transition-all duration-500 transform ${isModalOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-[20px] font-bold text-slate-900">Create Category</h2>
              <p className="text-[13px] text-slate-500">Create new product category for the marketplace.</p>
            </div>
            <button onClick={closeModal} className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer">
              <X size={20} />
            </button>
          </div>

          {/* Form Fields */}
          <div className="space-y-5">
            <div>
              <label className="block text-[14px] font-bold text-slate-900 mb-1">Category Name</label>
              <p className="text-[12px] text-slate-400 mb-2">Name your category</p>
              <input type="text" placeholder="Enter Category Name" className="w-full border border-slate-200 rounded-xl px-4 py-3 text-[14px] outline-none focus:ring-2 focus:ring-[#D2E9F6]" />
            </div>

            <div>
              <label className="block text-[14px] font-bold text-slate-900 mb-1">Parent Category</label>
              <p className="text-[12px] text-slate-400 mb-2">Select a parent category if applicable</p>
              <select className="w-full border border-slate-200 rounded-xl px-4 py-3 text-[14px] appearance-none bg-no-repeat bg-[right_1rem_center] bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2024%2024%20stroke%3D%22%2394a3b8%22%3E%3Cpath%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%222%22%20d%3D%22m19%209-7%207-7-7%22%2F%3E%3C%2Fsvg%3E')] cursor-pointer">
                <option>None (Top Level)</option>
                <option>Electronics</option>
                <option>Fashion</option>
              </select>
            </div>

            {/* Functional Upload Area */}
            <div 
              onClick={onUploadClick}
              className="border-2 border-dashed border-[#D2E9F6] bg-[#F4F9FD] rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-[#E3F2FD] transition-colors group overflow-hidden"
            >
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className="hidden" 
                accept="image/*"
              />

              {previewUrl ? (
                <div className="flex flex-col items-center">
                  <img src={previewUrl} alt="Preview" className="w-20 h-20 object-cover rounded-lg mb-2 border-2 border-white shadow-md" />
                  <p className="text-[12px] font-semibold text-[#2E90D1] truncate max-w-[200px]">{selectedFile?.name}</p>
                </div>
              ) : (
                <>
                  <div className="bg-white p-2 rounded-lg   mb-3 text-[#2E90D1] group-hover:scale-110 transition-transform">
                    <Upload size={24} />
                  </div>
                  <p className="text-[14px] font-bold text-[#2E90D1]">Drag & drop or click to upload</p>
                  <p className="text-[12px] text-slate-400 mt-1">JPEG or PNG; Max size 1 MB</p>
                </>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <button onClick={closeModal} className="flex-1 border border-slate-200 text-slate-600 py-3 rounded-xl font-bold text-[14px] hover:bg-slate-50 transition-colors cursor-pointer">
                Cancel
              </button>
              <button className="flex-1 bg-[#2E90D1] text-white py-3 rounded-xl font-bold text-[14px] hover:bg-[#257ab3] shadow-md shadow-blue-100 transition-all active:scale-95">
                Create Category
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Catalog;