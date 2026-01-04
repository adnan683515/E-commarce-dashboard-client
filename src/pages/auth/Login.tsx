import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import loginImage from "../../assets/loginImage.png"
import logo from "../../assets/logo.png"
import googleLogo from '../../assets/googleLogo.png'
import appleLogo from '../../assets/apple.png'
import { Link, useNavigate } from "react-router"
import ActionLoading from "../../components/Loading/ActionLoading"

export default function Login() {
    const [showPassword, setShowPassword] = useState(false)
    const [loginLoading, setLoginLoading] = useState<boolean>(false)
    const navigate = useNavigate()


    const loginFn = async () => {
        setLoginLoading(true)

        setTimeout(() => {
            setLoginLoading(false)
            navigate('/deshboard')
        }, 2000);
    }

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-[#F1F8FE]">

            {/* Left Image Section */}
            <div className="w-full md:w-1/2 flex items-center justify-center bg-[var(--primary-color)] p-4 md:p-0">
                <img src={loginImage} alt="Login" className="w-4/5 max-w-lg" />
            </div>

            {/* Right Form Section */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-4">
                <div className="w-full max-w-md">

                    {/* Logo */}
                    <div className="flex justify-center mb-6">
                        <img src={logo} alt="Logo" className="" />
                    </div>


                    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg flex flex-col gap-5">


                        <h2 className="text-2xl md:text-3xl text-center font-semibold">Sign In</h2>
                        <p className="text-center text-gray-500 text-base md:text-lg">Welcome Back, Admin 👋</p>


                        <div>
                            <input
                                type="email"
                                placeholder="Your Email"
                                className="w-full px-4 py-3 border-2 rounded-2xl border-[var(--accent-color)] focus:outline-none focus:ring-1 focus:ring-[var(--primary-color)] text-base"
                            />
                        </div>


                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                className="w-full px-4 py-3 border-2 rounded-2xl border-[var(--accent-color)] focus:outline-none focus:ring-1 focus:ring-[var(--primary-color)] text-base"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>



                        <button onClick={loginFn} className="w-full bg-[var(--btn-color)] text-white py-3 flex justify-center items-center rounded-2xl hover:bg-opacity-90 transition text-base font-medium">
                     {
                        loginLoading ?  <ActionLoading></ActionLoading> : " Sign In"
                     }
                        </button>


                        <div className="flex items-center ">
                            <div className="flex-grow h-px bg-gray-200" />
                            <span className="px-3 text-sm text-gray-400">or continue with</span>
                            <div className="flex-grow h-px bg-gray-200" />
                        </div>


                        <div className="flex gap-4">
                            <button className="flex-1 flex justify-center items-center gap-2 py-3 border-2 border-gray-200 rounded-full hover:bg-gray-50 transition">
                                <img src={googleLogo} alt="Google" className="h-5 w-5" />
                                <span className="text-gray-800 font-medium text-base">Google</span>
                            </button>
                            <button className="flex-1 flex justify-center items-center gap-2 py-3 border-2 border-gray-200 rounded-full hover:bg-gray-50 transition">
                                <img src={appleLogo} alt="Apple" className="h-5 w-5" />
                                <span className="text-gray-800 font-medium text-base">Apple</span>
                            </button>
                        </div>


                        <div className="text-right">
                     <Link to={'/sendOTP'}>
                            <button className="text-sm text-[var(--btn-color)] hover:underline">
                                Forgot password?
                            </button></Link>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
