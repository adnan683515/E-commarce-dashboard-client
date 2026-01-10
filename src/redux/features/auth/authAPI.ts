import axios from "axios";
import type { LoginPayload, TUser } from "../../../config/auth/auth";



export const LoginUserApi = async (data: LoginPayload): Promise<TUser> => {

    const response = await axios.post(
        "http://localhost:3002/api/v1/auth/login",
        data
    );
    const result = response?.data?.data;
    console.log("Login API result:", result);
    return result;
};
