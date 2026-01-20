// pcet.api.ts
import axios from "axios";
import { createAxiosSecure } from "../../../axios/axiosSequre";

interface FetchCategoriesArgs {
    token: string | null;
    page?: number | null;
}


// get categories
export const getCategoriesApi = async ({ token, page }: FetchCategoriesArgs) => {
    const axiosSe = createAxiosSecure(token);

    if(!page){
         const res = await axiosSe.get(`admin/categories?type=PRODUCT`);
           return res.data.data;

    }
    const res = await axiosSe.get(`admin/categories?type=PRODUCT&limit=5&page=${page}`);

    return res.data.data;
};



// add categories api 
interface IProductCetegory {
    token: string | null,
    image: File | undefined,
    name: string
}

export const addNewCategories = async ({ token, image, name }: IProductCetegory) => {
    const formData = new FormData()
    if (token && image && name) {
        formData.append('image', image)
        formData.append('name', name)
    }
    const response = await axios.post( `${import.meta.env.VITE_BASE_URL}admin/products/add-category?type=PRODUCT`,       formData,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        return response.data
}