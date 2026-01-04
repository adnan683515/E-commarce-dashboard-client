import { createBrowserRouter } from "react-router";
import Login from "../pages/auth/Login";
import Errort from "../components/Errort";
import VerifyAccount from "../pages/auth/VerifyAccount";
import ForgetPassword from "../pages/auth/Forgetpassword";
import NewPassConfirmPass from "../pages/auth/NewPassConfirmPass";
import MainLayout from "../Layout/MainLayout";



export const router = createBrowserRouter([
    {
        path: '/',
        Component: Login
    }, 
    {
        path : '/OTP',
        Component : VerifyAccount
    },{
        path : '/sendOTP',
        Component : ForgetPassword
    },{
        path : "/newPassConPass",
        Component : NewPassConfirmPass
    },{
        path : "/deshboard",
        Component : MainLayout
    }
    ,{
        path: '/*',
        Component: Errort
    }

])