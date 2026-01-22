
import DashboardGrid from './DashboardGrid'
import StepsChart from '../../components/StepsChart'
import RecentSellers from './RecentSellers'
import EcomChart from '../../components/EcomChart'
import RecentOrders from './RecentOrders'
import { createAxiosSecure } from '../../axios/axiosSequre'
import AuthReduxHook from '../../Hook/AuthReduxHook'
import { useQuery } from '@tanstack/react-query'



export interface TOrder {
  buyer: {
    id: string;
    name: string;
    email: string;
    image?: string;
  };
  seller: {
    id: string;
    shopName: string;
  };
  orderId: string;
  status: "PENDING" | "SHIPPED" | "DELIVERED" | "CANCELLED";
  totalPrice: number;
  createdAt: string;
}



export interface TStats {
  success: boolean;
  data: {
    totalOrders: number;
    totalRevenue: number;
    totalUnits: number;
    orderStatusCounts: {
      PENDING: number;
      ORDER_CONFIRMED: number
      SHIPPED: number;
      DELIVERED: number;
      CANCELLED: number;
      total: number
    }
  }
}


export interface FourGrids {
  success: boolean;
  data: {
    totalOrders: number;
    totalProducts: number;
    totalSales: number;
    totalPendingProducts: number;
  }
}





export default function DashboardHomepage() {

  const { token } = AuthReduxHook()
  const axiosSequre = createAxiosSecure(token)




  const { data: recentOdersData = [], isLoading } = useQuery<TOrder[]>({
    queryKey: ['recentOders'],
    queryFn: (async () => {
      const oderData = await axiosSequre.get('admin/recent-orders')
      return oderData.data.data
    }),
    enabled: !!token
  })




  const { data: StatsOfDashboard, isLoading: StatsLoading } = useQuery<FourGrids>({
    queryKey: ['statsData'],
    queryFn: (async () => {
      const res = await axiosSequre.get('admin/dashboard/stats?orderStatus=ORDER CONFIRMED')
      return res.data
    }),
    enabled: !!token
  })


  if (isLoading || StatsLoading) {
    return <div className='flex justify-center items-center'>
      <h1>Loading.........</h1>
    </div>
  }

  return (
    <div>
      <h1 className='sm:text-[24px] font-semibold'>Welcome to the admin Dashboard!</h1>

      <div className='my-2'>
        {
          StatsOfDashboard && <DashboardGrid StatsOfDashboard={StatsOfDashboard}></DashboardGrid>
        }
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
          <RecentOrders recentOdersData={recentOdersData}></RecentOrders>
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
