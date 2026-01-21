// import { createAsyncThunk } from "@reduxjs/toolkit";
// import { createAxiosSecure } from "../../../axios/axiosSequre";





// // get product  
// interface TToken {
//     token: string;
//     page: number;
//     status?: "PENDING" | "APPROVED";
//     category?: string;
// }




// export const getProductThunk = createAsyncThunk(
//     "product/getProducts",
//     async ({ token, page, status, category }: TToken, { rejectWithValue }) => {
//         try {
//             let url = status ? `admin/products?limit=8&status=${status}&page=${page}` : `admin/products?limit=8&page=${page}`

//             if (category) {
//                 url = `admin/products?limit=8&page=${page}&category=${category}`
//             }
//             const axiosSecure = createAxiosSecure(token);
//             const res = await axiosSecure.get(url);
//             console.log(res)
//             return res.data; // backend product array
//         } catch (error: any) {
//             return rejectWithValue(
//                 error.response?.data?.message || "Failed to fetch products"
//             );
//         }
//     }
// );


import { createAxiosSecure } from "../../../axios/axiosSequre";

interface GetProductsParams {
  token: string;
  page: number;
  status?: "PENDING" | "APPROVED";
  category?: string;
}

export const getProductApi = async ({ token, page, status, category }: GetProductsParams) => {
  try {
    let url = `admin/products?limit=8&page=${page}`;
    if (status) url += `&status=${status}`;
    if (category) url += `&category=${category}`;

    const axiosSecure = createAxiosSecure(token);
    const res = await axiosSecure.get(url);

    // Return the product array (assuming backend returns res.data.data)
    return res.data.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch products");
  }
};
