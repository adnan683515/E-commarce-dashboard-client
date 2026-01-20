import React, { useEffect, useRef, useState } from 'react';
import {
  Plus,
  ChevronRight,
  Edit3,
  Upload,
  X,
  ChevronLeft
} from 'lucide-react';
import { addNewCategoryThunk, fetchCategories, updateCategoryThunk } from "../../../redux/features/Pcetegory/pcet.thunk";
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import AuthReduxHook from '../../../Hook/AuthReduxHook';
import { toast } from 'sonner';


interface IUpdate {
  _id: string;
  image: string;
  name: string
}

const Catalog: React.FC = () => {



  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [cetName, setCetName] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { token } = AuthReduxHook()
  const [modalTitle, setModalTitle] = useState<string | null>(null)
  const [modalSubtitle, setModalSubtitle] = useState<string | null>(null)
  const [updateCategoryInfo, setUpdateCategoryinfo] = useState<IUpdate | null>(null)



  const fileInputRef = useRef<HTMLInputElement>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;




  const dispatch = useAppDispatch();
  const { categories, loading, error } = useAppSelector(state => state.pcet);

  useEffect(() => {
    if (token) {
      dispatch(fetchCategories({ token, page: currentPage }));

    }
  }, [token, dispatch, currentPage ])


  const startIndex = (currentPage - 1) * itemsPerPage;
  const totalPages = Math.ceil(categories.length / itemsPerPage);


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };




  useEffect(() => {
    if (modalTitle?.startsWith("Create")) {
      setPreviewUrl(null); // new creation, no previous preview
    } else {
      setPreviewUrl(updateCategoryInfo?.image ?? null); // show existing image for edit
    }
    setSelectedFile(null); // reset file selection
  }, [updateCategoryInfo, modalTitle]);




  const imageSrc = selectedFile
    ? URL.createObjectURL(selectedFile) // new selected file
    : updateCategoryInfo?.image ?? undefined; // existing category image



  // file upload
  const onUploadClick = () => {
    fileInputRef.current?.click();
  };




  // add product cetegory 
  const productCetegory = async () => {
    if (token && selectedFile && cetName) {

      const result = await dispatch(addNewCategoryThunk({ token, image: selectedFile, name: cetName }))

      if (result?.meta?.requestStatus == "fulfilled") {
        dispatch(fetchCategories({ token, page: currentPage }));
        setIsModalOpen(false)
        return toast.success('Product Category Create Successfully!')
      }
      return toast.error("Already Exits!")


    } else {
      return toast.error('Name and Image filed is required!!')
    }
  }



  // update category
  const updateCategoryFn = async () => {
    try {
      const res = await dispatch(updateCategoryThunk({ token, name: updateCategoryInfo?.name, _id: updateCategoryInfo?._id, image: selectedFile }))
      console.log(res)
      if (res.meta.requestStatus == 'fulfilled') {
        if (token) {
          dispatch(fetchCategories({ token, page: currentPage }));
        }
        setIsModalOpen(false)
        return toast.success('Update Category Successfully!')
      }
      else{
        return    toast.error(error || "Doesn't Update ❌");
      }
    }
    catch (error: any) {
      console.log(error)
    }

  }



  const closeModal = () => {
    setIsModalOpen(false);
  };


  // if(loading){
  //   return <div className='flex justify-center items-center min-h-screen'> <h1>Loading............</h1> </div>
  // }


  return (
    <div className="bg-[#F4F9FD]  text-slate-800 relative transition-all duration-100">
      {/* Header */}


      <div className="mb-6">
        <h1 className="text-[18px] sm:text-[24px] font-bold text-slate-900 tracking-tight">Product Category Management</h1>
        <p className="text-[14px] text-slate-500 mt-1">Manage product taxonomy, hierarchy, and custom attributes fields.</p>
      </div>

      {/* Action Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div className="flex items-center justify-between sm:justify-start gap-2 sm:gap-4">
          <span className="text-[14px] sm:text-[18px] font-bold text-slate-900 whitespace-nowrap">
            Total Categories: {categories.length}
          </span>
          <button
            onClick={() => {
              setModalTitle('Create Category')
              setModalSubtitle('Create new product category for the marketplace')
              setIsModalOpen(true)
            }}
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
                <th className="px-6 py-4 text-[14px] font-bold text-slate-700">Category Image</th>
                <th className="px-6 py-4 text-[14px] font-bold text-slate-700">Category Name</th>
                <th className="px-6 py-4 text-[14px] font-bold text-slate-700 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {categories.map((cat) => {
                return (
                  <React.Fragment key={cat._id}>
                    <tr className="bg-[#E3EFFB]/50 hover:bg-[#E3EFFB] transition-colors duration-100">
                      <td className='px-6 py-4'>
                        <img className='w-14  rounded-full  h-14 border-2 border-sky-500' src={cat.imageUrl} alt="" />
                      </td>
                      <td className="px-6 py-4">
                        <button

                          className="flex items-center gap-2 group outline-none cursor-pointer"
                        >

                          <span className="font-bold text-slate-900 text-[15px]">{cat.name}</span>
                        </button>
                      </td>


                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-3">

                          <button onClick={() => {
                            setModalTitle('Update Category')
                            setModalSubtitle("Update product category for the marketplace")
                            setUpdateCategoryinfo({ _id: cat._id, name: cat.name, image: cat.imageUrl })
                            setIsModalOpen(true)
                          }} className="flex items-center gap-1.5 bg-[#2E90D1] text-white px-3 py-1.5 rounded-lg text-[12px] font-bold hover:bg-[#257ab3] transition-all duration-100">
                            <Edit3 size={14} /> Edit
                          </button>
                        </div>
                      </td>
                    </tr>


                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex items-center justify-between px-2 py-4">
        <p className="text-sm text-slate-600 font-medium">
          Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, categories.length)} of {categories.length} entries
        </p>
        <div className="flex items-center gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => prev - 1)}
            className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft size={18} />
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`w-9 h-9 rounded-lg text-sm font-bold transition-all ${currentPage === i + 1
                ? 'bg-sky-500 text-white shadow-md shadow-sky-200'
                : 'text-slate-600 hover:bg-sky-50'
                }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => prev + 1)}
            className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight size={18} />
          </button>
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
              <h2 className="text-[20px] font-bold text-slate-900">{modalTitle}</h2>
              <p className="text-[13px] text-slate-500">{modalSubtitle}.</p>
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
              <input defaultValue={modalTitle?.split(' ')[0] != 'Create' ? updateCategoryInfo?.name : ''} onChange={(e) => setCetName(e.target.value)} type="text" placeholder="Enter Category Name" className="w-full border border-slate-200 rounded-xl px-4 py-3 text-[14px] outline-none focus:ring-2 focus:ring-[#D2E9F6]" />
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


              {imageSrc ? (
                <div className="flex flex-col items-center">
                  <img
                    src={imageSrc}
                    alt="Preview"
                    className="w-20 h-20 object-cover rounded-lg mb-2 border-2 border-white shadow-md"
                  />
                  {selectedFile?.name && (
                    <p className="text-[12px] font-semibold text-[#2E90D1] truncate max-w-[200px]">
                      {selectedFile.name}
                    </p>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="bg-white p-2 rounded-lg mb-3 text-[#2E90D1] group-hover:scale-110 transition-transform">
                    <Upload size={24} />
                  </div>
                  <p className="text-[14px] font-bold text-[#2E90D1]">Drag & drop or click to upload</p>
                  <p className="text-[12px] text-slate-400 mt-1">JPEG or PNG; Max size 1 MB</p>
                </div>
              )}

            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <button onClick={closeModal} className="flex-1 border border-slate-200 text-slate-600 py-3 rounded-xl font-bold text-[14px] hover:bg-slate-50 transition-colors cursor-pointer">
                Cancel
              </button>
              <button onClick={() => {
                if (modalTitle?.split(' ')[0] == 'Create') {
                  productCetegory()
                }
                else {
                  updateCategoryFn()
                }

              }} className="flex-1 bg-[#2E90D1] text-white py-3 rounded-xl font-bold text-[14px] hover:bg-[#257ab3] shadow-md shadow-blue-100 transition-all active:scale-95">
                {modalTitle}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Catalog;