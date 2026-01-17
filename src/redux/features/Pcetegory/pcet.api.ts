
import { createAxiosSecure } from "../../../axios/axiosSequre";

// export const getCategoriesApi = async () => {
//   const res = await axios.get(`${import.meta.env.VITE_BASE_URL}categories/products`);

//   return res.data.data; 
// }

export const getCategoriesApi = async (token: string | null) => {
    const axiosSe = createAxiosSecure(token)
    const res = await axiosSe.get(`categories/products`);

    return res.data.data;
}