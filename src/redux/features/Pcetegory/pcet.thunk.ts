// pcet.thunk.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCategoriesApi } from "./pcet.api";

export const fetchCategories = createAsyncThunk(
    "pcet/fetchCategories",
    async (token: string | null, { rejectWithValue }) => {
        try {
            return await getCategoriesApi(token);
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to load categories");
        }
    }
);
