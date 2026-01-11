import type { ReactNode } from "react";
import AuthReduxHook from "../Hook/AuthReduxHook";
import { useNavigate } from "react-router";

export default function AuthRoute({ children }: { children: ReactNode }) {
    const navigate = useNavigate()

    const { authUser } = AuthReduxHook()
    if (authUser) {
        navigate('/deshboard')
        return
    }

    return (
        <div>
            {children}
        </div>
    )
}
