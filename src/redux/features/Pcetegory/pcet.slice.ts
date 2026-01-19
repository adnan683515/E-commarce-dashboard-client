import { createSlice } from "@reduxjs/toolkit";
import type { Category } from "./pcet.types";
import { addNewCategoryThunk, fetchCategories, updateCategoryThunk } from "./pcet.thunk";




// product cetegory type
interface PcetState {
    categories: Category[];
    selectedCategory: string | null;
    loading: boolean;
    error: string | null;
}

// initialState
const initialState: PcetState = {
    categories: [],
    selectedCategory: null,
    loading: false,
    error: null,
}


// product ceteogry slice
const pcetSlice = createSlice({
    name: "pcet",
    initialState,
    reducers: {

        setCategory(state, action) {
            state.selectedCategory = action.payload
        }

    },
    extraReducers: (builder) => {
        builder

            // fetch categories
            .addCase(fetchCategories.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload ?? [];
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || "Something went wrong";
            })


            // add category
            .addCase(addNewCategoryThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(addNewCategoryThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = [...state.categories, action.payload];
            })
            .addCase(addNewCategoryThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || "Failed to add category";
            })



            // edit category
            .addCase(updateCategoryThunk.pending, (state) => {
                state.loading = true
            })
            .addCase(updateCategoryThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = [...state.categories, action.payload]
            })
            .addCase(updateCategoryThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || "Failed to update category";
            })


    }
})

export const { setCategory } = pcetSlice.actions;
export default pcetSlice.reducer;