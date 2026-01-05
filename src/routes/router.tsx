import { createBrowserRouter } from "react-router";
import Login from "../pages/auth/Login";
import Errort from "../components/Errort";
import VerifyAccount from "../pages/auth/VerifyAccount";
import ForgetPassword from "../pages/auth/Forgetpassword";
import NewPassConfirmPass from "../pages/auth/NewPassConfirmPass";
import MainLayout from "../Layout/MainLayout";
import DashboardHomepage from "../pages/Deshboard/DashboardHomepage";
import SellerManagment from "../pages/Deshboard/SellerManagment/SellerManagment";
import BuyerManagment from "../pages/Deshboard/BuyerManagement/BuyerManagment";
import Product from "../pages/Deshboard/Product/Product";
import Oder from "../pages/Deshboard/OderPage/Oder";
import Payout from "../pages/Deshboard/Payout/Payout";
import Catalog from "../pages/Deshboard/Catalog/Catalog";
import Analytics from "../pages/Deshboard/Analytics/Analytics";
import Settings from "../pages/Deshboard/Settings/Settings";



export const router = createBrowserRouter([
    {
        path: '/',
        Component: Login
    },
    {
        path: '/OTP',
        Component: VerifyAccount
    }, {
        path: '/sendOTP',
        Component: ForgetPassword
    }, {
        path: "/newPassConPass",
        Component: NewPassConfirmPass
    }, {
        path: "/deshboard",
        Component: MainLayout,
        children: [
            {
                path: '/deshboard',
                Component: DashboardHomepage
            }, {
                path: '/deshboard/sellerManagement',
                Component: SellerManagment
            }, {
                path: '/deshboard/BuyerManagment',
                Component: BuyerManagment
            },{
                path : '/deshboard/product',
                Component : Product
            },{
                path : '/deshboard/oder',
                Component : Oder
            },{
                path : '/deshboard/payout',
                Component : Payout
            },{
                path : '/deshboard/catalog',
                Component : Catalog
            },{
                path : '/deshboard/analytics',
                Component : Analytics
            },{
                path : '/deshboard/settings',
                Component : Settings
            }
        ]
    }
    , {
        path: '/*',
        Component: Errort
    }

])