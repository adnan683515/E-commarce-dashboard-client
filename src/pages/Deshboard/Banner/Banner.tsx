import React, { useState, useRef, type ChangeEvent, useEffect } from 'react';
import { Upload, X, Smartphone, Image as ImageIcon, CheckCircle } from 'lucide-react';
import { useAppDispatch } from '../../../redux/hook';
import AuthReduxHook from '../../../Hook/AuthReduxHook';
import { AddNewBannerThunk, getBannerThunk } from '../../../redux/features/Banner/banner.thunk';

interface Banner {
  id: string;
  url: string;
  name: string;
  createdAt?: string;
  imageUrl?: string | undefined;
  updatedAt?: string;
  isActive?: boolean;
  __v?: string;
  _id?: string;

}



const Banner: React.FC = () => {


  const [banners, setBanners] = useState<Banner[]>([]);
  const [tempPreview, setTempPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isOn, setIsOn] = useState(false);
  const { token } = AuthReduxHook()


  const distpatch = useAppDispatch()

  useEffect(() => {
    const getBannerData = async () => {
      if (token) {
        const res = await distpatch(getBannerThunk({ token }));
        setBanners(res?.payload?.data)
      }

    }
    getBannerData()

  }, [token, distpatch])




  // 1. Handle Instant Preview when selecting image
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const objectUrl = URL.createObjectURL(file);
      setTempPreview(objectUrl);
    }
  };

  // 2. Mock upload function to add to the bottom gallery
  const handleUpload = async () => {
    if (tempPreview && selectedFile) {
      const newBanner: Banner = {
        id: Math.random().toString(36).substr(2, 9),
        url: tempPreview,
        name: selectedFile.name,
      };
      setBanners([newBanner, ...banners]);

      if (selectedFile && token) {
        console.log(token)
        const result = await distpatch(AddNewBannerThunk({ token, image: selectedFile }))
        console.log(result)
      }

      console.log(selectedFile)
      // Reset upload state
      setTempPreview(null);
      setSelectedFile(null);
    }
  };

  // 3. Remove banner from gallery
  const removeBanner = (id: string) => {
    setBanners(banners.filter((b) => b.id !== id));
  };

  return (
    <div className="p-2 md:p-8 bg-gray-50 ">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Banner Management</h1>
          <p className="text-gray-500">Upload and manage onboarding screen banners</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Left Side: Upload Controls */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Upload New Banner</h3>

              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-gray-300 rounded-xl p-10 flex flex-col items-center justify-center cursor-pointer hover:bg-blue-50 hover:border-blue-400 transition-all"
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  accept="image/*"
                />
                <div className="bg-blue-100 p-3 rounded-full mb-4">
                  <Upload className="text-blue-600 w-6 h-6" />
                </div>
                <p className="text-gray-700 font-medium">Click to upload or drag and drop</p>
                <p className="text-gray-400 text-sm mt-1">PNG, JPG or WebP (Recommended: 1080x1920)</p>
              </div>

              {tempPreview && (
                <button
                  onClick={handleUpload}
                  className="w-full mt-4 bg-[#2289C9] text-white py-3 rounded-xl font-semibold hover:bg-[#2289C9] transition-colors flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-5 h-5" /> Confirm & Post Banner
                </button>
              )}
            </div>
          </div>

          {/* Right Side: Instant Mobile Preview */}
          <div className="flex flex-col items-center">
            <div className="sticky top-8">
              <div className="flex items-center gap-2 mb-4 text-gray-600 font-medium">
                <Smartphone className="w-5 h-5" />
                <span>Live App Preview</span>
              </div>

              {/* Phone Frame */}
              <div className="relative w-[280px] h-[580px] bg-gray-900 rounded-[3rem] border-[8px] border-gray-800 shadow-2xl overflow-hidden">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-800 rounded-b-2xl z-20"></div>

                {/* Screen Content */}
                <div className="w-full h-full  bg-gray-100 relative">
                  {tempPreview ? (
                    <img src={tempPreview} alt="Preview" className="w-full  h-1/2 absolute   top-[20%] object-cover " />
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-gray-400 px-6 text-center">
                      <ImageIcon className="w-12 h-12 mb-2 opacity-20" />
                      <p className="text-sm">Select an image to see it live in the app frame</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>




        {/* Bottom Section: Gallery */}
        <section className="border-t border-gray-200 pt-8">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Published Banners</h3>
          {banners.length === 0 ? (
            <div className="bg-white p-12 rounded-2xl border border-gray-100 text-center text-gray-400">
              No banners uploaded yet.
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {banners.map((banner) => (
                <div key={banner._id} className="group relative aspect-[9/16] rounded-xl overflow-hidden shadow-md border border-gray-200 bg-white">
                  <img src={banner.imageUrl} className="w-full h-full object-cover transition-transform group-hover:scale-105" />

                  {/* Overlay & Cross Button */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => removeBanner(banner.id)}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 shadow-lg transition-transform hover:scale-110"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Badge */}
                  <div className="absolute bottom-2 left-2 right-2 bg-white/90 backdrop-blur-sm p-2 rounded text-[10px] truncate font-medium">
                    {banner.name}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Banner;