// pcet.thunk.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { addNewCategories, getCategoriesApi } from "./pcet.api";
import axios from "axios";


interface FetchCategoriesArgs {
    token: string | null;
    page?: number | null;
}


// get categories
export const fetchCategories = createAsyncThunk(
    "pcet/fetchCategories",
    async ({ token, page }: FetchCategoriesArgs, { rejectWithValue }) => {
        try {
            return await getCategoriesApi({ token, page });
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to load categories"
            );
        }
    }
);




// add new categories thunk
interface IProductCategory {
    token?: string;
    _id?: string;
    name: string | undefined;
    image?: File | null;
}


export const addNewCategoryThunk = createAsyncThunk(
    "pcet/addNewCategory",
    async ({ token, name, image }: IProductCategory, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            if (name) {
                formData.append("name", name);
            }
            if (image) {
                formData.append("image", image);
            }
            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}admin/products/add-category?type=PRODUCT`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            return response.data; // Whatever backend returns
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || "Failed to add category");
        }
    }
);


// edit category
export const updateCategoryThunk = createAsyncThunk(
    "pcet/updateCategoryThunk",
    async (
        payload: IProductCategory | null, // accept payload as a variable
        { rejectWithValue }
    ) => {
        if (!payload) {
            return rejectWithValue("No category data provided");
        }

        const { token, _id, name, image } = payload;

        try {
            const formData = new FormData();
            if (name) {
                formData.append("name", name);
            }

            if (image) {
                formData.append("image", image);
            }

            if (!_id) {
                return rejectWithValue("Category ID is required");
            }

            const response = await axios.patch(
                `${import.meta.env.VITE_BASE_URL}admin/categories/${_id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log("response", response);
            return response.data; // backend response
        } catch (err: any) {
            return rejectWithValue(
                err.response?.data?.message || "Failed to update category"
            );
        }
    }
);