import React from 'react';
import { Filter, MapPin, ChevronRight, Store, ChevronDown } from 'lucide-react';
import { Link } from 'react-router';

interface Order {
  id: string;
  date: string;
  buyerName: string;
  buyerEmail: string;
  buyerAvatar: string;
  seller: string;
  total: string;
  status: 'placed' | 'shipped' | 'delivered';
}

const OrderManagement: React.FC = () => {
  // Mock data matching the visual variety in your image
  const orders: Order[] = [
    { id: '#ORD-1234', date: '20 Dec, 2025', buyerName: 'Alice Cooper', buyerEmail: 'alicecooper123@gmail.com', buyerAvatar: 'https://i.pravatar.cc/150?u=1', seller: 'SneakersHub', total: '$150.00', status: 'shipped' },
    { id: '#ORD-1234', date: '20 Dec, 2025', buyerName: 'Alice Cooper', buyerEmail: 'alicecooper123@gmail.com', buyerAvatar: 'https://i.pravatar.cc/150?u=2', seller: 'SneakersHub', total: '$150.00', status: 'placed' },
    { id: '#ORD-1234', date: '20 Dec, 2025', buyerName: 'Alice Cooper', buyerEmail: 'alicecooper123@gmail.com', buyerAvatar: 'https://i.pravatar.cc/150?u=3', seller: 'SneakersHub', total: '$150.00', status: 'placed' },
    { id: '#ORD-1234', date: '20 Dec, 2025', buyerName: 'Alice Cooper', buyerEmail: 'alicecooper123@gmail.com', buyerAvatar: 'https://i.pravatar.cc/150?u=4', seller: 'SneakersHub', total: '$150.00', status: 'shipped' },
    { id: '#ORD-1234', date: '20 Dec, 2025', buyerName: 'Alice Cooper', buyerEmail: 'alicecooper123@gmail.com', buyerAvatar: 'https://i.pravatar.cc/150?u=5', seller: 'SneakersHub', total: '$150.00', status: 'delivered' },
    { id: '#ORD-1234', date: '20 Dec, 2025', buyerName: 'Alice Cooper', buyerEmail: 'alicecooper123@gmail.com', buyerAvatar: 'https://i.pravatar.cc/150?u=6', seller: 'SneakersHub', total: '$150.00', status: 'delivered' },
    { id: '#ORD-1234', date: '20 Dec, 2025', buyerName: 'Alice Cooper', buyerEmail: 'alicecooper123@gmail.com', buyerAvatar: 'https://i.pravatar.cc/150?u=7', seller: 'SneakersHub', total: '$150.00', status: 'shipped' },
    { id: '#ORD-1234', date: '20 Dec, 2025', buyerName: 'Alice Cooper', buyerEmail: 'alicecooper123@gmail.com', buyerAvatar: 'https://i.pravatar.cc/150?u=8', seller: 'SneakersHub', total: '$150.00', status: 'delivered' },
    { id: '#ORD-1234', date: '20 Dec, 2025', buyerName: 'Alice Cooper', buyerEmail: 'alicecooper123@gmail.com', buyerAvatar: 'https://i.pravatar.cc/150?u=9', seller: 'SneakersHub', total: '$150.00', status: 'shipped' },
  ];

  const getStatusConfig = (status: Order['status']) => {
    switch (status) {
      case 'placed': return { width: '15%', color: 'bg-[#FFC107]', border: 'border-[#FFC107]' };
      case 'shipped': return { width: '50%', color: 'bg-[#2196F3]', border: 'border-[#2196F3]' };
      case 'delivered': return { width: '100%', color: 'bg-[#2E7D32]', border: 'border-[#2E7D32]' };
      default: return { width: '0%', color: 'bg-gray-200', border: 'border-gray-200' };
    }
  };

  return (
    <div className="p-4 md:p-8 bg-white min-h-screen rounded-2xl selection:bg-sky-100">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-[28px] font-bold text-gray-900 tracking-tight">Order Management</h1>
        <p className="text-[13px] text-gray-500 font-medium">Review and manage vendor product listings pending approval.</p>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        <button className="flex items-center gap-2 px-5 py-2.5 bg-[#B3D9F2] hover:bg-[#a0cfe0] text-gray-800 rounded-lg font-bold text-[13px] transition-all">
          <Filter size={18} strokeWidth={2.5} /> Filter
        </button>

        <div className="relative group">
          <select className="appearance-none bg-[#E3F2FD] border-none rounded-lg px-4 py-2.5 pr-10 text-[13px] font-bold text-gray-800 focus:ring-2 focus:ring-sky-200 cursor-pointer">
            <option>All vendors</option>
            <option>SneakersHub</option>
            <option>SportyWay</option>
          </select>
          <ChevronDown className='absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-600 text-[10px]' size={14} strokeWidth={3} />
        </div>

        <div className="relative">
          <select className="appearance-none bg-[#E3F2FD] border-none rounded-lg px-4 py-2.5 pr-10 text-[13px] font-bold text-gray-800 focus:ring-2 focus:ring-sky-200 cursor-pointer">
            <option>All Statuses</option>
            <option>Placed</option>
            <option>Shipped</option>
            <option>Delivered</option>
            <option>Cancelled</option>
          </select>
          <ChevronDown className='absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-600 text-[10px]' size={14} strokeWidth={3} />
        </div>

        <div className="relative">
          <select className="appearance-none bg-[#E3F2FD] border-none rounded-lg px-4 py-2.5 pr-10 text-[13px] font-bold text-gray-800 focus:ring-2 focus:ring-sky-200 cursor-pointer">
            <option value="current">Month: December </option>
            <option value="last-month">Month: November</option>


            <option disabled>──────────</option>
            <option value="10">Month: October</option>
            <option value="09">Month: September</option>
            <option value="08">Month: August</option>


            <option disabled>──────────</option>
            <option value="q4">Quarter: Q4 2025</option>
            <option value="q3">Quarter: Q3 2025</option>

            {/* Yearly Overview */}
            <option value="full-year">Full Year 2025</option>
          </select>
          <ChevronDown className='absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-600 text-[10px]' size={14} strokeWidth={3} />
        </div>

        <div className="flex-1 flex gap-2 min-w-[280px]">
          <input
            type="text"
            placeholder="Search orders..."
            className="w-full bg-[#F5F9FC] border border-gray-100 rounded-lg px-4 py-2.5 text-[13px] font-medium outline-none focus:ring-2 focus:ring-sky-100"
          />
          <button className="px-8 py-2.5 bg-[#B3D9F2] hover:bg-[#a0cfe0] text-gray-800 font-bold rounded-lg text-[13px] transition-all">
            Search
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="rounded-xl overflow-hidden border border-gray-100 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white">
            <thead className="bg-[#B3D9F2] bg-opacity-40 border-b border-gray-100">
              <tr className="text-left">
                <th className="px-6 py-4 text-[13px] font-bold text-gray-700">Order ID</th>
                <th className="px-6 py-4 text-[13px] font-bold text-gray-700">Buyer</th>
                <th className="px-6 py-4 text-[13px] font-bold text-gray-700">Seller</th>
                <th className="px-6 py-4 text-[13px] font-bold text-gray-700">Total</th>
                <th className="px-6 py-4 text-[13px] font-bold text-gray-700">Fulfillment Status</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.map((order, idx) => {
                const config = getStatusConfig(order.status);
                return (
                  <tr key={idx} className="hover:bg-gray-50/50 transition-all duration-300">
                    <td className="px-6 py-5">
                      <div className="text-[#0288D1] font-bold text-[14px] hover:underline cursor-pointer">{order.id}</div>
                      <div className="text-[11px] text-gray-400 font-bold mt-0.5">{order.date}</div>
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <img src={order.buyerAvatar} alt="avatar" className="w-10 h-10 rounded-full bg-gray-100 border border-gray-50" />
                        <div>
                          <div className="text-[14px] font-bold text-gray-900">{order.buyerName}</div>
                          <div className="text-[11px] text-gray-400 font-medium">{order.buyerEmail}</div>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#F5F9FC] border border-gray-100 rounded-lg">
                        <Store size={14} className="text-gray-400" />
                        <span className="text-[12px] font-bold text-gray-600">{order.seller}</span>
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <span className="text-[15px] font-black text-gray-900">{order.total}</span>
                    </td>

                    {/* Progress Bar Column */}
                    <td className="px-6 py-5 min-w-[260px]">
                      <div className="relative pt-2 w-full">
                        {/* Static Background Track */}
                        <div className="h-1.5 w-full bg-[#F0F4F8] rounded-full overflow-hidden">
                          {/* Dynamic Active Line */}
                          <div
                            className={`h-full transition-all duration-1000 ease-out ${config.color}`}
                            style={{ width: config.width }}
                          />
                        </div>

                        {/* Step Dots & Labels */}
                        <div className="flex justify-between w-full">
                          {['Placed', 'Shipped', 'Delivered'].map((label, i) => {
                            const isPast = (i === 0) || (i === 1 && order.status !== 'placed') || (i === 2 && order.status === 'delivered');
                            return (
                              <div key={label} className="flex flex-col items-center first:items-start last:items-end flex-1">
                                <div className={`w-3.5 h-3.5 rounded-full border-[3px] bg-white -mt-[11px] z-10 transition-all duration-500 ${isPast ? config.border : 'border-[#E0E7ED]'}`} />
                                <span className={`text-[10px] font-bold mt-2 ${isPast ? 'text-gray-800' : 'text-gray-400'}`}>
                                  {label}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex items-center justify-end gap-5">
                        <button className="flex items-center gap-1.5 text-[#0288D1] font-bold text-[12px] hover:brightness-90">
                          <MapPin size={16} /> Live Tracking
                        </button>


                        <Link to={'/deshboard/oder/:id'}>
                          <button className="flex items-center gap-2 px-4 py-1.5 border border-gray-200 rounded-lg text-[12px] font-bold text-gray-700 hover:bg-gray-50 transition-all group">
                            View
                            <ChevronRight size={16} className="bg-[#0288D1] text-white rounded-sm p-0.5 group-hover:scale-110 transition-transform" />
                          </button>
                        </Link>

                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="bg-[#B3D9F2] bg-opacity-20 px-8 py-4 flex items-center justify-between border-t border-gray-100">
          <p className="text-[13px] font-bold text-gray-600">Showing 1 to 9 of 520 orders this month</p>
          <div className="flex gap-2">
            <button className="px-5 py-2 bg-white border border-gray-200 text-[#0288D1] font-bold rounded-lg text-[13px] hover:shadow-sm transition-all active:scale-95">
              Previous
            </button>
            <button className="px-8 py-2 bg-[#0288D1] text-white font-bold rounded-lg text-[13px] hover:bg-[#0277BD] transition-all active:scale-95 shadow-md">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderManagement;