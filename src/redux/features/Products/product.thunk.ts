import { createAsyncThunk } from "@reduxjs/toolkit";
import { createAxiosSecure } from "../../../axios/axiosSequre";





// get product  
interface TToken {
    token: string;
    page: number;
    status?: "PENDING" | "APPROVED";
    category?: string;
}




export const getProductThunk = createAsyncThunk(
    "product/getProducts",
    async ({ token, page, status, category }: TToken, { rejectWithValue }) => {
        try {
            let url = status ? `admin/products?limit=8&status=${status}&page=${page}` : `admin/products?limit=8&page=${page}`

            if (category) {
                url = `admin/products?limit=8&page=${page}&category=${category}`
            }

            const axiosSecure = createAxiosSecure(token);
            const res = await axiosSecure.get(url);
            return res.data.data; // backend product array
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch products"
            );
        }
    }
);