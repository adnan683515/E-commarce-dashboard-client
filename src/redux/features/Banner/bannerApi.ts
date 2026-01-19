import { createAxiosSecure } from "../../../axios/axiosSequre"
import type { IBanner } from "./Banner.type"





export const bannerGetApi = async ({ token } : IBanner ) => {
    const axiosSequre = createAxiosSecure(token)

    try {
        const res = await axiosSequre.get(`users/get-banners`)
        return res.data
    }
    catch (error: any) {
        console.log(error)
    }


}