import React from 'react';
import {
    User,
    Package,
    ClipboardList,
    Activity,
    MapPin,
    CheckCircle2,
    Truck,
    Home,
    Copy,
    ChevronRight
} from 'lucide-react';

const OderDetails: React.FC = () => {
    return (
        <div className="p-0 md:p-8 bg-[#F4F9FD] min-h-screen  text-slate-900">
            {/* Header Section */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold tracking-tight">Order Details</h1>
                <div className="flex items-center gap-2 mt-1">
                    <span className="text-[#0288D1] font-bold text-sm">#ORD-1234</span>
                    <span className="text-slate-400 text-xs font-medium">December 3, 2025, 10:45 AM</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* LEFT COLUMN: Customer & Summary */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Customer Information Card */}
                    <div className="bg-white rounded-xl  border border-slate-100 overflow-hidden">
                        <div className="bg-[#E3F2FD] px-4 py-3 flex justify-between items-center border-b border-slate-100">
                            <div className="flex items-center gap-2 text-[#0288D1] font-bold text-sm sm:text-[20px]">
                                <User size={24} /> Customer Information
                            </div>
                            <span className="bg-[#B3D9F2] text-[#4A4A4A] text-[10px] sm:text-[16px] font-black px-2 py-0.5 rounded ">2 Items</span>
                        </div>
                        <div className="p-4 flex flex-col md:flex-row justify-between gap-6">
                            <div className="flex gap-4">
                                <img
                                    src="https://i.pravatar.cc/150?u=alice"
                                    alt="Alice"
                                    className="w-14 h-14 rounded-full border-2 border-[#E3F2FD]"
                                />
                                <div className='flex flex-col gap-y-[3px] '>
                                    <h3 className="font-bold text-base">Alice Cooper</h3>
                                    <p className="text-[#636363] text-xs sm:text-[14px] font-medium">alicecooper123@gmail.com</p>
                                    <p className="text-[#636363] text-xs sm:text-[14px] font-medium mt-1">(123) 456-7894</p>
                                </div>
                            </div>
                            <div className="text-right flex flex-col gap-y-[10px] md:text-right">
                                <h4 className="font-bold text-xs  sm:text-[16px] mb-1">Shipping Address</h4>
                                <p className="text-sm font-medium ">Alice Cooper</p>
                                <p className="text-slate-500 text-xs ">123 Ethan street, New York</p>
                                <p className="text-slate-500 text-xs">United States</p>
                            </div>
                        </div>
                    </div>

                    {/* Order Summary Card */}
                    <div className="bg-white rounded-xl     overflow-hidden">
                        <div className="bg-[#E3F2FD] px-4 py-3 flex items-center gap-2 text-[#0288D1] font-bold  text-[16px] sm:text-[20px] border-b border-slate-100">
                            <ClipboardList size={18} /> Order Summary
                        </div>
                        <div className="overflow-x-auto  mx-4 mt-4 rounded-2xl">
                            <table className="w-full text-left">
                                <thead className="bg-[#C1E0F6] border-b border-slate-50">
                                    <tr>
                                        <th className="px-6 py-4  text-[14px] sm:text-[16px] font-bold text-slate-800  tracking-wider">Product</th>
                                        <th className="px-6 py-4  text-[14px] sm:text-[16px] font-bold text-slate-800  tracking-wider">Price</th>
                                        <th className="px-6 py-4  text-[14px] sm:text-[16px] font-bold text-slate-800  tracking-wider text-center">Quantity</th>
                                        <th className="px-6 py-4  text-[14px] sm:text-[16px] font-bold text-slate-800  tracking-wider text-right">Total</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y-2  divide-gray-200 bg-sky-50">
                                    {[1, 2].map((_, i) => (
                                        <tr key={i} className="hover:bg-slate-50/50 transition-colors  ">
                                            <td className="px-6 py-4 flex items-center gap-3">
                                                <div className="w-12 h-12 bg-slate-100 rounded-lg flex-shrink-0">
                                                    <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100" className="rounded-lg h-full object-cover" alt="shoe" />
                                                </div>
                                                <div>
                                                    <p className="text-[11px] sm:text-[14px] font-bold">Premium Running Shoe</p>
                                                    <p className="text-[11px] text-slate-400 font-medium">Size: 42</p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm font-bold text-slate-700">$500</td>
                                            <td className="px-6 py-4 text-sm font-bold text-slate-700 text-center">{i === 0 ? '2' : '1'}</td>
                                            <td className="px-6 py-4 text-sm font-black text-slate-900 text-right">{i === 0 ? '$1,000' : '$1,000'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="p-6 border-t border-slate-100 flex justify-end">
                            <div className="w-48 space-y-2">
                                <div className="flex justify-between text-xs font-bold text-slate-400">
                                    <span>Subtotal:</span>
                                    <span className="text-slate-600">$2,000</span>
                                </div>
                                <div className="flex justify-between text-xs font-bold text-slate-400">
                                    <span>Shipping:</span>
                                    <span className="text-slate-600">$50</span>
                                </div>
                                <div className="flex justify-between pt-2 border-t border-slate-200">
                                    <span className="text-sm font-bold">Total</span>
                                    <span className="text-lg font-black text-slate-900">$2,050</span>
                                </div>
                            </div>
                        </div>


                    </div>

                    <button className="px-6 py-2.5 bg-[#2E90D1] hover:bg-[#257ab3] text-white font-bold rounded-lg text-sm transition-all active:scale-95">
                        Update Status
                    </button>
                </div>

                {/* RIGHT COLUMN: Status & Activity */}
                <div className="space-y-6">

                    {/* Fulfillment Status Card */}
                    <div className="bg-white rounded-2xl  border border-slate-100 overflow-hidden ">

                        <div className="flex bg-[#E3EFFB] items-center gap-2 p-4 text-[#0288D1] font-bold text-sm sm:text-[20px] mb-6">
                            <Truck size={18} /> Fulfillment Status
                        </div>

                        {/* Progress Bar Logic */}
                        <div className='px-4   pb-5'>
                            <div className="relative pt-2 mb-8">
                                <div className="h-1.5 w-full bg-slate-100 rounded-full relative">
                                    <div className="absolute h-full w-1/2 bg-[#2E90D1] rounded-full" />
                                    <div className="absolute w-full flex justify-between -mt-1.5 px-0">
                                        {['Placed', 'Shipped', 'Delivered'].map((step, i) => (
                                            <div key={step} className="flex flex-col items-center">
                                                <div className={`w-4 h-4 rounded-full border-[3px] bg-white ${i <= 1 ? 'border-[#2E90D1]' : 'border-slate-200'}`} />
                                                <span className={`text-[10px] font-bold mt-2 ${i <= 1 ? 'text-slate-800' : 'text-slate-400'}`}>{step}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <button className="absolute right-0 top-12 flex items-center gap-1 text-[#0288D1] font-bold text-[11px] sm:text-[14px] hover:underline">
                                    <MapPin size={14} /> Live Tracking
                                </button>
                            </div>
                            <div className="pt-4 border-t border-slate-50">
                                <p className="text-sm font-bold text-slate-800">Total: $1,500.00</p>
                            </div>
                        </div>


                    </div>

                    {/* Activity Log Card */}
                    <div className="bg-white rounded-xl  border border-slate-100 overflow-hidden p-6">
                        <div className="flex items-center gap-2 text-[#135B91] font-bold text-sm sm:text-[20px]  mb-6">
                            <Activity size={18} /> Activity Log
                        </div>

                        <div className="mb-6">
                            <h4 className="text-lg sm:text-[24px]  font-extrabold  text-slate-900 leading-tight">Arriving Today</h4>
                            <p className="text-[11px] sm:text-[13px] font-bold text-slate-800">Estimated : 2:00 PM - 4:00 PM</p>
                        </div>

                        {/* Timeline */}
                        <div className="space-y-6 relative before:absolute before:inset-0 before:left-[11px] before:w-0.5 before:bg-slate-100 before:h-full">
                            <div className="relative flex gap-4 items-start pl-8">
                                <CheckCircle2 size={24} className="absolute left-0 bg-white text-slate-300" />
                                <span className="text-sm font-bold text-slate-800">Order Confirmed</span>
                            </div>
                            <div className="relative flex gap-4 items-start pl-8">
                                <Package size={24} className="absolute left-0 bg-white text-slate-400" />
                                <span className="text-sm font-bold text-slate-800">Shipped</span>
                            </div>
                            <div className="relative flex gap-4 items-start pl-8">
                                <Truck size={24} className="absolute left-0 bg-white text-[#2E90D1]" />
                                <div>
                                    <p className="text-sm font-bold text-slate-800">Out For Delivery</p>
                                    <p className="text-[10px] text-slate-400 font-medium">Your Order on the way to your address.</p>
                                </div>
                            </div>
                            <div className="relative flex gap-4 items-start pl-8 opacity-40">
                                <Home size={24} className="absolute left-0 bg-white text-slate-400" />
                                <span className="text-sm font-bold text-slate-800">Delivered</span>
                            </div>
                        </div>

                        {/* Courier Tracking */}
                        <div className="mt-8 bg-[#F4F9FD] p-4 rounded-xl flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="bg-indigo-900 text-white p-2 rounded-lg text-[10px] font-black italic">FedEx</div>
                                <div>
                                    <p className="text-xs font-bold text-slate-800">FedEx Express</p>
                                    <p className="text-[10px] font-medium text-slate-400">#TRK - 845852</p>
                                </div>
                            </div>
                            <Copy size={14} className="text-slate-400 cursor-pointer hover:text-slate-600" />
                        </div>

                        {/* Note Input */}
                        <div className="mt-6 flex gap-2">
                            <input
                                type="text"
                                placeholder="Add Note"
                                className="flex-1 bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-sky-100"
                            />
                            <button className="bg-[#2E90D1] text-white font-bold px-4 py-2 rounded-lg text-xs hover:bg-[#257ab3] transition-colors">
                                Submit
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default OderDetails;