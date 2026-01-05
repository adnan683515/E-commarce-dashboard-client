import React from 'react'
import DashboardGrid from './DashboardGrid'
import StepsChart from '../../components/StepsChart'
import RecentSellers from './RecentSellers'
import EcomChart from '../../components/EcomChart'
import RecentOrders from './RecentOrders'

export default function DashboardHomepage() {



  return (
    <div>
      <h1 className='sm:text-[24px] font-semibold'>Welcome to the admin Dashboard!</h1>

      <div className='my-2'>
        <DashboardGrid></DashboardGrid>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 w-full mt-6">
        {/* Left: Chart */}
        <div className="w-full lg:w-1/2 h-[40vh] sm:h-[55vh] lg:h-[60vh] ">
          <StepsChart />
        </div>

        {/* Right: Recent Sellers */}
        <div className="w-full lg:w-1/2 h-[55vh] lg:h-[60vh] overflow-y-auto bg-white rounded-3xl">
          <RecentSellers />
        </div>
      </div>


      <div className='flex flex-col lg:flex-row gap-4 w-full mt-6'>

        <div className='w-full lg:w-1/2'>
          <RecentOrders></RecentOrders>
        </div>
        <div className='w-full lg:w-1/2 rounded-lg'>
          <div className='flex justify-between '>
            <h1 className='font-semibold'>Oder Overview</h1>
            <button
              className="
              cursor-pointer
    group flex items-center gap-2
    text-sm font-medium text-violet-600
    px-3 py-1.5 rounded-full
    bg-violet-50/60
    hover:bg-violet-100
    transition-all duration-300
    
  "
            >
              <span>View All</span>
              <span
                className="
      text-xs opacity-0 -translate-x-1
      group-hover:opacity-100 group-hover:translate-x-0
      transition-all duration-300
    "
              >
                →
              </span>
            </button>

          </div>
          <EcomChart></EcomChart>
        </div>
      </div>





    </div>
  )
}
