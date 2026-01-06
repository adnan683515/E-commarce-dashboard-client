import nidImage from '../../../assets/Nid.png'
import nidIcon from '../../../assets/nidDocument.png'
import icon2 from '../../../assets/documentIcon.png'
import icon3 from '../../../assets/nidIcon3.png'
import { User, Calendar, ShieldCheck, Locate } from 'lucide-react';
import verify from '../../../assets/verify.png'
import document2 from '../../../assets/document1.png'
import { useState } from 'react';
import tax from '../../../assets/tax.png'



const images = [
    { id: 0, src: nidImage, icon: nidIcon, label: "NID" },
    { id: 1, src: document2, icon: icon2, label: "Document" },
    { id: 2, src: tax, icon: icon3, label: "Tax" }, // NEW
]


export default function SellerDetailsPage() {

    const [activeIndex, setActiveIndex] = useState(0)
    const sellerInfo = {
        name: "TectGedgeHub",
        email: "contact@techgedge.com",
        joinDate: "Jan 12, 2024",
        location: "Dhaka, Bangladesh",
        status: "Approved",
        sellerId: "#S-1001",
        totalProducts: "145",
        revenue: "$1,22,545"
    };


    return (
        <div>

            <div className='flex justify-between'>
                <div>
                    <h1 className='text-[24px] font-semibold'>Seller Verification</h1>
                    <h1 className='text-[12px] sm:text-[15px] '>Seller Management / View Details / Application #KYC-1254</h1>
                </div>
                <div className='flex items-end'>
                    <h1 className=' text-[10px] sm:text-[12px]'>Submitted: Oct 24, 2023    10:30 AM</h1>
                </div>



            </div>

            <div className='flex justify-between lg:flex-row flex-col gap-x-[24px] my-5 gap-y-[20px] sm:gap-y-0' >

                <div className="bg-[#333333] px-[39px] py-[100px] sm:py-[179px] rounded-3xl flex flex-col gap-y-[28px] lg:w-1/2">

               
                    <div className="flex justify-center items-center">
                        <img
                            className=" sm:h-[40vh] rounded-xl"
                            src={images[activeIndex].src}
                            alt=""
                        />
                    </div>


                    <div className="flex justify-center items-center">
                        <div className="flex gap-x-[10px]">

                            {images.map((item, index) => (
                                <div
                                    key={item.id}
                                    onClick={() => setActiveIndex(index)}
                                    className={`
                bg-[#989898] rounded-lg p-[17px] cursor-pointer
                ${activeIndex === index ? "border-2 border-sky-500" : "border-2 border-transparent"}
              `}
                                >
                                    <img src={item.icon} alt={item.label} />
                                </div>
                            ))}

                        </div>
                    </div>
                </div>


                <div className='lg:w-1/2'>

                    <div className="bg-white p-4 lg:p-10 rounded-2xl border border-gray-100  w-full  h-full mx-auto font-sans">

                        {/* Header with Back Button */}
                        <div className="flex items-center mb-5 border-b border-gray-50">
                            <div className="flex items-center gap-1 ">
                                <button className="p-2 hover:bg-gray-100 rounded-lg transition-all cursor-pointer text-gray-500">
                                    <img src={verify} alt="" />
                                </button>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-800">Identity verification</h2>

                                </div>
                            </div>

                        </div>

                        <h1>Personal Details</h1>

                        {/* Grid Layout for Details */}
                        <div className="grid mt-4    grid-cols-1 md:grid-cols-2 gap-y-[20px] gap-x-5">

                            {/* Full Name */}
                            <div className="flex flex-col col-span-2 sm:col-span-1 gap-y-[10px] ">
                                <label className="flex items-center gap-2 text-xs font-semibold text-gray-400  tracking-wider">
                                    <User size={14} /> First Name
                                </label>
                                <div className="p-3.5 bg-[#F8FAFC] border border-gray-100 rounded-xl text-gray-700 font-semibold ">
                                    {sellerInfo.name}
                                </div>
                            </div>


                            <div className="flex col-span-2 sm:col-span-1  flex-col gap-y-[10px] ">
                                <label className="flex items-center gap-2 text-xs font-semibold text-gray-400  tracking-wider">
                                    <User size={14} /> Last Name
                                </label>
                                <div className="p-3.5 bg-[#F8FAFC] border border-gray-100 rounded-xl text-gray-700 font-semibold ">
                                    {sellerInfo.email}
                                </div>
                            </div>

                            {/* Joining Date */}
                            <div className="flex flex-col gap-y-[10px] col-span-2">
                                <label className="flex items-center gap-2 text-xs font-semibold text-gray-400  tracking-wider">
                                    <Locate size={14} /> Full Address
                                </label>
                                <div className="p-3.5  bg-[#F8FAFC] border border-gray-100 rounded-xl text-gray-700 font-semibold ">
                                    fsaf
                                </div>
                            </div>

                            {/* Location */}
                            <div className="flex col-span-2 sm:col-span-1 flex-col gap-y-[10px]">
                                <label className="flex items-center gap-2 text-xs font-semibold text-gray-400  tracking-wider">
                                    <Calendar size={14} /> Date of Birth
                                </label>
                                <div className="p-3.5 bg-[#F8FAFC] border border-gray-100 rounded-xl text-gray-700 font-semibold ">
                                    {sellerInfo.location}
                                </div>
                            </div>

                            {/* Total Products */}
                            <div className="flex col-span-2 sm:col-span-1 flex-col gap-y-[10px]">
                                <label className="flex items-center gap-2 text-[12px] text-gray-400  t">
                                    <ShieldCheck size={14} />  ID Number
                                </label>
                                <div className="p-3.5 bg-[#F8FAFC] border border-gray-100 rounded-xl text-gray-700  ">
                                    {sellerInfo.totalProducts} Items
                                </div>
                            </div>
                            <h1 className='col-span-2'>Business Info</h1>


                            <div className="flex flex-col gap-y-[10px] col-span-2">
                                <label className="flex items-center gap-2 text-[12px] text-gray-400  t">
                                    Business Name
                                </label>
                                <div className="p-3.5 bg-[#F8FAFC] border border-gray-100 rounded-xl font-semibold ">
                                    asdfsdf
                                </div>
                            </div>
                            <div className="flex flex-col gap-y-[10px] col-span-2">
                                <label className="flex items-center gap-2 text-[12px]  text-gray-400  ">
                                    Tex ID (EIN)
                                </label>
                                <div className="p-3.5 bg-[#F8FAFC] border border-gray-100 rounded-xl  ">
                                    asfsdf
                                </div>
                            </div>
                        </div>

                        {/* Footer Actions */}
                        <div className=" pt-8 border-t border-gray-50 flex flex-col sm:flex-row items-center gap-4">

                            <button className="w-full  px-8 py-3  text-gray-600 rounded-xl hover:bg-gray-200 border-2 border-red-400 transition-all cursor-pointer text-red-500">
                                Rejecte
                            </button>

                            <button className="w-full  border px-8 py-3 bg-[#128635]  rounded-xl  text-white transition-all cursor-pointer shadow-blue-100">
                                Approve
                            </button>
                        </div>
                    </div>
                </div>



            </div>

        </div>
    )
}
